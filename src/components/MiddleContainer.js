import { FaSearch } from "react-icons/fa"
import bird from '../bird.jpg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function MiddleContainer(props) {
    return (
        <div className='main container column middle alignCenter'>
            <div className='middle-bar'>
                <div className='icon'>
                    <img src={bird} alt='bird logo' />
                </div>
                <label>
                    <div>
                        <FaSearch />
                    </div>
                    <input type='text' placeholder="Search Chatter" />
                </label>
            </div>

        </div>


    )
}