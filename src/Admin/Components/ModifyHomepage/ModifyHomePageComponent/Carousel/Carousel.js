import React from 'react'
import DesktopCarousel from './DesktopCarousel/DesktopCarousel'
import MobileCarousel from './MobileCarousel/MobileCarousel'
import './Carousel.css'

function Carousel() {
    return (
        <div className="Carousel__admin">
            <DesktopCarousel />
            <MobileCarousel />
        </div>
    )
}

export default Carousel
