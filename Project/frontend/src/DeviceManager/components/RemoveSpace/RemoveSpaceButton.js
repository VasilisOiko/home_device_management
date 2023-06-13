import React, {useState} from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {RiDeleteBinLine} from 'react-icons/ri'; 

import {deleteSpace} from '../../../services/APICalls';
import ModalBodyMessage from './ModalBodyMessage';


function RemoveSpaceButton({space})
{

    const [modalShow, setModalShow] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false)



    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true)
    
    const removeSpace = () => {

      setButtonDisabled(true)

      deleteSpace(space.id)
      .then((response) =>{
          handleClose()
          console.log("[RemoveSpaceButton] response", response);
          window.location.reload()

      })
      .catch((error) => console.error(error))
    }

  return (
    <>
      <Button
      variant="danger"
      size="sm"
      onClick={handleShow}
      className="me-2">
          <RiDeleteBinLine/>
      </Button>

      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Space</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ModalBodyMessage space={space}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={removeSpace} disabled={buttonDisabled}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
        
    </>
  )
}

export default RemoveSpaceButton