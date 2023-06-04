import React, {useState, useEffect} from "react";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


/* My components */
import {fetchData, getSpaces, getDevices, setDeviceSocket, devicesURL, baseURL, spacesURL, wsURL} from '../services/APICalls'
import LoadingAnimation from "../components/LoadingAnimation";
import ListSpace from "./components/ListData/ListSpace";
import DeviceForm from './components/DeviceForm'
import DeviceRemoveWarning from './components/DeviceRemoveWarning'
import CreateSpaceButton from "./components/CreateSpace/CreateSpaceButton";



  
  /* TODO: ADD THE REMOVE WARNING COMPONENT AN PASS THE CORRECT VALUES */
function DeviceManager()
{
  const [spaces, setSpaces] = useState([]);
  

  useEffect(() => {
    getSpaces()
    .then((result) => {
      setSpaces(result.data)
    })
  }, [])
  


  return (
    <Stack gap={4} className="col-md-8 mx-auto">
      <h2>Device Manager</h2>

      <CreateSpaceButton/>
      {console.log("[DeviceManager]", spaces)}
      <ListSpace spaces={spaces}/>

    </Stack>
  )
}

export default DeviceManager