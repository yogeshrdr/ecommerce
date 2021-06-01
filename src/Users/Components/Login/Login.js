import React, { useState } from 'react';
import './Login.css';
import {Link, useHistory} from 'react-router-dom';
import {auth} from '../../../Database/firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = (e) =>{
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then(
            auth => {
                history.push('/')
            }).catch(error => alert(error.message))
    }


    return (
        <div className="login">
        <div className="login__container">
        <Link to="/">
            <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="AppLogo"/>
        </Link>
            <h1>Sign-In</h1>

            <form>
                <h5>E-mail</h5>
                <input type="text" value={email} onChange = {e => setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                <button type="submit" onClick={signIn} className="login__signInButton">Sign In</button>
            </form>
            
            <p>By signing-in you agree to this Ecommerce's Condition of Use & Sale. Please see our Privacy Policy</p>
            
            <Link to="/register">
            <button  className="login__registerButton">Create your Amazon Account</button>
            </Link>
        </div>
        </div>
    )
}

export default Login
