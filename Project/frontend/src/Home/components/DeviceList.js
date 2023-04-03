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

function deviceMessages(event)
{
    let data = JSON.parse(event.data)
    console.log("streaming: ", data)
    
    console.log("streaming: ", data["message"]["consumption"])
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

function createCards(devices, onSpace, switches, setSwitches, panelStatus, controlPanel, deviceChannels)
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
                        <Card.Text>
                        <h4>
                            Consumption <Badge bg="secondary">value</Badge>
                        </h4>
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

function DeviceList(props)
{
    /* ___________________Fetch devices___________________ */
    const [switches, setSwitches] = useState()
    const [deviceChannel, setDeviceChannel] = useState()



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
    
    const deviceCards = createCards(props.devices, props.onSpace, switches, setSwitches, props.panelStatus, props.controlPanel, props.deviceChannels)

    return (
        <Row xs={1} md={2} className="g-4">
            {deviceCards}
        </Row>
    )
}

export default DeviceList;