import { FaHashtag, FaPencilAlt, FaRegComment, FaRegEnvelope, FaSearch, FaShare, FaUser } from "react-icons/fa"
import bird from '../bird.jpg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai"
import { FaArrowLeft } from "react-icons/fa"
import FocusedTweet from "./FocusedTweet"
import { useEffect, useState, useRef } from "react"
import { doc, getDoc, getDocs, query, collection } from "firebase/firestore"
import { db } from "../firebase.config"
import ProfileReply from "./ProfileReply"
import ReplyFocused from "./ReplyFocused"

export default function OtherProfile(props) {

    const [focusReply, setFocusReply] = useState(false);
    const [previouslyClickedComment, setPreviouslyClickedComment] = useState('');
    const [previouslyClickedCommentUser, setPreviouslyClickedCommentUser] = useState('');
    const [previouslyClickedCommentTimestamp, setPreviouslyClickedCommentTimestamp] = useState('');

    useEffect(() => {
        console.log(previouslyClickedComment, previouslyClickedCommentTimestamp)

    }, [previouslyClickedComment])

    const [loadChats, setLoadChats] = useState(true);
    const [loadReplies, setLoadReplies] = useState(false);

    const chatsRef = useRef();
    const repliesRef = useRef();

    const callbackFocusReply = (status) => {
        setFocusReply(status);
    }
    const callbackPreviousCommentInfo = (status1, status2, status3) => {
        setPreviouslyClickedComment(status1);
        setPreviouslyClickedCommentUser(status2);
        setPreviouslyClickedCommentTimestamp(status3);
    }
    

    return (
        <>
            {focusReply ? (
                <ReplyFocused previouslyClickedComment={previouslyClickedComment} previouslyClickedCommentTimestamp={previouslyClickedCommentTimestamp}
                previouslyClickedCommentUser={previouslyClickedCommentUser}/>
            ) : (
                <div className='main container column middle alignCenter'>
                    <div className='go-back-bar'>
                        <span onClick={() => { props.focusOtherUserProfile(false); props.changeLocation('explore'); props.focusOtherUserProfile(false) }}><FaArrowLeft /></span>
                        <div className='profile-middle-name'>
                            <h2>Explore</h2>
                        </div>
                    </div>
                    <div className="profile-banner-and-bio">
                        <div className="banner"></div>
                        <div className="bio">
                            <div className='bio-half'>
                                <span className='follow-profile'>Follow</span>
                            </div>
                            <div className="bio-second-half">
                                <h2>{props.previouslyClickedUser}</h2>
                                <span>@{props.previouslyClickedUser}</span>
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
                                {props.otherUserTweets.map(tweet => {
                                    return (
                                        <div key={Math.random() * 73292} className="explore-tweet" onClick={() => {
                                            props.focus(true);
                                        }}>

                                            <div className="explore-tweet-left">
                                                <div className='explore-tweet-profile'></div>
                                            </div>

                                            <div className="explore-tweet-right">
                                                <div className="explore-tweet-info">
                                                    <span className='tweet-username'>{props.previouslyClickedUser}</span>
                                                    <span className='tweet-at-and-date'>@{props.previouslyClickedUser} - {tweet.timestamp.toDate().toDateString()} </span>
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
                            <ProfileReply globalTweetArray={props.globalTweetArray} previouslyClickedUser={props.previouslyClickedUser}
                                otherUserProfile={props.otherUserProfile} replyFocused={callbackFocusReply} commentInfo={callbackPreviousCommentInfo}/>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            )}
            
        </>
    )
}

