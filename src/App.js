import React from 'react';
import './App.css';
import User from './Users/User';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminMain from './Admin/AdminMain';
import ManufacturerMain from './Manufacturer/ManufacturerMain';
import SellerMain from './Seller/SellerMain';

function App() {
  return (
      <Router>
        <div className="App">
        <Switch >
        <Route path="/seller">
              <SellerMain />
        </Route>

        <Route path="/manufacturer">
              <ManufacturerMain />
        </Route>

        <Route path="/admin">
              <AdminMain />
        </Route>
        
      <Route  path="/">
            <User />
      </Route>
        
        </Switch>

        
        </div>
      </Router>
    
  );
}

export default App;
