

import { FaHashtag, FaPencilAlt, FaRegComment, FaRegEnvelope, FaSearch, FaShare, FaUser } from "react-icons/fa"
import { AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai"
import { useEffect, useState } from "react";

export default function ProfileReply(props) {

    const [replyArray, setReplyArray] = useState([]);

    useEffect(() => {
        getUserComments();
    }, [])

    useEffect(() => {
        props.update();
    }, [replyArray])

    function getUserComments() {
        let array = [];
        props.globalTweetArray.forEach(tweet => {
            tweet.comments.forEach(comment => {
                if (props.otherUserProfile === false) {
                    if (comment.from === `${props.user}`) {
                        console.log(tweet, comment);
                        array.push({ tweet: tweet, comment: comment })
                    }
                } else if (props.otherUserProfile === true) {
                    if (comment.from === `${props.previouslyClickedUser}`) {
                        console.log(tweet, comment);
                        array.push({ tweet: tweet, comment: comment })
                    }
                } 
            })
        })

        setReplyArray(array);
    }

    return (
        <>
            {replyArray.map(reply => {
                return (
                    <div key={Math.random() * 47474} className="profileReply"
                        onClick={() => {
                            props.replyFocused(true);
                            props.commentInfo(reply.comment.text, reply.comment.from, reply.comment.timestamp,
                                reply.tweet.text, reply.tweet.name, reply.tweet.timestamp.toDate().toDateString(),  reply.comment.likes, reply.tweet.likes,);
                        }}>
                        <div className="reply-line"></div>
                        <div key={Math.random() * 73292} className="explore-tweet-replies">

                            <div className="explore-tweet-left">
                                <div className='explore-tweet-profile'></div>
                            </div>

                            <div className="explore-tweet-right">
                                <div className="explore-tweet-info">
                                    <span className='tweet-username'>{reply.tweet.name}</span>
                                    <span className='tweet-at-and-date'>@{reply.tweet.name} - {reply.tweet.timestamp.toDate().toDateString()} </span>
                                </div>

                                <p>{reply.tweet.text}</p>

                                <div className="tweet-reactions">
                                    <div className="tweet-comments tweet-reaction">
                                        <span><FaRegComment /></span>
                                        <span>{reply.tweet.comments.length}</span>
                                    </div>
                                    <div className="tweet-retweets tweet-reaction">
                                        <span><AiOutlineRetweet /></span>
                                        <span>0</span>
                                    </div>
                                    <div className="tweet-likes tweet-reaction">
                                        <span><AiOutlineHeart /></span>
                                        <span>{reply.tweet.likes}</span>
                                    </div>
                                    <div className="tweet-share tweet-reaction">
                                        <span><AiOutlineShareAlt /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div key={Math.random() * 73292} className="explore-tweet">

                            <div className="explore-tweet-left">
                                <div className='explore-tweet-profile'></div>
                            </div>

                            <div className="explore-tweet-right">
                                <div className="explore-tweet-info">
                                    <span className='tweet-username'>{reply.comment.from}</span>
                                    <span className='tweet-at-and-date'>@{reply.comment.from} - {reply.comment.timestamp.toDate().toDateString()}</span>
                                </div>

                                <p>{reply.comment.text}</p>

                                <div className="tweet-reactions">
                                    <div className="tweet-comments tweet-reaction">
                                        <span><FaRegComment /></span>
                                        <span>0</span>
                                    </div>
                                    <div className="tweet-retweets tweet-reaction">
                                        <span><AiOutlineRetweet /></span>
                                        <span>0</span>
                                    </div>
                                    <div className="tweet-likes tweet-reaction">
                                        <span><AiOutlineHeart /></span>
                                        <span>{reply.comment.likes}</span>
                                    </div>
                                    <div className="tweet-share tweet-reaction">
                                        <span><AiOutlineShareAlt /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}