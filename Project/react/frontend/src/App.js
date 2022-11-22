import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './compoments/NavigationBar';
import HomePage from './compoments/Home'

function App() {
  return (
    <div className="App">
      <Navigation/>
      <header className="App-header">
        <HomePage/>
      </header>
    </div>
  );
}

export default App;
