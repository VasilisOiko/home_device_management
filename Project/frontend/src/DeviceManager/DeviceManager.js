import React, {useState, useEffect} from "react";
import Stack from 'react-bootstrap/Stack';


/* My components */
import {getNestSpaces} from '../services/APICalls'
import ListSpace from "./components/ListData/ListSpace";
import CreateSpaceButton from "./components/CreateSpace/CreateSpaceButton";
import AddDeviceButton from "./components/AddDevice/AddDeviceButton";



  
  /* TODO: ADD THE REMOVE WARNING COMPONENT AN PASS THE CORRECT VALUES */
function DeviceManager()
{
  const [spaces, setSpaces] = useState([]);
  

  useEffect(() => {
    getNestSpaces()
    .then( (result) =>
      {
        setSpaces(result.data)
      })
    }, [])
  


  return (
    <Stack gap={4} className="col-md-8 mx-auto">
      <h2>Device Manager</h2>

      <Stack direction="horizontal" className="center" gap={5}>

        <CreateSpaceButton/>

        <AddDeviceButton/>
      
      </Stack>


      <ListSpace spaces={spaces}/>

    </Stack>
  )
}

export default DeviceManager