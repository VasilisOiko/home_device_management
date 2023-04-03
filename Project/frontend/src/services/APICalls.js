const baseURL = "http://192.168.1.4:8000"
const spacesURL = "http://192.168.1.4:8000/api/spaces/"
const devicesURL = "http://192.168.1.4:8000/api/devices/"
const measurmentsURL = "http://192.168.1.4:8000/api/measurments/"
const wsURL = "ws://192.168.1.4:8000/livedata/device/"

function fetchData(URL, setData, initialize)
{ 
  fetch(URL)
    .then((result) => result.json())
    .then((data) => {
        // console.log(data);
        setData(data);
        initialize(data)
    })
    .catch((err) => {
        console.log(err.message);
    })  
}

function postData(URL, jsonData, HandleData, HandleError)
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
    .then((response) => response.json())
    .then((data) => {
      HandleData(data)
      })
      .catch((err) => {
        HandleError()
        console.log(err.message);
      });
}

function getData(URL)
{
  fetch(URL)
  .then((result) => result.json())
  .then((data) => {
      return data
  })
  .catch((err) => {
      console.log(err.message);
  }) 
}

function getSpaces()
{
  return getData(spacesURL)
}

function getDevices(fromSpace = "")
{
  return getData(devicesURL + fromSpace)
}

function getMeasurments(fromDevice = "")
{
  return getData(measurmentsURL + fromDevice)
}

export {
  baseURL, spacesURL, devicesURL, measurmentsURL, wsURL,
  fetchData, postData, getData, getSpaces, getDevices, getMeasurments
};