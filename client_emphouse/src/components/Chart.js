import React from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts'

function Chart (props){

    let ratings = props.ratings
    const r1 = ratings[0]
    const r2 = ratings[1]
    const r3 = ratings[2]
    const r4 = ratings[3]
    const r5 = ratings[4]
    console.log(ratings); 

    const options = {
        title: {
            text: "Recent Performance"
        },
        data: [
            {
                type: "column",
                dataPoints: [
                    { label: "Monday",  y: r1  },
                    { label: "Tuesday", y: r2  },
                    { label: "Wednesday", y: r3  },
                    { label: "Thursday",  y: r4  },
                    { label: "Friday",  y: r5  }
                ]
            }
        ]
    }
    return (
        <div className='m-3 shadow'>
            <CanvasJSChart options = {options}
                /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    )
}
export default Chart                             