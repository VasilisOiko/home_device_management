import Reactl, {useState, useEffect} from 'react'

import SpaceForm from '../../../components/SpaceForm'
import InfoModal from '../../../components/InfoModal';
import { putSpace } from '../../../services/APICalls';

const NAME = 0;


function EditSpaceForm({space})
{
	const [modalShow, setModalShow] = useState(false);
	const [validated, setValidated] = useState(false);

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
			console.log("[EditSpaceForm] space json: ", spaceJson)
			
	
			putSpace(space.id ,spaceJson)
			.then((response) => {
				setValidated(true);
                setModalShow(true)
				console.log("[CreateSpaceForm] response", response);
			})
			.catch((error) => console.error(error))
		}
		
	}

  return (
    <div>

        <InfoModal
			show={modalShow}
			title = {"Edit Space"}
			space={space}
			onHide={() => {setModalShow(false); window.location.reload()}}>
                Name changed succesfully.
            </InfoModal>

        <SpaceForm validated={validated}
        handleSubmit={handleSubmit}
        defaultName={space.name}
		buttonTitle={"Edit Space"}/>
    </div>

  )
}

export default EditSpaceForm