const baseURL = "http://192.168.1.4:8000"

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
  fetch(baseURL + URL, {  // Enter your IP address here

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

export {fetchData, postData, baseURL};