import React, {useState, useEffect} from 'react'
import './DemoCarousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from '../../../../../../Database/firebase';
import { useStateValue } from '../../../../../../ContextApi/StateProvider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function DemoCarousel({Width}) {
    const isMobile = Width <= 970
    const [{mobileCarousel, desktopCarousel}] = useStateValue();


    const deleteFilefromdatabase = (e, id, url) =>{
        e.preventDefault();
        db.collection('AdminController').doc('Carousel').collection('CarouselMobile').doc(`${id}`).delete();
        let pictureRef = storage.refFromURL(url);
        pictureRef.delete();
    }

    const deleteFilefromdatabasedesktop = (e, id, url) =>{
        e.preventDefault();
        db.collection('AdminController').doc('Carousel').collection('CarouselDesktop').doc(`${id}`).delete();
        let pictureRef = storage.refFromURL(url);
        pictureRef.delete();
    }

    // useEffect(() =>{
    //     db.collection('AdminController').doc('Carousel').collection(`${isMobile ? "CarouselMobile": "CarouselDesktop"}`)
    //     .onSnapshot(snapshot => {
    //         setCarousel( snapshot.docs.map(doc => ({ 
    //             id : doc.id, 
    //             data: doc.data()
    //         })));
    //     })
    // }, [isMobile] )

    // console.log(mobileCarousel)

    return (
        <div className="home__container">
            {isMobile ? (
                <Carousel  autoPlay={true} interval={5000} showArrows={true} emulateTouch={true} infiniteLoop={true} showStatus={false}  showThumbs={false}>
                {mobileCarousel!==undefined && mobileCarousel.map(data =>
                    ( 
                    <div  key={data.id}>
                        <IconButton aria-label="delete" onClick ={e => deleteFilefromdatabase(e, data.id, data.data.img)}>
                            <DeleteIcon />
                        </IconButton>
                        <img className="mobile_image" src ={data.data.img} alt="carouselImage"/>
                    </div>
                ))}
            </Carousel> 
            ) :(

                <Carousel  autoPlay={true} interval={5000} showArrows={true} emulateTouch={true} infiniteLoop={true} showStatus={false}  showThumbs={false}>
                    {desktopCarousel!==undefined && desktopCarousel.map(data =>
                        ( 
                        <div  key={data.id}>
                            <IconButton aria-label="delete" onClick ={e => deleteFilefromdatabasedesktop(e, data.id, data.data.img)}>
                                <DeleteIcon />
                            </IconButton>
                            <img className="home__carouselimage" src ={data.data.img} alt="carouselImage"/>
                        </div>
                    ))}
                </Carousel> 
            )}
    </div >
    )
}

export default DemoCarousel
