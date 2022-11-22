import { FaHashtag, FaPencilAlt, FaRegComment, FaRegEnvelope, FaSearch, FaShare, FaUser } from "react-icons/fa"
import bird from '../bird.jpg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai"
import { FaArrowLeft } from "react-icons/fa"
import FocusedTweet from "./FocusedTweet"
import { useEffect, useState, useRef } from "react"
import { doc, getDoc, getDocs, query, collection } from "firebase/firestore"
import { db } from "../firebase.config"

export default function MiddleContainer(props) {

    const [currentUserTweets, setCurrentUserTweets] = useState([]);
    const [globalTweetArray, setGlobalTweetArray] = useState([]);


    useEffect(() => {
        getAllTweets();
    }, [])
    //triggers when you log in
    useEffect(() => {
        getUserTweets();
        getAllTweets();
    }, [props.signedInStatus, props.tweetingStatus])

    useEffect(() => {
        console.log(globalTweetArray);
    }, [globalTweetArray])


    const focusTweet = () => {
        props.focus(true);
    }

    async function getUserTweets() {
        const userRef = await doc(db, 'users', `${props.user}`);
        const userSnap = await getDoc(userRef);

        const userTweets = userSnap.data()['tweets'];

        setCurrentUserTweets(userTweets);
    }

    async function getAllTweets() {
        let array = [];
        const q = query(collection(db, "users"));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data());
            doc.data()['tweets'].forEach(tweet => {
                tweet.name = doc.id
                array.push(tweet);
            })
        })

        setGlobalTweetArray(array);


    }






    return (
        <>
            {props.currentLocation === 'explore' && !props.focused ? (
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
                                    <div key={Math.random() * 78787} className="explore-tweet" onClick={focusTweet}>

                                        <div className="explore-tweet-left">
                                            <div className='explore-tweet-profile'></div>
                                        </div>

                                        <div className="explore-tweet-right">
                                            <div className="explore-tweet-info">
                                                <span className='tweet-username'>{tweet.name}</span>
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

                            {/* <div className="explore-tweet" onClick={focusTweet}>

                                <div className="explore-tweet-left">
                                    <div className='explore-tweet-profile'></div>
                                </div>

                                <div className="explore-tweet-right">
                                    <div className="explore-tweet-info">
                                        <span className='tweet-username'>Username</span>
                                        <span className='tweet-at-and-date'>@username  -  10/10/2010</span>
                                    </div>

                                    <p>This is a tweet. This is a tweet. This is a tweet. This is a tweet.
                                        This is a tweet. This is a tweet. This is a tweet. This is a tweet.
                                        This is a tweet. This is a tweet. This is a tweet. This is a tweet.
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
                            </div> */}
                        </div>

                    </div>
                </>

            ) : props.currentLocation === 'explore' && props.focused ? (
                <>
                    <div className='main container column middle alignCenter'>
                        <FocusedTweet focused={props.focused} focus={props.focus} />
                    </div>
                </>
            ) : props.currentLocation === 'profile' && !props.focused ? (

                <>

                    <div className='main container column middle alignCenter'>
                        <div className='go-back-bar'>
                            <span onClick={() => { props.changeLocation('explore') }}><FaArrowLeft /></span>
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
                            <div className="media-bar-active"><div>Chats</div></div>
                            <div><div>Likes</div></div>
                        </div>
                        <div className='profile-tweet-container'>
                            {currentUserTweets.map(tweet => {
                                return (
                                    <div key={Math.random() * 73292} className="explore-tweet" onClick={focusTweet}>

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
                        </div>

                        {/* <div className="explore-tweet" onClick={focusTweet}>

                            <div className="explore-tweet-left">
                                <div className='explore-tweet-profile'></div>
                            </div>

                            <div className="explore-tweet-right">
                                <div className="explore-tweet-info">
                                    <span className='tweet-username'>Username</span>
                                    <span className='tweet-at-and-date'>@username  -  10/10/2010</span>
                                </div>

                                <p>This is a tweet. This is a tweet. This is a tweet. This is a tweet.
                                    This is a tweet. This is a tweet. This is a tweet. This is a tweet.
                                    This is a tweet. This is a tweet. This is a tweet. This is a tweet.
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
                        </div> */}
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </>
    )
}


