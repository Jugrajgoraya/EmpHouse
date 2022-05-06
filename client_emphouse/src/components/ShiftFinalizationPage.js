import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Button, ListGroup} from 'react-bootstrap'
import '../App.css'
import RatingShow from './RatingShow'
import Forklift from './Forklift'
import { Employee, Shift } from '../requests'

function ShiftFinalizationPage() {

    const navigate = useNavigate();
    // const location = useLocation()
    // const shiftEmployees = location.state.shiftEmployees
    // const shift = location.state.shift

    const [shiftEmployeeObjects, setShiftEmployeeObjects] = useState([])
    const [shift, setShift] = useState([])
    const [finalThoughts, setFinalThoughts] = useState(null)
    const { id } = useParams()
    useEffect(()=>{
        Shift.employees(id).then(data=>{
            setShiftEmployeeObjects(data.employeeObjects)
            setShift(data.shift)
        })
    },[])

    const rateEmployee = (event)=>{
        event.preventDefault();
        const employee_id = event.target.empId.value
        const rating = parseInt(event.target.rating.value)
        const params = {rating: rating, shift_id: shift.id}
        Employee.update_rating(employee_id, params).then(data =>{
            console.log(data);
        })
        window.location.reload()
    }
    const handleFinalThoughts = (event)=>{
        setFinalThoughts(event.target.value)
    }
    const finalize = ()=>{
        const params = {comments: finalThoughts}
        Shift.finalize(id,params).then(shift_id=>{
            console.log(shift_id);
        })
        navigate('/')
    }

  return (
    <div className='home-bg-image'>
        <div className='p-4 header fw-bolder mb-4 fs-2'>Shift Finalization</div>
        <div className='col ml-3 p-3'>
            <label className='row fw-bold mb-1 fs-4' name="final_thoughts">Final Thoughts</label>
            <textarea className='row w-100 final-thoughts' value={finalThoughts} onChange={handleFinalThoughts}></textarea>
        </div>
        {shiftEmployeeObjects 
            ?
                shiftEmployeeObjects.map((obj,i)=>{
                    return(
                    <ListGroup.Item className='mt-2 m-2 shadow rounded'>
                        <div className='row'>
                            <div className='col fw-bold'>
                                {obj.e.first_name}
                            </div>
                            <div className='col'>
                                <RatingShow avg_rating={obj.e.avg_rating}/>
                            </div>
                            <div className='col'>
                                <form onSubmit={rateEmployee}>
                                    <input type="hidden" name="empId" value={obj.e.id}/>
                                    <input className=' border' type="number" name="rating" min="1" max="5"/>
                                    <button className='btn shadow border' type="submit">Rate</button>
                                </form>
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
                                {/* <div className='row'>
                                    <p className='col-9 fw-bold'>today's Containers -</p>
                                    <p className='col fw-bolder badge btn-dark'>{obj.containers ? obj.containers.length:""}</p>
                                    
                                    {obj.containers
                                    ?
                                        obj.containers.map((c,i)=>{
                                            return <div className='col'>{i+1}: {c.number} </div>
                                        })
                                    :
                                    ""
                                    }
                                </div> */}
                            </div>                         
                        </div>
                    </ListGroup.Item>
                    )
                })
            :
                "no emplyees here"
            }
            <div className='d-flex justify-content-end'>
                <Button className='m-2 fw-bold shadow' onClick={finalize}>Finalize</Button>
            </div>
    </div>
  )
}

export default ShiftFinalizationPage