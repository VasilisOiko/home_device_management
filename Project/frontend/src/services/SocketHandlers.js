function saveToMessageQueue(receive, device, queueLimit, setSocketData)
{
    let message = JSON.parse(receive.data)["message"];
					
    // socket state approach
    setSocketData((prevSocketData) => {
        const updatedArray = {...prevSocketData};


        /* keep value of each property if new vaule of message is undefined  */
        if(prevSocketData[device.id.toString()] !== undefined)
        {
            /* on undefined value keep the previous state */
            if (message.connected !== undefined)
            {
                updatedArray[device.id].connected = message.connected
            }
            if (message.enabled !== undefined)
            {
                updatedArray[device.id].enabled = message.enabled
            }

            /* device must be:
                * not enabled with no consumption data
                * enbled with consumpion data defined */
            if(message.timestamp !== undefined && (updatedArray[device.id].enabled === false || message.consumption !== undefined))
            {                   
                if (updatedArray[device.id].enabled === false)
                {
                    message.consumption = 0
                }
                
                /* set time for the x-axis of graph */
                const utcTimestamp = new Date(message.timestamp)
                const localTimestamp = new Date(utcTimestamp.getTime() + utcTimestamp.getTimezoneOffset() * 60000)

                
                updatedArray[device.id].consumption.push({
                    "value": message.consumption,
                    "timestamp": localTimestamp
                })

                if (updatedArray[device.id].consumption.length > queueLimit)
                {
                    updatedArray[device.id].consumption.shift(1)
                }
            }
        }

        console.log("[SocketHandles]: ", updatedArray);

        
        return updatedArray; 
    })
}

export {saveToMessageQueue}