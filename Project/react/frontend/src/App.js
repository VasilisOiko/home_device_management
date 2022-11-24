import './App.css';


import 'bootstrap/dist/css/bootstrap.css';

/* My components */
import Navigation from './compoments/NavigationBar';
import HomePage from './compoments/Home'
import DeviceManagerPage from './compoments/DeviceManager';

function App() {
  return (
    <div className="App">
  
      <Navigation/>

      <header className="App-header">
        <HomePage/>
      </header>
      <DeviceManagerPage/>
    </div>
  );
}

export default App;
