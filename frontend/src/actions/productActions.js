import axios from "axios";
import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants";
import data from "../data";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  try {
    const { data } = await Axios.get("api/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });

  try {
    const { data } = await Axios.get(`/api/products/${productId}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error message: " + error.response.data.message);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_UPDATE_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    console.log("product id", product);

    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error,
    });
  }
};
