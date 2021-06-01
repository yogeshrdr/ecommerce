import React from 'react'
import './ManufacturerHomePage.css'
import {Link}  from 'react-router-dom'

function ManufacturerHomePage() {
    return (
        <div className="ManufacturerHomePage">
            <div className="ManufacturerContent">
                <div className="ManufacturerContentTitle">Modify Page and Give Category</div>
                <div className="ManufacturerContentButton">
                    <Link to ="/manufacturer/displayProduct">
                    <button className="Manufacturercontentbtn">Display Product</button>
                    </Link>
                    <Link to ="/manufacturer/addProduct">
                    <button className="Manufacturercontentbtn">Add Product</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ManufacturerHomePage
