import React, { useEffect, useState } from 'react';
import './CheckoutProduct.css';
// import StarRatings from 'react-star-ratings';
import { useStateValue } from '../../../../ContextApi/StateProvider';
import {db} from '../../../../Database/firebase';
import firebase from 'firebase'

function CheckoutProduct({id, index, image, title, price, rating, isMobile,  counterProduct,sellerName, sellerEmail}) {

    const [{cart, user}, dispatch] = useStateValue();
    const [localupdated, setlocalupdated] = useState(false);
    
    console.log("cart->dsd", cart[index])
    
    const increasefromcart = () =>{
        if(user !== null){
            db.collection('Users').doc(`${user.email}`).collection('Cart').doc(`${id}`).set({
                cartitem : {productId : id,
                            productTitle: title,
                            productPrice : price,
                            productImage : image,
                            sellerName : sellerName,
                            sellerEmail : sellerEmail,
                            productQuanitiy : counterProduct+1,
                            productRating : rating
                        },
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            
        } else{
            cart[index].productQuanitiy = counterProduct +1;
            localStorage.setItem('cart', JSON.stringify(cart))
            setlocalupdated(true)
        }
    }

    const decreaseFromCart = () =>{
        if(user !== null){
            if(counterProduct -1 > 0)
            {
                db.collection('Users').doc(`${user.email}`).collection('Cart').doc(`${id}`).set({
                    cartitem : {productId : id,
                                productTitle: title,
                                productPrice : price,
                                productImage : image,
                                sellerName : sellerName,
                                sellerEmail : sellerEmail,
                                productQuanitiy : counterProduct-1,
                                productRating : rating
                            },
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            } else{
                cart.splice(index, 1);
                db.collection('Users').doc(`${user?.email}`).collection('Cart').doc(`${id}`).delete();
            }
        } else{
            if(counterProduct -1 >0){
            cart[index].productQuanitiy = counterProduct - 1;
            localStorage.setItem('cart', JSON.stringify(cart))
            setlocalupdated(true)
            }else{
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart))
                setlocalupdated(true)
            }
        }
    }

    const removeFromCart = () => {

            if(user !==null){
                cart.splice(index, 1)
                db.collection('Users').doc(`${user?.email}`).collection('Cart').doc(`${id}`).delete();
            }else{
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart))
                setlocalupdated(true)
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


    return (
        <div className="checkoutProduct">
            <img className="CheckoutProduct__image" src={image} alt="CheckoutProductImage"/>

            <div className="checkoutProduct__info">
                <div className="CheckoutProduct__title">{title}</div>
                <div className="CheckoutProduct__price">
                    <small>Rs.</small>
                    <strong>{price}</strong>
                </div>

                {/* <div className="CheckoutProduct__rating">
                <StarRatings
                    className="CheckoutProduct__star"
                    rating={parseFloat(rating)}
                    starRatedColor="#087da1"
                    numberOfStars={5}
                    name="rating"
                    starDimension = {`${isMobile?'20px' : '25px'}`}
                />
                </div> */}

                <button  onClick={removeFromCart}>Remove from Cart</button>
                <div>
                <button onClick={increasefromcart}>+</button>
                <input type="text" value={counterProduct} disabled/>
                <button onClick={decreaseFromCart}>-</button>
                </div>
            </div>

        </div>
    )
}

export default CheckoutProduct

