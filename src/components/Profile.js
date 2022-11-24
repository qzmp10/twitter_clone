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

export default function Profile(props) {
    const [focusReply, setFocusReply] = useState(false);
    const [previouslyClickedComment, setPreviouslyClickedComment] = useState('');
    const [previouslyClickedCommentUser, setPreviouslyClickedCommentUser] = useState('');
    const [previouslyClickedCommentTimestamp, setPreviouslyClickedCommentTimestamp] = useState('');
    const [ogTweetContent, setOgTweetContent] = useState('');
    const [ogTweetUser, setOgTweetUser] = useState('');
    const [ogTweetTimestamp, setOgTweetTimestamp] = useState('');
    const [loadChats, setLoadChats] = useState(true);
    const [loadReplies, setLoadReplies] = useState(false);

    const chatsRef = useRef();
    const repliesRef = useRef();

    return (
        <>
            <div className='main container column middle alignCenter'>
                <div className='go-back-bar'>
                    <span onClick={() => { props.changeLocation('explore'); props.focus(false); props.focusOtherUserProfile(false) }}><FaArrowLeft /></span>
                    <div className='profile-middle-name'>
                        <h2>{props.user}</h2>
                        <span>1 Tweet</span>
                    </div>
                </div>
                {focusReply ? (
                    <ReplyFocused previouslyClickedTweetContent={ogTweetContent} previouslyClickedUser={ogTweetUser}
                        previouslyClickedTweetTimestamp={ogTweetTimestamp} previouslyClickedComment={previouslyClickedComment}
                        previouslyClickedCommentUser={previouslyClickedCommentUser} previouslyClickedCommentTimestamp={previouslyClickedCommentTimestamp} />
                ) : (
                    <>
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
                                    {currentUserTweets.map(tweet => {
                                        return (
                                            <div key={Math.random() * 73292} className="explore-tweet" onClick={() => {
                                                props.focus(true);
                                                setPreviouslyClickedUser(props.user);
                                                setPreviouslyClickedTweetContent(tweet.text);
                                                setPreviouslyClickedTweetTimestamp(tweet.timestamp.toDate().toDateString());
                                                console.log('clicked')

                                            }}>

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
                                </>
                            ) : loadReplies ? (
                                <ProfileReply globalTweetArray={globalTweetArray} user={props.user} otherUserProfile={props.otherUserProfile}
                                    replyFocused={setFocusReply} commentInfo={callbackCommentInfo} />
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}