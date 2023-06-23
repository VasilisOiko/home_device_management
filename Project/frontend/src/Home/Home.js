import React, {useState, useEffect} from "react";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';


/* my components */
import {getNestSpaces, setDeviceSocket} from '../services/APICalls'
import LoadingAnimation from '../components/LoadingAnimation'
import SpaceSelection from './components/SpaceSelection.js'
import ListDevice from './components/ListDevice'
import StatisticsPanel from "./components/DeviceStatsPanel/StatisticsPanel";


  
function Home()
{
  
  
  const [spaces, setSpaces] = useState([]);  // set state for spaces and devices
  const [selectedSpace, setSelectedSpace] = useState({id: 0, name: ""}); 
  
  const [socketData, setSocketData] = useState({});

  const [panel, setPanel] = useState({"show": false, "device": undefined})



  /* ___________________Fetch spaces___________________ */
	useEffect(() => {
		getNestSpaces()
		.then( (result) =>
		{
			setSpaces(result.data)
		})
	}, [])
   

  /* ___________________set default space / get sockets / bound panel___________________ */
  useEffect( () => 
  {
    if(spaces.length !== 0)
    {
		/* set Default space */
		setSelectedSpace(spaces[0])

		spaces.forEach(space => {
			space.device.forEach(device => {
			
				/* device can control panel values  */
				device.handlePanel = () => {
					setPanel((state) => {

						let newState = {...state}
						
						
						if(state.device === device)
						{
							newState.show = !state.show
						}
						else
						{
							newState.device = device
							newState.show = true
						}
						


						return newState
					})
				}

				/* set socket for the device */
				device.socket = setDeviceSocket(device.id)

				/* message handling */
				device.socket.onmessage = (receive) => {

					let message = JSON.parse(receive.data)["message"];

				
					// console.log("[Home.js] message from device: " + devices[index].id + " ")
					// console.log("[Home.js] message from device: ", receive) 
					
					// socket state approach
					setSocketData((prevSocketData) => {
						const updatedArray = {...prevSocketData};

						if(prevSocketData[device.id.toString()] !== undefined)
						{
							if (message.consumption === undefined)
							{
								message.consumption = prevSocketData[device.id.toString()].consumption
							}
							if (message.connected === undefined)
							{
								message.connected = prevSocketData[device.id.toString()].connected
							}
							if (message.enabled === undefined)
							{
								message.enabled = prevSocketData[device.id.toString()].enabled
							}
						}

						
						updatedArray[device.id.toString()] = message;

						console.log("[Home/onMessage]: ", updatedArray);
						
						return updatedArray; 
					})
					
				}
        	});
    	});
	}

    return () => {
      	spaces.forEach((space) => {
        	space.device.forEach(device => {
          		device.socket.close();
        	});
      	});
    };
    

  }, [spaces])

  


  return (

    spaces === undefined ?

    <LoadingAnimation/>:


    <Stack gap={3}>


		<SpaceSelection
		key={selectedSpace.id}
		spaces={spaces}
		selectedSpace={selectedSpace}
		setSelectedSpace={setSelectedSpace}/>
		<h2>
			<Badge bg="light" text="dark">
				{selectedSpace.name}
			</Badge>
		</h2>

		<StatisticsPanel show={panel.show} device={panel.device}/>

		<Row>
			<Col>
				<ListDevice
				key={selectedSpace.id}
				devices={selectedSpace.device}
				socketData={socketData}/>
			</Col>
		</Row>

    </Stack>
  )
}
  
  
export default Home;