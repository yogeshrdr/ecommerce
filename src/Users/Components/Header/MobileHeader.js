import React from 'react'
import MobileNavbar from './Navbar/MobileNavbar/MobileNavbar'
import MobileTitleBar from './TitleBar/MobileTitleBar/MobileTitleBar'

function MobileHeader({scroll}) {
    
    return (
        <React.Fragment>
            <MobileNavbar scroll={scroll}/>
            
        </React.Fragment>
    )
}

export default MobileHeader
