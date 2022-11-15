import logo from './logo.svg';
import './App.css';
import LeftContainer from './components/LeftContainer';
import MiddleContainer from './components/MiddleContainer';
import RightContainer from './components/RightContainer';

function App() {
  return (
    <div className='App'>
      <LeftContainer/>
      <MiddleContainer/>
      <RightContainer/>
    </div>
  );
}

export default App;
