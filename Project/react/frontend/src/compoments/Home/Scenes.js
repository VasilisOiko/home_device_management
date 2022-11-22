import React, { Component } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import {CustomMenu} from './SpacesDropdown'

// import DevicesData from './Devices/Devices';
import scenesData from '../../data/scenes.json'



class SceneList extends Component {


  constructor(props)
  {
    super(props);

    this.sceneList = scenesData.map((scene, key) =>(

      <Dropdown.Item
        key={key}
        eventKey={scene.id}
        active = {this.props.activeScene.sceneID === scene.id? true : false}
      >
        {scene.name}
      </Dropdown.Item>
      )
    )

    this.state = {
      id: this.props.activeScene.sceneID,
      name: this.props.activeScene.sceneName
    }


    this.updateActiveScene = this.updateActiveScene.bind(this)
    // console.log(this.props)
    // console.log(this.state)
    
  }
  
  updateActiveScene(eventKey)
  {
    this.props.sceneSelect(eventKey)

    this.setState(
      {
        id: this.props.activeScene.sceneID,
        name: this.props.activeScene.sceneName
      },
      () =>  this.sceneList = this.getScenes()
    )
  }
  
  
  currentActiveScene(currentScene)
  {
    
    console.log(currentScene, this.state)


    if (currentScene === this.state.id)
    {
      return 1
    }
  }
  

  getScenes()
  {
    return(
      scenesData.map((scene, key) =>(

        <Dropdown.Item
          key={key}
          eventKey={scene.id}
          active = {this.state.id === scene.id? true : false}
        >
          {scene.name}
        </Dropdown.Item>
        )
      )
    )
  }



  render()
  {
    return (
      <Dropdown onSelect={this.updateActiveScene}>
        <Dropdown.Toggle id="dropdown-custom-components">
          Scenes
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {this.sceneList}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default SceneList;