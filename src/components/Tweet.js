import { FaGlobeAmericas, FaRegImage, FaRegWindowClose, FaSmile } from "react-icons/fa";
import { AiOutlineGif } from 'react-icons/ai'
import { useState } from "react";
import { arrayUnion, doc, updateDoc, serverTimestamp, Timestamp} from "firebase/firestore";
import { db } from "../firebase.config";
import {  useEffect } from "react";

export default function Tweet(props) {

    const [tweetContent, setTweetContent] = useState('');

    useEffect(() => {
        console.log(props.user)
    }, [])

    const changeTweetStatus = () => {
        props.tweet(false);
    }

    const inputChange = (e) => {
        setTweetContent(e.target.value);
        console.log(tweetContent)
    }

    async function updateTweets() {
        const userData  = await doc(db, 'users', `${props.user}`);



        await updateDoc(userData, {
            tweets: arrayUnion({text: tweetContent, 
            timestamp: Timestamp.now()}),
        })
    }

    return(
        <div className='tweet-popUp'>
            <div className="x" onClick={changeTweetStatus}><FaRegWindowClose/></div>
            <div className='tweet-left-column'>
                <div className='tweetProfile'></div>
            </div>
            <div className='tweet-right'>
                <div className='everyone'>Everyone</div>
                <textarea placeholder="What's happening?" value={tweetContent} onChange={inputChange}></textarea>
                <div className="reply-options"><FaGlobeAmericas /> Everyone can reply</div>
                <div className="right-bottom">
                    <div className='bottom-icon'>
                        <FaRegImage/>
                    </div>
                    <div className='bottom-icon'>
                        <AiOutlineGif/>
                    </div>
                    <div className='bottom-icon'>
                        <FaSmile />
                    </div>
                    <div className='bottom-chat'>
                        <div className='bottom-chat-button' onClick={() => {
                            updateTweets();
                            changeTweetStatus();
                        }}>
                            Chat
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}