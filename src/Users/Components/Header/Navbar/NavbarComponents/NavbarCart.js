import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getCartItemTotal } from '../../../../../ContextApi/UserReducer';
import { useStateValue } from '../../../../../ContextApi/StateProvider';
import { Link } from 'react-router-dom';

function NavbarCart() {
    const [{cart}] = useStateValue();

    return (
            <Link to='/Cart'>
            <div className="header__optionCart">
                <ShoppingCartIcon />
                <span className="header__optionLineTwo header__CartCount">{getCartItemTotal(cart)}</span>
            </div>
            </Link>
    )
}

export default NavbarCart
