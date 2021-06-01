import { Button, FormControl, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './ProductDetails.css'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useStateValue } from '../../../../../ContextApi/StateProvider';
import {db} from '../../../../../Database/firebase';
import firebase from 'firebase';


function ProductDetailDetails({id, product, seller, images}) {
    const [productseller, setproductseller] = useState([])
    const [moreseller, setmoreseller]= useState(false);
    const [{user}] = useStateValue();
    const [localupdated, setlocalupdated] = useState(false);
    const [{cart}, dispatch] = useStateValue();
    const [quant, setquant] = useState(1);
    const [allowdbcart, setallowdbcart] = useState(false)
    const [productindex, setproductindex] = useState(0);

    useEffect(() => {
        if(seller?.length >0){
            seller.sort((a, b) => {
                return a.productPrice - b.productPrice;
            });
            setproductseller(seller[0])
        }
    }, [seller])

    useEffect(() =>{
        if(images!==null && images!==undefined)
        {
            images.sort((a, b) => {
                return a.index- b.index;
            });
        }
        
    }, [images])

    const addtocart = (e, index) =>{

        if(user === null || user === undefined)
        {   if(cart !==null && cart!==undefined && cart?.length>0)
            {   {cart?.map((d,i) => {
                    if(d.productId === id){
                        cart[i].productQuanitiy = cart[i].productQuanitiy +1;
                        localStorage.setItem('cart', JSON.stringify(cart))
                    }else{
                        localStorage.setItem('cart', JSON.stringify([...cart , {
                            productId : id,
                            productTitle: product?.data?.product?.productTitle,
                            productImage : images[0].url,
                            productPrice : seller[index]?.productPrice,
                            sellerName : seller[index]?.sellerName,
                            sellerEmail : seller[index]?.sellerEmail,
                            productQuanitiy : 1,
                            productRating : product?.data?.product?.productRating
                        }]));
                    }
                })}
                
            }
            else
            { 
                localStorage.setItem('cart', JSON.stringify([{
                    productId : id,
                    productTitle: product?.data?.product?.productTitle,
                    productImage : images[0].url,
                    productPrice : seller[index]?.productPrice,
                    sellerName : seller[index]?.sellerName,
                    sellerEmail : seller[index]?.sellerEmail,
                    productQuanitiy : 1,
                    productRating : product?.data?.product?.productRating
                }]));
            }

            setlocalupdated(true);
        }
        else{
            if(cart!==null &&  cart.length >0){
                {cart?.map((d,i) =>{
                    if(d.productId === product?.data?.product?.productId){
                        setquant(cart[i].productQuanitiy +1);
                        setproductindex(index);
                        setallowdbcart(true);
                    }else{
                        setproductindex(index);
                        setallowdbcart(true);
                    }
                })}
            }else{
                setproductindex(index);
                setallowdbcart(true);
            }
        }
    }

    
    useEffect(() =>{
        if(localupdated && user === null)
        {
            const data = localStorage.getItem('cart');
            if(data){
                dispatch({
                    type : 'ADD_CART',
                    item : JSON.parse(data)
                }) 
            }
            setlocalupdated(false);
        }
    }, [localupdated])


    useEffect(()=>{
    if(allowdbcart === true && user !== null){
            db.collection('Users').doc(`${user.email}`).collection('Cart').doc(`${id}`).set({
                cartitem : {productId : id,
                            productTitle: product?.data?.product?.productTitle,
                            productPrice : seller[productindex]?.productPrice,
                            productImage : images[0].url,
                            sellerName : seller[productindex]?.sellerName,
                            sellerEmail : seller[productindex]?.sellerEmail,
                            productQuanitiy : quant,
                            productRating : product?.data?.product?.productRating
                        },
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setquant(1);
            setproductindex(0);
            setallowdbcart(false);
    }
    }, [allowdbcart])

    
    return (
        <div className="ProductDetail_Info">
            <div className="ProductDetail__tr">
                    <div className="ProductDetail__title">
                        {product?.data?.product?.productTitle}
                    </div>
                </div>
                
                <div className="ProductDetail__price">
                    <div className="p_price_strike">
                    <small>Rs </small>{product?.data?.product?.productPrice}
                    </div>

                        {seller !==null && seller !==undefined && ( 
                            <div className="p_price">
                                <small>Rs </small><strong>{seller[0]?.productPrice}</strong> 
                            </div>
                        )}

                        {/* <div className="product_rating">
                        
                                <starRatings className="list__star"
                                            // rating={(3)}
                                            starRatedColor="#087da1"
                                            numberOfStars={5}
                                            name="rating"
                                            starDimension ='25px'
                                />
                        </div> */}
                    
                    <div className="productbtn">
                    <Button variant="contained" color="primary" onClick={e => addtocart(e,0)} >Add To CART</Button>
                    </div>

                    {seller !==null && seller !==undefined && ( 
                            <div className="p_seller">
                                SellerName : {seller[0]?.sellerName}
                            </div>
                        )}

                        {seller !==null && seller !==undefined && seller?.length > 1 && ( 
                            <div onClick={() => setmoreseller(!moreseller)} className="p_seller">
                                <div>
                                {seller.length} more seller 
                                </div>
                                <div><KeyboardArrowDownIcon />
                                </div>
                            </div>
                            
                        )}
                        
                        {moreseller ? (<div className="p_sellermore">
                                {seller !==null && seller !==undefined && (<div>
                                        {seller.map((d,i) => (
                                            <div key={i} className="p_sellermorecomponent">
                                                <div className="p_sellermorecomponent1">{d.sellerName}</div>
                                                <div className="p_sellermorecomponent2">Rs. {d.productPrice}</div>
                                                <div className="p_sellermorecomponent3" onClick={e => addtocart(e,i)}><Button variant="contained" color="primary" >Add To CART</Button></div>
                                            </div>
                                        ))}
                                </div>)}
                            </div>) : (<div></div>)}
                    </div>
                
                <div className="ProductDetail__description">
                    <ul>
                        {product?.data?.product?.productDescription.map((d,i)=>(
                            <li key={i} className="ProductDetaildesc">{d}</li>
                        ))}
                    </ul>
                </div>
                
                <div className="ProductDetail__manufacturer">
                    <div className="p_price">
                        Manufacturer-name : {product?.data?.manufactuername}
                    </div>
                </div>
        </div>
    )
}

export default ProductDetailDetails
