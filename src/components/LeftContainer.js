import { useRef } from 'react'
import bird from '../bird.jpg'
import { FaRegEnvelope, FaUser } from 'react-icons/fa'

export default function LeftContainer(props) {


    const explore = useRef();

    //do animations for hover
    const hover = () => {
        explore.current.style.backgroundColor = 'rgba(255, 145, 145, 0.326)'
    }
    const outHover = () => {
        explore.current.style.backgroundColor='white';
    }
    return (
        <div className='main container column left alignEnd'>
            <div className='left-bar container row justifyStart'>
                <img className='bird' src={bird} alt='bird logo' />
            </div>
            <div className='left-bar container row justifyStart alignCenter'>
                <span ref={explore} className='left-bar-child' onMouseOver={hover} onMouseOut={outHover}>
                    <span>#</span>
                    <span>Explore</span>
                </span>
            </div>
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