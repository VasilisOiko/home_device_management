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
                    Consumption <Badge bg="secondary">{isDefined(socketData[device.id], "consumption") ? socketData[device.id].consumption : "No Data"}</Badge>
                    <br/>
                    off <Switch
                    disabled = {isDefined(socketData[device.id], "connected") ? !socketData[device.id].connected : false}
                    checked={isDefined(socketData[device.id], "enabled") ? socketData[device.id].enabled : false}
                    onChange={(event) => {switchDevice(event, device)}}
                    /> on <br/>
                </Card.Text>

            </Card.Body>

        </Card>

    </Col>
  )
}

export default Device