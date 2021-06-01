import React ,{useState, useEffect, useRef} from 'react';
import {  useLocation } from 'react-router-dom';
import "./List.css";
import ListProduct from './ListProduct/ListProduct';
import queryString from 'query-string';
import {db} from '../../../Database/firebase'
import InfiniteScroll from 'react-infinite-scroll-component';


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function List({width}) {
    const [product, setProduct] = useState([]);
    const [start, setStart] = useState("");
    const [size, setSize] = useState(0);
    let location = useLocation();
    const parsed = queryString.parse(location.search);

    useEffect(() =>{
        setProduct([])
        db.collection('Product').orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
            if( doc.data().product.productSubcategory.toLowerCase().includes(parsed.q?.toLowerCase()) || 
                doc.data().product.productSub.toLowerCase().includes(parsed.q?.toLowerCase()) ||
                doc.data().product.productTitle.toLowerCase().includes(parsed.q?.toLowerCase())){
                        setProduct(product => [...product,{
                            id : doc.id,
                            data : doc.data().product,
                            timestamp : doc.data().timestamp
                        }])
                    }
            setStart(doc.data().timestamp)
            });
            setSize(product.length);
        })
        }, [location] )
        

    const fetchmoredata = () =>{
        db.collection('Product').orderBy("timestamp", "desc").startAfter(start)
        .onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                if( doc.data().product.productSubcategory.toLowerCase().includes(parsed.q?.toLowerCase()) || 
                    doc.data().product.productSub.toLowerCase().includes(parsed.q?.toLowerCase()) ||
                    doc.data().product.productTitle.toLowerCase().includes(parsed.q?.toLowerCase())){
                        setProduct(product => [...product,{
                            id : doc.id,
                            data : doc.data().product,
                            timestamp : doc.data().timestamp
                        }])
            }
            setStart(doc.data().timestamp)
            });
            setSize(product.length);
        })
    }
    const prevCount = usePrevious(size)


    return (
        <div className="list__column">
        <div className="list__sort">
            <select>
                <option>Newest Arrival</option>
                <option>Price High to Low</option>
                <option>Price Low to High</option>
            </select>
        </div>
    
        <div className="list__column">
        <InfiniteScroll className="infintescroll"
                dataLength={product.length} 
                next={fetchmoredata}
                hasMore={size!==prevCount ? false : true}
                loader={<h3>Loading.....</h3>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>No more Product</b>
                    </p>
                }
            > 
            {product?.map((data,index) => (
                <ListProduct  key={index}
                            id = {data?.data?.productId}
                            title={data?.data?.productTitle}
                            image= {data?.data?.productImages}
                            rating= {data?.data?.productRating}
                            price= {data?.data?.productPrice}
                            width={width}
                            totalitem={3}/>
            ))}
            </InfiniteScroll>

        </div> 
        </div>
    )
}

export default List
