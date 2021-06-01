import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../ContextApi/StateProvider';
import CheckoutProduct from '../Checkout/CartItem/CheckoutProduct';
import './Payment.css';


function Payment() {
    const [ { cart , user}, dispatch] = useStateValue();

    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <=890

    useEffect(() =>{
        const handlewindowresize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", handlewindowresize);

        return () =>{
            window.removeEventListener("resize", handlewindowresize);
        }
    }, [isMobile])


    return (
        <div className="payment">
            <div className="payment__container">
                <div className="payment__section">
                    <div className = "payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.displayName}</p>
                        <p>haluhera, Musepur</p>
                        <p>Rewari, Haryana (123401)</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {cart.map(item => (
                            <CheckoutProduct 
                            key={item.id}
                            id = {item.id}
                            image = {item.image}
                            title = {item.title}
                            price = {item.price}
                            rating = {item.rating}
                            counterProduct = {item.counter}
                            isMobile = {isMobile}
                            />
                        ))}
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
