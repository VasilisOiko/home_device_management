import React from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function SpaceForm({validated, handleSubmit, defaultName, buttonTitle})
{
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationName">
                <Form.Label>Space Name</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Name"
                defaultValue= {defaultName === undefined? "" : defaultName}
                />
                <Form.Control.Feedback type="invalid" >Please insert a name.</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Button type="submit">{buttonTitle}</Button>
    </Form>
  )
}

export default SpaceForm