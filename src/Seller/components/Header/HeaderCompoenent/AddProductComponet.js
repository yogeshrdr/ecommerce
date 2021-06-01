import React from 'react'
import {Link} from 'react-router-dom'

function AddProductComponent() {
    return (
        <Link to="/seller/addProduct">
        <div className="header__option">
        <span className="header__optionLineTwo">Add Product</span>
    </div>
    </Link>
    )
}

export default AddProductComponent