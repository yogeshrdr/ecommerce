import React, { useState } from 'react';
import './DemoProduct.css';
import StarRatings from 'react-star-ratings';

function DemoAdminDemoProduct({id, title, image, price, rating, isMobile, totalItem}) {

    // const [totalItemAdminDemoProduct, setTotalItemAdminDemoProduct] = useState(parseInt(totalItem));
    
    
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className="AdminDemoProduct">
            {image?.map((d,i) => {
                    if(d.index ===0)
                    {
                        return (<img key={i} src={d.url} alt="AdminDemoProduct"/>)
                    }
                })}

            <div className="AdminDemoProduct__info">
                <div>{truncate(title,90)}</div>
                <div className="AdminDemoProduct__AdminDemoProduct__price">
                    <small>Rs.</small>
                    <strong>{parseInt(price)}</strong>
                </div>
                <div className="AdminDemoProduct__rating">
                
                </div>
            </div>

        </div>
    )
}

export default DemoAdminDemoProduct
