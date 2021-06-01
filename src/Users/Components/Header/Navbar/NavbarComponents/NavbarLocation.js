import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useStateValue } from '../../../../../ContextApi/StateProvider';
import Geocode from "react-geocode";
import axios from 'axios';

function NavbarLocation() {
    
    const [{user}, dispatch] = useStateValue();
    const [location, setlocation] = useState({city : "", pincode: ""});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=970add35d4984062850691b7744e4f27`).then(data =>{
            setlocation({city :data.data.results[0].components.city_district, pincode : data.data.results[0].components.postcode })
        })
        });
    }, [])

    return (
        <div className="header__location">
            <LocationOnIcon className="header_locationimg"/>
        <div className="header__option">
            <span className="header__optionLineOne">Deliver to {!user ? 'Guest' : user.displayName}</span>
            <span className="header__optionLineTwo">{location.city} {location.pincode}</span>
    </div>
    </div>
    )
}

export default NavbarLocation
