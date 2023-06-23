import React from 'react'

/* Bootstrap components */
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

/* My components */
import LoadingAnimation from '../../../components/LoadingAnimation';
import EditSpaceButton from '../EditSpace/EditSpaceButton';
import RemoveSpaceButton from '../RemoveSpace/RemoveSpaceButton';
import ListDevice from './ListDevice'



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

                                {
                                    space.device.length === 0 ?

                                    <Alert key={"secondary"} variant={"secondary"}>Empty</Alert>
                                    :
                                    <div>
                                    {space.device.map((device) => <ListDevice key={device.id} device={device}/> )}
                                    </div>
                                }

                                {/* <ListDevice devices={space.device}/> */}
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