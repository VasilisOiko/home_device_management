import React, {Component} from "react";

import Stack from 'react-bootstrap/Stack';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

/* my data */
import scenesData from '../data/scenes.json'
import devicesData from '../data/devices.json'

class DeviceManager extends Component {

  constructor()
  {
      super()

      this.state = {
        sceneID: scenesData[0].id,
        sceneName: scenesData[0].name
      }
    this.sceneSelector = this.sceneSelector.bind(this)
  }

  sceneSelector(eventKey)
  {
    let id, name

    id = parseInt(eventKey)

    for(let scene of scenesData) 
    {
      if (scene.id === id)
      {
        name = scene.name
        break
      }
    }

    this.setState(
      {
        sceneID: id,
        sceneName: name
      }
    )
  }


/* List devices based the id */
  getDevices(id)
  {
      let cards
      devicesData.forEach(deviceGroup => {
          
          // console.log(deviceGroup.id, id)
          
          if (deviceGroup.id === id)
          {
              // console.log(deviceGroup)
              
              cards =
              (
                  deviceGroup.device.map((device, key) =>(
                    <Card key={key}>
                    <Card.Header>{device.name}</Card.Header>
                    <Card.Body>
                      <Card.Title>{device.type}</Card.Title>
                      <Button variant="outline-primary">Edit</Button>
                      <Button variant="danger">Remove</Button>
                    </Card.Body>
                    </Card>
                  ))
              )
          }
      });
  
      return cards
  }

  /* List the scnenes and the devices */
  DevicesList() {
    return (
      <Accordion flush>
        {
          scenesData.map((scene, key) => (
            <Accordion.Item key={key} eventKey = {scene.id}>
            <Accordion.Header>{scene.name}</Accordion.Header>
            <Accordion.Body>
              {this.getDevices(scene.id)}
              </Accordion.Body>
            </Accordion.Item>
          )
          )
        }
      </Accordion>
    );
  }








  render() {
    return (
      <Stack gap={3}>
        Device Manager
        {this.DevicesList()}
      </Stack>
    )
  }
}

export default DeviceManager