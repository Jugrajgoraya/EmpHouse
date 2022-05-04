import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Shift } from '../requests'

function HomePage() {

    const [currentShifts, setCurrentShifts] = useState([])

    useEffect(()=>{
        Shift.all().then(shifts =>{
            const runningShifts = shifts.filter(s => s.status === "created")
            setCurrentShifts(runningShifts)
        })
    },[])
  return (
        <div className='home-bg-image'>
            <div className='display-1 fw-bolder d-flex justify-content-center emp-house'>EmpHouse</div>
            <div className='m-2 mt-5 mb-3 header fw-bold fs-2'>CURRENT SHIFTS</div>
            {currentShifts
            ?
            currentShifts.map((e,i)=>{
                return (
                    <div className='m-2 shadow rounded bg-white'>
                        <Link className='m-3 nav-link fs-1 text-dark' to={`/current_shifts/${e.id}`} key={e.id}>
                            {e.location} {" "}{e.sub_time} ({e.date} )  
                        </Link>
                    </div>
                )
            })
            :
            <div>You have no current running shifts</div>
            }
            <div className='m-4 d-flex justify-content-end'>
                <Link to="/shifts/new"className='btn btn-dark fw-bold fs-4 shadow'>Shift +</Link>
            </div>
        </div>
  )
}

export default HomePage