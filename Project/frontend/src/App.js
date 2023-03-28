import './App.css';


import 'bootstrap/dist/css/bootstrap.css';

/* My components */
import Navigation from './compoments/NavigationBar';
import HomePage from './compoments/Home'
import DeviceManagerPage from './compoments/DeviceManager';
import SettingsPage from './compoments/Settings';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';




function App() {
  return (
    <div className="App">

      <Router>
        <Navigation/>
        <div className="App-header">
        <Routes>

          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/DeviceManager' element={<DeviceManagerPage/>}/>
          <Route path='/Settings' element={<SettingsPage/>}/>
        </Routes>
        </div>
        
      </Router>
    </div>
  );
}

export default App;