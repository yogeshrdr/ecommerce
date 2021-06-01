import React from 'react'
import Carousel from './ModifyHomePageComponent/Carousel/Carousel'
import Productadd from './ModifyHomePageComponent/Productadd/Productadd'
import DemoPage from './ModifyHomePageComponent/DemoPage/DemoPage'
import './ModifyHomePage.css'

function ModifyHomePage() {
    return (
        <div className="homepagedesiging">
            <div className="DemoView">
            <div className="homepage__home__desktop" >
            <DemoPage Width={1368} />
            </div>

            <div className="homepage__home__mobile" >
            <DemoPage Width={100} />
            </div>
            </div>
            <Carousel />
            <Productadd />
        </div>
        // <div className="ModifyHomePage">
        //     <Homepage />
        //     <Carousel />
        //     <Productadd />
        // </div>
    )
}

export default ModifyHomePage
