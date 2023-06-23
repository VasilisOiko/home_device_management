import React from 'react'

import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

import LoadingAnimation from '../../components/LoadingAnimation'
import Device from './Device';


function ListDevice({devices, socketData})
{


    return (
        
        (devices === undefined || socketData === undefined) ?

            <LoadingAnimation className='center'/> :

            devices.length === 0 ?

            <Alert key={"dark "} variant={"dark "} className='container-sm'>
                <Badge bg="secondary"><h4>Empty</h4></Badge>
            </Alert>
            
            :
            
            <Row xs={2} md={2} className="g-4">

                {devices.map((device, key) => 
                <Device key={key} device={device} socketData={socketData}/>)}

            </Row>
    )
}

export default ListDevice;