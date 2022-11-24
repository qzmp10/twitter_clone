import { FaHashtag, FaPencilAlt, FaRegComment, FaRegEnvelope, FaSearch, FaShare, FaUser } from "react-icons/fa"
import bird from '../bird.jpg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai"
import { FaArrowLeft } from "react-icons/fa"
import FocusedTweet from "./FocusedTweet"
import { useEffect, useState, useRef } from "react"
import { doc, getDoc, getDocs, query, collection } from "firebase/firestore"
import { db } from "../firebase.config"
import OtherProfile from "./OtherProfile"
import ProfileReply from "./ProfileReply"

export default function MiddleContainer(props) {

    const [currentUserTweets, setCurrentUserTweets] = useState([]);
    const [otherUserTweets, setOtherUserTweets] = useState([]);
    const [globalTweetArray, setGlobalTweetArray] = useState([]);
    const [previouslyClickedUser, setPreviouslyClickedUser] = useState('');
    const [previouslyClickedTweetContent, setPreviouslyClickedTweetContent] = useState('');
    const [previouslyClickedTweetTimestamp, setPreviouslyClickedTweetTimestamp] = useState('');
    const [focusReply, setFocusReply] = useState(false);


    const [loadChats, setLoadChats] = useState(true);
    const [loadReplies, setLoadReplies] = useState(false);

    const chatsRef = useRef();
    const repliesRef = useRef();

    useEffect(() => {
        getAllTweets();
        console.log(chatsRef.current, repliesRef.current)
    }, [])

    //triggers when you log in
    useEffect(() => {
        getUserTweets(props.user);
        getAllTweets();
    }, [props.signedInStatus, props.tweetingStatus])


    const focusTweet = () => {
        props.focus(true);
    }

    async function getUserTweets(name) {
        const userRef = await doc(db, 'users', `${name}`);
        const userSnap = await getDoc(userRef);
        const userTweets = userSnap.data()['tweets'];

        if (name === props.user) {
            setCurrentUserTweets(userTweets);
        } else {
            setOtherUserTweets(userTweets);
        }
    }

    async function getAllTweets() {
        let array = [];
        const q = query(collection(db, "users"));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            doc.data()['tweets'].forEach(tweet => {
                tweet.name = doc.id
                array.push(tweet);
            })
        })
        setGlobalTweetArray(array);
    }

    return (
        <>
            {props.currentLocation === 'explore' && !props.focused && !props.otherUserProfile ? (
                <>
                    <div className='main container column middle alignCenter'>

                        <div className='middle-bar'>
                            <div className='icon'>
                                <img src={bird} alt='bird logo' />
                            </div>
                            <label>
                                <div>
                                    <FaSearch />
                                </div>
                                <input type='text' placeholder="Search Chatter" className="search" />
                            </label>
                        </div>
                        <div className="middle-focused-container">
                            {globalTweetArray.map(tweet => {
                                return (
                                    <div key={Math.random() * 78787} className="explore-tweet" onClick={() => {
                                        props.focus(true);
                                        setPreviouslyClickedUser(tweet.name);
                                        setPreviouslyClickedTweetContent(tweet.text);
                                        setPreviouslyClickedTweetTimestamp(tweet.timestamp.toDate().toDateString());
                                    }}>
                                        <div className="explore-tweet-left">
                                            <div className='explore-tweet-profile'></div>
                                        </div>

                                        <div className="explore-tweet-right">
                                            <div className="explore-tweet-info">
                                                <span className='tweet-username'
                                                    onClick={(e) => {
                                                        //if tweet is from not-current-user go to foreign user profile
                                                        if (tweet.name !== props.user) {
                                                            e.stopPropagation();
                                                            setPreviouslyClickedUser(tweet.name);
                                                            setPreviouslyClickedTweetContent(tweet.text)
                                                            setPreviouslyClickedTweetTimestamp(tweet.timestamp.toDate().toDateString())
                                                            props.focus(false);
                                                            props.focusOtherUserProfile(true);
                                                            getUserTweets(tweet.name);
                                                            //else go to own profile
                                                        }
                                                        else {
                                                            e.stopPropagation();
                                                            props.changeLocation('profile');
                                                            props.focus(false);
                                                            props.focusOtherUserProfile(false);
                                                        }
                                                    }}>{tweet.name}</span>
                                                <span className='tweet-at-and-date'>@{tweet.name}  -  {tweet.timestamp.toDate().toDateString()}</span>
                                            </div>

                                            <p>{tweet.text}
                                            </p>

                                            <div className="tweet-reactions">
                                                <div className="tweet-comments tweet-reaction">
                                                    <span><FaRegComment /></span>
                                                    <span>1</span>
                                                </div>
                                                <div className="tweet-retweets tweet-reaction">
                                                    <span><AiOutlineRetweet /></span>
                                                    <span>2</span>
                                                </div>
                                                <div className="tweet-likes tweet-reaction">
                                                    <span><AiOutlineHeart /></span>
                                                    <span>3</span>
                                                </div>
                                                <div className="tweet-share tweet-reaction">
                                                    <span><AiOutlineShareAlt /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </>

            ) : props.focused ? (
                <>
                    <div className='main container column middle alignCenter'>
                        <FocusedTweet focused={props.focused} focus={props.focus} previouslyClickedUser={previouslyClickedUser}
                            previouslyClickedTweetContent={previouslyClickedTweetContent}
                            previouslyClickedTweetTimestamp={previouslyClickedTweetTimestamp} user={props.user}
                            otherUserProfile={props.otherUserProfile} focusOtherUserProfile={props.focusOtherUserProfile} />
                    </div>
                </>
            ) : props.currentLocation === 'profile' && !props.focused && !props.otherUserProfile ? (
                <>
                    {focusReply ? (
                        <div></div>
                    ) : (
                        <div className='main container column middle alignCenter'>
                            <div className='go-back-bar'>
                                <span onClick={() => { props.changeLocation('explore'); props.focus(false); props.focusOtherUserProfile(false) }}><FaArrowLeft /></span>
                                <div className='profile-middle-name'>
                                    <h2>{props.user}</h2>
                                    <span>1 Tweet</span>
                                </div>
                            </div>
                            <div className="profile-banner-and-bio">
                                <div className="banner"></div>
                                <div className="bio">
                                    <div className='bio-half'>
                                        <span>Edit profile</span>
                                    </div>
                                    <div className="bio-second-half">
                                        <h2>{props.user}</h2>
                                        <span>@{props.user}</span>
                                        <div>
                                            <span className='number'>3 <span>following</span></span>

                                            <span className="number">10 <span>followers</span></span>

                                        </div>
                                    </div>
                                </div>
                                <div className="profile-middle-picture"></div>
                            </div>
                            <div className="profile-media-bar">
                                <div className='media-bar-active' ref={chatsRef}
                                    onClick={() => {
                                        repliesRef.current.classList.remove('media-bar-active');
                                        chatsRef.current.classList.add('media-bar-active');
                                        setLoadChats(true);
                                        setLoadReplies(false);
                                    }}>
                                    <div>Chats</div>
                                </div>
                                <div ref={repliesRef}
                                    onClick={() => {
                                        chatsRef.current.classList.remove('media-bar-active');
                                        repliesRef.current.classList.add('media-bar-active');
                                        setLoadReplies(true);
                                        setLoadChats(false);
                                    }}>
                                    <div>Replies</div>
                                </div>
                            </div>

                            <div className='profile-tweet-container'>
                                {loadChats ? (
                                    <>
                                        {currentUserTweets.map(tweet => {
                                            return (
                                                <div key={Math.random() * 73292} className="explore-tweet" onClick={() => {
                                                    props.focus(true);
                                                    setPreviouslyClickedUser(props.user);
                                                    setPreviouslyClickedTweetContent(tweet.text);
                                                    setPreviouslyClickedTweetTimestamp(tweet.timestamp.toDate().toDateString());
                                                    console.log('clicked')

                                                }}>

                                                    <div className="explore-tweet-left">
                                                        <div className='explore-tweet-profile'></div>
                                                    </div>

                                                    <div className="explore-tweet-right">
                                                        <div className="explore-tweet-info">
                                                            <span className='tweet-username'>{props.user}</span>
                                                            <span className='tweet-at-and-date'>@{props.user} - {tweet.timestamp.toDate().toDateString()} </span>
                                                        </div>

                                                        <p>{tweet.text}</p>

                                                        <div className="tweet-reactions">
                                                            <div className="tweet-comments tweet-reaction">
                                                                <span><FaRegComment /></span>
                                                                <span>1</span>
                                                            </div>
                                                            <div className="tweet-retweets tweet-reaction">
                                                                <span><AiOutlineRetweet /></span>
                                                                <span>2</span>
                                                            </div>
                                                            <div className="tweet-likes tweet-reaction">
                                                                <span><AiOutlineHeart /></span>
                                                                <span>3</span>
                                                            </div>
                                                            <div className="tweet-share tweet-reaction">
                                                                <span><AiOutlineShareAlt /></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                ) : loadReplies ? (
                                    <ProfileReply globalTweetArray={globalTweetArray} user={props.user} otherUserProfile={props.otherUserProfile} />
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    )}
                   </>
            ) : props.otherUserProfile && !props.focused ? (
                <OtherProfile otherUserTweets={otherUserTweets} previouslyClickedUser={previouslyClickedUser}
                    focusTweet={focusTweet} changeLocation={props.changeLocation} focusOtherUserProfile={props.focusOtherUserProfile}
                    focus={props.focus} user={props.user} previouslyClickedTweetContent={previouslyClickedTweetContent}
                    previouslyClickedTweetTimestamp={previouslyClickedTweetTimestamp} globalTweetArray={globalTweetArray}
                    otherUserProfile={props.otherUserProfile} />
            ) : (
                <div></div>
            )}
        </>
    )
}


