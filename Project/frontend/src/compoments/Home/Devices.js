import '../../App.css';

import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Switch from '@mui/material/Switch'

import {fetchData, postData, baseURL, wsURL} from '../APICalls'

import LoadingAnimation from '../GeneralComponents/LoadingAnimation'

function deviceMessages(event)
{
    console.log("streaming: ", event)
}

function switchDevice(event, device, key, onSpace, switches, setSwitches, )
{
    let isChecked = event.target.checked
    let state = "OFF"

    if(isChecked === true)
        state = "ON"

    let message = {"power": state}


    const response = postData("/api/devices/" + device.id + "/", message,
    (key, isChecked, switches, setSwitches) => {             // if post successed
        const array = switches
        array[key] = isChecked
        setSwitches(array)
    },
    () => {               // if post failed

        }
    )

    console.log("response: ", switches, "checked: ", isChecked, "key: ", key)
    
}

function getDevices(devices, onSpace, switches, setSwitches, panelStatus, controlPanel)
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

function Devices(props)
{
    /* ___________________Fetch devices___________________ */
    const [deviceChannel, setDeviceChannel] = useState()
    const [switches, setSwitches] = useState()



    useEffect(() => {
        if(props.devices !== undefined)
        {
            let switchArray = new Array(props.devices.length)
            let channelsArray = new Array(props.devices.length)

    
            for (let index=0; index < props.devices.length; index++)
            {
                switchArray[index] = props.devices[index].enabled
                channelsArray[index] = new WebSocket(wsURL + props.devices[index].id + "/")


                
                channelsArray[index].onOpen = () => console.log("connected")
                channelsArray[index].onClose = () => console.log("disconnected")
                channelsArray[index].onmessage = deviceMessages
            }
            setSwitches(switchArray)
            setDeviceChannel(channelsArray)
        }
    }, [props.devices])
    
    










    if(props.devices === undefined || switches === undefined)
    {
        return(<LoadingAnimation className='center'/>)
    }
    
    const deviceCards = getDevices(props.devices, props.onSpace, switches, setSwitches, props.panelStatus, props.controlPanel)

    return (
        
        <Row xs={1} md={2} className="g-4">
            {deviceCards}
        </Row>
        )
}

export default Devices;