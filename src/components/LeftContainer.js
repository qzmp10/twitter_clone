import { useRef } from 'react'
import bird from '../bird.jpg'
import { FaRegEnvelope, FaUser, FaHashtag } from 'react-icons/fa'

export default function LeftContainer(props) {



    const explore = useRef();
    const messages = useRef();
    const profile = useRef();

    //do animations for hover
    function hover(ref) {
        ref.style.backgroundColor = 'rgba(255, 145, 145, 0.326)'
    }
    function outHover(ref) {
        ref.style.backgroundColor = 'white';
    }
    return (
        //main container column left alignEnd
        <div className='main-container'>
            <div className='left-bar container row justifyStart'>
                <img className='bird' src={bird} alt='bird logo' />
            </div>
            <div className='left-bar container row justifyStart alignCenter'>
                <span ref={explore} className='left-bar-child' onMouseOver={() => { hover(explore.current) }} onMouseOut={() => { outHover(explore.current) }}>
                    <i className='i'><FaHashtag /> </i>
                    <span>Explore</span>
                </span>
            </div>
            {props.signedInStatus ? (
                <>
                    <div className='left-bar container row justifyStart alignCenter'>
                        <span ref={messages} className='left-bar-child' onMouseOver={() => { hover(messages.current) }} onMouseOut={() => { outHover(messages.current) }}>
                            <i><FaRegEnvelope /></i>
                            <span>Messages</span>
                        </span>
                    </div>
                    <div className='left-bar container row justifyStart alignCenter' >
                        <span ref={profile} className='left-bar-child' onMouseOver={() => { hover(profile.current) }} onMouseOut={() => { outHover(profile.current) }}>
                            <i><FaUser /></i>
                            <span>Profile</span>
                        </span>
                    </div>
                    <div className='left-bar container row justifyStart alignCenter'>
                        <div className='tweetButton'>Chat</div>
                    </div>
                </>
            ) : (
                <div> </div>
            )}
            {/* <div className='left-bar container row justifyStart alignCenter'>
                <i><FaRegEnvelope /></i>
                <span>Messages</span>
            </div>
            <div className='left-bar container row justifyStart alignCenter'>
                <i><FaUser /></i>
                <span>Profile</span>
            </div> */}
        </div>
    )
}