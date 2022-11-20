import { FaGlobeAmericas, FaRegImage, FaRegWindowClose, FaSmile } from "react-icons/fa";
import { AiOutlineGif } from 'react-icons/ai'
import { useState } from "react";

export default function Tweet(props) {

    const [tweetContent, setTweetContent] = useState()
    const changeTweetStatus = () => {
        props.tweet(false);
    }
    return(
        <div className='tweet-popUp'>
            <div className="x" onClick={changeTweetStatus}><FaRegWindowClose/></div>
            <div className='tweet-left-column'>
                <div className='tweetProfile'></div>
            </div>
            <div className='tweet-right'>
                <div className='everyone'>Everyone</div>
                <textarea placeholder="What's happening?"></textarea>
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
                        <div className='bottom-chat-button'>
                            Chat
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}