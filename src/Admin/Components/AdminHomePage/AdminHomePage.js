import React from 'react'
import './AdminHomePage.css'
import {Link}  from 'react-router-dom'

function AdminHomePage() {
    return (
        <div className="AdminHomePage">
            <div className="AdminContent">
                <div className="AdminContentTitle">Modify Page and Give Category</div>
                <div className="AdminContentButton">
                    <Link to="/admin/ModifyHomePage">
                    <button className="admincontentbtn">Modify Homepage</button>
                    </Link>
                    <Link to ="/admin/addcategory">
                    <button className="admincontentbtn">Add Category</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminHomePage
