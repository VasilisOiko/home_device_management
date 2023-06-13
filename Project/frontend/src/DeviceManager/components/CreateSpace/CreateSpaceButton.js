import React, {useState} from 'react'

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import CreateSpaceForm from './CreateSpaceForm';

function CreateSpaceButton()
{

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
        
        <Button variant="primary" onClick={handleShow} className="me-2">Create Space</Button>

        <Offcanvas show={show} onHide={handleClose} placement={'top'} name={'createSpace'} className={"auto"}>
          
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Create Space</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <CreateSpaceForm/>
        </Offcanvas.Body>
      </Offcanvas>

    </div>
    )
}

export default CreateSpaceButton