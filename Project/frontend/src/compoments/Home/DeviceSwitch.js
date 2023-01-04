import React from 'react'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Switch } from '@mui/material'

function DeviceSwitch() {
  return (
    <div>
        <Row>
            <Col>
                off <Switch/> on
            </Col>
        </Row>
        <Row>

        </Row>
    </div>
  )
}


export default DeviceSwitch