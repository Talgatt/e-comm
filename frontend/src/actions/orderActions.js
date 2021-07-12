import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    console.log("userinfo", userInfo);
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log("data order", data.order);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log("data order details", data);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_MY_LIST_REQUEST,
  });

  try {
    console.log("here are");
    const {
      userSignin: { userInfo },
    } = getState();
    console.log("singin ", userInfo);
    const { data } = await axios.get("/api/orders/my", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log("data is", data);
    dispatch({
      type: ORDER_MY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload: error,
    });
  }
};
