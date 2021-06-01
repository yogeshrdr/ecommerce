import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../../ContextApi/StateProvider'
import './DisplayProduct.css'
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import sellerproduct from './DisplayProductlist/DisplayProductlist';
import {db} from '../../../Database/firebase';
import DisplayProductlist from './DisplayProductlist/DisplayProductlist';


function DisplayProduct({width}) {
    const [{user,sellerproduct }] = useStateValue();
    
    return (
        <div className="list__column">
        <div className="list__sort">
            
        </div>
        <div className="list__column">
            
            {sellerproduct?.map((data, index) =>(
                // <div>
                //     {console.log("sel=>",sellerproduct)}
                // </div>
                <DisplayProductlist 
                    key={data.id}
                    index = {data.id}
                    id = {data?.data?.product?.productId}
                    title={data?.data?.product?.productTitle}
                    image= {data?.data?.product?.productImages}
                    price= {data?.data?.product?.productPrice}
                    orginalprice ={data?.data?.product?.productOriginalPrice}
                    quantity = {data?.data?.product?.productQuantity}
                />
                
                
            ))}
                
        </div>
        </div>
    )
}
export default DisplayProduct
