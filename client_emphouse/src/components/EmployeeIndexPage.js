import React, { useEffect, useState } from 'react'
import {ListGroup} from 'react-bootstrap'
import {Employee} from '../requests'
import RatingShow from './RatingShow'
import Forklift from './Forklift'
import { useNavigate } from 'react-router-dom'


function EmployeeIndexPage(props) {

    const navigate = useNavigate()

    const [employeeObjects, setEmployeeObjects] = useState([])
    useEffect(()=>{
        console.log('inside useEffect');
        Employee.all().then(emps =>{
            console.log(`employeeObjects: ${emps}`);
            setEmployeeObjects(emps)
        })
        console.log(`employees: ${employeeObjects}`);
    },[])

    const goToShow = (id)=>{
        navigate(`${id}`)
    }

  return (
        <ListGroup className='p-3 home-bg-image'>
            <h1 className='header p-3'>My Employees</h1>
        {employeeObjects
        ?
            employeeObjects.map((obj,i)=>{
                return (
                    <ListGroup.Item onClick={()=>{goToShow(obj.e.id)}} className='mt-2 shadow'>
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
                                <div className='row'>
                                    <p className='col-9 fw-bold'>All Containers -</p>
                                    <p className='col fw-bolder badge btn-dark'>{obj.containers.length}</p>   
                                </div>
                            </div>                          
                        </div>
                    </ListGroup.Item>
                )
            })
        :
            "no emplyees here"
        }
        </ListGroup>
  )
}

export default EmployeeIndexPage