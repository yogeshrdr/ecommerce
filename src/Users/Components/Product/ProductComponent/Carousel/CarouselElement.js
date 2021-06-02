import React, { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';
import './CarouselElement.css'

function CarouselElement({id, images}) {

    useEffect(() =>{
        if(images!==null && images!==undefined)
        {
            images.sort((a, b) => {
                return a.index- b.index;
            });
        }
            
    }, [images])


    return (
        <div className="Carousel">
            <Carousel emulateTouch={true} showArrows={true} showStatus={false}  showThumbs={false}  thumbWidth={55} useKeyboardArrows={true}>
                            {images?.map((d,i)=>(
                                <div key={i}>
                                    <img className="Carousel_image" src={d.url} alt="CarouselImage"/>
                                </div>
                            ))}
            </Carousel> 
        </div>
    )
}

export default CarouselElement
