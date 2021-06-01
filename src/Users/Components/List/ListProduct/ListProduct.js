import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import './ListProduct.css'
import {db} from '../../../../Database/firebase'
import firebase from 'firebase';


function Listlist({id,title, image, price, rating, width, totalitem}) {
    const isMobile = width <= 970
    const [seller, setseller] = useState([]);
    


    // const [{ cart, user }, dispatch] = useStateValue();
    // const [totalItemproduct, setTotalItemproduct] = useState(totalitem);
    
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    

    // const addToCart = () => {
    //     setTotalItemproduct(totalItemproduct-1);
    //     console.log(totalItemproduct)
    //     db.collection('Users').doc(user?.email).collection('Cart').doc(id).set(
    //         {
    //             ProductId : id,
    //             CartQuanity : 1,
    //             timestamp : firebase.firestore.FieldValue.serverTimestamp()
    //         }, {merge : true}
            
    //     )
    //     dispatch({
    //         type: "ADD_TO_BASKET",
    //         item: {
    //             id: id,
    //             title: title,
    //             image: image,
    //             price: price,
    //             rating: rating,
    //             counter: 1,
    //             totalProduct : totalItemproduct,
    //         },
    //     },
    //     );
    // };

    // var arr2 = arr.map(function(item) { ... }).sort(order);
    
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
                {image?.map(d => {
                    if(d.index === 0){
                        return(<img src={d.url} alt="list"/>)
                    }
                })}
 
                <div className="list__info">
                    <Link to={`/product?q=${id}`}>
                        <div className="list__title">
                            {truncate(title, width/9)}
                        </div>
                    </Link>


                    {seller[0]?.productPrice === price ? (
                        <div className="listseller__price2" style={
                            {fontSize : `${isMobile? "16px" : "22px"}`}
                            }>
                            <small>Rs.</small>
                            <strong>{price}</strong>
                        </div>
                    ):(
                        <div>
                        <div className="list__price" style={
                            {fontSize : `${isMobile? "16px" : "22px"}`}
                            }>
                            <small>Rs.</small>
                            <strong>{price}</strong>
                        </div>

                        <div className="listseller__price" style={
                            {fontSize : `${isMobile? "16px" : "22px"}`}
                            }>
                            <small>Rs.</small>
                            <strong>{seller!==undefined && seller[0]?.productPrice}</strong>
                        </div>
                        </div>
                    )}
                
                
                    <div className="list__rating">
                        
                        <StarRatings className="list__star"
                        rating={parseFloat(rating)}
                        starRatedColor="#087da1"
                        numberOfStars={5}
                        name="rating"
                        starDimension ={`${width<=700? width/25 : '25px'}`}
                        />
                 
                 </div>
                 
                 <div>
 
                 </div>
             </div>  
             
         </div>
        )}
       
        </div>
    )
}

export default Listlist
