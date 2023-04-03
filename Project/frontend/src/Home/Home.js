import React, {useState, useEffect} from "react";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';


/* my components */
import {fetchData, baseURL, wsURL} from '../services/APICalls'
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



   /* ___________________Fetch spaces___________________ */
   const [spaces, setSpaces] = useState()  // set state for spaces
   /* fetch data for spaces */
   useEffect(() => {
       fetchData(baseURL + '/api/spaces/',                             // url for get method
       setSpaces,                                                      // set spaces with data
       (data) => setSelectedSpace({id: data[0].id, name:data[0].name}))  // initialized funciton
     }, []);
   
   
   
   /* ___________________Fetch devices___________________ */
   const [devices, setDevices] = useState()
   useEffect(() => {
    fetchData( baseURL + '/api/devices/?space=' + selectedSpace.id, setDevices, ()=>{})
   }, [selectedSpace])


   
   
   
  const [deviceChannels, setDeviceChannels] = useState()

  useEffect(() => {
      if(devices !== undefined)
      {
        let channelsArray = new Array(devices.length)

        for (let index=0; index < devices.length; index++)
        {
          channelsArray[index] = new WebSocket(wsURL + devices[index].id + "/")

          channelsArray[index].onOpen = () => console.log("connected")
          channelsArray[index].onClose = () => console.log("disconnected")
          channelsArray[index].onmessage = (message) => console.log(message)
        }
        setDeviceChannels(channelsArray)
      }
  }, [devices])



  
  
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
          key={devices}
          devices={devices}
          deviceChannels={deviceChannels}
          // panelStatus={panel}
          // controlPanel={controlPanel}
          />
        </Col>
      </Row>
    </Stack>
  )

  
}
  
  
export default Home;