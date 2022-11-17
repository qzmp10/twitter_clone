import logo from './logo.svg';
import './App.css';
import LeftContainer from './components/LeftContainer';
import MiddleContainer from './components/MiddleContainer';
import RightContainer from './components/RightContainer';
import Footer from './components/Footer';
import { useState, useEffect, useRef } from 'react';
import Tweet from './components/Tweet';

function App() {


  const [signedInStatus, setSignedInStatus] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [tweetingStatus, setTweetingStatus] = useState(false);

  const app = useRef();

  useEffect(() => {
    console.log(signedInStatus);
  }, [signedInStatus])

  useEffect(() => {
    if(tweetingStatus) {
      console.log(app.current)
      app.current.style.filter = 'brightness(0.5)'
      app.current.style.overflow = 'hidden';
    } else {
      app.current.style.overflow = 'default';
      app.current.style.filter = 'none';
    }
  }, [tweetingStatus])

  const callbackSignedInStatus = (status) => {
    setSignedInStatus(status);
  }

  const callbackTweet = (status) => {
    setTweetingStatus(status);
  }

  return (
    <>
      <div className='App' ref={app}>
        <LeftContainer signedInStatus={signedInStatus} signIn={callbackSignedInStatus} tweet={callbackTweet}/>
        <MiddleContainer signedInStatus={signedInStatus} signIn={callbackSignedInStatus} />
        <RightContainer signedInStatus={signedInStatus} signIn={callbackSignedInStatus} />
      </div>

      {signedInStatus ? (
        <div></div>
      ) : (
        <Footer />
      )}

      {tweetingStatus ? (
        <Tweet tweet={callbackTweet}/>
      ) : (
        <div></div>
      )}
    </>

  );
}

export default App;
