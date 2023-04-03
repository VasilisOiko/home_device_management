import './App.css';


import 'bootstrap/dist/css/bootstrap.css';

/* My components */
import Navigation from './Navigation/NavigationBar';
import HomePage from './Home/Home'
import DeviceManagerPage from './DeviceManager/DeviceManager';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';




function App() {

  return (
    <div className="App">

      <Router>
        <Navigation/>
        <div className="App-header">
        <Routes>

          <Route exact path='/' element={<HomePage/>}/>
          {/* <Route path='/DeviceManager' element={<DeviceManagerPage/>}/> */}
        </Routes>
        </div>
        
      </Router>
    </div>
  );
}

export default App;