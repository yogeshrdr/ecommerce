import React, {useState} from 'react';
import NavbarSearch from '../NavbarComponents/NavbarSearch';
import './MobileNavbar.css'
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NavbarCart from '../NavbarComponents/NavbarCart';
import NavbarSignIn from '../NavbarComponents/NavbarSignIn';
import NavbarOrder from '../NavbarComponents/NavbarOrder';
import { useStateValue } from '../../../../../ContextApi/StateProvider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, useHistory } from 'react-router-dom';
import {db, auth} from '../../../../../Database/firebase'


const styleForButton = {
    fontSize: '30px'
};

const styleForMenuArrow ={
    fontSize: '30px'
}

const styleForIcon ={
    fontSize: '40px',
    display: 'flex',
    alignItems: 'center',
    flexDirection : 'row',
    flexWrap: 'wrap',
}

const styleForArrow = {
    fontSize: '15px'
};

function MobileNavbar({scroll}) {
    
    const history = useHistory();

    const [{user,sidebarcontent}, dispatch] = useStateValue();
    const [sublist, setsublist] = useState([])
    const [sidebaropen, setsidebaropen] = useState(false);
    const [togglehide, settooglehide] = useState(true);
    
    const toggleDrawer = (event, isopen) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setsidebaropen(isopen);
    };

    const tooglehideDrawer = (d,i) =>{
        if(d){
            setsublist([sidebarcontent[i].subcategory])
        }
        settooglehide(!togglehide);
    }


    const orderhistorytoogle = () =>{
        setsidebaropen(false);
        history.push('/Order')
    }

    const handleAuthetication = () =>{
        if(user){
            auth.signOut();
            dispatch({
                type : 'ADD_ORDERS',
                item : []
            })
        }
        setsidebaropen(false);
    }
    

    return (
        <div className="mobilehead">
        <div className="mobileheader">

        <div className ="mobilenav">
        <div className="mobileslider">
            <button onClick={e => {toggleDrawer(e, true)}}><MenuIcon style={styleForButton}/></button>

            <Drawer anchor={'left'} open={sidebaropen} onClose={e => {toggleDrawer(e, false)}}>

                <div className="MobileDrawerHeader">
                    <div><AccountCircleIcon style={styleForIcon}/></div> 
                    <div classNme="DrawerheaderUser">{!user ? 'Guest' : user.displayName}</div>
                </div>


                {togglehide ? (               
                <div className="MobileDrawerlists">
                        <div className="MobileDrawerlist">
                        <h3>Shop By Department</h3>
                        {sidebarcontent?.map((d,i) => (
                            <div key={i} onClick={e => tooglehideDrawer(d,i)} className="MobileDrawerlistItem">
                                <div>{d.category}</div>
                                <div><ArrowForwardIosIcon style={styleForArrow} /></div>
                            </div>
                        ))}
                    </div>

                    <div className="MobileDrawerlist">
                    <h3>Help & Settings</h3>
                        <div className="MobileDrawerlistItem">
                            <div>Your Account</div>
                        </div>

                        <div onClick ={orderhistorytoogle} className="MobileDrawerlistItem">
                            <div >Orders</div>
                        </div>

                        <div onClick ={handleAuthetication} className="MobileDrawerlistItem">
                                <div>Signout</div>
                        </div>
                    </div>

                </div>) : (<div className="MobileDrawerlists">
                        <div  className="MobileDrawerlist">
                            <div onClick={e => tooglehideDrawer()} className="MobileDrawerMenu" >
                                <button className="MobileDrawerMenuButton" ><ArrowBackIcon style={styleForMenuArrow} /> <p>Main Menu</p></button>
                            </div>
                        </div>

                                {sublist?.map(d=> (
                                    <div>
                                        {d.map(data=>(
                                            <div  className="MobileDrawerlist">
                                                <h3>{data.subcategoryname}</h3>
                                                {data.subcategorycomponent.map(sub=> (
                                                    <div className="MobileDrawerlistItem">
                                                    <div>{sub}</div>
                                                    <button className="mobbtn"><ArrowForwardIosIcon style={styleForArrow} /></button>
                                                </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>)}
            </Drawer>
            </div>
        {scroll === 0 ?(
            <Link to='/'>
            <img
                className="header__logo"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="logo"
        /></Link>) : (<NavbarSearch />)}
        
        </div>

        <div className="mobilenav">
        <NavbarSignIn />
        <NavbarOrder />
        <NavbarCart />
        </div>

    </div>
    
    {scroll ===0 ? (<NavbarSearch />): (<div></div>)}

    </div>
    )
}

export default MobileNavbar
