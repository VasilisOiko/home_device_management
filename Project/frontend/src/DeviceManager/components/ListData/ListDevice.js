import React, {useState, useEffect} from 'react'

import Alert from 'react-bootstrap/Alert';

import LoadingAnimation from '../../../components/LoadingAnimation'
import Device from './Device'
import { getDevices } from '../../../services/APICalls';



function ListDevice({spaceId})
{

  const [devices, setDevices] = useState([])

  useEffect(() => {
    getDevices("?space=" + spaceId)
    .then((result) => {
      setDevices(result.data)
    })
  
  }, [spaceId])
  

  return (
    devices === undefined ?

    <LoadingAnimation/> :

    devices.length === 0 ?

    <Alert key={"secondary"} variant={"secondary"}>Empty</Alert> :
    
    <div>
      {devices.map((device) => <Device key={device.id} device={device}/> )}
    </div>

    
  )
}

export default ListDevice