import { query, doc, where, getDoc, collection, updateDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { AiOutlineGif, AiOutlineHeart, AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai";
import { FaArrowLeft, FaRegComment, FaRegImage, FaSmile } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { db } from "../firebase.config";

//YOU WERE, YOU NEED TO SHOW A REPLY AS FOCUSED WITH REPLY COMMENTS ALSO DISPLAYED
export default function ReplyFocused(props) {
    return (
        <>
            <div className="middle-focused-container forReply">
                <div key={Math.random() * 73292} className="explore-tweet-reply">
                    <div className="comment-line5"></div>
                    <div className="explore-tweet-left">
                        <div className='explore-tweet-profile'></div>
                    </div>

                    <div className="explore-tweet-right">
                        <div className="explore-tweet-info">
                            <span className='tweet-username'>{props.previouslyClickedUser}</span>
                            <span className='tweet-at-and-date'>
                                @{props.previouslyClickedUser} - {props.previouslyClickedTweetTimestamp} </span>
                        </div>

                        <p>{props.previouslyClickedTweetContent}</p>

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
                <div>
                    <div className='focused-profile'></div>
                    <div className='focused-info'>
                        <span className='one'>{props.previouslyClickedCommentUser}</span>
                        <span className='two'>@{props.previouslyClickedCommentUser}</span>
                    </div>
                    <i><SlOptions /></i>
                </div>
                <p> {props.previouslyClickedComment}
                </p>
                <div className="focused-date">
                    {props.previouslyClickedCommentTimestamp.toDate().toDateString()}
                </div>
                <div className="focused-reactions ">
                    <div>
                        <span> 0 </span>
                        <span> Re-chats </span>
                    </div>
                    <div>
                        <span> 0 </span>
                        <span> Comments </span>

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

            </div>
        </>
    )
}