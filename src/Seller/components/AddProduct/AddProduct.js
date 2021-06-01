import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import './AddProduct.css';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Button, FormControl, InputAdornment, InputLabel, makeStyles } from '@material-ui/core';
import {db} from '../../../Database/firebase'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { useStateValue } from '../../../ContextApi/StateProvider';


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
    button: {
        width: '100%',
        padding : '12px'
    }, 
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
}));


function AddProduct() {
    const classes = useStyles();
    const [productId, setproductId] = useState("");
    const [loading, setloading] = useState(false);
    const [haveproduct, sethaveproduct] = useState(false);
    const [product, setproduct] = useState({});
    const [productprice, setproductprice] = useState(0); 
    const [productsellerqunatity, setproductsellerqunatity] = useState(0);
    const history = useHistory();
    const [{user}, dispatch] = useStateValue();
    const [productsubmit, setproductsubmit] = useState({});
    const [submitclicked, setsubmitclicked] = useState(false);
    const [dbproduct, setdbproduct] = useState([]);
    
    const searchproduct = (e) =>{
        e.preventDefault();
        setloading(true);
        if(productId!== ""){
            const docRef = db.collection('Product').doc(`${productId}`)
            docRef.get().then((doc) =>{
                if(doc.exists){
                    setproduct(doc.data())
                    
                    sethaveproduct(true);
                    const docRef2 = db.collection('Seller').doc(`${user?.displayName}`).collection('product').doc(`${productId}`)

                    db.collection('Product').doc(`${productId}`).collection('Productdocument').doc('Seller').onSnapshot(snap =>{
                        setdbproduct(snap.data()?.sellerproduct)
                    })

                    docRef2.get().then((doc) =>{
                            if(doc.exists){
                                setproductsellerqunatity(doc.data()?.product?.productQuantity)
                                setproductprice(doc.data()?.product?.productPrice)
                                setloading(false);
                            } else
                            {  
                                setproductsellerqunatity(0);
                                setloading(false);
                            }
                    })
                    
                }else{
                    sethaveproduct(false);
                    setloading(false);
                    setproduct({});
                    setproductprice(0);
                }
            }).catch((error) =>{
                console.log(error)
            })
            
        }
    }
    
    useEffect(() =>{
        setproductprice(product?.product?.productPrice);
    }, [product])


    const submit = () =>{
        if(haveproduct && productsellerqunatity!==0){
            const docRef = product?.product?.productId
            setproductsubmit({
                productId: product?.product?.productId,
                productOriginalPrice : product?.product?.productPrice,
                productPrice : productprice,
                productQuantity : productsellerqunatity,
                productTitle : product?.product?.productTitle,
                productImages : product?.product?.productImages,
                productRating : product?.product?.productRating,
                productCategory : product?.product?.productCategory,
                productSubcategory : product?.product?.productSubcategory,
                productSub : product?.product?.productSub,
                productDescription : product?.product?.productDescription
            })

            if(dbproduct === undefined){
                setdbproduct([{sellerName : user?.displayName,sellerEmail : user?.email ,productPrice : productprice, productQuantity : productsellerqunatity}])
            }else{
                let flag =0;
                {dbproduct?.map((d,i) =>{
                    if(d?.sellerName=== user?.displayName)
                    {  
                        dbproduct[i] = {sellerName : user?.displayName,sellerEmail : user?.email, productPrice : productprice, productQuantity : productsellerqunatity}
                        flag =1;
                    }
                })}
                if(flag === 0){
                    setdbproduct((prev) => [...prev, {sellerName : user?.displayName,sellerEmail : user?.email, productPrice : productprice, productQuantity : productsellerqunatity}])
                }
            }
            setsubmitclicked(true);

            
        }
    }
    
    useEffect(()=>{
        const docRef = product?.product?.productId
        if(productsubmit && haveproduct && submitclicked && docRef !== undefined){
            
            
        db.collection('Seller').doc(`${user?.displayName}`).collection('product').doc(`${docRef}`).set({
            product : productsubmit
        })

        db.collection('Product').doc(`${docRef}`).collection('Productdocument').doc('Seller').set({
            sellerproduct : dbproduct
        })
        
        setproductId("");
        sethaveproduct(false);
        setsubmitclicked(false);
        }

    }, [dbproduct])



    const manufacturerbtnclick = () =>{
        history.push("/manufacturer")
    }



    return (
        <div className="AddProduct">
            {loading === true && productId!=="" && (  <Modal open={loading} className={classes.modal}>
                                                            <div className="loader">Loading...</div>
                                                    </Modal>)}
            
                {haveproduct? (
                    <div className="ProductColumnLeft">
                    <div className="ProductCarousel">
                        <Carousel emulateTouch={true} showArrows={true} showStatus={false}  showThumbs={false} showStatus={false} thumbWidth={55} useKeyboardArrows={true}>
                            {product?.product?.productImages.map((d,i)=>(
                                <div key={i}>
                                    <img className="productDetail_image" src={d.url} alt="CarouselImage"/>
                                </div>
                            ))}
                        </Carousel> 
                    </div>
                    </div>
                ):( <div className="productLeft">
                    <div>Enter Product ID /ProductNot Found</div>
                    </div>
                )}
            


            <div className="ProductColumnRight">
                <div className = "ProductDetail_Info">

                    <div className="addProductInput">
                        <div>
                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                <InputLabel >Product Id</InputLabel>
                                <OutlinedInput 
                                value={productId}
                                onChange={e => setproductId(e.target.value)}
                                labelWidth={90} required/>
                            </FormControl>
                        </div>
                    <div>
                    <Button variant="contained" color="primary"  className={classes.button} onClick={searchproduct}>Search Product</Button>
                    </div>
                </div>
                {!haveproduct && (<div>
                            <p>Product not found if you are the manufacturer of this product register as manufacturer and add product</p>
                            <Link to='/manufacturer'>
                            <Button variant="contained" color="primary"  className={classes.button} onClick={manufacturerbtnclick}>Add Product as Manufacturer</Button>
                            </Link>
                </div>)}
                
                {haveproduct && (
                    <div>
                        <div className="product__tr">
                    <div className="product__title">{product?.product?.productTitle}</div>
                </div>
                
                <div className="product__price">
                    <div className="p_price">
                    Price : <small>Rs </small><strong>{product?.product?.productPrice}</strong> 
                    </div>
                    
                        <div className="addProductprice">
                                <div>
                                    <FormControl fullWidth className={classes.margin} variant="outlined">
                                        <InputLabel >Product Price</InputLabel>
                                        <OutlinedInput 
                                        startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                                        value={productprice}
                                        onChange={e => setproductprice(e.target.value)}
                                        labelWidth={90} required/>
                                    </FormControl>
                                </div>
                        </div>

                    <div className="productQuanitity">
                        <div>
                        <TextField type="number"  label="Product Quantity" variant="outlined" value={productsellerqunatity} 
                        onChange={e => setproductsellerqunatity(e.target.value)}/>
                        </div>
                    </div>

                    <div className="submitbtn">
                    <Button variant="contained" color="primary"  className={classes.button} onClick={submit}>Submit</Button>
                    </div>
                </div>
                
                
                <div className="product__description">
                    <ul>
                        {product?.product?.productDescription.map((d,i)=>(
                            <li key={i} className="productdesc">{d}</li>
                        ))}
                    </ul>
                </div>
                
                <div className="product__manufacturer">
                    <div className="p_price">
                        Manufacturer-name : {product?.manufacturer}
                    </div>
                </div>

                    </div>
                )}
                
                
            </div>
            </div>
        </div>
    )
}

export default AddProduct
