import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

/* My components */
import DeviceNameInput from './DeviceForm/DeviceNameInput';
import DeviceTypeSelect from './DeviceForm/DeviceTypeSelect'
import DeviceSceneSelect from './DeviceForm/DeviceSceneSelect';
import SceneNameInput from './DeviceForm/SceneNameInput';


function InitState(setDevice, setSceneInput, props)
{
  if(props.device.sceneId === 0)
  {
    setSceneInput(false)
  }
  setDevice(
    {
      id: props.device.deviceId,
      name: props.device.deviceName,
      type: props.device.deviceType,
      sceneId: props.device.sceneId,
      sceneName: ""
    }
  )
}

function HandleSubmit(event, setValidated, device)
{
  const form = event.currentTarget;

  if (form.checkValidity() === false)
  {
    event.preventDefault();
    event.stopPropagation();
  }
  else
  {
    console.log("submit", device.sceneId)
    if(device.sceneId === 0)
    {
      alert("Add new scene:" + 
      "\nScene name: " + device.sceneName)
    }
    
    if(device.id === 0)
    {
      alert("Add new device(id: " + device.id + 
      ")\nName: " + device.name +
      "\nType: " + device.type +
      "\nScene id: " + device.sceneId)

      
    }
    else
    {
      alert("Edit device with ID:" + device.id +
      "\nName: " + device.name +
      "\nType: " + device.type +
      "\nScene id: " + device.sceneId)
    }
    
  }

  setValidated(true)
}


function DeviceFormBody(device, setDevice, sceneInput, setSceneInput)
{
  const [validated, setValidated] = useState(false)

  const Submit = (e) => {HandleSubmit(e, setValidated, device)}

  const UpdateDevice = (e) => {
    setDevice(prevState => (
    {
      ...prevState,
      [e.target.name]: e.target.value

    }))
    e.preventDefault()
  }

  const UpdateSceneId = (e) => {

    let selection = parseInt(e.target.value)
    let TextInput = true

    if(selection === 0)
    {
      TextInput = false
    }
    setSceneInput(TextInput)
    setDevice(prevState => (
    {
      ...prevState,
      [e.target.name]: selection

    }
    ))
    e.preventDefault()
  }

  return (
    <Form noValidate validated={validated} onSubmit={Submit}>
      <Row className="mb-3">
        
        <DeviceNameInput
        name = {device.name}
        UpdateName = {UpdateDevice}/>

        <DeviceTypeSelect
        type = {device.type}
        UpdateType ={UpdateDevice}/>

      </Row>

      <Row className="col-md-6 mb-3">
        
        <DeviceSceneSelect
        id = {device.sceneId}
        UpdateId = {UpdateSceneId}/>

        <SceneNameInput
        disableInput = {sceneInput}
        name = {device.sceneName}
        UpdateName = {UpdateDevice}/>

      </Row>

      <Button
      variant="primary"
      type="submit">
        Submit
      </Button>
    </Form>
  )
}

function DeviceForm(props)
{
  const [sceneInput, setSceneInput] = useState(true)

  const [device, setDevice] = useState(
  {
    id: 0,
    name: "",
    type: "",
    sceneId: 0,
    sceneName: ""
  })

  let title = "Add Device"

  if(props.device.sceneId !== 0)
  {
    title = "Edit \"" + props.device.deviceName + "\" Device"
  }
  return(
    <Offcanvas
    placement={'top'}
    className={"h-50"}
    keyboard={true}
    show={props.showForm}
    onHide={props.onClose}
    onEnter={() => InitState(setDevice, setSceneInput, props)}>

      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {DeviceFormBody(device, setDevice, sceneInput, setSceneInput)}
      </Offcanvas.Body>

    </Offcanvas>
  )
}

export default DeviceForm