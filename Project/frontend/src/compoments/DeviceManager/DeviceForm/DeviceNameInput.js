import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function DeviceNameInput(props) {
  return (
    <Form.Group as={Col} controlId="formDeviceName">
        <Form.Label>Device Name</Form.Label>
        <InputGroup hasValidation>

            <Form.Control
            required
            type="text"
            placeholder="Enter device name"
            value={props.name}
            onChange={props.UpdateName}/>

            <Form.Control.Feedback type="invalid">
            Please provide a name
            </Form.Control.Feedback>

        </InputGroup>
    </Form.Group>
  )
}

export default DeviceNameInput