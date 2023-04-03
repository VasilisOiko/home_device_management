import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

/* My Data */

// function SceneListSelection()
// {
//     return(

//         <>
//             {DeviceData.map((scenes, key) =>
//                 <option key={key} value={scenes.id}>{scenes.scene}</option>
//             )}
//             <option value={0}>Add new scene</option>
//         </>
//     )
// }

function DeviceSceneSelect(props) {
  return (
    <Form.Group as={Col} controlId="formSceneName">
        <Form.Label>Scene</Form.Label>
        <Form.Select
        name="sceneId"
        value={props.id}
        onChange={props.UpdateId}>
{/* 
            {SceneListSelection()} */}
        
        </Form.Select>
    </Form.Group>
  )
}

export default DeviceSceneSelect