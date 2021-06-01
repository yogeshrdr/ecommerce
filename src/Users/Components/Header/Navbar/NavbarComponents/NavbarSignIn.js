import React from 'react';
import { Link } from 'react-router-dom';
import {useStateValue} from '../../../../../ContextApi/StateProvider';
import {auth} from '../../../../../Database/firebase';

function NavbarSignIn() {
    const [ {user}, dispatch] = useStateValue();
    
    const handleAuthetication = () =>{
        if(user){
            auth.signOut();
            dispatch({
                type : 'ADD_ORDERS',
                item : []
            })
        }
    }
    
    return (
        <Link to={!user && "/login"}>
        <div onClick={handleAuthetication} className="header__option">
                <span  className="header__optionLineOne">Hello {!user ? 'Guest' : user.displayName}</span>
                <span className="header__optionLineTwo">{ user ? 'SignOut' : 'SignIn'}</span>
        </div>
        </Link>
    )
}

export default NavbarSignIn
