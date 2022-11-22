import React from 'react'
import Card from 'react-bootstrap/Card';

import devicesData from '../../../data/devices.json'


const sceneID = (scene) =>
{
    var device = Array

    for (let index = 0; index < devicesData.length; index++) {
        if (sceneID === devicesData[index].id) {
            device[index] = devicesData[index].device
            console.log(scene)
        }
        
     }                     

    return (
        <div>
            {console.log(device)}
            {
            }
        </div>
        )
}



export default sceneID;