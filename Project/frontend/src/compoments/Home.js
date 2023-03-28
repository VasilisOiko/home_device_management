import React, {useState, useEffect} from "react";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';


/* my components */
import {fetchData, baseURL} from './APICalls'
import LoadingAnimation from './GeneralComponents/LoadingAnimation'
import {CustomMenu} from './Home/SpacesDropdown'
import Devices from './Home/Devices'
import DevicePanel from "./Home/DevicePanel";

/* my data */
// import devices from '../data/devices.json'

// const baseURL = "http://192.168.1.4:8000"



function sceneSelector(spaces, eventKey, setSelectedSpace)
{
  let id, name

  id = parseInt(eventKey)

  for(let space of spaces) 
  {
    if (space.id === id)
    {
      name = space.name
      break
    }
  }

  setSelectedSpace({id: id, name: name})
}


  /* Create the dropdown menu */
function SpaceList(spaces, selectedSpace, setSelectedSpace)
{

  const select = (eventKey) => sceneSelector(spaces, eventKey, setSelectedSpace)



  const getScenes =       /* list all the names */
  (
    spaces.map((space, key) =>(
      <Dropdown.Item
      key={key}
      eventKey={space.id}
      active = {space.id === selectedSpace.id? true : false}   /* make the scene active */
      >
        {space.name}
      </Dropdown.Item>
      )
    )
  )

  return (
    <Dropdown onSelect={select} autoClose={"outside"}>
      <Dropdown.Toggle id="dropdown-custom-components">
        Scenes
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        {getScenes}
      </Dropdown.Menu>
    </Dropdown>
  )
}

  

  
  
function Home()
{
  const controlPanel = (id, name) =>
  {
    if(panel === false)
    {
      setPanel(true)
    }
    else if(deviceId === id)
    {
      setPanel(false)
    }
 
    setDeviceId(id)
    setDeviceName(name)
   }

  const [selectedSpace, setSelectedSpace] = useState({id: 0, name: ""})
  const [deviceId, setDeviceId] = useState(0)
  const [deviceName, setDeviceName] = useState("")
  const [panel, setPanel] = useState(false)



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
  useEffect(() => fetchData( baseURL + '/api/devices/', setDevices, ()=>{}), [])


/* ___________________Fetch measurments___________________ */
  const [measurments, setMeasurments] = useState()
  useEffect(() =>fetchData( baseURL + '/api/measurments/', setMeasurments, ()=>{}), [])


 
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
      {console.log("loading complete. Active space:", selectedSpace)}
      {SpaceList(spaces, selectedSpace, setSelectedSpace)}
      <h2>
        <Badge bg="light" text="dark">
          {selectedSpace.name}
        </Badge>
      </h2>
      <DevicePanel show={panel}
      id={deviceId}
      name={deviceName}/>
      <Row>
        <Col>
          <Devices
          key={selectedSpace.id}
          onSpace={selectedSpace.id}
          panelStatus={panel}
          controlPanel={controlPanel}/>
        </Col>
      </Row>
    </Stack>
  )

  
}
  
  
export default Home;