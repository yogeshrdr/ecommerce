import React from 'react'
import DesktopTitleBar from './TitleBar/DesktopTitleBar/DesktopTitleBar'
import MobileTitleBar from './TitleBar/MobileTitleBar/MobileTitleBar'

function Titlebar({width}) {
    const isMobile = width <=1024
    return (
       <React.Fragment>
             {isMobile ? (<MobileTitleBar />) :(<DesktopTitleBar width={width}/>)}
       </React.Fragment>
    )
}

export default Titlebar
