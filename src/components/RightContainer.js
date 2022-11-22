import { useState } from "react";
import { updateCurrentUser, currentUser, EmailAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc} from "firebase/firestore";

export default function RightContainer(props) {
    const signUp = () => {
        props.signUp(true);
        // props.signIn(true);
    }

    async function getFirstThreeUsers() {
        const ref = await doc(db)
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
                                    User
                                </span>
                                <span className="followAt">
                                    @user1
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
                                    User
                                </span>
                                <span className="followAt">
                                    @user2
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
                                    User
                                </span>
                                <span className="followAt">
                                    @user3
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