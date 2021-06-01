import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import { useStateValue } from '../ContextApi/StateProvider';
import { db , auth} from '../Database/firebase';
import AddProduct from './Components/AddProduct/AddProduct';
import DisplayProduct from './Components/DisplayProduct/DisplayProduct';
import Header from './Components/Header/Header';
import ManufacturerHomePage from './Components/ManufacturerHomePage/ManufacturerHomePage';
import ModifyProduct from './Components/ModifyProduct/ModifyProduct';

function Manufacturer() {
    const [{user,sidebarcontent, manufacturerproduct}, dispatch] = useStateValue();
    const [product, setproduct] = useState([]);
    let history = useHistory();

    const [width,setWidth] = useState(window.innerWidth);
    const isMobile = width <= 910
    
    useEffect(() => {
        const handlewindowresize =  () => { 
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handlewindowresize);

        return () => {
            window.removeEventListener("resize", handlewindowresize);
        }
    }, [])


    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            console.log('User ->', authUser)
            if(authUser){
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
                db.collection('Manufacturer')?.doc(`${authUser?.email}`).collection('product').orderBy("timestamp", "desc").onSnapshot(snap => {
                    setproduct(snap.docs.map(doc=>({
                            id : doc.id,
                            data : doc.data()
                    })))
                })
            }else{
                history.push('/login')
            }
        })
    }, [user])

    useEffect(() =>{
        db.collection('AdminController')?.doc('Category')?.onSnapshot(snap => {
            dispatch({
                type : 'ADD_SIDEBARCONTENT',
                item : snap.data()?.category
            })
        })
    }, [user])

    useEffect(()=>{
        if(product.length>0){
            dispatch({
                type : "ADD_MANUFACTURERPRODUCT",
                item : product
            })
        }
    }, [product])
    
    console.log(manufacturerproduct)

    return (
        <Router>
            <React.Fragment>
                <Switch>
                <Route path="/manufacturer/updateProduct">
                    <Header />
                    <ModifyProduct/>
                </Route>
                <Route path="/manufacturer/displayProduct">
                    <Header />
                    <DisplayProduct width={width} />
                </Route>

                <Route path="/manufacturer/addProduct">
                    <Header />
                    <AddProduct/>
                </Route>
                    <Route path="/manufacturer">
                            <Header />
                            <ManufacturerHomePage />
                    </Route>
                </Switch>
            </React.Fragment>
        </Router>
    )
}

export default Manufacturer

