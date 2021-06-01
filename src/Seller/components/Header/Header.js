import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom';
import AddProductComponent from './HeaderCompoenent/AddProductComponet';
import DisplayProductComponent from './HeaderCompoenent/DisplayProductComponent';

function Header() {
    return (
        <div>
        <div className="Adminheader">
            <Link to ="/seller">
            <img
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt="logo"
            />
            </Link>

            <div className="Adminheader__nav">
                <DisplayProductComponent />
                <AddProductComponent />
            </div>
        </div>
        </div>
    )
}

export default Header
