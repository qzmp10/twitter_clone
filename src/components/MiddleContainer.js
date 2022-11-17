import { FaRegComment, FaSearch, FaShare } from "react-icons/fa"
import bird from '../bird.jpg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai"

export default function MiddleContainer(props) {
    return (
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

            <div className="explore-tweet">

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
                            <span><FaRegComment/></span>
                            <span>1</span>
                        </div>
                        <div className="tweet-retweets tweet-reaction">
                            <span><AiOutlineRetweet/></span>
                            <span>2</span>
                        </div>
                        <div className="tweet-likes tweet-reaction">
                            <span><AiOutlineHeart/></span>
                            <span>3</span>
                        </div>
                        <div className="tweet-share tweet-reaction">
                            <span><AiOutlineShareAlt/></span>
                        </div>
                    </div>
                </div>

            </div>

        </div>


    )
}