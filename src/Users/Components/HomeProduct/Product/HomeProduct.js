import React, {useState, useEffect} from 'react';
import DemoProduct from './DemoProduct/DemoProduct';
import './HomeProduct.css';
import { useStateValue } from '../../../../ContextApi/StateProvider';


function ProductHome({Width}) {

        const [{homeproduct}] = useStateValue();
        const isMobile = Width <= 970

        // const [homeProduct, setHomeProduct] = useState([]);
        
        // useEffect(() =>{
        //     db.collection('AdminController').doc('Homepage').collection('product').orderBy("timestamp", "asc").onSnapshot(snapshot => {
        //         setHomeProduct(snapshot.docs.map(doc => ({
        //             id : doc.id,
        //             data : doc.data().product
        //         })))
        //     })
        // }, [])

        // console.log("homeproduct->",homeProduct)


    return (
        <div>
            {homeproduct !== undefined &&
                homeproduct?.map((d,i) => 
                (<div key={i} className={isMobile ? "mobile__row" : "home__row"}>
                    {  
                        d?.data.map((product,index) => (
                            <DemoProduct className="row__product"
                                    key={index}
                                    id = {product.productId}
                                    title={product.productTitle}
                                    image={product.productImages}
                                    price={product.productPrice}
                                    isMobile={isMobile}
                                    rating = {product.productRating}
                            />
                        ))
                    }
                </div>))
            }
        </div>
    )
}

export default ProductHome
