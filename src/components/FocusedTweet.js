import { query, doc, where, getDoc, collection, updateDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { AiOutlineGif, AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai";
import { FaArrowLeft, FaRegComment, FaRegImage, FaSmile } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { db } from "../firebase.config";
import ReplyFocused from "./ReplyFocused";

export default function FocusedTweet(props) {

    const [commentValue, setCommentValue] = useState('');
    const [clickedReply, setClickedReply] = useState(1);
    const [tweetComments, setTweetComments] = useState([]);
    const [focusReply, setFocusReply] = useState(false);
    const [previouslyClickedComment, setPreviouslyClickedComment] = useState('');
    const [previouslyClickedCommentUser, setPreviouslyClickedCommentUser] = useState('');
    const [previouslyClickedCommentTimestamp, setPreviouslyClickedCommentTimestamp] = useState('');

    useEffect(() => {
        getTweetComments()
    }, [props.focused])

    useEffect(() => {
        console.log(tweetComments);
    }, [tweetComments])

    const focusRef = useRef();

    const inputChange = (e) => {
        setCommentValue(e.target.value);
        console.log(commentValue)
    }

    async function sendComment() {
        const q = query(doc(db, 'users', `${props.previouslyClickedUser}`));
        const x = await getDoc(q);
        const userTweets = x.data()['tweets'];

        userTweets.forEach(tweet => {
            if (tweet.text === props.previouslyClickedTweetContent) {
                tweet.comments.push({
                    text: commentValue,
                    timestamp: Timestamp.now(),
                    from: props.user
                })
            }
        })
        await updateDoc(doc(db, 'users', `${props.previouslyClickedUser}`), {
            tweets: userTweets
        })

        getTweetComments();
    }

    async function getTweetComments() {
        const q = query(doc(db, 'users', `${props.previouslyClickedUser}`));
        const x = await getDoc(q);
        const userTweets = x.data()['tweets'];
        let array = [];

        userTweets.forEach(tweet => {
            if (tweet.text === props.previouslyClickedTweetContent) {
                tweet.comments.forEach(comment => {
                    array.push(comment);
                })
            }
        })
        setTweetComments(array);
    }


    return (
        <>
            <div className='go-back-bar'>
                <span
                    onClick={() => {
                        if (focusReply) {
                            setFocusReply(false)
                        } else {
                            props.focus(false);
                        }

                    }}
                ><FaArrowLeft /></span>
                <h2>Tweet</h2>
            </div>

            {focusReply ? (
                <ReplyFocused previouslyClickedComment={previouslyClickedComment} previouslyClickedCommentTimestamp={previouslyClickedCommentTimestamp}
                previouslyClickedCommentUser={previouslyClickedCommentUser} previouslyClickedUser={props.previouslyClickedUser}
                previouslyClickedTweetContent={props.previouslyClickedTweetContent} previouslyClickedTweetTimestamp={props.previouslyClickedTweetTimestamp}/> 
            ) : (
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
                            <span> 0 </span>
                            <span> Re-chats </span>
                        </div>
                        <div>
                            <span>{tweetComments.length}</span>
                            <>
                                {tweetComments.length > 1 ? (
                                    <span> Comments</span>
                                ) : (
                                    <span> Comment</span>
                                )}
                            </>

                        </div>
                        <div>
                            <span> 0 </span>
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
                            <textarea placeholder="Chat your reply" onChange={inputChange} value={commentValue}></textarea>
                            <div className="reply-bottom">
                                <span><FaRegImage /></span>
                                <span><AiOutlineGif /></span>
                                <span><FaSmile /></span>
                                <div>
                                    <div className="reply"
                                        onClick={() => {
                                            sendComment();
                                            setCommentValue('');
                                        }
                                        }
                                    >Reply</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <>
                        {tweetComments.map(comment => {
                            return (
                                <div ref={focusRef} key={Math.random() * 8989} className="explore-tweet-focus"
                                    onClick={() => {
                                        setFocusReply(true);
                                        setPreviouslyClickedComment(comment.text);
                                        setPreviouslyClickedCommentUser(comment.from);
                                        setPreviouslyClickedCommentTimestamp(comment.timestamp)
                                    }}>
                                    {tweetComments.indexOf(comment) === 0 && tweetComments.length !== 1 ? (
                                        <div className='comment-line2'></div>
                                    ) : tweetComments.indexOf(comment) > 0 && tweetComments.indexOf(comment) !== (tweetComments.length - 1) ? (
                                        <div className="comment-line"></div>
                                    ) : tweetComments.indexOf(comment) === 0 && tweetComments.length === 1 ? (
                                        <div className="comment-line4"></div>
                                    ) : (
                                        <div className="comment-line3"></div>
                                    )}


                                    <div className="explore-tweet-left">
                                        <div className='explore-tweet-profile'></div>
                                    </div>

                                    <div className="explore-tweet-right">
                                        <div className="explore-tweet-info">
                                            <span className='tweet-username'>{comment.from}</span>
                                            <span className='tweet-at-and-date'>@{comment.from}  -  {comment.timestamp.toDate().toDateString()}</span>
                                        </div>

                                        <p>{comment.text}
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
                    </>
                </div>
            )}
        </>
    )
}