import React, {Component} from "react";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* my components */
import Scenes from './Home/Scenes'
import Devices from './Home/Devices'

/* my data */
import scenesData from '../data/scenes.json'


class Home extends Component{

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
  
  
  render() {
      // console.log(this.state)
      return ( 
        <Stack gap={3}>
          <Scenes scene={this.state} sceneSelect={this.sceneSelector}/>
          <Row>
            <Col>
              <Devices id={this.state.sceneID}/>
            </Col>
          </Row>
        </Stack>
      )
    }
  }
  
  
  export default Home;