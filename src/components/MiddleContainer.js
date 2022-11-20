import { FaHashtag, FaPencilAlt, FaRegComment, FaRegEnvelope, FaSearch, FaShare, FaUser } from "react-icons/fa"
import bird from '../bird.jpg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai"
import { FaArrowLeft } from "react-icons/fa"
import FocusedTweet from "./FocusedTweet"
import { useEffect } from "react"

export default function MiddleContainer(props) {

    useEffect(() => {
        
    }, [])

    const focusTweet = () => {
        props.focus(true);
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
                                <input type='text' placeholder="Search Chatter" className="search"/>
                            </label>
                        </div>
                        <div className="middle-focused-container">
                            <div className="explore-tweet" onClick={focusTweet}>

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
                            </div>
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
                        <div className="explore-tweet" onClick={focusTweet}>

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
                        </div>
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </>
    )
}


