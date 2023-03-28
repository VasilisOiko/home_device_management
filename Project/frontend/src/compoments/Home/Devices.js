import '../../App.css';

import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Switch from '@mui/material/Switch'

import {fetchData, postData, baseURL} from '../APICalls'

import LoadingAnimation from '../GeneralComponents/LoadingAnimation'


function switchDevice(event, device, key, setDevices, onSpace, switches, setSwitches, )
{
    let isChecked = event.target.checked
    let state = "OFF"

    if(isChecked === true)
        state = "ON"

    let message = {"switch": state}


    const response = postData("/api/devices/" + device.id + "/", message,
    (key, isChecked, switches, setSwitches) => {             // if post successed
        const array = switches
        array[key] = isChecked
        setSwitches(array)
    },
    () => {               // if post failed

        }
    )
    fetchData( baseURL + "/api/devices/?space=" + onSpace, setDevices, () => {})
    
    

    console.log("response: ", switches, "checked: ", isChecked, "key: ", key)
    
}

function getDevices(devices, setDevices, onSpace, switches, setSwitches, panelStatus, controlPanel)
{
    let cards

    cards =
    (
        devices.map((device, key) =>(
            <Col key={key}>
                <Card 
                    bg={'light'}
                    text={'dark'}
                >
                    <Card.Header
                    as="button"
                    onClick={() => controlPanel(device.id, device.alias)}
                    aria-controls={device.id}
                    aria-expanded={panelStatus}>
                        {device.alias}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{device.type}</Card.Title>
                        <Card.Text>
                            off <Switch
                            checked={switches[key] || false}
                            onChange={(event) => {switchDevice(event, device, key, setDevices, onSpace, switches, setSwitches)}}
                            /> on <br/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))
    )

    return cards
}

function Devices(props)
{
    /* ___________________Fetch devices___________________ */
    const [devices, setDevices] = useState()
    const [switches, setSwitches] = useState()
    

    
    useEffect(() => {
        fetchData( baseURL + "/api/devices/?space=" + props.onSpace, setDevices,
        (data) => {

        })
    }, [props.onSpace])

    useEffect(() => {
        if(devices !== undefined)
        {
            console.log("checking if devices", devices)
            let switchArray
            switchArray = new Array(devices.length)
    
            console.log(" devices", devices)
    
            for (let index=0; index < devices.length; index++)
            {
                console.log("inner devices",  devices[index].enabled)
                switchArray[index] = devices[index].enabled
            }
    
            console.log("array:", switchArray)
    
            setSwitches(switchArray)
    
            console.log(" aaaa", switchArray)

        }
    }, [devices])
    

    if(devices === undefined || switches === undefined)
    {
        return(<LoadingAnimation className='center'/>)
    }
    
    const deviceCards = getDevices(devices, setDevices, props.onSpace, switches, setSwitches, props.panelStatus, props.controlPanel)

    return (
        
        <Row xs={1} md={2} className="g-4">
            {deviceCards}
        </Row>
        )
}

export default Devices;