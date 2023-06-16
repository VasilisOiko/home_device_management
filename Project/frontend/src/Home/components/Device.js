import React from 'react'

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Switch from '@mui/material/Switch'



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
        return data.consumption
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

function Device({device, socketData}) {
  return (
    <Col key={device.id}>

        <Card key={device.id}
        bg={'light'}
        text={'dark'}>

            <Card.Header
            // as="button"
            // onClick={() => controlPanel(device.id, device.alias)}
            // aria-controls={device.id}
            // aria-expanded={panelStatus}
            >
                {device.alias}
            </Card.Header>

            <Card.Body>

                <Card.Text>
                    Consumption: <Badge bg="secondary">{getConsumption(socketData[device.id])}</Badge>
                    <br/>
                    OFF <Switch
                    disabled = {isDefined(socketData[device.id], "connected") ? !socketData[device.id].connected : false}
                    checked={isDefined(socketData[device.id], "enabled") ? socketData[device.id].enabled : false}
                    onChange={(event) => {switchDevice(event, device)}}
                    /> ON <br/>
                </Card.Text>

            </Card.Body>

        </Card>

    </Col>
  )
}

export default Device