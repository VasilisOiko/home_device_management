import axios from "axios"


const serverIP = "192.168.1.4:8000"
const baseURL = "http://" + serverIP;
const nestSpacesURL = baseURL + "/api/spaces/all/"
const spacesURL = baseURL + "/api/spaces/"
const devicesURL = baseURL + "/api/devices/"
const measurmentsURL = baseURL + "/api/measurments/"
const wsURL = "ws://192.168.1.4:8000/livedata/device/"



/* Space Methods */
function getNestSpaces()
{
  return axios.get(nestSpacesURL)  
}


function getSpaces()
{
  return axios.get(spacesURL)
}

function postSpace(jsonData)
{
  return axios.post(spacesURL, jsonData)  
}

function putSpace(spaceId, jsonData)
{
  return axios.put(spacesURL + spaceId + '/', jsonData)
}

function deleteSpace(spaceId)
{
  return axios.delete(spacesURL + spaceId + '/')  
}


/* Device Methods */
function getDevices(parameter = "")
{
  return axios.get(devicesURL + parameter)
}


/* Post Data */
function postData(URL, jsonData)
{
  fetch(baseURL + URL, { 

      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors', 
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

    })
    .then((response) => {return response})
}



function postMessage(device, data)
{
  return axios.post(devicesURL + device + "/", data)
}


function setDeviceSocket(id)
{
  let socket = new WebSocket(wsURL + id + "/")
  
  socket.onopen = () => console.log("connected from device: ", id);
  socket.onClose = () => console.log("disconnected from device: ", id);


  return socket
}

export {
  baseURL, spacesURL, devicesURL, measurmentsURL, wsURL,
  postData, getNestSpaces, getSpaces, postSpace, putSpace, deleteSpace, getDevices, postMessage, setDeviceSocket,
};