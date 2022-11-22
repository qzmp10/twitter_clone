export default function Footer(props) {

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
                <span className="signUp" onClick = {() => { props.signUp(true) }} >
                    Sign Up
                </span>
            </div>
        </div>
    )
}