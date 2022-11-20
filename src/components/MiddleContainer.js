import { FaHashtag, FaRegComment, FaRegEnvelope, FaSearch, FaShare, FaUser } from "react-icons/fa"
import bird from '../bird.jpg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai"
import FocusedTweet from "./FocusedTweet"

export default function MiddleContainer(props) {

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
                                <input type='text' placeholder="Search Chatter" />
                            </label>
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
                <>
                    <div className='main container column middle alignCenter'>
                        <FocusedTweet focused={props.focused} focus={props.focus} />

                    </div>

                </>

            )}
            <div className='mobileTweetButton'></div>

        </>


    )
}