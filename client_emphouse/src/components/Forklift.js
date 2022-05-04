import React from 'react'
import MHE from '../MHE.png'
import {Image} from 'react-bootstrap'

function Forklift(props) {
    const {mhe_license} = props

  return (
    <div>
        {mhe_license 
        ? 
            <Image className="w-25 " rounded={true} src={MHE}></Image>
        :
            ''
        }
    </div>
  )
}

export default Forklift