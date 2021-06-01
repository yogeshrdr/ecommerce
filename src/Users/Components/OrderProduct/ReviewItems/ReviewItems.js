import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../../ContextApi/StateProvider';
import CheckoutProduct from '../../Checkout/CartItem/CheckoutProduct';
import './ReviewItems.css';
import Subtotal from '../../Checkout/Subtotal/Subtotal'
import CurrencyFormat from 'react-currency-format';
import { getCartItemTotal, getCartTotal } from '../../../../ContextApi/UserReducer';


function ReviewItems({Step, width}) {
    const [ { cart , user}] = useStateValue();
    const isMobile = width <=890
    const [completed, setcompleted]= useState(false);

    const onreivew = () =>{
        sessionStorage.setItem('orderCart', JSON.stringify(cart));
        setcompleted(true)
    }
    
    useEffect(() =>{
        if(completed === true){
            Step();
            setcompleted(false)
        }
    },[completed])


    return (
        <div className="reviewItems">
            <div className="reviewItems__container">
                <div className="reviewItems__section">
                    <div className = "reviewItems__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="reviewItems__address">
                        <p>Name : {user?.displayName}</p>
                        <p>haluhera, Musepur</p>
                        <p>Rewari, Haryana (123401)</p>
                    </div>
                </div>

                <div className="reviewItems__section">
                    <div className="reviewItems__title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="reviewItems__items">
                    {cart.map((item,index) => (
                            <CheckoutProduct 
                                key={index}
                                index ={index}
                                id = {item.productId}
                                image = {item.productImage}
                                title = {item.productTitle}
                                price = {item.productPrice}
                                rating = {item.productRating}
                                counterProduct = {item.productQuanitiy}
                                sellerName = {item.sellerName}
                                sellerEmail = {item.sellerEmail}
                                isMobile = {isMobile}
                            />
                )
                )}
                <div ClassName ="reviewItems__section">
                <CurrencyFormat
                    renderText={(value) => (
                            <>
                                <p>
                                    Subtotal ({getCartItemTotal(cart)}: items): <strong>{value}</strong>
                                </p>
                            </>
                    )}
                    value={getCartTotal(cart)}
                    displayType={"text"}
                    thousandSeparator={true}
                    thousandSpacing = '2s'
                    prefix={"Rs"}
                />
                </div>
            
                    </div>
                
                </div>
                
                


                <div className="reviewItems__section">
                    <button onClick={onreivew}>Review</button>
                </div>
            </div>
        </div>
    )
}

export default ReviewItems
