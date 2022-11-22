import logo from './logo.svg';
import './App.css';
import LeftContainer from './components/LeftContainer';
import MiddleContainer from './components/MiddleContainer';
import RightContainer from './components/RightContainer';
import SignUpContainer from './SignUpContainer'
import Footer from './components/Footer';
import { useState, useEffect, useRef } from 'react';
import Tweet from './components/Tweet';
import MobileSignedInFooter from './components/MobileSignedInFooter';
import { FaPencilAlt } from 'react-icons/fa'
import LogiNContainer from './LogInContainer';
import { auth, db } from './firebase.config'
import { getDoc, doc } from 'firebase/firestore';

function App() {

  const [stateUpdate, setStateUpdate] = useState(0);
  const [signedInStatus, setSignedInStatus] = useState(false);
  const [signUpPopUp, setSignUpPopUp] = useState(false);
  const [logInPopUp, setLogInPopUp] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('explore');
  const [tweetSelectionStatus, setTweetSelectionStatus] = useState(false);
  const [otherUserProfile, setOtherUserProfile] = useState(false);
  const [tweetingStatus, setTweetingStatus] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState('');
  const [currentUserFollowers, setCurrentUserFollowers] = useState(0);
  const [currentUserFollowing, setCurrentUserFollowing] = useState(0);
  const [currentUserTweets, setCurrentUserTweets] = useState([])

  const app = useRef();

  useEffect(() => {
    if (tweetingStatus || signUpPopUp || logInPopUp) {
      console.log(app.current)
      app.current.style.filter = 'brightness(0.5)'
      app.current.style.overflow = 'hidden';
    } else {
      app.current.style.overflow = 'default';
      app.current.style.filter = 'none';
    }
  }, [tweetingStatus, signUpPopUp, logInPopUp])

  const callbackSignedInStatus = (status) => {
    setSignedInStatus(status);
  }

  const callbackTweet = (status) => {
    setTweetingStatus(status);
  }

  const callbackSelectTweet = (status) => {
    setTweetSelectionStatus(status)
  }

  const callbackLocation = (location) => {
    setCurrentLocation(location);
  }

  const callbackSignUpPopUp = (status) => {
    setSignUpPopUp(status);
  }

  const callbackLogInPopUp = (status) => {
    setLogInPopUp(status);
  }

  const callbackCurrentUser = (user) => {
    setCurrentUserInfo(user)
  }

  const callbackOtherUserProfile = (status) => {
    setOtherUserProfile(status);
  }

  // async function getUserData () {
  //   const userRef = await doc(db, 'users', `${currentUserInfo}`);
  //   const userSnap = await getDoc(userRef);
  //   const data = userSnap.data();
  //   console.log(data)
  // };

  return (
    <>
      <div className='App' ref={app}>
        <LeftContainer signedInStatus={signedInStatus} signIn={callbackSignedInStatus} tweet={callbackTweet}
          changeLocation={callbackLocation} user={currentUserInfo} focus={callbackSelectTweet}
          focusOtherUserProfile={callbackOtherUserProfile}/>

        <MiddleContainer signedInStatus={signedInStatus} signIn={callbackSignedInStatus}
          currentLocation={currentLocation} focus={callbackSelectTweet}
          focused={tweetSelectionStatus} changeLocation={callbackLocation} user={currentUserInfo}
          tweetingStatus={tweetingStatus} update={stateUpdate} otherUserProfile={otherUserProfile}
          focusOtherUserProfile={callbackOtherUserProfile} />

        <RightContainer signedInStatus={signedInStatus} signIn={callbackSignedInStatus} signUp={callbackSignUpPopUp}/>
      </div>


      {signedInStatus ? (
        <>
          <>
            {tweetSelectionStatus ? (
              <div></div>
            ) : (
              <div className='mobileTweetButton'><FaPencilAlt /></div>
            )}
          </>
          <MobileSignedInFooter focused={tweetSelectionStatus} />
        </>
      ) : (
        <Footer logIn={callbackLogInPopUp} signUp={callbackSignUpPopUp}/>
      )}

      {tweetingStatus ? (
        <Tweet tweet={callbackTweet} user={currentUserInfo} />
      ) : (
        <div></div>
      )}

      {signUpPopUp ? (
        <SignUpContainer signUp={callbackSignUpPopUp} signIn={callbackSignedInStatus} user={callbackCurrentUser}/>
      ) : (
        <div></div>
      )}

      {logInPopUp ? (
        <LogiNContainer logIn={callbackLogInPopUp} user={callbackCurrentUser} signIn={callbackSignedInStatus}/>
      ) : (
        <div></div>
      )}



    </>

  );
}

export default App;
