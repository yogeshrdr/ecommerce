import React,{useState, useEffect} from 'react';
import './DemoPage.css';
import DemoCarousel from './Carousel/DemoCarousel';
import HomeProduct from './HomeProduct/HomeProduct';


function DemoPage({Width}) {
    const isMobile = Width <= 890

    return (
        <div className="home">
            <DemoCarousel Width={Width} />
            <HomeProduct  Width={Width}/>
        </div>
    )
}

export default DemoPage
