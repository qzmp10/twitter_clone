import { useState, useEffect } from "react";
import { updateCurrentUser, currentUser, EmailAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc, collection, query, getDocs } from "firebase/firestore";

export default function RightContainer(props) {

    const [firstThreeUsers, setFirstThreeUsers] = useState([])

    useEffect(() => {
        getFirstThreeUsers();
    }, [])

    const signUp = () => {
        props.signUp(true);
    }

    async function getFirstThreeUsers() {
        let array = []
        const q = query(collection(db, 'users'));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            if (array.length < 3) {
                array.push(doc.id);
            } else {
                return;
            }
        })

        setFirstThreeUsers(array);
    }

    return (
        <>
            {props.signedInStatus ? (
                <div className=' main right container column alignStart'>
                    <div className='signUp-box-gray'>
                        <div className='signUp-box-header text'>Who to follow</div>
                        <div className='followSuggestion'>
                            <div className='followProfile'>

                            </div>
                            <div className='followName'>
                                <span className='followUser'>
                                    {firstThreeUsers[0]}
                                </span>
                                <span className="followAt">
                                    @{firstThreeUsers[0]}
                                </span>
                            </div>
                            <div className='followButton'>
                                Follow
                            </div>
                        </div>
                        <div className='followSuggestion'>
                            <div className='followProfile'>

                            </div>
                            <div className='followName'>
                                <span className='followUser'>
                                    {firstThreeUsers[1]}
                                </span>
                                <span className="followAt">
                                    @{firstThreeUsers[1]}
                                </span>
                            </div>
                            <div className='followButton'>
                                Follow
                            </div>
                        </div>
                        <div className='followSuggestion'>
                            <div className='followProfile'>

                            </div>
                            <div className='followName'>
                                <span className='followUser'>
                                    {firstThreeUsers[2]}
                                </span>
                                <span className="followAt">
                                    @{firstThreeUsers[2]}
                                </span>
                            </div>
                            <div className='followButton'>
                                Follow
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='main container column right alignStart'>
                    <div className='signUp-box'>
                        <div className='signUp-box-header text'>New to Chatter?</div>
                        <div className='smolText text'>Sign up now to get your own personalized timeline!</div>
                        <div className='endBox'>
                            <div className='signUp-box-button' onClick={signUp}>
                                Sign Up
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}