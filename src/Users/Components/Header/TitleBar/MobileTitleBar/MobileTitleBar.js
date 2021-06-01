import React, { useState } from 'react'
import './MobileTitleBar.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import prime from '../../../images/prime.jpeg';
import grocery from '../../../images/grocery.jpeg';
import fresh from '../../../images/fresh.jpeg';
import sanitizer from '../../../images/sanitizer.jpeg';
import software from '../../../images/software.jpeg';
import funzone from '../../../images/funzone.jpeg';
import audible from '../../../images/audible.jpeg';
import NavbarLocation from '../../Navbar/NavbarComponents/NavbarLocation';


const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

function MobileTitleBar() {
    const classes = useStyles();

    const [list, setlist] = useState([{
        id : 1,
        title : "Electronics",
        image : prime
    },{
        id : 2,
        title : "Grocery",
        image : grocery
    },{
        id : 3,
        title : "Vedio",
        image : prime
    },{
        id : 4,
        title : "Funzone",
        image : funzone
    }
    ,{
        id : 5,
        title : "Fresh",
        image : fresh
    },{
        id : 6,
        title : "Essential",
        image : sanitizer
    },{
        id : 7,
        title : "Software",
        image : software
    }
    ,{
        id : 8,
        title : "Audible",
        image : audible
    }]);

    return (
        <div className="mobiletitlebar">
            <div className="mobilelocation">
                <NavbarLocation />
            </div>
            <div className="mobileavtar">
            {list.map(data => (
                    <div key={data.id} className="mobileavtarone">
                        <Avatar alt="Remy Sharp" src={data.image} className={classes.large}/>
                        <p>{data.title}</p>
                    </div>
            ))}
            </div>
        </div>
    )
}

export default MobileTitleBar
