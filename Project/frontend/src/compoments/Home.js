import React, {useState} from "react";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';

/* my components */
import {CustomMenu} from './Home/SpacesDropdown'
import Devices from './Home/Devices'
import DevicePanel from "./Home/DevicePanel";

/* my data */
import devices from '../data/devices.json'

  /* Create the dropdown menu */
function SceneList(sceneId, setSceneId, setSceneName)
{

  const select = (eventKey) => sceneSelector(eventKey, setSceneId, setSceneName)

  const getScenes =       /* list all the names */
  (
    devices.map((scenes, key) =>(
      <Dropdown.Item
      key={key}
      eventKey={scenes.id}
      active = {scenes.id === sceneId? true : false}   /* make the scene active */
      >
        {scenes.scene}
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

  
function sceneSelector(eventKey, setSceneId, setSceneName)
{
  let id, name

  id = parseInt(eventKey)

  for(let scenes of devices) 
  {
    if (scenes.id === id)
    {
      name = scenes.scene
      break
    }
  }

  setSceneId(id)
  setSceneName(name)
}
   

  
function Home()
{
  const [sceneId, setSceneId] = useState(devices[0].id)
  const [sceneName, setSceneName] = useState(devices[0].scene)
  const [deviceId, setDeviceId] = useState(0)
  const [deviceName, setDeviceName] = useState("")
  const [panel, setPanel] = useState(false)

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

  return ( 
    <Stack gap={3}>
      {SceneList(sceneId, setSceneId, setSceneName)}
      <h2>
        <Badge bg="light" text="dark">
          {sceneName}
        </Badge>
      </h2>
      <DevicePanel show={panel}
      id={deviceId}
      name={deviceName}/>
      <Row>
        <Col>
          <Devices
          id={sceneId}
          panelStatus={panel}
          controlPanel={controlPanel}/>
        </Col>
      </Row>
    </Stack>
  )
}
  
  
  export default Home;