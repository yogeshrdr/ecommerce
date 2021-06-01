import React from 'react'
import './SellerHomePage.css'
import {Link}  from 'react-router-dom'

function SellerHomePage() {
    return (
        <div className="SellerHomePage">
            <div className="SellerContent">
                <div className="SellerContentTitle">Modify Page and Give Category</div>
                <div className="SellerContentButton">
                    <Link to ="/seller/displayProduct">
                    <button className="Sellercontentbtn">Display Product</button>
                    </Link>
                    <Link to ="/seller/addProduct">
                    <button className="Sellercontentbtn">Add Product</button>
                    </Link>
                    <Link to ="/seller/Orders">
                    <button className="Sellercontentbtn">Orders</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SellerHomePage
