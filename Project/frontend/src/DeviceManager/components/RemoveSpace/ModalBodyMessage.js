import React, {useState, useEffect} from 'react'

import { ListGroup, Badge,  Alert} from 'react-bootstrap';
import {BsDot} from 'react-icons/bs'

import { getDevices } from '../../../services/APICalls'



function ModalBodyMessage({space})
{
    const [devices, setDevices] = useState([])

    useEffect(() => {
        getDevices("?space=" + space.id)
        .then((result)=> {setDevices(result.data);console.log("[ModalBodyMessage]" ,space.id ,result.data);})
    }, [])
    

    return (
        <div>
            Space <Badge bg="primary">{space.name}</Badge> will be removed.
            
            {devices.length !== 0 &&
                <Alert variant='warning'>
                    <ListGroup>

                        Following devices will be removed by this action.
                        {devices.map((device) =>
                        <ListGroup.Item key={device.id}><BsDot/>{device.alias}</ListGroup.Item>)}

                    </ListGroup>
                </Alert>
            }                          
        </div>
    )
}

export default ModalBodyMessage