import React from 'react'
import DesktopNavbar from './Navbar/DesktopNavbar/DesktopNavbar'
import DesktopTitleBar from './TitleBar/DesktopTitleBar/DesktopTitleBar'


function DesktopHeader({width}) {
    
    return (
        <React.Fragment>
            <DesktopNavbar className="navbar"  />
            
        </React.Fragment>
    )
}

export default DesktopHeader
