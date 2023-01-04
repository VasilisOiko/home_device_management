import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Switch from '@mui/material/Switch'


import devicesData from '../../data/devices.json'

function getDevices(id, panelStatus, controlPanel)
{
    let cards
    devicesData.forEach(deviceGroup => {
        
        // console.log(deviceGroup.id, id)
        
        if (deviceGroup.id === id)
        {
            // console.log(deviceGroup)
            
            cards =
            (
                deviceGroup.device.map((device, key) =>(
                    <Col key={key}>
                        <Card 
                            bg={'light'}
                            text={'dark'}
                        >
                            <Card.Header
							as="button"
							onClick={() => controlPanel(device.id, device.name)}
							aria-controls={device.id}
        					aria-expanded={panelStatus}>
								{device.name}
							</Card.Header>
                            <Card.Body>
                                <Card.Title>{device.type}</Card.Title>
                                <Card.Text>
                                    off <Switch/> on <br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            )
        }
    });

    return cards
}

function Devices(props)
{
    const devices = getDevices(props.id, props.panelStatus, props.controlPanel)

    return (
        <Row xs={1} md={2} className="g-4">
            {devices}
        </Row>
        )
}



export default Devices;