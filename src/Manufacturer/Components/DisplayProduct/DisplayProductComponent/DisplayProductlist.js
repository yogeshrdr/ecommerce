import React from 'react';
import './DisplayProductlist.css';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useStateValue } from '../../../../ContextApi/StateProvider';
import {db, storage} from '../../../../Database/firebase';
import firebase from 'firebase';

function DisplayProductlist({id,title, image, price, width, index}) {
    const isMobile = width <= 970
    const history = useHistory();
    const [{user, manufacturerproduct}]= useStateValue();
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const updateproduct = () =>{
        history.push(`/manufacturer/updateProduct?q=${id}`)
    }

    const  deletebtn = () =>{
        db.collection('Product').doc(`${id}`).delete()

        const storageRef = firebase.storage().ref(`images/product/${id}`);

        storageRef.DisplayProductAll().then((DisplayProductResults) => {
            const promises = DisplayProductResults.items.map((item) => {
            return item.delete();
            });
            Promise.all(promises);
        });
        
        db.collection('Manufacturer').doc(`${user?.email}`).collection('product').doc(`${id}`).delete()
        manufacturerproduct.splice(index, 1); 

        // if(manufacturerproduct?.length === 0) {
        //     db.collection('Manufacturer').doc(`${user.displayName}`).delete();
        // }else{
        //     {db.collection('Manufacturer').doc(`${user.displayName}`).set({
        //         product : manufacturerproduct
        //     });}
        // }
    }
    
    
    return (
        <div className="DisplayProduct">
            {image?.map((d,i)=>(
            <div key={i} className="DisplayProductphoto">
                {d.index===0 && (<img src={d.url} alt="DisplayProduct"/>)}
            </div>))}
            

            <div className="DisplayProduct__info">
                <div className="DisplayProduct__title">
                    {truncate(title, width/9)}
                </div>
                <div className="DisplayProduct__pricedisplay">
                <div className="DisplayProduct__price" style={
                    {fontSize : `${isMobile? "16px" : "22px"}`}
                    }>
                    <small>Rs.</small>
                    <strong>{price}</strong>
                </div>
                </div>
                <div className="DisplayProduct__buttons">
                    <button onClick={updateproduct}><EditIcon /></button>
                    <button onClick={deletebtn}><DeleteIcon/></button>
                </div>
            </div>
            
        </div>
    )
}

export default DisplayProductlist
