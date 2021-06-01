import React, { useEffect, useState } from 'react'
import './ModifyProduct.css'
import Button from '@material-ui/core/Button';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl,  InputAdornment, InputLabel, List } from '@material-ui/core';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useStateValue } from '../../../ContextApi/StateProvider';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {db, storage} from '../../../Database/firebase';
import firebase from 'firebase';
import { useHistory, useLocation  } from 'react-router-dom';
import queryString from 'query-string';
import { TrafficRounded } from '@material-ui/icons';


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



function ModifyProduct() {
    const classes = useStyles();
    const history = useHistory();
    let location = useLocation();
    const parsed = queryString.parse(location.search);

    const [addproduct, setaddproduct] = useState({
        productId: "",
        productTitle: "",
        productPrice: "",
        productImages: [],
        productDescription: [],
        productRating: 0,
        productCategory: "",
        productSubcategory : "",
        productSub: "",
    })

    const [desc, setdesc] = useState("");
    const [{user,sidebarcontent, manufacturerproduct}, dispatch] = useStateValue();
    const [productindex, setproductindex] = useState(-1);
    const [subcategory, setsubcategory] = useState([]);
    const [sub, setsub] = useState([]);
    const [file, setfile] = useState([]);
    


    console.log(productindex)
    
    const handleInputChange = (event) => {
            setaddproduct((prevProps) => ({
                ...prevProps,
                [event.target.name]: event.target.value
            }));
    };

    const handleCategory = (event) => {
        if(event.target.name === "productCategory"){
            if(event.target.value){
                setsubcategory(sidebarcontent[event.target.value]?.subcategory)
                setaddproduct((prevProps) => ({
                    ...prevProps,
                    [event.target.name]: sidebarcontent[event.target.value]?.category,
                    productSubcategory : "",
                    productSub: ""
                }));
            }
        } else if(event.target.name==="productSubcategory"){
            if(event.target.value){
                setsub(subcategory[event.target.value]?.subcategorycomponent)
                setaddproduct((prevProps) => ({
                    ...prevProps,
                    [event.target.name]: subcategory[event.target.value]?.subcategoryname,
                    productSub: ""
                }));
            }
        }
        else if(event.target.name==="productSub"){
            setaddproduct((prevProps) => ({
                ...prevProps,
                [event.target.name]: sub[event.target.value],
            }));
        }
    }

    console.log("manu->",manufacturerproduct)
    
    useEffect(()=>{
        if(parsed?.q!=null){
            {manufacturerproduct?.map((d,i) =>{
                    if(d?.id.toLowerCase() === parsed.q?.toLowerCase())
                    {    console.log("conman",manufacturerproduct[i])
                        setaddproduct({
                            productId: d?.id,
                            productTitle: d?.data?.product?.productTitle,
                            productPrice: d?.data?.product?.productPrice,
                            productImages: d?.data?.product?.productImages,
                            productDescription: d?.data?.product?.productDescription,
                            productRating: d?.data?.product?.productRating,
                            productCategory: d?.data?.product?.productCategory,
                            productSubcategory : d?.data?.product?.productSubcategory,
                            productSub: d?.data?.product?.productSub,
                        })
                        setproductindex(i);
                        
                    }
            })}
        }

        

    }, [location, manufacturerproduct])

    const handledescChange = (e) =>{
        setdesc(e.target.value)
    }

const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) 
    {   
        const list = [...addproduct?.productDescription, val];
        setaddproduct((prevProps) => ({
            ...prevProps,
            productDescription: list
        }));
        setdesc("")
    } 
}

const removeTag = (i) => {
    const list = [...addproduct?.productDescription];
    list.splice(i, 1);
    setaddproduct((prevProps) => ({
        ...prevProps,
        productDescription: list
    }));
}



const  uploadSingleFile = (e) => {
    const list = [...file, {img : e.target.files[0], imgURL : URL.createObjectURL(e.target.files[0])}];
    setfile(list);
}

const deleteFile = (e) => {
    const list = file?.filter((item, index) => index !== e);
    setfile(list);
}

    function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(addproduct.productDescription);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setaddproduct((prevProps) => ({
        ...prevProps,
        productDescription: items
    }));

}

const [submitadd, setsubmitadd] = useState(false);

const deleteimagefromdatabase = (e, index, url) =>{
    let pictureRef = storage.refFromURL(url);
    pictureRef.delete();
    const list = [...addproduct?.productImages];
    list.splice(index, 1);
    setaddproduct((prevProps) => ({
        ...prevProps,
        productImages: list
    }));
}

const addimagetodata = (e) =>{
    e.preventDefault();
    {
        file.length > 0 && file.map(image => {
            const uploadTask = storage.ref(`images/product/${addproduct.productId}/${image.img.name}`).put(image.img);
            uploadTask.on(
                "stateChanged",
                snapshot=>{},
                error => {
                    console.log(error)
                },
                () => {
                    storage.ref(`images/product/${addproduct.productId}`).child(image.img.name).getDownloadURL().then(
                        url =>{
                            addproduct.productImages = [...addproduct.productImages, {url: url, index: addproduct?.productImages?.length+1}]
                        }
                    )
                }
            )
        })
    }
    setsubmitadd(true);
}

const submit = (e) =>{
    e.preventDefault();
    if(productindex!== -1){
        
        manufacturerproduct[productindex].productunique = addproduct
        
        db.collection('Product').doc(`${addproduct.productId}`).set({
                    product : addproduct,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    manufacturer : user.email,
                    manufactuername : user.displayName,
                });

                db.collection('Manufacturer').doc(`${user.email}`).collection('product').doc(`${addproduct.productId}`).set({
                    product : addproduct,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })

                // if(manufacturerproduct === undefined) {
                //     {db.collection('Manufacturer').doc(`${user.displayName}`).set({
                //         product : [{productunique :addproduct,timestamp: 1}],
                //         });}
                // }else
                //     {db.collection('Manufacturer').doc(`${user.displayName}`).set({
                //     product :manufacturerproduct,
                //     });
                //     }

                    setaddproduct({
                        productId: "",
                        productTitle: "",
                        productPrice: "",
                        productImages: [],
                        productDescription: [],
                        productRating: 0,
                        productCategory: "",
                        productSubcategory : "",
                        productSub: "",
                    })

                    setsubcategory([])
                    setsub([])
                    setfile([])
                    setsubmitadd(false);

            history.push('/manufacturer/displayProduct')
    }
}

console.log(addproduct)




    return (
        <div className="addProduct">
            <div className="addProductmain">
                <div className="addProductmaincomponent1">
                    <div className="addProductmaincomponent1subcomponent">
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel >ProductID</InputLabel>
                                <OutlinedInput
                                    name="productId"
                                    value={addproduct.productId}
                                    onChange={handleInputChange} 
                                    labelWidth={70} required disabled/>
                        </FormControl>
                    </div>
                    
                    <div className="addProductmaincomponent1subcomponent">
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel >Product Title</InputLabel>
                                <OutlinedInput 
                                name="productTitle"
                                value={addproduct.productTitle}
                                onChange={handleInputChange} 
                                labelWidth={90} required/>
                        </FormControl>
                    </div>

                    <div className="addProductmaincomponent1subcomponent">
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel >Amount</InputLabel>
                                <OutlinedInput
                                    startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                                    name="productPrice"
                                    value={addproduct.productPrice}
                                    onChange={handleInputChange} 
                                    labelWidth={60}
                                    required/>
                        </FormControl>
                    </div>

                    <div className="addProductmaincomponent1subcomponent">
                    <div className="addProductmaincomponent1subcomponentsub">
                    <FormControl className={classes.formControl}>
                    <InputLabel shrink >Category</InputLabel>
                    < NativeSelect  name="productCategory" onChange={handleCategory}  >
                        <option value="">None</option>
                        { 
                            sidebarcontent?.map((d,i) => <option key={i} value={i}>{d.category}</option>)
                        }
                    </NativeSelect  >
                    </FormControl>
                    </div>

                    <div  className="addProductmaincomponent1subcomponentsub">
                    <FormControl className={classes.formControl}>
                            <InputLabel shrink >SubCategory</InputLabel>
                            <NativeSelect name="productSubcategory" onChange={handleCategory}>
                            <option value="">None</option>
                                { 
                                    subcategory?.map((d,i) => <option key={i} value={i}>{d.subcategoryname}</option>)
                                }
                            </NativeSelect>
                    </FormControl>
                    </div>

                    <div  className="addProductmaincomponent1subcomponentsub">
                    <FormControl className={classes.formControl}>
                            <InputLabel shrink >SubCategory</InputLabel>
                            <NativeSelect name="productSub" onChange={handleCategory}>
                            <option value="">None</option>
                                { 
                                    sub?.map((d,i) => <option key={i} value={i}>{d}</option>)
                                }
                            </NativeSelect>
                    </FormControl>
                    </div>
                    </div>
                </div>

                <div className="addProductmaincomponent2">
                        <div className="addProductmaincomponent2subcompoent">
                        <Carousel className="CarouselMain"  showArrows={true} emulateTouch={true} showStatus={false}  showThumbs={false} >
                            {addproduct?.productImages?.map((d,index)=>(
                                    <div key={index}>
                                        <IconButton aria-label="delete"onClick={(e) => deleteimagefromdatabase(e, index, d.url)} ><DeleteIcon fontSize="inherit"/></IconButton>
                                        <img className="home__image" src ={d.url} alt="carouselImage"/>
                                    </div>
                            ))}
                            {file?.length >0 ?
                                file?.map((item, index) => (
                                <div key={index}>
                                <IconButton aria-label="delete"onClick={() => deleteFile(index)} ><DeleteIcon fontSize="inherit"/></IconButton>
                                <img className="home__image" src ={item?.imgURL} alt="carouselImage"/>
                            </div>
                                )) : addproduct?.productImages.length <= 0&& (<h1>Upload Images</h1>)}
                        </Carousel> 
                        </div>

                        <div> 
                        <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" onChange={uploadSingleFile}/>
                        <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
                        </label>
                        
                        </div>
                        <div className="uploaddatabasebtn">
                        <Button variant="contained" color="primary" component="span" onClick={(e) => addimagetodata(e)}>
                                    Add Images to database
                        </Button>
                        </div>
                </div>
                </div>
                
                <div className="addProductMain2">
                    <div className="addProductMain2component1">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="characters">
                            {(provided) => (
                                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                    {addproduct.productDescription.map((d, index) => {
                                        return (
                                            <Draggable key={d} draggableId={d} index={index}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <div key={index}  className="addProductMain2Tag">
                                                                <div className="addProducttitle">{d}</div>
                                                            <button onClick={() => {removeTag(index)}} ><DeleteIcon/></button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    </div>
                    
                <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel>Product Description</InputLabel>
                                <OutlinedInput 
                                value={desc}
                                onChange={e => handledescChange(e)} 
                                onKeyDown={e=> inputKeyDown(e)}
                                labelWidth={140} />
                </FormControl>
                </div>


                <div className="lastAttack">
                <Button variant="contained" color="primary" size="large" onClick={submit}>Update Product</Button>
                </div>

        </div>
    )
}

export default ModifyProduct
