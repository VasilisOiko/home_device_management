import React, {useState, useEffect} from "react";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';


/* my components */
import {getNestSpaces, getDevices, setDeviceSocket} from '../services/APICalls'
import LoadingAnimation from '../components/LoadingAnimation'
import SpaceSelection from './components/SpaceSelection.js'
import ListDevice from './components/ListDevice'

  
function Home()
{
  
  
  const [spaces, setSpaces] = useState([]);  // set state for spaces
  const [selectedSpace, setSelectedSpace] = useState({id: 0, name: ""});
  
  const [devices, setDevices] = useState([]);

  const [socketData, setSocketData] = useState([]);


  /* ___________________Fetch spaces___________________ */
  useEffect(() => {
  getNestSpaces()
  .then( (result) =>
    {
      setSpaces(result.data)
    })
  }, [])
   

  /* ___________________set default space / get sockets___________________ */
  useEffect( () => 
  {
    if(spaces.length !== 0)
    {
      
      setSelectedSpace(spaces[0])

      spaces.forEach(space => {
        space.device.forEach(device => {


          device.socket = setDeviceSocket(device.id)


          device.socket.onmessage = (receive) => {

            let message = JSON.parse(receive.data)["message"];
            
            // console.log("[Home.js] message from device: " + devices[index].id + " ")
            // console.log("[Home.js] message from device: ", receive) 
            
            // socket state approach
            setSocketData((prevSocketData) => {
              const updatedArray = [...prevSocketData];

              if(prevSocketData[device.id] !== undefined)
              {
                if (message.consumption === undefined)
                {
                  message.consumption = prevSocketData[device.id].consumption
                }
                if (message.connected === undefined)
                {
                  message.connected = prevSocketData[device.id].connected
                }
                if (message.enabled === undefined)
                {
                  message.enabled = prevSocketData[device.id].enabled
                }
              }
              updatedArray[device.id] = message;

              return updatedArray; 
            })

          }
        });
      });
    }

    return () => {
      spaces.forEach((space) => {
        space.device.forEach(device => {
          device.socket.close();
        });
      });
    };
    

  }, [spaces])

  


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
          <ListDevice
          key={selectedSpace.id}
          devices={selectedSpace.device}
          socketData={socketData}/>
        </Col>
      </Row>
    </Stack>
  )
}
  
  
export default Home;