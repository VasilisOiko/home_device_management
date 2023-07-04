import React, {useState, useEffect} from "react";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';


/* my components */
import {getNestSpaces, setDeviceSocket} from '../services/APICalls'
import { saveToMessageQueue } from "../services/SocketHandlers";
import LoadingAnimation from '../components/LoadingAnimation'
import SpaceSelection from './components/SpaceSelection.js'
import ListDevice from './components/ListDevice'
import StatisticsPanel from "./components/DeviceStatsPanel/StatisticsPanel";

function initConsumption(device)
{
	const measurements = [{
		"value": 0,
		"timestamp": new Date()
	}]

	console.log("[home/initConsumption]: ", measurements, device);

	return measurements
}
  
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
			const spaces = result.data
			setSpaces(spaces)

			/* initialize the socketData with properties in order to update them */
			const initSocketData = {}
			spaces.forEach(space => {
				space.device.forEach(device => {

					initSocketData[device.id.toString()] = {
						"connected": device.connected,
						"enabled": device.enabled,
						"timestamp": device.timestamp,
						"device": device.id,
						"consumption": initConsumption(device.id)
					}
				});
			});

			console.log("[Home/useEffect", initSocketData)
			setSocketData(initSocketData)

		})

		return () => {
			setSpaces([])
		}
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
			
				/* device method control panel values  */
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
				device.socket.onmessage = (receive) => saveToMessageQueue(receive, device, 40, setSocketData)
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

		<StatisticsPanel show={panel.show} device={panel.device} data={socketData}/>

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