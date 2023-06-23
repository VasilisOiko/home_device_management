import React from 'react'
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import ConsumptionGraph from './ConsumptionGraph';



function StatisticsPanel({show, device})
{


  return (
      
      <Collapse in={show}>

        {
            device === undefined ?

            <Card
            bg={"light"}
            text={'dark'}> Device Data Not Found </Card>
            
            :

            <div id={"card-header-button"}>

            <Card
            bg={"light"}
            text={'dark'}>
                <Card.Header>{device.alias}</Card.Header>
                <Row className="justify-content-md-center">
                    <ConsumptionGraph device={device}/>
                </Row>
                <Row>
                    <Col>
                        <Card 
                            bg={'light'}
                            text={'dark'}>
                                <Card.Title as={"h3"}>Energy Consumption</Card.Title>
                                <Card.Text as='h5'>
                                    (value) W/Hr
                                </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card 
                            bg={'light'}
                            text={'dark'}>
                                <Card.Title as={"h3"}>Active Time</Card.Title>
                                <Card.Text as={'h5'}>
                                    (value) Minutes
                                </Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Card>

            </div>
        }

    </Collapse>
  )
}

export default StatisticsPanel


