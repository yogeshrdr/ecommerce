import React from 'react'
import './Header.css'
import DesktopHeader from './DesktopHeader'
import MobileHeader from  './MobileHeader'


function Header({isMobile, width, scroll}) {
    return (
        <React.Fragment>
            {isMobile ? (
            <React.Fragment>
                <MobileHeader scroll={scroll}/>
            </React.Fragment>) : 
        ( <React.Fragment>
            <DesktopHeader width={width}/>
        </React.Fragment>)}
        </React.Fragment>
    )
}

export default Header
