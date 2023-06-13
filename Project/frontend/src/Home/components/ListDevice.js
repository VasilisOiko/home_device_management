import React from 'react'
import Row from 'react-bootstrap/Row';


import LoadingAnimation from '../../components/LoadingAnimation'
import Device from './Device';


function ListDevice({devices, socketData})
{


    return (
        
        (devices === undefined || socketData === undefined) ?

            <LoadingAnimation className='center'/> :
            
            <Row xs={1} md={2} className="g-4">

                {devices.map((device, key) => 
                <Device key={key} device={device} socketData={socketData}/>)}

            </Row>
    )
}

export default ListDevice;