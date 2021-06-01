import React from 'react'
import {Link} from 'react-router-dom'

function DisplayProductComponent() {
    return (
        <Link to="/manufacturer/displayProduct">
        <div className="header__option">
        <span className="header__optionLineTwo">Display Product</span>
    </div>
    </Link>
    )
}

export default DisplayProductComponent