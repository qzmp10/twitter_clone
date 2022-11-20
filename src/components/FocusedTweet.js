import { AiOutlineGif, AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai";
import { FaArrowLeft, FaRegComment, FaRegImage, FaSmile } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

export default function FocusedTweet(props) {
    return (
        <>
            <div className='go-back-bar'>
                <span onClick={() => { props.focus(false) }}><FaArrowLeft /></span>
                <h2>Tweet</h2>
            </div>
            <div className='middle-focused-container'>
                <div>
                    <div className='focused-profile'></div>
                    <div className='focused-info'>
                        <span className='one'>Username</span>
                        <span className='two'>@username</span>
                    </div>
                    <i><SlOptions /></i>
                </div>
                <p> This is a tweet. This is a tweet. This is a tweet.  This is a tweet.  This is a tweet.
                    This is a tweet.  This is a tweet.  This is a tweet.  This is a tweet.  This is a tweet.
                </p>
                <div className="focused-date">
                    6:32 PM - 19/11/2022
                </div>
                <div className="focused-reactions">
                    <div>
                        <span> 100 </span>
                        <span> Retweets </span>
                    </div>
                    <div>
                        <span> 100 </span>
                        <span> Comments </span>
                    </div>
                    <div>
                        <span> 100 </span>
                        <span> Likes</span>
                    </div>
                </div>
                <div className="focused-interactions">
                    <span><FaRegComment /></span>
                    <span><AiOutlineRetweet /></span>
                    <span><AiOutlineHeart /></span>
                    <span><AiOutlineShareAlt /></span>
                </div>
                <div className='focused-reply'>
                    <div className='left-area-focused-reply'>
                        <div className="focused-profile"></div>
                    </div>
                    <div className="right-area-focused-reply">
                        <div className="replying-to"> Replying to <span>@username</span></div>
                        <textarea placeholder="Tweet your reply"></textarea>
                        <div className="reply-bottom">
                            <span><FaRegImage /></span>
                            <span><AiOutlineGif /></span>
                            <span><FaSmile /></span>
                            <div>
                                <div className="reply">Reply</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="explore-tweet" > 

                    <div className="explore-tweet-left">
                        <div className='explore-tweet-profile'></div>
                    </div>

                    <div className="explore-tweet-right">
                        <div className="explore-tweet-info">
                            <span className='tweet-username'>Username</span>
                            <span className='tweet-at-and-date'>@username  -  10/10/2010</span>
                        </div>

                        <p>This is a comment. This is a comment. This is a comment.
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
    )
}