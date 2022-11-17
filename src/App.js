import logo from './logo.svg';
import './App.css';
import LeftContainer from './components/LeftContainer';
import MiddleContainer from './components/MiddleContainer';
import RightContainer from './components/RightContainer';
import { useState } from 'react';

function App() {

  const [signedInStatus, setSignedInStatus] = useState(false);
  
  const callbackSignedInStatus = (status) => {
    setSignedInStatus(true);
  }

  return (
    <div className='App'>
      <LeftContainer signedIn={signedInStatus}/>
      <MiddleContainer signedIn={signedInStatus}/>
      <RightContainer signedIn={signedInStatus}/>
    </div>

  );
}

export default App;
