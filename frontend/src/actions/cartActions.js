import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  console.log("im here", productId);
  const { data } = await Axios.get(`/api/products/${productId}`);

  //   console.log("JSON");
  //   console.log(getState().cart.cartItems);
  //   console.log("data", data);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      category: data.category,
      countInStock: data.countInStock,
      brand: data.brand,
      description: data.description,
      image: data.image,
      price: data.price,
      rating: data.rating,
      seller: data.seller,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
};
export const savePaymentMethod = (paymentMethod) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });
};
