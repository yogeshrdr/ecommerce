import React from 'react';
import './Header.css'
import AddComponentCategory from './HeaderComponents/AddComponentCategory';
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div>
        <div className="Adminheader">
            <Link to ="/admin">
            <img
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt="logo"
            />
            </Link>

            <div className="Adminheader__nav">
            <AddComponentCategory />
            </div>
        </div>
    
        </div>
    )
}

export default Navbar
