import React from 'react'
import { useStateValue } from '../../../ContextApi/StateProvider';
import './Order.css'
import OrderItem from './OrderItems/OrderItem';

function Order() {

    const [{orderhistory}] = useStateValue();

    return (
        <div className="Order">
            {orderhistory!==undefined && orderhistory.length >0 ?(
            <div>
                {orderhistory?.map((d,i) =>(
                    <OrderItem key={i} address ={d?.data?.address} item={d?.data.orderItem} />
                ))}
            </div>) :
            
            (<div>
                <h1>No order History</h1>
            </div>) 
        }
        </div>
    )
}

export default Order
