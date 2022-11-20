import { FaRegWindowClose } from "react-icons/fa"
import { useState } from 'react'
import { auth, db } from "./firebase.config";
import { updateCurrentUser, currentUser, EmailAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function LogiNContainer(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const inputChange = (e) => {
        if(e.target.id === 'email') {
            setEmail(e.target.value)
        }
        if(e.target.id === 'password') {
            setPassword(e.target.value)
        }
        if(e.target.id === 'username') {
            setUsername(e.target.value)
        }
        console.log(email, password, username)
    }

    async function logInFirebase() {
        await signInWithEmailAndPassword(auth, email, password);
        if(auth.currentUser) {
            props.logIn(false);
            props.signIn(true);
            props.user(username);
        } else {
            console.log('error bro')
        }

    }


    return(
        <div className='tweet-popUp2'>
            <div className="x" onClick={() => {
                props.logIn(false)
            }}><FaRegWindowClose/></div>
            <h1>Log In</h1>
            <input className='signUpInput' type="email" placeholder="E-mail" 
            value={email} id="email" onChange={inputChange} required/>
            <input className='signUpInput' placeholder="Password" type="password" 
            value={password} id="password" onChange={inputChange} required/>
            <input  className='signUpInput'type="text" placeholder="Username" 
            value={username} id="username" onChange={inputChange} required/>
            <div className='popUpSignUp' onClick={() => {
                logInFirebase();
            }}>Log In</div>
        </div>
    )
}