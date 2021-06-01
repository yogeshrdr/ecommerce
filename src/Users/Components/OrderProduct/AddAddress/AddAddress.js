import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../../ContextApi/StateProvider';
import './AddAddress.css';
import data from './IndianStates';
import {db} from '../../../../Database/firebase';
import firebase from 'firebase';

function AddAddress({Step}) {

    const [{user, address}] = useStateValue();
    const [newaddress, setnewaddress] = useState({
                                                    country : "India",
                                                    name : "",
                                                    mobnumber : "",
                                                    PINCODE : "",
                                                    address1 : "",
                                                    address2 : "",
                                                    landmark : "",
                                                    City : "",
                                                    state : "",
                                                })
    const [completed, setcompleted] = useState(false);

    const onchnagehandler = (event) =>{
        setnewaddress((prev) => ({
            ...prev,
            [event.target.name] : event.target.value
        }))
    }

    const onsubmit = (event) =>{
        event.preventDefault();
        if(newaddress.name !=="" && newaddress.mobnumber!=="" && newaddress.PINCODE !== "" && newaddress.address1 !==""){
            db.collection('Users').doc(`${user?.email}`).collection('Address').add({
                address : newaddress,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        

        setnewaddress({
            country : "India",
            name : "",
            mobnumber : "",
            PINCODE : "",
            address1 : "",
            address2 : "",
            landmark : "",
            City : "",
            state : "",
        })
    }


    const deleteaddress =(event, id) =>{
        if(id){
            db.collection('Users').doc(`${user?.email}`).collection('Address').doc(`${id}`).delete();
        }
    }

    const addressdiliver = (event ,i) =>{
                sessionStorage.setItem('orderAddress', JSON.stringify(address[i]));
                setcompleted(true);
    }

    useEffect(()=>{
        if(completed === true){
            Step();
            setcompleted(false);
        }
    },[completed])

    console.log(newaddress)
    console.log("adsds", address)

    return (
        <div className="addAddress">
            <div className="addAddress__section">
                <h1>Select a delivery address</h1>
                <p>Is the address you'd like to use displayed below? If so, click the corresponding "Deliver to this address" button. Or you can enter a new delivery address. </p>
            </div>

            <div className="addAddress__section">
                <div className="addAddress_add">
                    {address !==undefined && address?.map((d,i) =>(
                                <div key={i} className="addAddress_added">
                                    <strong>{d.data.address.name}</strong>
                                    <p>{d.data.address.address1}</p>
                                    <p>{d.data.address.address2}</p>
                                    <p>{d.data.address.City}, {d.data.address.state}, {d.data.address.PINCODE}</p>
                                    <p>{d.data.address.country}</p>
                                    <button onClick={e => addressdiliver(e,i)} >Deliver To this address</button>
                                    <div className="addAddress_button">
                                    <button onClick = {e=> deleteaddress(e, d.id)}>Delete</button>
                                </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="addAddress__section">
                <div className="addAddress_conatiner">
                <h1>Add a New Address</h1>
                <form>
                    <h5>Select Country</h5>
                <select>
                    <option>India</option>
                </select>

                <h5>Full name (First and Last name)</h5>
                <input 
                value={newaddress.name} 
                name ="name"
                onChange={e => onchnagehandler(e)}
                placeholder="FULL NAME"/>

                <h5>Mobile number</h5>
                <input 
                value={newaddress.mobnumber} 
                name ="mobnumber"
                onChange={e => onchnagehandler(e)}
                placeholder ="MOBILE NUMBER"/>

                <h5>PIN code</h5>
                <input 
                value={newaddress.PINCODE} 
                name="PINCODE"
                onChange={e => onchnagehandler(e)}
                placeholder = "PIN code"/>

                <h5>Flat, House no., Building, Company, Apartment</h5>
                <input 
                value={newaddress.address1 } 
                name="address1"
                onChange={e => onchnagehandler(e)}
                placeholder = "FLAT house no. Building Company, Apartment"/>

                <h5>Area, Colony, Street, Sector, Village</h5>
                <input 
                value={newaddress.address2} 
                name="address2"
                onChange={e => onchnagehandler(e)}
                placholder = "Area, Colony, Street, Sector, Village" />

                <h5>Landmark</h5>
                <input 
                value={newaddress.landmark} 
                name="landmark"
                onChange={e => onchnagehandler(e)}
                placholder = "Landmark eg.. near Apollo Hospital" />

                <h5>Town/City</h5>
                <input 
                value={newaddress.City} 
                name="City"
                onChange={e => onchnagehandler(e)}
                placholder="Town/city"/>
                
                <h5>State / Province / Region</h5>
                <select name="state" value={newaddress.State} placholder="state" onChange={e => onchnagehandler(e)}>
                    <option value="">Select State</option>
                    {data.map((d,i) =>(
                        <option value={d.name} key={i}>{d.name}</option>
                    ))}
                </select>

                <button type="submit" onClick={onsubmit} className="login__signInButton">Add Address</button>
                </form>

                
                </div>
            </div>
        </div>
    )
}

export default AddAddress
