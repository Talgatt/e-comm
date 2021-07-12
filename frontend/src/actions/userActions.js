import axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNING_FAIL,
  USER_SIGNING_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import data from "../data";

export const signin = (email, password) => async (dispatch, getState) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
  });

  try {
    const { data } = await axios.post("/api/users/signin", { email, password });

    dispatch({
      type: USER_SIGNING_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNING_FAIL,
      payload: error,
    });
  }
};

export const userSignOut = () => (dispatch, getState) => {
  dispatch({
    type: USER_SIGNOUT,
    payload: {},
  });
};

export const register = (name, email, password) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });

  try {
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    });
  }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.put("/api/users/profile", user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LIST_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get("/api/users/list", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error,
    });
  }
};

export const deleteUser = () => async (dispatch, getState) => {};
