import React, {Component} from "react";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


/* My components */
import DeviceForm from './DeviceManager/DeviceForm'
import DeviceRemoveWarning from './DeviceManager/DeviceRemoveWarning'

/* my data */
import devicesData from '../data/devices.json'

class DeviceManager extends Component {

  constructor()
  {
    super()
    
    this.state = {

      deviceInfo:{
        sceneId: 0,
        deviceId: 0,
        deviceName: String,
        deviceType: String
      },
      
      showForm: false,
      showRemovalWarning: false
    }
    
    // this.sceneSelector = this.sceneSelector.bind(this)
    
    this.ShowForm = this.ShowForm.bind(this)
    this.HideForm = this.HideForm.bind(this)

    this.ShowRemoveWarning = this.ShowRemoveWarning.bind(this)
    this.HideRemoveWarning = this.HideRemoveWarning.bind(this)
  }
  
  /* List devices based the id */
  SceneDevices(sceneId)
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
                onClick={() => this.ShowForm(sceneId, device.id, device.name, device.type)}>
                  Edit
                </Button>

                <Button
                variant="danger"
                className="col-sm-2"
                onClick={() => this.ShowRemoveWarning(sceneId, device.id, device.name)}>
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
  DevicesList()
  {
    return (
      <Accordion flush>
        {
          devicesData.map((devices, key) => (
            <Accordion.Item key={key} eventKey = {devices.id}>
              <Accordion.Header>{devices.scene}</Accordion.Header>
              <Accordion.Body>{this.SceneDevices(devices.id)}</Accordion.Body>
            </Accordion.Item>
          )
          )
        }
      </Accordion>
    );
  }
  
  
  AddDeviceButton()
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

  /* Remove warning triggers */
  ShowRemoveWarning(selectedSceneId = 0, selectedDeviceId = 0, selectedDeviceName = "")
  {
    this.setState(
      {
        showRemovalWarning: true,

        deviceInfo:
        {
          sceneId: selectedSceneId,
          deviceId: selectedDeviceId,
          deviceName: selectedDeviceName

        }
      }
    )
  }

  HideRemoveWarning()
  {
    this.setState(
      {
        showRemovalWarning: false,
      }
    )
  }

  /* Form triggers */
  
  ShowForm(selectedSceneId = 0, selectedDeviceId = 0, selectedDeviceName = "", selectedDeviceType = "Light")
  {
    this.setState(
      {
        showForm: true,

        deviceInfo:
        {
          sceneId: selectedSceneId,
          deviceId: selectedDeviceId,
          deviceName: selectedDeviceName,
          deviceType: selectedDeviceType
        }  
      }
      );
    }

  HideForm()
  {
    this.setState(
    {
      showForm: false
    });
  } 
  
  /* TODO: ADD THE REMOVE WARNING COMPONENT AN PASS THE CORRECT VALUES */
  render() {
    
    return (
      <Stack gap={4} className="col-md-8 mx-auto">
        Device Manager
        {console.log("manager sent", this.state.deviceInfo)}
          <DeviceForm
          showForm = {this.state.showForm}
          device = {this.state.deviceInfo}
          onClose = {this.HideForm}/>

          <DeviceRemoveWarning
          showWarning = {this.state.showRemovalWarning}
          device = {this.state.deviceInfo}
          onClose = {this.HideRemoveWarning}/>

          {this.AddDeviceButton()}
          {this.DevicesList()}
          
          
      </Stack>
    )
  }



   // sceneSelector(eventKey)
  // {
    //   let id, name
    
    //   id = parseInt(eventKey)
    
    //   for(let devices of devicesData) 
  //   {
  //     if (devices.id === id)
  //     {
    //       name = devices.scene
    //       break
    //     }
    //   }

    //   this.setState(
      //     {
  //       sceneID: id,
  //       sceneName: name
  //     }
  //   )
  // }
}

export default DeviceManager