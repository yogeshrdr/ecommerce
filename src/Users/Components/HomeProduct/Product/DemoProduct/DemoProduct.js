import React, { useState } from 'react';
import './DemoProduct.css';
import StarRatings from 'react-star-ratings';
import { Link, useHistory } from 'react-router-dom';

function DemoUserDemoProduct({id, title, image, price, rating, isMobile, totalItem}) {

    // const [totalItemUserDemoProduct, setTotalItemUserDemoProduct] = useState(parseInt(totalItem));
    
    
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    
    const history = useHistory();
    

    return (
        <div className="UserDemoProduct">
            {image?.map(d => {
                    if(d.index ===0)
                    {
                        return (<img onClick = {e => history.push(`/product?q=${id}`)} src={d.url} alt="UserDemoProduct"/>)
                    }
                })}

            <div className="UserDemoProduct__info">
                    <div onClick = {e => history.push(`/product?q=${id}`)} className="userDemozTitle">{truncate(title,90)}</div>
                <div className="UserDemoProduct__UserDemoProduct__price">
                    <small>Rs.</small>
                    <strong>{parseInt(price)}</strong>
                </div>
                <div className="UserDemoProduct__rating">
                <div>
                    <StarRatings className="UserDemoProduct__star"
                    rating={parseFloat(rating)}
                    starRatedColor="#087da1"
                    numberOfStars={5}
                    name="rating"
                    starDimension = {`${isMobile?'10px' : '12.5px'}`}
                    />
                </div>
                </div>
            </div>

        </div>
    )
}

export default DemoUserDemoProduct
