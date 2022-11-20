export default function Footer(props) {

    const signIn = () => {
        props.signIn(true);
    }
    return (
        <div className='footer'>
            <div className='dontMiss'>
                <div className='span1'>
                    Don't miss what's happening
                </div>
                <div className='span2'>
                    People on Chatter are first to know
                </div>
            </div>
            <div className='authentication'>
                <span className="logIn" onClick = {() => {
                    props.logIn(true);
                }}>
                    Log In
                </span>
                <span className="signUp" onClick={signIn}>
                    Sign Up
                </span>
            </div>
        </div>
    )
}