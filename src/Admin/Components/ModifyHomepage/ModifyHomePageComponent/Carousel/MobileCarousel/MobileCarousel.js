import React, { useEffect, useState } from "react";
import { db, storage } from '../../../../../../Database/firebase';
import firebase from 'firebase';
import './MobileCarousel.css';
import { Carousel } from 'react-responsive-carousel';
import { Button, IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(0),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '80%',
      },
}));

const MobileCarousel = () => {
    const [file, setFile] = useState([]);
    const [carousel, setCarousel] = useState([]);
    const classes = useStyles();

    const  uploadSingleFile = (e) => {
        setFile([...file, {img : e.target.files[0], imgURL : URL.createObjectURL(e.target.files[0])} ]);
    }

    // useEffect(() =>{
    //     db.collection('AdminController').doc('CarouselMobile').collection('CarouselMobile').onSnapshot(snapshot => {
    //         setCarousel(snapshot.docs.map(doc => ({
    //             id : doc.id,
    //             data : doc.data()
    //         })))
    //     })
    // }, [])

    // console.log(carousel);

    const  upload = (e) => {
        e.preventDefault();
        {
            file.length > 0 && file.map(image => {
                const uploadTask = storage.ref(`images/carousel/mobileCarousel/${image.img.name}`).put(image.img);
                uploadTask.on(
                    "state_changed",
                    () => {
                        storage.ref("images/carousel/mobileCarousel").child(image.img.name).getDownloadURL()
                        .then(url => {
                            db.collection('AdminController').doc('Carousel').collection('CarouselMobile').doc(`${image.img.name}`).set({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                img : url
                            });
                        });
                    }
                );
            })
        }
        
        setFile([]);
    }

    const deleteFile = (e) => {
        const s = file.filter((item, index) => index !== e);
        setFile(s);
        console.log(file);
    }
  

return (
    <form className="MobileCarousel">
        <h2>Mobile Carousel Update</h2>
        <div className="MobileWindow">
        <Carousel className="MobileCarousel__img__grp"  showArrows={true} emulateTouch={true} showStatus={false}  showThumbs={false} >
            {file.length > 0 ?
                file.map((item, index) => {
                    return (
                        <div className="Mobile_img_grp"  key={item}>
                            <IconButton aria-label="delete" onClick={() => deleteFile(index)} ><DeleteIcon fontSize="inherit"/></IconButton>
                            <img  src={item.imgURL} alt="" />
                        </div>
                    );
            }) : (<h1>Enter New Carousel</h1>)}
        </Carousel>
        </div>

        <div className="form-group">
            <input accept="image/*" className={classes.input}  id="contained-button-filemobile" multiple type="file" onChange={uploadSingleFile}/>
            <label htmlFor="contained-button-filemobile">
                                <Button variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
            </label>
        </div>
        <Button variant="contained" color="primary" component="span" onClick={upload}>Add to Database</Button>
    </form>
  );
};

export default MobileCarousel;