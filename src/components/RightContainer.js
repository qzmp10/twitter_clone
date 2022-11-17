
export default function RightContainer(props) {

    const signIn = () => {
        props.signIn(true);
    }

    return (
        <>
            {props.signedInStatus ? (
                <div className='main container column right alignStart'>
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
                            <div className='signUp-box-button' onClick={signIn}>
                                Sign Up
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}