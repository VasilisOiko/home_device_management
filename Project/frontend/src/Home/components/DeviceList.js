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


function switchDevice(event, device, key, onSpace, switches, setSwitches)
{
    let isChecked = event.target.checked
    let state = "OFF"

    if(isChecked === true)
        state = "ON"

    let message = {"power": state}


    // const response = postData("/api/devices/" + device.id + "/", message,
    // (key, isChecked, switches, setSwitches) => {             // if post successed
    //     const array = switches
    //     array[key] = isChecked
    //     setSwitches(array)
    // },
    // () => {// if post failed
    //     }
    // )
[device.id].send("senting to: " + device.id)

    console.log("response: ", switches, "checked: ", isChecked, "key: ", key)
    
}

function createCards(devices, onSpace, switches, setSwitches, panelStatus, controlPanel, socketData)
{
    let cards

   const getDeviceValue = (id) => 
   {
        console.log("[DeviceList.js] device: ", id, " ", socketData[id])
        if (socketData === undefined || socketData[id] === undefined)
        {
            return "No Data"; 
        }
        else
        {
            return socketData[id].consumption;
        }
   }

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
                            Consumption <Badge bg="secondary">{socketData[device.id]!== undefined ? socketData[device.id].consumption : "No Data"}</Badge>
                            <br/>
                            off <Switch
                            checked={socketData[device.id]!== undefined ? socketData[device.id].enabled : false}
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