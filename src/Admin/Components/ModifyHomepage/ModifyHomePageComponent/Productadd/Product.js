import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import './product.css'
import {db} from '../../../../../Database/firebase'


function Product({id,title, image, price, rating, width}) {
    const isMobile = width <= 970
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    const [seller, setseller] = useState([]);

    useEffect(() => {
        const docRef = db.collection('Product').doc(`${id}`).collection('Productdocument').doc('Seller')

        docRef.get().then((doc) => {
            if(doc.exists){
                setseller(doc.data().sellerproduct);
            }
        })
    }, [])
    
    useEffect(() => {
        if(seller?.length >0){
            seller.sort((a, b) => {
                return a.productPrice - b.productPrice;
            });
        }
    }, [seller])
        
    
    return (
        <div>
            {seller?.length >0 && seller !== undefined && (
                 <div className="list">
                 {image?.map((d,i) =>{
                     if(d.index==0){
                         return (
                             <img src={d.url} alt="list"/>
                         )
                     }
                 })}
                 
                 
                 <div className="list__info">
                     
                     <div className="list__title">
                         {truncate(title, width/9)}
                     </div>
                     
                     <div className="list__price" style={
                         {fontSize : `${isMobile? "16px" : "22px"}`}
                         }>
                         <small>Rs.</small>
                         <strong>{price}</strong>
                     </div>
     
                     <div className="list__rating">
                     <p>
                         <StarRatings className="list__star"
                         rating={parseFloat(rating)}
                         starRatedColor="#087da1"
                         numberOfStars={5}
                         name="rating"
                         starDimension ={`${width<=700? width/25 : '25px'}`}
                         />
                     </p>
                     </div>
                     
                     <div>
     
                     </div>
                 </div>
                     
                     
                     
                 
             </div>
            )}
        </div>
       
    )
}

export default Product

