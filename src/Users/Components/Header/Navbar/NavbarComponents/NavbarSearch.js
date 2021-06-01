import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const styleForButton = {
    fontSize: '48px'
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '0px 0px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 8,
      backgroundColor: '#FF8A30',
      color: 'white',
    }
  }));

function NavbarSearch() {
    const classes = useStyles();
    const [searchTerm, setSearchterm] = useState("");
    const history = useHistory();

    return (
        <form className="header__search">
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Products....."
                        value={searchTerm}
                        type="text" 
                        onChange={(e) => setSearchterm(e.target.value)}
                    />
                    <Link to={`/listproduct?q=${searchTerm}`}>
                    <Button type="submit" className={classes.iconButton} aria-label="search" >
                        <SearchIcon />
                    </Button>
                    </Link>
                </Paper>
        </form>
    )
}

export default NavbarSearch
