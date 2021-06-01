import React, { useEffect, useState } from 'react';
import './Productadd.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Product from './Product'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InfiniteScroll from 'react-infinite-scroll-component';
import {db} from '../../../../../Database/firebase';
import { Button } from '@material-ui/core';
import firebase from 'firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function Productadd() {
    const classes = useStyles();
    const [search, setsearch] = useState("");
    const [product, setProduct] = useState();
    const [start, setStart] = useState(0);
    const [rowproduct, setrowproduct] = useState([]);


    

    const onSearch =() =>{
        console.log("clicked")
        if(search !== "")
        {
            setProduct([])
            db.collection('Product').orderBy("timestamp", "desc").limit(3)
            .onSnapshot(snapshot => {
                snapshot.docs.map(doc => {
                    console.log(doc.data().product.productTitle)
                    if( doc.data().product.productCategory.toLowerCase().includes(search?.toLowerCase()) || 
                        doc.data().product.productSubcategory.toLowerCase().includes(search?.toLowerCase()) || 
                        doc.data().product.productSub.toLowerCase().includes(search?.toLowerCase()) ||
                        doc.data().product.productTitle.toLowerCase().includes(search?.toLowerCase())){
                            setProduct(product => [...product,{
                                id : doc.id,
                                data : doc.data().product,
                                timestamp : doc.data().timestamp,
                                ischecked : false
                            }])
                        }
                setStart(doc.data().timestamp)
                });
            })
        }
        }
        

    const fetchmoredata = () =>{
        db.collection('Product').orderBy("timestamp", "desc").startAfter(start).limit(3)
        .onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                
                if(doc.data().product.productCategory.toLowerCase().includes(search?.toLowerCase()) || 
                    doc.data().product.productSubcategory.toLowerCase().includes(search?.toLowerCase()) || 
                    doc.data().product.productSub.toLowerCase().includes(search?.toLowerCase()) ||
                    doc.data().product.productTitle.toLowerCase().includes(search?.toLowerCase())){
                        setProduct(product => [...product,{
                            id : doc.id,
                            data : doc.data().product,
                            timestamp : doc.data().timestamp,
                            ischecked : false
                        }])
            }
            setStart(doc.data().timestamp)
            });
        })
    }

    console.log(product)

    const [check, setcheck] = useState(false)

    const handlecheckchange = (event, index) =>{
        console.log(event.target.value)
            setcheck(!check)
            if(product[index].ischecked === true){
                product[index].ischecked = false
            }else{
                product[index].ischecked = true
            }
            console.log("product->",product)
    }

    const onsubmit = (event) =>{
            if(product?.length>0){
                {product?.map(d =>{
                    if(d?.ischecked === true){
                            setrowproduct((prev) => [...prev, d.data])
                    }
                })}
            }
            
    }

    useEffect(() =>{
            if(rowproduct?.length >0 && rowproduct !== undefined){
                db.collection('AdminController').doc('Homepage').collection('product').add({
                    product : rowproduct,
                    timestamp : firebase.firestore.FieldValue.serverTimestamp()
                })
                setrowproduct([]);
            }
    }, [rowproduct])
    console.log("rowproduct->",rowproduct)

    return (
        <div className="Productadd">
            <div className="ProductSearch">
                <Paper  className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Product"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        value={search}
                        onChange={e => setsearch(e.target.value)}
                    />
                    <IconButton onClick ={onSearch}  className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>

            <div className="productwindow">
            <InfiniteScroll className="infintescroll"
                            dataLength={product === undefined ? 0 : product.length} 
                            next={fetchmoredata}
                            hasMore={true}
                            loader={ <h1>loading...</h1>}
                            endMessage={
                            <p style={{ textAlign: 'center' }}>
                                    <b>No more Product</b>
                            </p>
                        }
                    > 
                {product?.map((d,i) =>(
                    <div key={i} className="productaddlistproduct">
                        <div className="productaddlistproductcheck">
                            {/* <FormControlLabel
                                control={
                                <Checkbox
                                checked={d.ischecked}
                                value={d.ischecked}
                                onChange={(e) => handlecheckchange(e, i)}
                                name="checkedB"
                                color="primary"
                            />
                        }
                    /> */}
                    <input type="checkbox" checked={d.ischecked} onChange={(e) => handlecheckchange(e, i)}></input>
                </div>
                    {console.log(d)}

                    <div className="productaddlistproductproduct">
                    <Product 
                        id = {1}
                        title={d?.data?.productTitle}
                        
                        image= {d?.data?.productImages}
                        rating= {3}
                        price= {d?.data?.productPrice}
                        width={1024}
                    />
            </div>

        </div>
                ))}
                
                </InfiniteScroll>

            </div>
            <Button variant="contained" color="primary" onClick ={(e)=>onsubmit(e)}>Add product Row</Button>
        </div>
    )
}

export default Productadd
