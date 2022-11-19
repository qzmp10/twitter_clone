import { AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai";
import { FaArrowLeft, FaRegComment } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

export default function FocusedTweet(props) {
    return (
        <>
            <div className='go-back-bar'>
                <span><FaArrowLeft /></span>
                <h2>Tweet</h2>
            </div>
            <div className='middle-focused-container'>
                <div>
                    <div className='focused-profile'></div>
                    <div className='focused-info'>
                        <span1>Username</span1>
                        <span2>@username</span2>
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
                    <span><FaRegComment/></span>
                    <span><AiOutlineRetweet/></span>
                    <span><AiOutlineHeart/></span>
                    <span><AiOutlineShareAlt/></span>
                </div>
                <div className='focused-reply'>
                    <div className='left-area-focused-reply'>
                        <div className="focused-profile"></div>
                    </div>
                    <div className="replying-to"></div>
                    <div className="reply-area"></div>
                    <div className="reply-bottom"></div>
                </div>
            </div>
        </>
    )
}