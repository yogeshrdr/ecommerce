import React, { useState } from 'react'
import './DesktopTitleBar.css'
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useStateValue } from '../../../../../ContextApi/StateProvider';
import {auth, db} from '../../../../../Database/firebase'
import { useHistory } from 'react-router';

const styleForButton = {
    fontSize: '30px'
};

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

const styleForMenuArrow ={
    fontSize: '30px'
}

function DesktopTitleBar({width}) {
    const [{user,sidebarcontent}, dispatch] = useStateValue();

    const [slider, setslider] = useState(["Fashion","Pet Supplies","Computer","Gifts Card", "Home Improvement", "amazon Baiscs", "Gift Ideas", "sports and fitness"])
    const history = useHistory();
    const [sublist, setsublist] = useState([])
    const [sidebaropen, setsidebaropen] = useState(false);
    const [togglehide, settooglehide] = useState(true);
    const isWidth = width <=1150
    

    const toggleDrawer = (event, isopen) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setsidebaropen(isopen);
        settooglehide(true);
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

    const catergorysearcher = (id) =>{
        setsidebaropen(false);
        history.push(`/listproduct?q=${id}`)
    }

    return (
        <div className="desktoptitlebar"style={isWidth ?{height: '80px'}:{height: '35px'} }>
            <div className="desktopslider">
            <button onClick={e => {toggleDrawer(e, true)}}><MenuIcon style={styleForButton}/></button>

            <Drawer anchor={'left'} open={sidebaropen} onClose={e => {toggleDrawer(e, false)}}>
                <div className="Drawerheader">
                    <div><AccountCircleIcon style={styleForIcon}/></div> 
                    <div classNme="DrawerheaderUser">{!user ? 'Guest' : user.displayName}</div>
                    </div>

                    
                {togglehide ? (               
                <div className="Drawerlists">
                        <div  className="Drawerlist">
                        <h3>ShopByDepartment</h3>
                        {sidebarcontent?.map((d,i) => (
                            <div key={i} onClick={e => tooglehideDrawer(d,i)} className="DrawerlistItem">
                                <div>{d.category}</div>
                                <button ><ArrowForwardIosIcon style={styleForArrow} /></button>
                            </div>
                        ))}
                    </div>
                    <div className="Drawerlist">
                    <h3>Help & Settings</h3>
                        <div className="DrawerlistItem">
                            <div>Your Account</div>
                        </div>

                        <div onClick={orderhistorytoogle} className="DrawerlistItem">
                            <div>Order</div>
                        </div>

                        <div onClick={handleAuthetication} className="DrawerlistItem">
                                <div>Signout</div>
                        </div>
                    </div>

                </div>) : (<div className="Drawerlists">
                        <div  className="Drawerlist">
                            <div onClick={e => tooglehideDrawer()} className="DrawerMenu" >
                                <button className="DrawerMenuButton" ><ArrowBackIcon style={styleForMenuArrow} /> <p>Main Menu</p></button>
                            </div>
                        </div>

                                {sublist?.map((d,i)=> (
                                    <div key={i}>
                                        {d.map((data,index) =>(
                                            <div key={index}  className="Drawerlist">
                                                <h3>{data.subcategoryname}</h3>
                                                {data.subcategorycomponent.map(sub=> (
                                                    <div onClick = {e => catergorysearcher(sub)} className="DrawerlistItem">
                                                    <div>{sub}</div>
                                                    <button ><ArrowForwardIosIcon style={styleForArrow} /></button>
                                                </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>)}
            </Drawer>
            </div>
            
            <div className="desktopslider">
                Buy Again
            </div>
            

            {slider.map((data,i) => (
                <div key={i} className="desktopslider">
                    {data}
                </div>
            ))}

        </div>
    )
}

export default DesktopTitleBar
