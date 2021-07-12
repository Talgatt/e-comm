import React from "react";
import Product from "./components/Product";

import { BrowserRouter, Route, Router, Switch, Link } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistory from "./screens/OrderHistory";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import MapScreen from "./screens/MapScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(userSignOut());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/" className="brand">
              e-comm
            </Link>
          </div>

          <div>
            <Link to="/cart">Cart</Link>

            {userInfo ? (
              <div className="dropdown">
                <Link to="#">{userInfo.name}</Link>

                <i className="fa fa-angle-down"></i>

                <div id="myDropdown" className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <Link to="/orderhistory">Order History</Link>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sing Out
                  </Link>
                </div>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/product/:id/edit" component={ProductEditScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistory} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/map" component={MapScreen} />
          {/* Admin routes */}
          <AdminRoute path="/userlist" component={UserListScreen} />
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
          <AdminRoute path="/productlist" component={ProductListScreen} />
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
