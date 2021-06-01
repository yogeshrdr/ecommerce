import React from 'react'
import {Link} from 'react-router-dom'

function AddComponentCategory() {
    return (
        <Link to="/admin/addcategory">
        <div className="header__option">
        <span className="header__optionLineTwo">Add Category</span>
    </div>
    </Link>
    )
}

export default AddComponentCategory
