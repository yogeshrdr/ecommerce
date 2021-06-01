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
import DisplayProductlist from './DisplayProductComponent/DisplayProductlist';


function DisplayProduct({width}) {
    const [{user, manufacturerproduct}] = useStateValue();

    return (
        <div className="list__column">
        <div className="list__sort">
            
        </div>
        <div className="list__column">
            {manufacturerproduct?.map((data, index) =>(
                <DisplayProductlist 
                    key={index}
                    index = {index}
                    id = {data?.id}
                    title={data?.data?.product?.productTitle}
                    image= {data?.data?.product?.productImages}
                    price= {data?.data?.product?.productPrice}
                    width ={width}
                />
            ))}
                
        </div>
        </div>
    )
}
export default DisplayProduct
