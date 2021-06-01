import React from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../../../../../ContextApi/StateProvider";

function NavbarOrder() {
  const [{user}] = useStateValue();
  const history = useHistory();
  return (
    <div onClick={e =>{ if(user)
                            {history.push('/order')}
                        else if (!user) 
                          {history.push('/login')}} } 
          className="header__option">
      <span className="header__optionLineOne">Returns</span>
      <span className="header__optionLineTwo">& Orders</span>
    </div>
  );
}

export default NavbarOrder;
