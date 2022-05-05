import React from 'react'
import '../App.css'

function RatingShow(props) {

  const filled = Math.floor(props.avg_rating)
  const empty = 5 - Math.floor(props.avg_rating)

  return (
    <div>
        {Array(filled).fill().map(()=>
            {return <span className="fa fa-star checked"></span>}
        )}
        {Array(empty).fill().map(()=>
            {return <span className="fa fa-star"></span>}
        )}        
    </div>
  )
}

export default RatingShow