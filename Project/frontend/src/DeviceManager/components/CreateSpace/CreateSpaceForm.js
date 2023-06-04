import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

import { postSpace } from '../../../services/APICalls';
import InfoModal from '../../../components/InfoModal';
import SpaceForm from '../../../components/SpaceForm';

const NAME = 0;



function CreateSpaceForm() {
    
	const [modalShow, setModalShow] = useState(false);
	
	const [validated, setValidated] = useState(false);
	
    const [space, setSpace] = useState({});



	const handleSubmit = (event) => {
		
		const form = event.currentTarget;
		
		event.preventDefault();
		
		if (form.checkValidity() === false)
		{
			event.stopPropagation();
			setValidated(true);
		}
		else
		{
			const spaceJson = {"name": event.currentTarget[NAME].value} 
			console.log("[createSpaceForm] space json: ", spaceJson)
			
	
			postSpace(spaceJson)
			.then((response) => {
				setSpace(response.data)
				setModalShow(true)
				setValidated(true);
				console.log("[CreateSpaceForm] response", response);
			})
			.catch((error) => console.error(error))
		}
		
	}

	return (
		<div>
			<InfoModal
			show={modalShow}
			title = {"Create Space"}
			space={space}
			onHide={() => {setModalShow(false); window.location.reload()}}>
				Space Created Succesfully
			</InfoModal>

			<SpaceForm validated={validated} handleSubmit={handleSubmit} buttonTitle={"Create Space"}/>

		</div>

	);
}

export default CreateSpaceForm