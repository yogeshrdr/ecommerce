import React, {useState, useEffect} from 'react'
import './Carouselele.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useStateValue } from '../../../../ContextApi/StateProvider';


function Carouselele({Width}) {
    const isMobile = Width <= 970
    const [{mobileCarousel, desktopCarousel}] = useStateValue();

    return (
        <div className="home__container">
            {isMobile ? (
                <Carousel  autoPlay={true} interval={5000} showArrows={true} emulateTouch={true} infiniteLoop={true} showStatus={false}  showThumbs={false}>
                {mobileCarousel!==undefined && mobileCarousel.map((data,i) =>
                    ( 
                    <div  key={i}>
                        <img className="mobile_image" src ={data.data.img} alt="carouselImage"/>
                    </div>
                ))}
            </Carousel> 
            ) :(

                <Carousel  autoPlay={true} interval={5000} showArrows={true} emulateTouch={true} infiniteLoop={true} showStatus={false}  showThumbs={false}>
                    {desktopCarousel!==undefined && desktopCarousel.map((data,i) =>
                        ( 
                        <div  key={i}>
                            <img className="homeimage__carouselimage" src ={data.data.img} alt="carouselImage"/>
                        </div>
                    ))}
                </Carousel> 
            )}
    </div >
    )
   
}

export default Carouselele
