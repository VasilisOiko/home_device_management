import '../../App.css';

import React, {useState, useEffect} from 'react'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container'
import Switch from '@mui/material/Switch'

import {fetchData, postData, baseURL, wsURL} from '../../services/APICalls'

import LoadingAnimation from '../../components/LoadingAnimation'

function isDefined(variable, field)
{
    if(variable !== undefined && variable[field] !== undefined)
        return true
    
    return false    
}
function switchDevice(event, device, key, onSpace, switches, setSwitches)
{
    let isChecked = event.target.checked
    let state = "OFF"

    if(isChecked === true)
        state = "ON"

    let message = {"power": state}

    // http post
    // const response = postData("/api/devices/" + device.id + "/", message,
    // (key, isChecked, switches, setSwitches) => {             // if post successed
    //     const array = switches
    //     array[key] = isChecked
    //     setSwitches(array)
    // },
    // () => {// if post failed
    //     }
    // )

    device.socket.send(JSON.stringify(message))

    console.log("response: ", switches, "checked: ", isChecked, "key: ", key)
    
}

function createCards(devices, onSpace, switches, setSwitches, panelStatus, controlPanel, socketData)
{
    let cards

    console.log("[DeviceList.js] current devices: ", devices)
    // console.log("[DeviceList]: ", socketData)

    cards =
    (
        devices.map((device, key) =>(
            <Col key={key}>
                <Card key={key}
                bg={'light'}
                text={'dark'}>
                    <Card.Header
                    as="button"
                    onClick={() => controlPanel(device.id, device.alias)}
                    aria-controls={device.id}
                    aria-expanded={panelStatus}>
                        {device.alias}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Consumption <Badge bg="secondary">{isDefined(socketData[device.id], "consumption") ? socketData[device.id].consumption : "No Data"}</Badge>
                            <br/>
                            off <Switch
                            disabled = {isDefined(socketData[device.id], "connected") ? !socketData[device.id].connected : false}
                            checked={isDefined(socketData[device.id], "enabled") ? socketData[device.id].enabled : false}
                            onChange={(event) => {switchDevice(event, device, key, onSpace, switches, setSwitches)}}
                            /> on <br/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))
    )

    return cards
}

function DeviceList(props)
{
    /* ___________________Fetch devices___________________ */
    const [switches, setSwitches] = useState()
    const [deviceChannel, setDeviceChannel] = useState()


    if(props.devices === undefined || props.socketData === undefined)
    {
        return(<LoadingAnimation className='center'/>)
    }

    
    const deviceCards = createCards(props.devices, props.onSpace, switches, setSwitches, props.panelStatus, props.controlPanel, props.socketData)

    return (
        <Row xs={1} md={2} className="g-4">
            {deviceCards}
        </Row>
    )
}

export default DeviceList;