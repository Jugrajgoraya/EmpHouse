import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shift } from '../requests'

function ShiftNewPage(props) {

    let navigate = useNavigate();

    const [date, setDate] = useState(null)
    const [shiftType, setShiftType] = useState(null)
    const [location, setLocation] = useState(null)

    const createShift = (event)=>{
        event.preventDefault();
        const params = {
            date: date,
            sub_time: shiftType,
            location: location
        }
        Shift.create(params).then(shift => {
            navigate('/')
        })
    }

  return (
    <div className='home-bg-image h-110 w-100'>
        <div className='p-5 mb-3 d-flex justify-content-center fw-bolder fs-2'>CREATE SHIFT</div>
        <form className='position-absolute top-50 start-50 translate-middle fw-bolder' onSubmit={createShift}>
            <div className='m-1 row'>
                <label className='col-7 fs-4 bg-white m-1 shadow rounded' htmlFor="date" >Date</label>
                <input className='col btn btn-light m-1' type="date" name="date" onChange={(event)=>{setDate(event.target.value)}}/>
            </div>
            <div className='m-1 row'>
                <label className='col-7 fs-4 bg-white m-1 shadow rounded' htmlFor="shift_type">Shift Type</label>
                <select className='col btn btn-light m-1' type="text" name="shift_type" onChange={(event)=>{setShiftType(event.target.value)}}>
                    <option selected>Select</option>
                    <option value={'AM'}>AM</option>
                    <option value={'PM'}>PM</option>
                    <option value={'GY'}>GY</option>
                </select>
            </div>
            <div className='m-1 row'>
                <label className='col-7 fs-4 bg-white m-1 shadow rounded' htmlFor="location">Location</label>
                <select className='col btn btn-light m-1' type="text" name="location" onChange={(event)=>{setLocation(event.target.value)}}>
                    <option selected>Select</option>
                    <option value={'YVR'}>YVR</option>
                    <option value={'Delta'}>Delta</option>
                    <option value={'Surrey'}>Surrey</option>
                </select>                
            </div>
            <div className='m-1 d-flex justify-content-center'>
                <button className="fs-5 btn btn-dark shadow text-white p-2 fw-bold rounded" type="submit" >Create Shift</button>
            </div>            
        </form>
    </div>
  )
}

export default ShiftNewPage