import React, {useState, useEffect} from "react";
import axios from "axios"
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';


/* my components */
import {fetchData, getSpaces, getDevices, getDeviceSocket, devicesURL, baseURL, spacesURL, wsURL} from '../services/APICalls'
import LoadingAnimation from '../components/LoadingAnimation'
import SpaceSelection from './components/SpaceSelection.js'
import Devices from './components/DeviceList'





// function sceneSelector(spaces, eventKey, setSelectedSpace)
// {
//   let id, name

//   id = parseInt(eventKey)

//   for(let space of spaces) 
//   {
//     if (space.id === id)
//     {
//       name = space.name
//       break
//     }
//   }

//   setSelectedSpace({id: id, name: name})
// }


  /* Create the dropdown menu */
// function SpaceList(spaces, selectedSpace, setSelectedSpace)
// {

//   const select = (eventKey) => sceneSelector(spaces, eventKey, setSelectedSpace)

//   const getScenes =       /* list all the names */
//   (
//     spaces.map((space, key) =>(
//       <Dropdown.Item
//       key={key}
//       eventKey={space.id}
//       active = {space.id === selectedSpace.id? true : false}   /* make the scene active */
//       >
//         {space.name}
//       </Dropdown.Item>
//       )
//     )
//   )

//   return (
//     <Dropdown onSelect={select} autoClose={"outside"}>
//       <Dropdown.Toggle id="dropdown-custom-components">
//         Scenes
//       </Dropdown.Toggle>
//       <Dropdown.Menu as={CustomMenu}>
//         {getScenes}
//       </Dropdown.Menu>
//     </Dropdown>
//   )
// }

  

  
  
function Home()
{


  const [selectedSpace, setSelectedSpace] = useState({id: 0, name: ""})
 
  // const [deviceId, setDeviceId] = useState(1)
  // const [deviceName, setDeviceName] = useState("")
  // const [panel, setPanel] = useState(false)


  const [spaces, setSpaces] = useState()  // set state for spaces
  const [devices, setDevices] = useState()


  const [socketData, setSocketData] = useState([])
  let channelsArray

  /* ___________________Fetch spaces___________________ */
  useEffect(() => {
  getSpaces()
  .then( (result) =>
    {
      setSpaces(result.data)
    })
  }, [])
   

  /* ___________________set default space___________________ */
  useEffect( () => 
  {
    if(spaces !== undefined)
    {
      setSelectedSpace({id: spaces[0].id, name: spaces[0].name})

      getDevices()
      .then( (result) => 
      {
        let devices = result.data;

        channelsArray = new Array(devices.length)

        for (let index=0; index < devices.length; index++)
        {
          channelsArray[devices[index].id] = getDeviceSocket(devices[index].id)

          channelsArray[devices[index].id].onmessage = (receive) => {
      
            let message = JSON.parse(receive.data)["message"];
            
            console.log("[Home.js] message from device: " + devices[index].id +" ", message) 
            
            setSocketData((prevSocketData) => {
              const updatedArray = [...prevSocketData];

              updatedArray[devices[index].id] = message;

              return updatedArray; 
            })
          
          }


        }
      })
    }

    return () => {
      socketData.forEach((socket) => {
        socket.cloase();
      });
    };
    

  }, [spaces])

  
  /* ___________________Fetch devices___________________ */
  useEffect(() => {
  if(selectedSpace.id !== 0)
  {
    getDevices("?space=" + selectedSpace.id)
    .then( (result) => 
    {
      setDevices(result.data)
    })

  }

  }, [selectedSpace])


  /* ___________________socket devices___________________ */
  // let channelsArray
  // const [deviceSockets, setDeviceSockets] = useState()

  // useEffect(() =>
  // {
  //   if(devices !== undefined)
  //   {
  //     channelsArray = new Array(devices.length)

  //     for (let index=0; index < devices.length; index++)
  //     {
  //       channelsArray[devices[index].id] = getDeviceSocket(devices[index].id)

  //       channelsArray[devices[index].id].onmessage = (receive) => {
    
  //         let message = JSON.parse(receive.data)["message"]["consumption"];
          
  //         console.log("message from device: " + devices[index].id +" ", message)

  //         let updatedArray;

  //         if(deviceSockets !== undefined)
  //         {
  //           updatedArray = [...deviceSockets]
  //         }
  //         else
  //         {
  //           updatedArray = new Array;
  //         }
          
  //         updatedArray[devices[index].id] = message;
  //         setDeviceSockets(updatedArray)
      
  //       }        
  //     }

  //     setDeviceSockets(channelsArray)
  //   }

  //   if(deviceSockets !== undefined)
  //   {
  //     return () => {
  //       deviceSockets.forEach((socket) => {
  //         socket.close();
  //       });
  //     };
  //   }
  // }, [devices])


  // console.log("channels state", deviceChannels)
  
  
  // const controlPanel = (id, name) =>
  // {
  //   if(panel === false)
  //   {
  //     setPanel(true)
  //   }
  //   else if(deviceId === id)
  //   {
  //     setPanel(false)
  //   }
 
  //   setDeviceId(id)
  //   setDeviceName(name)
  //  }


  if(spaces === undefined )
  {
    console.log("loading...")

    return (
      <div>
        <LoadingAnimation/>
      </div>
    )
  }

  return (
    <Stack gap={3}>
      {/* {SpaceList(spaces, selectedSpace, setSelectedSpace)} */}
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
          devices={devices}
          deviceSocket={channelsArray}
          socketData={socketData}
          // panelStatus={panel}
          // controlPanel={controlPanel}
          />
        </Col>
      </Row>
    </Stack>
  )

  
}
  
  
export default Home;