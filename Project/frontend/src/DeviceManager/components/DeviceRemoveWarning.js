import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


/* TODO: PASS THE DEVICE INFO FOR DELETION AND THE PARENT FUNCTION TO CLOSE THE WARNING  */
function DeviceRemoval(input)
{
    alert("REMOVE:" +
    "\nScene id: " + input.device.sceneId +
    "\nDevice id: " + input.device.deviceId +
    "\nName:" + input.device.deviceName)
    input.onClose()
}



function DeviceRemoveWarning(props) {

    // console.log("removewarning", props)
  return (
    <Modal show={props.showWarning} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to remove <b>{props.device.deviceName}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => DeviceRemoval(props)}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default DeviceRemoveWarning