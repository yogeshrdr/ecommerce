import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../ContextApi/StateProvider';
import CheckoutProduct from './CartItem/CheckoutProduct';
import './Checkout.css';
import Subtotal from './Subtotal/Subtotal';


function Checkout({width}) {

    const [{ cart, user }, dispatch] = useStateValue();
    const isMobile = width <=890
    console.log(cart)

    cart?.map(d =>{
        console.log(d.sellerName)
    })
    return (

        <div >
            {isMobile ? (<div className="checkout">
            <div className="checkout__left">

            <div className="checkout__right">
                <Subtotal />
            </div>
                
                <h2 className="checkout__title">Your Cart Items </h2>
                {cart.map((item,index) => (
            
                <CheckoutProduct 
                key={index}
                index ={index}
                id = {item.productId}
                image = {item.productImage}
                title = {item.productTitle}
                price = {item.productPrice}
                rating = {item.productRating}
                sellerName = {item.sellerName}
                sellerEmail = {item.sellerEmail}
                counterProduct = {item.productQuanitiy}
                isMobile = {isMobile}
                
                />
               
                )
                )}
                
                
                
                
            </div>
        </div>) :

            ( 
            <div className="checkout">
                
            <div className="checkout__left">
                <img className="checkout__ad"
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/PC/Mayactivation/Accessoriesday1/D23140543_IN_CEPC_Electronicsaccessories_underRs999_1500x300.jpg"
                    alt="CheckoutImage"
                />
                
                <h2 className="checkout__title">Your Cart Items</h2>
                    
                
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
                
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>)
        }

        </div>

       
    )
}

export default Checkout
