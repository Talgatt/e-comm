import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import data from "./data";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMyListReducer,
} from "./reducers/orderReducers";
import {
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : [],
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : [],
    paymentMethod: "PayPal",
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMyList: orderMyListReducer,
  userAddressMap: userAddressMapReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
