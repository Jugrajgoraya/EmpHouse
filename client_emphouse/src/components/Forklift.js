import React from 'react'
import MHE from '../MHE.png'
import {Image} from 'react-bootstrap'
import '../App.css'

function Forklift(props) {
    const {mhe_license} = props

  return (
    <div>
        {mhe_license 
        ? 
            <Image className="forklift" rounded={true} src={MHE}></Image>
        :
            <div>No License</div>
        }
    </div>
  )
}

export default Forklift