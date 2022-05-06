import React, {useState, useEffect } from 'react'
import '../App.css'
import {useParams} from 'react-router-dom'
import { Employee } from '../requests'
import Forklift from './Forklift'
import RatingShow from './RatingShow'
import Chart from './Chart'

function EmployeeShowPage() {

    const {id} = useParams()

    const [employee, setEmployee] = useState(null)
    const [employeeContainers, setEmployeeContainers] = useState([])
    const [lastWeekRatings, setLastWeekRatings] = useState([])

    useEffect(()=>{
        Employee.show(id).then(employeeObject =>{
            setEmployee(employeeObject.employee)
            setEmployeeContainers(employeeObject.containers)
            setLastWeekRatings(employeeObject.lastWeekRatings)
        })
    },[])

  return (
    <div className='home-bg-image'>
        {
            employee 
            ?
            <div className='p-5 '>
                <div className='header fs-3'>Employee Details</div>
                <div className='row m-5 p-5 bg-dark text-light rounded'>
                    <div className='col mb-2'>
                        <div className='m-2 fs-5 '>First Name</div>
                        <div className='m-2 p-2 fs-4 fw-bold border shadow rounded-pill bg-secondary'>
                            {employee.first_name}
                        </div>
                    </div>
                    <div className='col mb-2'>
                        <div className='m-2 fs-5 '>Last Name</div>
                        <div className='m-2 p-2 fs-4 fw-bold border rounded-pill bg-secondary'>
                            {employee.last_name}
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='m-2 fs-5 '>Email</div>
                        <div className='m-2 p-2 fs-4 fw-bold border rounded-pill bg-secondary'>
                            {employee.email}
                        </div>
                    </div>
                    
                    <div className='row mt-2'>
                        <div className='col fs-5 m-2 '>ForkLift License</div>
                        <div className='col m-2'>
                            <Forklift mhe_license ={employee.mhe_license}/>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col fs-5 m-2 '>Rating</div>
                        <div className='col m-2'>
                            <RatingShow avg_rating={employee.avg_rating}/>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col fs-5 m-2'>Total Containers</div>
                        <div className='col m-2'>
                            {employeeContainers.length}
                        </div>
                    </div> 
                    <div className='rounded border m-3 bg-secondary'>
                        <Chart ratings={lastWeekRatings}/>
                    </div>
                </div>
            </div>
            :
            ""
        }       
    </div>
  )
}

export default EmployeeShowPage