import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function DeviceTypeSelect(props) {
  return (
    <Form.Group as={Col} controlId="formDeviceType">
    <Form.Label>Device type</Form.Label>
    <Form.Select
    value={props.type}
    onChange={props.UpdateType}>

        <option value={"Light"}>Light</option>
        <option value={"TV"}>TV</option>
        <option value={"Plug"}>Plug</option>

    </Form.Select>
    </Form.Group>
  )
}

export default DeviceTypeSelect