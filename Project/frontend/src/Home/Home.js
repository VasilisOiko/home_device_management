import React, {useState, useEffect} from "react";
import axios from "axios"
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';


/* my components */
import {fetchData, getSpaces, getDevices, setDeviceSocket, devicesURL, baseURL, spacesURL, wsURL} from '../services/APICalls'
import LoadingAnimation from '../components/LoadingAnimation'
import SpaceSelection from './components/SpaceSelection.js'
import Devices from './components/ListDevice'

  
function Home()
{
  
  
  const [spaces, setSpaces] = useState();  // set state for spaces
  const [selectedSpace, setSelectedSpace] = useState({id: 0, name: ""});
  
  const [devices, setDevices] = useState([]);
  const [deviceGroup, setDeviceGroup] = useState();

  const [socketData, setSocketData] = useState([]);


  /* ___________________Fetch spaces___________________ */
  useEffect(() => {
  getSpaces()
  .then( (result) =>
    {
      setSpaces(result.data)
    })
  }, [])
   

  /* ___________________set default space / get sockets___________________ */
  useEffect( () => 
  {
    if(spaces !== undefined)
    {
      
      setSelectedSpace({id: spaces[0].id, name: spaces[0].name})

      getDevices()
      .then( (result) => 
      {
        let devicesData = result.data;

        devicesData.forEach(device => {

          device.socket = setDeviceSocket(device.id)

          device.socket.onmessage = (receive) => {
      
            let message = JSON.parse(receive.data)["message"];
            
            // console.log("[Home.js] message from device: " + devices[index].id + " ")
            console.log("[Home.js] message from device: ", receive) 
            
            // socket state approach
            setSocketData((prevSocketData) => {
              const updatedArray = [...prevSocketData];

              updatedArray[device.id] = message;

              return updatedArray; 
            })

          }
        });

        setDevices(devicesData)
        console.log("[Home.js] all devicesData: ", devicesData)

      })
    }

    return () => {
      devices.forEach((device) => {
        device.socket.close();
      });
    };
    

  }, [spaces])

  
  /* ___________________Fetch devices___________________ */
  useEffect(() => {
    if(selectedSpace.id !== 0 && devices !== undefined)
    {
      // second approach
      let group =[];

      devices.forEach(device => {
        if (device.space === selectedSpace.id) {
          group[device.id] = device;
        }
      });

      setDeviceGroup(group);

      console.log("[Home.js] group devices: ", devices)
    

    }

  }, [selectedSpace, devices])



  // if(spaces === undefined )
  // {
  //   console.log("loading...")

  //   return (
  //     <div>
  //       <LoadingAnimation/>
  //     </div>
  //   )
  // }

  return (

    spaces === undefined ?

    <LoadingAnimation/>:

    <Stack gap={3}>
      <SpaceSelection
        key={selectedSpace.id}
        spaces={spaces}
        selectedSpace={selectedSpace}
        setSelectedSpace={setSelectedSpace}/>
      <h2>
        <Badge bg="light" text="dark">
          {selectedSpace.name}
        </Badge>
      </h2>
      <Row>
        <Col>
          <Devices
          key={selectedSpace.id}
          devices={deviceGroup}
          socketData={socketData}
          />
        </Col>
      </Row>
    </Stack>
  )
}
  
  
export default Home;