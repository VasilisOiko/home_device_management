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
import Device from './Device';


function deviceCards(devices, socketData)
{
    let cards

    console.log("[DeviceList.js] current devices: ", devices)
    // console.log("[DeviceList]: ", socketData)

    cards = devices.map((device, key) => 
        <Device key={key} device={device} socketData={socketData}/>)

    return cards
}

function ListDevice(props)
{


    return (
        
        (props.devices === undefined || props.socketData === undefined) ?

            <LoadingAnimation className='center'/> :
            
            <Row xs={1} md={2} className="g-4">
                {deviceCards(props.devices, props.socketData)}
            </Row>
    )
}

export default ListDevice;