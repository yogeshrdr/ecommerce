import React, {useState, useEffect} from 'react'
import Header from './Components/Header/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import { useStateValue } from '../ContextApi/StateProvider';
import { db, auth } from '../Database/firebase';
import Home from './Components/HomeProduct/Home';
import List from './Components/List/List'
import Titlebar from './Components/Header/Titlebar';
import Product from './Components/Product/Product';
import firebase from 'firebase';
import Checkout from './Components/Checkout/Checkout';
import OrderProduct from './Components/OrderProduct/OrderProduct'
import Order from './Components/Orders/Order';



function Users() {
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


    const [scrollPosition, setScrollPosition] = useState(0);

        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPosition(position);
        };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [{user}, dispatch] = useStateValue();
    const [product, setproduct]= useState([]);
    const [desktopcarousel, setdesktopcarousel] = useState([]);
    const [mobilecarousel, setmobilecarousel] = useState([]);
    const [cartlocaldbproduct, setcartlocaldbproduct] = useState([]);
    const [cartuserproduct, setcartuserproduct] = useState([]);
    const [addressstore, setaddressstore] = useState([]);
    const [order, setorder] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if(authUser){
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
            
            }else{
                dispatch({
                    type: 'SET_USER',
                    user: null
                })

                
            }
        })

        db.collection('AdminController').doc('Homepage').collection('product').orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setproduct(snapshot.docs.map(doc => ({
            id : doc.id,
            data : doc.data().product
        })))
        })

        db.collection('AdminController').doc('Carousel').collection('CarouselDesktop').orderBy("timestamp", "asc").onSnapshot(snapshot => {
            setdesktopcarousel(snapshot.docs.map(doc => ({
            id : doc.id,
            data : doc.data()
        })))
        })

        db.collection('AdminController').doc('Carousel').collection('CarouselMobile').orderBy("timestamp", "asc").onSnapshot(snapshot => {
            setmobilecarousel(snapshot.docs.map(doc => ({
            id : doc.id,
            data : doc.data()
        })))
        })

        if(user === null)
        {   dispatch({
            type : 'ADD_CART',
            item : [],
            }) 
  
        }else{
            db.collection('Users').doc(`${user.email}`).collection('Cart').orderBy("timestamp", "desc").onSnapshot(snap=>{
                setcartuserproduct(snap.docs.map(doc => (doc.data()?.cartitem)))
            })

            dispatch({
                type : 'ADD_CART',
                item : [],
            }) 

            db.collection('Users').doc(`${user.email}`).collection('Address').orderBy("timestamp", "asc").onSnapshot(snap=>{
               setaddressstore(snap.docs.map(doc => ({ 
                   id : doc.id, 
                   data : doc.data()
                })))
            })

            db.collection('Users').doc(`${user.email}`).collection('Orders').orderBy("timestamp", "desc").onSnapshot(snap=>{
                setorder(snap.docs.map(doc => ({ 
                    id : doc.id, 
                    data : doc.data()
                })))
            })
        }


    }, [user])




    useEffect(() =>{
        db.collection('AdminController').doc('Category').onSnapshot(snap => {
            dispatch({
                type : 'ADD_SIDEBARCONTENT',
                item : snap.data()?.category
            })
        })

    }, [])



    useEffect(() =>{
        if(user!==null)
        {
            const data = localStorage.getItem('cart');
            if(data !== null){
                setcartlocaldbproduct(JSON.parse(data));
                localStorage.clear();
            }

        }
    }, [user])


    useEffect(() =>{
        if(user !== null && cartlocaldbproduct !== undefined && cartlocaldbproduct?.length >0)
        {
            cartlocaldbproduct?.map(d => {
                db.collection('Users').doc(`${user.email}`).collection('Cart').doc(`${d.productId}`).set({
                    cartitem : d,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        }
    }, [cartlocaldbproduct])



    useEffect(() =>{
        if(product?.length >0)
        {
            dispatch({
                type : 'ADD_HOMEPRODUCT',
                item : product
            })
        }

       
    },[product])

    useEffect(() =>{
        if(desktopcarousel?.length >0)
        {
            dispatch({
                type : 'ADD_DESKTOPCAROUSEL',
                item : desktopcarousel
            })
        }

       
    },[desktopcarousel])

    useEffect(() =>{
        if(mobilecarousel?.length >0)
        {
            dispatch({
                type : 'ADD_MOBILECAROUSEL',
                item : mobilecarousel
            })
        }
        
    },[mobilecarousel])

    useEffect(() =>{
        if(user !== null && cartuserproduct !== undefined && cartuserproduct?.length >0)
        {
            dispatch({
                type : 'ADD_CART',
                item : cartuserproduct
            }) 
        }else{
            const data = localStorage.getItem('cart');
            if(data){
                dispatch({
                    type : 'ADD_CART',
                    item : JSON.parse(data)
                }) 
            } 
        }
    }, [cartuserproduct])


    useEffect(() =>{
        if(user !== null && addressstore !== undefined && addressstore?.length >0)
        {
            dispatch({
                type : 'ADD_ADDRESS',
                item : addressstore
            }) 
        }
    }, [addressstore])


    useEffect(() =>{
        if(user !== null && order !== undefined && order?.length >0)
        {
            dispatch({
                type : 'ADD_ORDERS',
                item : order
            }) 
        }
    }, [order])



    return (
        <Router>
        <React.Fragment>
            <Switch>

            <Route path="/register"> 
                <Register />
            </Route>

            

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/order">
                    <Header isMobile={isMobile} width={width} scroll={scrollPosition}/>
                    <Order />
            </Route>

            <Route path="/payment">
                    <OrderProduct width={width}/>
            </Route>

            <Route path="/Cart">
                    <Header isMobile={isMobile} width={width} scroll={scrollPosition}/>
                    <Checkout width={width}/>
            </Route>

            <Route path="/product">
                    <Header isMobile={isMobile} width={width} scroll={scrollPosition}/>
                    <Product width={width}/>
            </Route>

            <Route path="/listproduct">
                    <Header isMobile={isMobile} width={width} scroll={scrollPosition}/>
                    <List width={width}/>
            </Route>

            <Route path="/">
                    <Header isMobile={isMobile} width={width} scroll={scrollPosition}/>
                    <Titlebar width={width}/>
                    <Home width={width}/>
            </Route>
                
            </Switch>

            
        </React.Fragment>
        </Router>
    )
}

export default Users
