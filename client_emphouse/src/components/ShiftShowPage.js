import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {Nav, ListGroup} from 'react-bootstrap'
import Forklift from './Forklift';
import RatingShow from './RatingShow';
import { Shift } from '../requests';

function ShiftShowPage() {

    const { id } = useParams();
    const [shift,setShift] = useState(null)
    const [shiftContainersWithEmps, setShiftContainersWithEmps] = useState([])
    const [shiftEmployeeObjects, setShiftEmployeeObjects] = useState([])

    useEffect(()=>{
        Shift.show(id).then(data =>{
            setShift(data.shift)
            setShiftContainersWithEmps(data.containers)
            setShiftEmployeeObjects(data.employeeObjects)
        })
    },[])

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
        <div className='row '>
            <div className='col m-4 fw-bolder fs-4 bg-white'>
                {shift ? shift.date: ""}
            </div>
            <div className='col m-4 fw-bolder fs-4 bg-white'>
                {shift ? shift.location: ""}
            </div>
        </div>
        <ListGroup className='m-4 containers'>
        <div className='fs-4 fw-bold'>Shift Containers</div>
            {shiftContainersWithEmps 
            ?
                shiftContainersWithEmps.map((obj,i)=>{
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
                                <p>started at : {getTime(obj.c.started_at)}</p>
                            </div>
                            <div className='col'>
                                <p>finished at : {getTime(obj.c.end_at)}</p>
                            </div>                                                     
                        </div>
                        <div className='bg-dark badge'>
                            {obj.employees
                            ?
                                obj.employees.map((e,i)=>{
                                    return(
                                    <div className='fw-bolder h-50'><p>{i+1} {e.first_name} {e.last_name}</p></div>
                                    )
                                })
                            :
                            <div className=''>no one assigned</div>} 
                        </div>
                    </ListGroup.Item>)
                })
            :
                "no containers here"
            }
        </ListGroup>
        <ListGroup className='m-4 employees hide'>
            <div className='fs-4 fw-bold'>Shift Employees</div>
            {shiftEmployeeObjects 
            ?
                shiftEmployeeObjects.map((obj,i)=>{
                    return(
                    <ListGroup.Item className='mt-2 shadow'>
                        <div className='row '>
                            <div className='col fw-bold h-100'>
                                {obj.e.first_name}
                            </div>
                            <div className='col h-50'>
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
                        </div>
                    </ListGroup.Item>
                    )
                })
            :
                "no emplyees here"
            }
        </ListGroup>
        <div>
            {shift ? shift.comments:''}
        </div>
    </div>
  )
}

export default ShiftShowPage