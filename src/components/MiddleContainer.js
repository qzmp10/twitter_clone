import { FaSearch } from "react-icons/fa"
export default function MiddleContainer(props) {
    return (
        <div className='main container column middle alignCenter'>
            <div className='middle-bar'>
                <label>
                    <div>
                        <FaSearch />
                    </div>
                    <input type='text' placeholder="Search" />
                </label>

            </div>
        </div>
    )
}