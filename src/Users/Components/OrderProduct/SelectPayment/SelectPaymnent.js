import { Button } from '@material-ui/core'
import React, {useState, useEffect} from 'react';
import { useStateValue } from '../../../../ContextApi/StateProvider';
import {db} from '../../../../Database/firebase';
import firebase from 'firebase';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useHistory } from 'react-router';

function SelectPaymnent() {
    const history = useHistory();
    const [cartorder, setcartorder] = useState(() =>(
        JSON.parse(sessionStorage.getItem('orderCart'))  
    ))

    const [address, setaddress] = useState(() => (
        JSON.parse(sessionStorage.getItem('orderAddress'))  
    ))

    const [{user, cart}, dispatch] = useStateValue();


    const [payemntsucessfull, setpaymentsucessfull] = useState(false);

    console.log(cartorder)
    
    const placeorder = () =>{
        cartorder?.map((d,i) =>{
            console.log("ddd", d)
            db.collection('Users').doc(`${user.email}`).collection('Orders').add({
                orderItem : d,
                address : address,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()
            })
            db.collection('Seller').doc(`${d.sellerName}`).collection('Orders').add({
                orderItem : d,
                address : address,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()
            })

            db.collection('Users').doc(`${user.email}`).collection('Cart').doc(`${d.productId}`).delete();
        })
        setpaymentsucessfull(true)
    }
    


    const onclickorder = () =>{
        sessionStorage.clear()
        dispatch({
            type : 'ADD_CART',
            item : []
        })
        history.push('/')
    }


    return (
        <div>
            {payemntsucessfull ? (<div>
            <div>
                <div>Order Placed Sucessfully <CheckCircleOutlineIcon /></div>
                    <Button variant="contained" color="primary" onClick={onclickorder}>Click here to go to Order</Button>
                </div>
            </div>) : 
            
            (<div><div>Payment Integration has not done yet click on this button.</div>
            <Button variant="contained" color="primary" onClick={placeorder}>Click here to place order</Button></div>)}
        </div>
    )
}

export default SelectPaymnent
