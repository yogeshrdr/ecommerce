import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {auth} from '../../../Database/firebase';

function Register() {

    const [username, setUsername] = useState();
    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const register = (e) =>{
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log(auth);
            if(auth){
                history.push('/')
                
                return auth.user.updateProfile({
                    displayName: username,
                })
            }
        }).catch(error => alert(error.message))
    }
    
    return (
        <div>
        <div className="login">
        <div className="login__container">
        <Link to="/">
            <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="AppLogo"/>
        </Link>
            <h1>Register</h1>

            <form>
                <h5>Username</h5>
                <input type="text" value={username} onChange = {e => setUsername(e.target.value)} />
                <h5>E-mail</h5>
                <input type="text" value={email} onChange = {e => setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={register} className="login__signInButton">Register</button>
            </form>
            <p>By signing-in you agree to this Ecommerce's Condition of USe & Sale. Please see our Privacy Policy</p>
            <Link to='/login'>
            <button  className="login__registerButton">Already have an Account</button>
            </Link>
        </div>
        </div>
        </div>
    )
}

export default Register
