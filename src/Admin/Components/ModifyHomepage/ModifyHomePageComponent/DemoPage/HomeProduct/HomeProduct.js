import React, {useState, useEffect} from 'react';
import DemoProduct from './DemoProduct/DemoProduct';
import './HomeProduct.css';
import {db} from '../../../../../../Database/firebase';
import { useStateValue } from '../../../../../../ContextApi/StateProvider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function ProductHome({Width}) {

        const [{homeproduct}] = useStateValue();
        const isMobile = Width <= 970
    
    const deleteonclick = (index,id) =>{
        if(id){
            console.log('clicked', id)
            db.collection('AdminController').doc('Homepage').collection('product').doc(`${id}`).delete();
        }
    }

    return (
        <div>
            {homeproduct !== undefined &&
                homeproduct?.map((d,index) => 
                (<div key={d.id} className={isMobile ? "mobile__row" : "home__row"}>
                    {   
                        d?.data.map(product => (
                            <DemoProduct className="row__product"
                                    key={product.productId}
                                    id = {product.productId}
                                    title={product.productTitle}
                                    image={product.productImages}
                                    price={product.productPrice}
                                    isMobile={isMobile}
                                    rating = {product.productRating}
                            />
                        ))
                    }
                    <div>
                    <IconButton aria-label="delete" onClick = {(e) => deleteonclick(index, d.id)}>
                            <DeleteIcon />
                    </IconButton>
                    </div>
                </div>))
            }
        </div>
    )
}

export default ProductHome
