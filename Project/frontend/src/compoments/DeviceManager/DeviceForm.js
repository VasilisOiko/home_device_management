import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';


/* My Data */
import DeviceData from '../../data/devices.json'

class DeviceForm extends Component
{
  constructor(props)
  {
    super(props)
  
    this.state = {
        validated: false,
        deviceId: 0,
        deviceName: "",
        deviceType: "",
        sceneId: 0
    }

    this.UpdateState = this.UpdateState.bind(this)

    this.UpdateDeviceName = this.UpdateDeviceName.bind(this)
    this.UpdateDeviceType = this.UpdateDeviceType.bind(this)
    this.UpdateSceneId = this.UpdateSceneId.bind(this)

    this.HandleSubmit = this.HandleSubmit.bind(this)
  }

  UpdateState()
  {
    this.setState(
      {
        deviceId: this.props.device.deviceId,
        
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
    this.setState(
      {
        sceneId: event.target.value
      }
    )
  }

  HandleSubmit(event)
  {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else
    {
      if(this.state.deviceId === 0)
      {
        alert("Add new device(id: " + this.state.deviceId + 
        ")\nName: " + this.state.deviceName +
        "\nType: " + this.state.deviceType +
        "\nScene id: " + + this.state.sceneId)

      }
      else
      {
        alert("Edit device with ID:" + this.state.deviceId +
        "\nName: " + this.state.deviceName +
        "\nType: " + this.state.deviceType +
        "\nScene id: " + + this.state.sceneId)
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
    console.log("device form body", this.state)
    return (
      <Form noValidate validated={this.state.validated} onSubmit={this.HandleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDeviceName">
            <Form.Label>Device Name</Form.Label>
            <InputGroup hasValidation>

              <Form.Control
              required
              type="text"
              placeholder="Enter device name"
              value={this.state.deviceName}
              onChange={this.UpdateDeviceName}/>

              <Form.Control.Feedback type="invalid">
                Please provide a name
              </Form.Control.Feedback>

            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="formDeviceType">
            <Form.Label>Device type</Form.Label>
            <Form.Select
            value={this.state.deviceType}
            onChange={this.UpdateDeviceType}>

              <option value={"Light"}>Light</option>
              <option value={"TV"}>TV</option>
              <option value={"Plug"}>Plug</option>

            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="col-md-3 mb-4">
          <Form.Group as={Col} controlId="formSceneName">
            <Form.Label>Scene</Form.Label>

            <Form.Select
            value={this.state.sceneId}
            onChange={this.UpdateSceneId}>

              {this.SceneListSelection()}
            
            </Form.Select>

          </Form.Group>
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
      onEnter={this.UpdateState}>

        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {this.DeviceFormBody()}
        </Offcanvas.Body>

      </Offcanvas>
    );
  }
}




export default DeviceForm