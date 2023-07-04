import React, { useEffect, useState } from 'react'

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area} from 'recharts'



function ConsumptionGraph({device, data})
{
  const [graphData, setGraphData] = useState({"value": 0, "timestamp": new Date()})

  /* convert the time of milliseconds to 24-hour format for chart tooltip and x-axis labels */
  const toReadableTime = (timestamp) => {
      return new Date(timestamp)
      .toLocaleTimeString([], { hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false })
    }

    useEffect(() => {
      if(device !== undefined)
          
        /* define the state with the timestamp converted into a number */
          setGraphData(() => {
            const updateData = data[device.id].consumption.map((consumption, index) => {              
              return {
                "value": consumption.value,
                "timestamp": consumption.timestamp.getTime()
              }
            })
            
            console.log("[Home/compoents/devicestatsPanel/graph] updateData: ", updateData)
            return updateData
          })
      // console.log("[Home/compoents/devicestatsPanel/graph]", data[device.id].consumption)
    }, [device, data])




    

  return (
    <AreaChart width={1500} height={300} data={graphData} 
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorConsuption" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey={"timestamp"}
      tickFormatter={toReadableTime}
      type="number" 
      domain={['minData', 'maxData']}/>
      <YAxis type="number" domain={['auto', 'auto']}/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip labelFormatter={toReadableTime}/>
      <Area type="monotone"
      dataKey={"value"}
      stroke="#8884d8"
      fillOpacity={1}
      fill="url(#colorValue)"
      isAnimationActive={false} />
    </AreaChart>
  )



}

export default ConsumptionGraph