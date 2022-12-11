import React, {Component} from "react";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import {CustomMenu} from './Home/SpacesDropdown'
import Badge from 'react-bootstrap/Badge';

/* my components */
import Devices from './Home/Devices'

/* my data */
import devices from '../data/devices.json'


class Home extends Component{

  constructor()
  {
    super()

    this.state = {
      sceneId: devices[0].id,
      sceneName: devices[0].scene
    }
    
    this.sceneSelector = this.sceneSelector.bind(this)
  }

  /* Create the dropdown menu */
  SceneList() {

    const getScenes =       /* list all the names */
    (
      devices.map((scenes, key) =>(
        <Dropdown.Item
        key={key}
        eventKey={scenes.id}
        active = {scenes.id === this.state.sceneId? true : false}   /* make the scene active */
        >
          {scenes.scene}
        </Dropdown.Item>
        )
      )
    )

   return (
      <Dropdown onSelect={this.sceneSelector}>
        <Dropdown.Toggle id="dropdown-custom-components">
          Scenes
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {getScenes}
        </Dropdown.Menu>
      </Dropdown>
    )
}

  
  sceneSelector(eventKey)
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

    this.setState(
      {
        sceneId: id,
        sceneName: name
      }
    )
  }
  
  
  render() {
      // console.log(this.state)
      return ( 
        <Stack gap={3}>
          {this.SceneList()}
          <h2>
            <Badge bg="light" text="dark">
              {this.state.sceneName}
            </Badge>
          </h2>
          <Row>
            <Col>
              <Devices id={this.state.sceneId}/>
            </Col>
          </Row>
        </Stack>
      )
    }
  }
  
  
  export default Home;