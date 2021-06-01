import React from 'react';
import NavbarSearch from '../NavbarComponents/NavbarSearch';
import NavbarSignIn from '../NavbarComponents/NavbarSignIn';
import NavbarOrder from '../NavbarComponents/NavbarOrder';
import './DesktopNavbar.css';
import NavbarCart from '../NavbarComponents/NavbarCart';
import NavbarLocation from '../NavbarComponents/NavbarLocation';
import { Link } from 'react-router-dom';


function DesktopNavbar() {
    return (
        <div className="header">
        
        <Link to='/'>
        <img
                className="header__logo"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="logo"
        />
        </Link>

        <NavbarLocation />
        <NavbarSearch />


        <div className="header__nav">
            <NavbarSignIn />
            <NavbarOrder />
            <NavbarCart />
        </div>
        </div>
        
    )
}

export default DesktopNavbar
