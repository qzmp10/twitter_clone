import { query, doc, where, getDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { AiOutlineGif, AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai";
import { FaArrowLeft, FaRegComment, FaRegImage, FaSmile } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { db } from "../firebase.config";

export default function FocusedTweet(props) {

    useEffect(() => {
        sendComment();
    }, [props.previouslyClickedUser])

    async function sendComment(message) {
        const q = query(doc(db, 'users', `${props.previouslyClickedUser}`));
        const x = await getDoc(q);
        const userTweets = x.data()['tweets'];

        userTweets.forEach(tweet => {
            if(tweet.text === props.previouslyClickedTweetContent) {
                console.log(props.previouslyClickedTweetContent)
            }
        })

    }
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
                        <span className='one'>{props.previouslyClickedUser}</span>
                        <span className='two'>@{props.previouslyClickedUser}</span>
                    </div>
                    <i><SlOptions /></i>
                </div>
                <p> {props.previouslyClickedTweetContent}
                </p>
                <div className="focused-date">
                    {props.previouslyClickedTweetTimestamp}
                </div>
                <div className="focused-reactions">
                    <div>
                        <span> 100 </span>
                        <span> Re-chats </span>
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
                        <div className="replying-to"> Replying to <span>@{props.previouslyClickedUser}</span></div>
                        <textarea placeholder="Chat your reply"></textarea>
                        <div className="reply-bottom">
                            <span><FaRegImage /></span>
                            <span><AiOutlineGif /></span>
                            <span><FaSmile /></span>
                            <div>
                                <div className="reply"
                                    onClick={() => {
                                        console.log(1);
                                    }

                                    }
                                >Reply</div>
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