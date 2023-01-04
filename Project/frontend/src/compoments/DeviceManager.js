import React, {useState} from "react";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


/* My components */
import DeviceForm from './DeviceManager/DeviceForm'
import DeviceRemoveWarning from './DeviceManager/DeviceRemoveWarning'

/* my data */
import devicesData from '../data/devices.json'



function ShowForm(selectedSceneId = 0, selectedDeviceId = 0, selectedDeviceName = "", selectedDeviceType = "Light", setDeviceInfo, setShowForm)
{
  
  setDeviceInfo(
   {
    deviceId: selectedDeviceId,
    deviceName: selectedDeviceName,
    deviceType: selectedDeviceType,
    sceneId: selectedSceneId
  })
  setShowForm(true)  

}

function ShowRemoveWarning(selectedSceneId = 0, selectedDeviceId = 0, selectedDeviceName = "", setDeviceInfo, setShowRemovalWarning)
{
  setDeviceInfo( prevState => (
    {
      ...prevState,
      deviceId: selectedDeviceId,
      deviceName: selectedDeviceName,
      sceneId: selectedSceneId
    }
  ))
  setShowRemovalWarning(true)
}

  /* List devices based the id */
function SceneDevices(sceneId, setDeviceInfo, setShowForm, setShowRemovalWarning)
{


  let cards


  devicesData.forEach(deviceGroup => {
    
    if (deviceGroup.id === sceneId)
    {
      
      cards =
      (
        deviceGroup.device.map((device, key) =>
        (
          <Card key={key}>
          <Card.Header as={"h4"}>{device.name}</Card.Header>
          <Card.Body>
            <Card.Title>{device.type}</Card.Title>

            <Button
            variant="outline-primary"
            className="col-sm-2 me-5"
            onClick={() => ShowForm(sceneId, device.id, device.name, device.type, setDeviceInfo, setShowForm)}>
              Edit
            </Button>

            <Button
            variant="danger"
            className="col-sm-2"
            onClick={() => ShowRemoveWarning(sceneId, device.id, device.name, setDeviceInfo, setShowRemovalWarning)}>
              Remove
            </Button>

          </Card.Body>
          </Card>
        ))
      )
              
    }
  });

  return cards
}

  /* List the scnenes and the devices */
function DevicesList(setDeviceInfo, setShowForm, setShowRemovalWarning)
{
  return (
    <Accordion flush>
      {
        devicesData.map((devices, key) => (
          <Accordion.Item key={key} eventKey = {devices.id}>
            <Accordion.Header>{devices.scene}</Accordion.Header>
            <Accordion.Body>{SceneDevices(devices.id, setDeviceInfo, setShowForm, setShowRemovalWarning)}</Accordion.Body>
          </Accordion.Item>
        )
        )
      }
    </Accordion>
  );
}
  
  
function AddDeviceButton()
{
  return (
      <Button
        className="col-md-2 mx-auto"
        as="input"
        type="button"
        value="add device"
        onClick={() => this.ShowForm()}/>
  );
}
  
  /* TODO: ADD THE REMOVE WARNING COMPONENT AN PASS THE CORRECT VALUES */
function DeviceManager()
{
  const [deviceInfo, setDeviceInfo] = useState(
    {
      deviceId: 0,
      deviceName: "",
      deviceType: "",
      sceneId: 0
    }
  )
  const [showRemovalWarning, setShowRemovalWarning] = useState(false)
  const [showForm, setShowForm] = useState(false)

  return (
    <Stack gap={4} className="col-md-8 mx-auto">
      Device Manager
      {/* {console.log("manager sent", this.state.deviceInfo)} */}
        <DeviceForm
        showForm = {showForm}
        device = {deviceInfo}
        onClose = {()=> setShowForm(false)}/>

        <DeviceRemoveWarning
        showWarning = {showRemovalWarning}
        device = {deviceInfo}
        onClose = {() => setShowRemovalWarning(false)}/>

        {AddDeviceButton()}
        {DevicesList(setDeviceInfo, setShowForm, setShowRemovalWarning)}
        
        
    </Stack>
  )
}

export default DeviceManager