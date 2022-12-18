import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SceneNameInput(props) {
  return (
    <Form.Group as={Col} controlId="formNewSceneName">
        <Form.Label>Scene Name</Form.Label>
        <InputGroup hasValidation>

            <Form.Control
            required
            type="text"
            disabled={props.disableInput}
            placeholder="Enter scene name"
            value={props.name}
            onChange={props.UpdateName}/>

            <Form.Control.Feedback type="invalid">
                Please provide a name
            </Form.Control.Feedback>

        </InputGroup>
    </Form.Group>
  )
}

export default SceneNameInput