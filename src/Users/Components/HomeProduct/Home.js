import React from 'react';
import './Home.css';
import Carouselele from './Carousel/Carouselele';
import HomeProduct from './Product/HomeProduct';


function Home({width}) {
    const isMobile = width <= 970
    return (
        <div className="home">
            <Carouselele Width={width} />
            <HomeProduct Width={width}/>
        </div>
    )
}

export default Home
