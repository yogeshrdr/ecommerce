import React, { useState } from 'react'
import './OrderItem.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function OrderItem({address, item}) {
    const [showaddress, setshowaddress] = useState(false);

    const addresstoggler = () =>{
        setshowaddress(!showaddress)
    }
    
    return (
        <div className="OrderItem">
            <div className="showitems">
                <img src={item.productImage} alt="OrderItemImage" />
                <div>
                <div>{item.productTitle}</div>
                <div>Item Orderd Qunatity :- {item.productQuanitiy}</div>
                <div>totalItemPrice :- {item.productPrice * item.productQuanitiy}</div>
                <div className="addressDetails">

                <div>{!showaddress ? 
                (<div className="starightalign" onClick={addresstoggler}><div>show address details</div> <div><ExpandMoreIcon /> </div> </div>) : 
                (<div>
                    <div className="starightalign" onClick={addresstoggler}>
                        <div>Hide address details</div> 
                        <div><ExpandLessIcon /></div>  
                    </div>
                    <div>
                    <div>{address?.data?.address?.name}</div>
                    <div>{address?.data?.address?.address1}</div>
                    <div>{address?.data?.address?.address2}</div>
                    <div>{address?.data?.address?.landmark}</div>
                    <div>{address?.data?.address?.City},  {address?.data?.address?.state}, {address?.data?.address?.PINCODE}</div>
                    <div>{address?.data?.address?.country}</div>
                    </div>
                </div>)}

                </div>
                


                </div>
                </div>
            </div>
            
        </div>
    )
}

export default OrderItem
