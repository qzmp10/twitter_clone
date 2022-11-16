import { useRef } from 'react'
import bird from '../bird.jpg'
import { FaRegEnvelope, FaUser } from 'react-icons/fa'

export default function LeftContainer(props) {
    
    const birdDiv = useRef();

    const hover = (x, y) => {

    }

    return (
        <div className='main container column left alignEnd'>
            <div ref={birdDiv} className='left-bar container row justifyStart'>
                <img className='bird' src={bird} alt='bird logo' />
            </div>
            <div className='left-bar container row justifyStart alignCenter'>
                <p>#</p>
                <span>Explore</span>
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