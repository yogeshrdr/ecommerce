import React, { useEffect, useState } from 'react'
import AdminHomePage from './Components/AdminHomePage/AdminHomePage'
import Header from './Components/Header/Header'
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import AddnewCategory from './Components/AddCategory/AddnewCategory';
import ModifyHomePage from './Components/ModifyHomepage/ModifyHomePage';
import { useStateValue } from '../ContextApi/StateProvider';
import {db, auth} from '../Database/firebase'

function Admin() {
    const [{user,  mobileCarousel, desktopCarousel, homeproduct }, dispatch] = useStateValue();
    const [product, setproduct] = useState([]);
    const [desktopcarousel, setdesktopcarousel] = useState([]);
    const [mobilecarousel, setmobilecarousel] = useState([]);
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            console.log('User ->', authUser)
            if(authUser){
                dispatch({
                    type: 'SET_USER',
                    user: authUser
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
            }else{
                history.push('/login')
            }
        })
    }, [user])

    useEffect(() =>{
        if(product?.length > 0)
        {
            dispatch({
                type: 'ADD_HOMEPRODUCT',
                item: product
            })
        }
    }, [product])

    useEffect(() => {
        if(desktopcarousel?.length > 0)
        {
            dispatch({
                type: 'ADD_DESKTOPCAROUSEL',
                item: desktopcarousel
            })
        }
    },[desktopcarousel])

    useEffect(() => {
        if(mobilecarousel?.length > 0)
        {
            dispatch({
                type: 'ADD_MOBILECAROUSEL',
                item: mobilecarousel
            })
        }
    }, [mobilecarousel])

    return (
        <Router>
        <React.Fragment>
            <Switch>
                <Route path="/admin/addcategory">
                    <Header />
                    <AddnewCategory />
                </Route>

                <Route path="/admin/ModifyHomePage">
                    <Header />
                    <ModifyHomePage />
                </Route>

                <Route path="/admin">
                    <Header />
                    <AdminHomePage />
            </Route>
            </Switch>
        </React.Fragment>
        </Router>
    )
}

export default Admin
