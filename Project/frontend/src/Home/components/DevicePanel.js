import React, {useState} from 'react'
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';



function DevicePanel(props) {

    const [data, setData] = useState()


  return (
    <Collapse in={props.show}>
        <div id={props.id}>

        <Card
        bg={"light"}
        text={'dark'}>
            <Card.Header>{props.name}</Card.Header>
            <Row>
                <Col>
                    <Card 
                        bg={'light'}
                        text={'dark'}
                        border={"primary"}>
                        <Card.Body>
                            <Card.Title as={"h3"}>Energy Consumption</Card.Title>
                            <Card.Text as='h5'>
                                (value) W/Hr
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card 
                        bg={'light'}
                        text={'dark'}
                        border={"primary"}>
                        <Card.Body>
                            <Card.Title as={"h3"}>Active Time</Card.Title>
                            <Card.Text as={'h5'}>
                                (value) Minutes
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Card>

        </div>

    </Collapse>
  )
}

export default DevicePanel


