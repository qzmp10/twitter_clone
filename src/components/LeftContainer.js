import { useRef, useState } from 'react'
import bird from '../bird.jpg'
import { FaRegEnvelope, FaUser, FaHashtag, FaRegWindowClose } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'

export default function LeftContainer(props) {

    const [clickedOptions, setClickedOptions] = useState(false);

    const explore = useRef();
    const messages = useRef();
    const profile = useRef();

    const changeTweetStatus = () => {
        props.tweet(true);
    }

    return (
        <>
            <div className='main-container'>
                <div className='left-bar container row justifyStart'>
                    <img className='bird' src={bird} alt='bird logo' />
                </div>
                <div className='left-bar container row justifyStart alignCenter'>
                    <span ref={explore} className='left-bar-child'
                        onClick={() => { props.changeLocation('explore'); props.focus(false); props.focusOtherUserProfile(false); }}>
                        <i className='i'><FaHashtag /> </i>
                        <span>Explore</span>
                    </span>
                </div>
                {props.signedInStatus ? (
                    <>
                        <div className='left-bar container row justifyStart alignCenter'>
                            <span ref={messages} className='left-bar-child'
                                onClick={() => { props.changeLocation('messages'); props.focus(false); props.focusOtherUserProfile(false); }}>
                                <i><FaRegEnvelope /></i>
                                <span>Messages</span>
                            </span>
                        </div>
                        <div className='left-bar container row justifyStart alignCenter' >
                            <span ref={profile} className='left-bar-child'
                                onClick={() => { props.changeLocation('profile'); props.focus(false); props.focusOtherUserProfile(false);   }}>
                                <i><FaUser /></i>
                                <span>Profile</span>
                            </span>
                        </div>
                        <div className='left-bar container row justifyStart alignCenter'>
                            <div className='tweetButton' onClick={changeTweetStatus}>Chat</div>
                        </div>

                        <div className='left-bar left-profile'>

                            {clickedOptions ? (
                                <div className='logOut' onClick={() => {
                                    setClickedOptions(false);
                                    props.signIn(false);
                                }}>
                                    <div >Log Out</div>
                                    <span onClick={(e) => {
                                        e.stopPropagation();
                                        setClickedOptions(false);
                                    }}><FaRegWindowClose /></span>
                                </div>

                            ) : (
                                <div></div>
                            )}

                            <div className='profile-container'>
                                <div className='left-profile-picture'>
                                </div>
                                <div className='left-profile-info'>
                                    <div>{props.user}</div>
                                    <span>@{props.user}</span>
                                </div>
                                <div className='left-profile-options'

                                    onClick={() => {
                                        setClickedOptions(true);
                                    }}>
                                    <>
                                    </>
                                    <SlOptions />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div> </div>
                )}
            </div>
        </>
    )
}