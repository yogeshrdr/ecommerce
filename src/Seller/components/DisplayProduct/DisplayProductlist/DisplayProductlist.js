import React from 'react';
import './DisplayProductlist.css';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useStateValue } from '../../../../ContextApi/StateProvider';
import {db, storage} from '../../../../Database/firebase';
import firebase from 'firebase';

function DisplayProductlist({id,title, image, orginalprice, price, width,quantity, index}) {
    const isMobile = width <= 970
    const history = useHistory();
    const [{user, manufacturerproduct}]= useStateValue();
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const updateproduct = () =>{
        history.push(`/seller/updateProduct?q=${id}`)
    }

    const  deletebtn = () =>{
        console.log("deletebtn pressed")
        console.log(id)
        console.log(user?.displayName)
        db.collection('Seller').doc(`${user.displayName}`).collection('product').doc(`${id}`).delete();
    }
    

    return (
        <div className="displayproduct">
            {image?.map((d,i)=>(
            <div key={i} className="displayproductphoto">
                {d.index===0 && (<img src={d.url} alt="displayproduct"/>)}
            </div>))}
            

            <div className="displayproduct__info">
                <div className="displayproduct__title">
                    {truncate(title, width/9)}
                </div>
                <div className="displayproduct_happen">
                <div className="displayproduct__pricedisplay">
                <div className="displayproduct__price" style={
                    {fontSize : `${isMobile? "16px" : "18px"}`}
                    }>
                    <small>Rs.</small>
                    {orginalprice}
                </div>
                <div className="displayproduct__sellerprice" style={
                    {fontSize : `${isMobile? "16px" : "20px"}`}
                    }>
                    <small>Rs.</small>
                    {price}
                </div>
                <div className="displayproduct__sellerprice" style={
                    {fontSize : `${isMobile? "16px" : "16px"}`}
                    }>
                    Quantity : {quantity}
                </div>
                </div>
                <div className="displayproduct__button">
                    <button onClick={updateproduct}><EditIcon /></button>
                    <button onClick={deletebtn}><DeleteIcon/></button>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default DisplayProductlist
