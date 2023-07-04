import React from 'react'

import {Badge, Card, Col } from 'react-bootstrap';
import Switch from '@mui/material/Switch';




function isDefined(variable, field)
{
    if(variable !== undefined && variable[field] !== undefined)
        return true
    
    return false    
}

function getConsumption(data)
{
    if (isDefined(data, "connected") && data.connected === false)
    {
        return "No Data";
    }
    else if (isDefined(data, "enabled") && data.enabled === false)
    {
        return 0;
    }
    else if(isDefined(data, "consumption"))
    {
        return data.consumption.at(-1).value
    }

}

function switchDevice(event, device)
{
    let isChecked = event.target.checked
    let state = "OFF"

    if(isChecked === true)
        state = "ON"

    let message = {"power": state}

    device.socket.send(JSON.stringify(message))    
}

function Device({device, liveData})
{
  return (
    <div>


        <Col key={device.id}>

            <Card key={device.id}
            bg={'light'}
            text={'dark'}>

                <Card.Header
                as="button"
                onClick={device.handlePanel}
                aria-controls={"card-header-button"}
                aria-expanded={true}>
                    {device.alias}
                </Card.Header>

                <Card.Body>

                    <Card.Text>
                        Consumption: <Badge bg="secondary">{getConsumption(liveData)}</Badge>
                        <br/>
                        OFF <Switch
                        disabled = {isDefined(liveData, "connected") ? !liveData.connected : false}
                        checked={isDefined(liveData, "enabled") ? liveData.enabled : false}
                        onChange={(event) => {switchDevice(event, device)}}
                        /> ON <br/>
                    </Card.Text>

                </Card.Body>

            </Card>

        </Col>
    </div>
  )
}

export default Device