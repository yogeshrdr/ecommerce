import React, { useEffect, useState } from 'react'
import './Product.css';
import CarouselElement from './ProductComponent/Carousel/CarouselElement'
import ProductDetails from './ProductComponent/ProductDetails/ProductDetails'
import Feedback from './ProductComponent/Feedback/Feedback'
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useStateValue } from '../../../ContextApi/StateProvider';
import {db} from '../../../Database/firebase'


function Product() {
    
    const location = useLocation();
    const parsed = queryString.parse(location.search)
    const [{user}] = useStateValue();
    const [product, setproduct] = useState([]);
    const [seller, setseller] = useState([]);
    const [feedback,setfeedback] = useState([]);
    const [loading, setloading] = useState(true);
    

    
    useEffect(() =>{
        if(parsed.q!="" && parsed.q!==undefined && parsed.q!==null){
            const docRef = db.collection('Product').doc(`${parsed?.q}`)
            docRef.get().then(doc =>{
                if(doc.exists){
                    setproduct({
                        id : doc.id,
                        data : doc.data()
                    });

                    docRef.collection('Productdocument').doc('Seller').onSnapshot(snap => {
                        setseller(snap.data().sellerproduct)
                    })

                    setloading(false);
                }
            })
        }
    }, [location, user])

    useEffect(() =>{

    }, [seller])


    return (
        <div>
            {loading ? (<div>Loading....</div>) : (
                <div>
                    <div className="ProductRow">
                        <div className="ProductLeft ">
                        <CarouselElement id={parsed?.q} images={product?.data?.product?.productImages} />
                        </div>
                        <div className="ProductRight">
                        <ProductDetails id={parsed?.q} product={product} seller={seller} images={product?.data?.product?.productImages}/>
                        </div>
                    </div>

                    <div>
                        <Feedback id={parsed?.q} />
                    </div>
                </div>
            )}

        </div>
    )
}

export default Product
