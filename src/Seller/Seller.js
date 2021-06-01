import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import { useStateValue } from '../ContextApi/StateProvider';
import ManufacturerMain from '../Manufacturer/ManufacturerMain';
import AddProduct from './components/AddProduct/AddProduct';
import Header from './components/Header/Header';
import SellerHomePage from './components/SellerHomePage/SellerHomePage';
import {db, auth} from '../Database/firebase'
import DisplayProduct from './components/DisplayProduct/Displayproduct';
import ModifyProduct from './components/ModifyProduct./ModifyProduct';
import Order from './components/Orders/Order';

function Seller() {
    const [{user,  sellerproduct, orderhistory}, dispatch] = useStateValue();
    const [sellerdbproduct, setsellerdbproduct] = useState([]);
    const history = useHistory();
    const [order, setorder] = useState();

    useEffect(() => {
        setsellerdbproduct([]);
        auth.onAuthStateChanged(authUser => {
            console.log('User ->', authUser)
            if(authUser){
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
                if(user!==null)
                {   
                    db.collection('Seller')?.doc(`${authUser?.displayName}`).collection('product').onSnapshot(snap => {
                        setsellerdbproduct(snap.docs.map(d=>({
                            id: d.id,
                            data : d.data()
                        })))
                    })

                    
                }
                
            }else{
                history.push('/login')
            }
        })

        if(user !==null){
            db.collection('Seller')?.doc(`${user?.displayName}`).collection('Orders').onSnapshot(snap => {
                setorder(snap.docs.map(d=>({
                    id: d.id,
                    data : d.data()
                })))
            })
        }
    }, [user])

    useEffect(() =>{
        if(sellerdbproduct?.length >0)
        {  
                dispatch({
                    type: 'ADD_SELLERPRODUCT',
                    item: sellerdbproduct
                })
        }
    }, [sellerdbproduct])

    useEffect(() =>{
        if(order?.length >0)
        {  
                dispatch({
                    type: 'ADD_ORDERS',
                    item: order
                })
        }
    }, [order])
    

    return (
        <div>
            <Router>
            <React.Fragment>
                <Switch>
                <Route path="/seller/Orders" >
                        <Header />
                        <Order />
                </Route>

                <Route path="/seller/updateProduct" >
                        <Header />
                        <ModifyProduct />
                </Route>

                <Route path="/seller/displayProduct" >
                        <Header />
                        <DisplayProduct />
                </Route>

                <Route path="/seller/addProduct" >
                        <Header />
                        <AddProduct />
                </Route>

                    <Route path="/seller">
                        <Header />
                        <SellerHomePage />
                    </Route>

                    <Route path="/manufacturer">
                        <ManufacturerMain />
                    </Route>
                </Switch>
            </React.Fragment>
        </Router>
        </div>
    )
}

export default Seller
