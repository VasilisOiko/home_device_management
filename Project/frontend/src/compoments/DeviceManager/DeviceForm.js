import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';


/* My components */
import DeviceNameInput from './DeviceForm/DeviceNameInput';
import DeviceTypeSelect from './DeviceForm/DeviceTypeSelect'
import DeviceSceneSelect from './DeviceForm/DeviceSceneSelect';
import SceneNameInput from './DeviceForm/SceneNameInput';

/* My Data */
import DeviceData from '../../data/devices.json'

class DeviceForm extends Component
{
  constructor(props)
  {
    super(props)
  
    this.state = {
      sceneInput: true,
      validated: false,

      deviceId: 0,
      deviceName: "",
      deviceType: "",
      sceneId: 0,
      sceneName: ""
    }

    this.InitState = this.InitState.bind(this)

    this.UpdateDeviceName = this.UpdateDeviceName.bind(this)
    this.UpdateDeviceType = this.UpdateDeviceType.bind(this)
    this.UpdateSceneId = this.UpdateSceneId.bind(this)
    this.UpdateSceneName = this.UpdateSceneName.bind(this)

    this.HandleSubmit = this.HandleSubmit.bind(this)
  }

  InitState()
  {
    let TextInput = true
    if(this.props.device.sceneId === 0)
    {
      TextInput = false
    }

    this.setState(
      {
        deviceId: this.props.device.deviceId,
        sceneInput: TextInput,
        
        deviceName: this.props.device.deviceName,
        deviceType: this.props.device.deviceType,
        sceneId: this.props.device.sceneId
      }
    )
  }

  SceneListSelection(){
    return(
      <>
        {DeviceData.map((scenes, key) =>
          <option key={key} value={scenes.id}>{scenes.scene}</option>
        )}
        <option value={0}>Add new scene</option>
      </>
    ) 
  }

  UpdateDeviceName(event)
  {
    this.setState(
      {
        deviceName: event.target.value
      }
    )
  }
  UpdateDeviceType(event)
  {
    this.setState(
      {      
        deviceType: event.target.value
      }
    )
  }
  UpdateSceneId(event)
  {
    let selection = parseInt(event.target.value)
    let TextInput = true

    if(selection === 0)
    {
      TextInput = false
    }

    this.setState(
      {
        sceneId: selection,
        sceneInput: TextInput
      }
    )
  }
  UpdateSceneName(event)
  {
    this.setState(
      {
        sceneName: event.target.value
      }
    )
  }

  HandleSubmit(event)
  {
    console.log("Handle submit", this.state.sceneId, this.state.sceneName)
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else
    {
      if(this.state.sceneId === 0)
      {
        alert("Add new scene:" + 
        "\nScene name: " + this.state.sceneName)
      }
      
      if(this.state.deviceId === 0)
      {
        alert("Add new device(id: " + this.state.deviceId + 
        ")\nName: " + this.state.deviceName +
        "\nType: " + this.state.deviceType +
        "\nScene id: " + this.state.sceneId)

        
      }
      else
      {
        alert("Edit device with ID:" + this.state.deviceId +
        "\nName: " + this.state.deviceName +
        "\nType: " + this.state.deviceType +
        "\nScene id: " + this.state.sceneId)
      }
      
    }

    this.setState(
      {
        validated: true,
      }
    )
  }

  DeviceFormBody()
  {
    // console.log("device form body", this.state)
    return (
      <Form noValidate validated={this.state.validated} onSubmit={this.HandleSubmit}>
        <Row className="mb-3">
          
          <DeviceNameInput
          name = {this.state.deviceName}
          UpdateName = {this.UpdateDeviceName}/>

          <DeviceTypeSelect
          type = {this.state.deviceType}
          UpdateType ={this.UpdateDeviceType}/>

        </Row>

        <Row className="col-md-6 mb-3">
          
          <DeviceSceneSelect
          id = {this.state.sceneId}
          UpdateId = {this.UpdateSceneId}/>

          <SceneNameInput
          disableInput = {this.state.sceneInput}
          name = {this.state.sceneName}
          UpdateName = {this.UpdateSceneName}/>

        </Row>

        <Button
        variant="primary"
        type="submit">
          Submit
        </Button>
      </Form>
    );
  }

  render()
  {
    let title = "Add Device"

    if(this.props.device.sceneId !== 0)
    {
      title = "Edit \"" + this.props.device.deviceName + "\" Device"
    }
    return(

      <Offcanvas
      placement={'top'}
      className={"h-50"}
      keyboard={true}
      show={this.props.showForm}
      onHide={this.props.onClose}
      onEnter={this.InitState}>

        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {this.DeviceFormBody()}
        </Offcanvas.Body>

      </Offcanvas>
    )
  }
}


export default DeviceForm