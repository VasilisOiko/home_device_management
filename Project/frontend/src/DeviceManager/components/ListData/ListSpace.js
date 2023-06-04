import React, { useState, useEffect } from 'react'

/* Bootstrap components */
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* My components */
import LoadingAnimation from '../../../components/LoadingAnimation';
import ListDevice from './ListDevice';
import EditSpaceButton from '../EditSpace/EditSpaceButton';
import RemoveSpaceButton from '../RemoveSpace/RemoveSpaceButton';



function ListSpace({spaces})
{    
    
    return(
        spaces.length === 0 ?
        
        <LoadingAnimation className={"center"}/> :

        <Accordion>
        {
            spaces.map((space) => (
                <Row key={space.id}>
                    <Col xs="auto">
                        <EditSpaceButton space={space}/>
                    </Col>
                    <Col xs="auto">
                        <RemoveSpaceButton space={space}/>
                    </Col>
                    <Col>
                        <Accordion.Item eventKey = {space.id}>
                            <Accordion.Header>
                                {space.name}
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListDevice spaceId={space.id}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Col>
                </Row>
            ))
        }
        </Accordion>
    )
}

export default ListSpace