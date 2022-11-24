import React, { Component } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import {CustomMenu} from './SpacesDropdown'

// import DevicesData from './Devices/Devices';
import scenesData from '../../data/scenes.json'



function SceneList(props) {

    const getScenes =
    (
      scenesData.map((scene, key) =>(
        <Dropdown.Item
        key={key}
        eventKey={scene.id}
        active = {props.scene.sceneID === scene.id? true : false}
        >
          {scene.name}
        </Dropdown.Item>
        )
      )
    )

   return (
      <Dropdown onSelect={props.sceneSelect}>
        <Dropdown.Toggle id="dropdown-custom-components">
          Scenes
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {getScenes}
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default SceneList