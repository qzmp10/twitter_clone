import {FaHashtag, FaRegEnvelope, FaUser, FaPencilAlt} from 'react-icons/fa'

export default function MobileSignedInFooter(props) {
    return (
        <>
        <div className='mobileBottomBar'>
            <div className="mobileExplore"><FaHashtag /> </div>
            <div className="mobileMessages"><FaRegEnvelope /></div>
            <div className="mobileProfile"><FaUser /></div>
        </div>
        </>
    )
}