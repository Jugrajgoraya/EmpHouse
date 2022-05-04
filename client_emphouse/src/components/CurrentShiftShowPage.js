import React, { useEffect, useState } from 'react'
import { Link,useParams} from 'react-router-dom'
import '../App.css'
import { Container, Employee, Shift } from '../requests'
import {Nav, ListGroup, Button,FloatingLabel,Form} from 'react-bootstrap'
import RatingShow from './RatingShow'
import Forklift from './Forklift'

function CurrentShiftShowPage() {

    const { id } = useParams();
    const [shift,setShift] = useState(null)
    const [shiftContainersWithEmps, setShiftContainersWithEmps] = useState([])
    const [shiftEmployeeObjects, setShiftEmployeeObjects] = useState([])
    const [freeEmployees, setFreeEmployees] = useState([])
    const [newCanId, setNewCanId] = useState(null)
    const [newEmpId, setNewEmpId] = useState(null)
    const [dueContainers, setDueContainers] = useState([])
    const [signedOutEmployees, setSignedOutEmployees] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(()=>{
        Shift.show(id).then(data =>{
            setShift(data.shift)
            setShiftContainersWithEmps(data.containers)
            setShiftEmployeeObjects(data.employeeObjects)
            let freeEmps = []
            data.employeeObjects.map((obj)=>{
                if(obj.e.status == "signed_in"){
                    freeEmps.push(obj.e)
                }
            })
            setFreeEmployees(freeEmps)
        })
        Container.due().then(dueCans =>{
            setDueContainers(dueCans)
        })
        Employee.signed_out().then(signedOutEmps =>{
            setSignedOutEmployees(signedOutEmps)
        })
    },[])
    const handleCanChange = (event)=>{
        setNewCanId(event.target.value);
    }
    const handleEmpChange = (event) =>{
        setNewEmpId(event.target.value);
    }
    const addContainer = ()=>{
        const params = {newCanId: newCanId}
        Shift.addContainer(shift.id, params).then(data =>{
            if(data.errors){
                setErrors(data.errors)
            }else{
                setShiftContainersWithEmps(data.containers)
            }
        })
        window.location.reload()
    }
    const removeContainer = (event)=>{
        event.preventDefault();
        const canId = parseInt(event.target.canId.value)
        const params = {canId: canId}
        Shift.removeContainer(shift.id, params).then(data =>{
            if(data.errors){
                setErrors(data.errors)
            }else{
                setShiftContainersWithEmps(data.containers)
            }
        })
        window.location.reload()
    }
    const addEmployee = ()=>{
        const params = {newEmpId: newEmpId}
        Shift.addEmployee(shift.id, params).then(data =>{
            if(data.errors){
                setErrors(data.errors)
            }else{
                setShiftEmployeeObjects(data.employeeObjects)
            }
        })
        window.location.reload()
    }
    const removeEmployee = (event)=>{
        event.preventDefault();
        const empId = parseInt(event.target.empId.value)
        const params = {empId: empId}
        Shift.removeEmployee(shift.id, params).then(data =>{
            if(data.errors){
                setErrors(data.errors)
            }else{
                setShiftEmployeeObjects(data.employeeObjects)
            }
        })
        window.location.reload()
    }
    const startContainer =(event)=>{
        event.preventDefault()
        const canId = event.target.canId.value
        Container.start_container(canId).then(container => {
            if(container.error){
                setErrors(container.error)
                window.alert(container.error)
                alert(container.error)
            }else{
                console.log(container.started_at);
            }
        })
        window.location.reload()
    }
    const finishContainer = (event)=>{
        event.preventDefault()
        const canId = event.target.canId.value
        Container.finish_container(canId).then(container => {
            console.log(container.end_at);
        })
        window.location.reload()
    }
    const assignEmployee = (event)=>{
        event.preventDefault();
        const canId = event.target.canId.value
        const empId = event.target.selectedEmp.value
        const params = {empId: empId}
        Container.addEmployee(canId, params).then(addedEmployees =>{
            const updatedFreeEmployees = freeEmployees.filter(e => !addedEmployees.includes(e))
            setFreeEmployees(updatedFreeEmployees)
        })
        window.location.reload();
    }

    // shift showPage Navigation between employees and containers 👇

    const getEmployees = ()=>{
        document.querySelector(".employees").classList.remove("hide");        
        document.querySelector(".containers").classList.add("hide");
        document.querySelector(".nav-C").classList.remove("bg-black");
        document.querySelector(".nav-E").classList.add("bg-black");
    }
    const getContainers = ()=>{
        document.querySelector(".containers").classList.remove("hide");
        document.querySelector(".employees").classList.add("hide");
        document.querySelector(".nav-E").classList.remove("bg-black");
        document.querySelector(".nav-C").classList.add("bg-black");
    }
    const getTime = (str)=>{
        const date = new Date(str)
        return date.toTimeString().split(' ')[0];
    }
    
  return (
    <div className='home-bg-image'>
        <h1 className='pt-5 p-2 mb-3 header fw-bold fs-2'>SHIFT DETAILS</h1>
        <Nav className='m-3 ' variant="tabs" fill={true}>
            <Nav.Item onClick={getContainers} className="rounded bg-black nav-C bg-light">
                <div className='shift-container-nav-child'>Containers</div>
            </Nav.Item>
            <Nav.Item onClick={getEmployees} className="rounded nav-E bg-light">
                <div className='shift-container-nav-child'>Employees</div>
            </Nav.Item>
        </Nav>
        {/* errors  */}
        {errors.length > 0 ? (
            <div className=''>
                <p> errors {errors.map(error => error.message).join(", ")}</p>
            </div>)
        : ""}
        <div className='row '>
            <div className='col m-4 fw-bolder fs-4 bg-white'>
                {shift ? shift.date: ""}
            </div>
            <div className='col m-4 fw-bolder fs-4 bg-white'>
                {shift ? shift.location: ""}
            </div>
            <div className='m-4 d-flex justify-content-end col'>
                <Link className='btn btn-primary' to={`/shift_finalization/${id}`}>
                    Finalize 
                </Link>
            </div>
        </div>
        <ListGroup className='m-4 containers'>
            <div>
                <FloatingLabel controlId="floatingSelectGrid" label="see your due containers">
                    <Form.Select aria-label="Floating label select example" value={newCanId} onChange={handleCanChange}>
                        <option>Select</option>
                        {dueContainers 
                            ?
                            dueContainers.map((c,i)=>{
                                return (
                                    <option value={c.id}>{c.id} |{c.number} | due on {c.due_date} | {c.weight} kgs | status - {c.status}</option>
                                    )
                                })
                            :
                            "no due containers"
                        }
                    </Form.Select>
                    <Button className='mb-3 mt-3' onClick={addContainer}>Add Container </Button>{' '}
                </FloatingLabel>
            </div>

            {shiftContainersWithEmps 
            ?
                shiftContainersWithEmps.map((obj,i)=>{
                    if(obj.c.status == "due"){

                    }
                    return (
                    <ListGroup.Item className='mt-2 shadow rounded'>
                        <div className='row'>
                            <div className='col fw-bold'>
                                id: {obj.c.id}
                            </div>                            
                            <div className='col fw-bold'>
                                {obj.c.number}
                            </div>
                            <div className='col'>
                                {obj.c.size} feet
                            </div>
                            <div className='col'>
                                {obj.c.weight} kgs
                            </div>
                            <div className='col'>
                                {obj.c.boxes} 
                            </div>
                            <div className='col'>
                                {
                                    obj.c.started_at
                                    ?
                                        <p>started at {getTime(obj.c.started_at)}</p>
                                    :
                                    <form onSubmit={startContainer}>
                                        <input type="hidden" name="canId" value={obj.c.id}></input>
                                        <button type="submit" id="button_start" class="btn border btn-primary">
                                            <i class="fa fa-play"></i>
                                        </button>
                                    </form>
                                }
                            </div>
                            <div className='col'>
                                {
                                    obj.c.end_at
                                    ?
                                        <p>finished at {getTime(obj.c.end_at)}</p>
                                    :
                                    <form onSubmit={finishContainer}>
                                        <input type="hidden" name="canId" value={obj.c.id}></input>
                                        <button type="submit" id="button_stop" class="btn border btn-primary">
                                            <i class="fa fa-stop"></i>
                                        </button>
                                    </form>
                                }
                            </div>
                            <div className='col'>
                                <form onSubmit={removeContainer}>
                                    <input type="hidden" name="canId" value={obj.c.id}></input>
                                    {
                                        obj.c.status === "working" || obj.c.status === "done" ?
                                        ""
                                        :
                                        <button type="submit" id="button_remove" class="btn border btn-danger">
                                            Remove
                                        </button>
                                    }
                                </form>
                            </div>
                            <div className='col'>
                                <form onSubmit={assignEmployee} className="row">
                                    <input type="hidden" name="canId" value={obj.c.id}></input>
                                    {
                                    obj.c.status === "done" ?
                                    ""
                                    :
                                    <>
                                    <select class="form-select col" id="inputGroupSelect01" name='selectedEmp'>
                                        <option selected>Assign +</option>
                                        {freeEmployees 
                                            ?
                                            freeEmployees.map((e,i)=>{
                                                return (
                                                    <option value={e.id}>{e.first_name}  | {e.avg_rating} | {e.status}</option>
                                                    )
                                                })
                                            :
                                            "no free employees"
                                        }
                                    </select>
                                    <button className='btn btn-success col'>save</button>
                                    </>
                                    }
                                </form>
                            </div>                                                      
                        </div>
                        <div className='bg-dark badge'>
                            {obj.employees
                            ?
                                obj.employees.map((e,i)=>{
                                    return(
                                    <div className='fw-bolder'><p>{i+1} {e.first_name} ( status {e.status})</p></div>
                                    )
                                })
                            :
                            <div className=''>no one assigned</div>} 
                        </div>
                    </ListGroup.Item>)
                })
            :
                "no emplyees here"
            }
        </ListGroup>
        <ListGroup className='m-4 employees hide'>
            <div>
                <FloatingLabel controlId="floatingSelectGrid" label="Other Employees list">
                    <Form.Select aria-label="Floating label select example" value={newEmpId} onChange={handleEmpChange}>
                        <option>Select</option>
                        {signedOutEmployees 
                            ?
                            signedOutEmployees.map((e,i)=>{
                                return (
                                    <option value={e.id}>{e.id} | {e.first_name}  | rating {e.avg_rating} | {e.status}</option>
                                    )
                                })
                            :
                            "no available employees"
                        }
                    </Form.Select>
                    <Button className='mb-3 mt-3' onClick={addEmployee}>Add Employee </Button>{' '}
                </FloatingLabel>
            </div>
            {shiftEmployeeObjects 
            ?
                shiftEmployeeObjects.map((obj,i)=>{
                    return(
                    <ListGroup.Item className='mt-2 shadow'>
                        <div className='row'>
                            <div className='col fw-bold'>
                                {obj.e.first_name}
                            </div>
                            <div className='col'>
                                <RatingShow avg_rating={obj.e.avg_rating}/>
                            </div>
                            <div className='col'>
                            {
                                obj.e.mhe_license === true
                                ?
                                <Forklift mhe_license={obj.e.mhe_license}/>
                                :
                                ""
                            }
                            </div>
                            <div className='col'>
                            {
                                obj.e.status === "working"
                                ?
                                ""
                                :
                                <form onSubmit={removeEmployee}>
                                    <input type="hidden" name="empId" value={obj.e.id}></input>
                                    <button type="submit" id="button_remove" class="btn border btn-danger">
                                        Sign Out
                                    </button>
                                </form>                          
                            }
                            </div> 
                        </div>
                    </ListGroup.Item>
                    )
                })
            :
                "no emplyees here"
            }
        </ListGroup>
    </div>
  )
}

export default CurrentShiftShowPage