import React, {useState} from 'react'

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {LuEdit} from 'react-icons/lu';
import EditSpaceForm from './EditSpaceForm';


function EditSpaceButton({space})
{
    console.log("[EditSpaceButton]", space);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="primary" size="sm" onClick={handleShow} className="me-2">
                <LuEdit/>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement={'top'} name={'editSpace'} className={"h-50"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit {space.name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditSpaceForm space={space}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default EditSpaceButton