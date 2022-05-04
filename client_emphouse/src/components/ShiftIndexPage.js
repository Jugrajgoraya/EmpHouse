import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Shift } from '../requests'
// import {Link} from 'react-router-dom'

function ShiftIndexPage() {
  const [shifts, setShifts] = useState([])

  useEffect(()=>{
      Shift.all().then(shifts =>{
          const finalizedShifts = shifts.filter(s => s.status === "finalized")
          setShifts(finalizedShifts)
      })
  },[])
return (
      <div className='home-bg-image'>
          <div className='p-2 pt-5 mb-3 header fw-bold fs-2'>YOUR PREVIOUS SHIFTS</div>
          {shifts
          ?
          shifts.map((e,i)=>{
              return (
                  <div className='m-2 '>
                      <Link to={`/shifts/${e.id}`} className='m-3 nav-link fs-1 text-dark bg-white shadow rounded' key={e.id}>
                          {e.location} {" "}{e.sub_time} ({e.date} )  
                      </Link>
                  </div>
              )
          })
          :
          <div>You have no previous shifts</div>
          }
      </div>
)
}

export default ShiftIndexPage