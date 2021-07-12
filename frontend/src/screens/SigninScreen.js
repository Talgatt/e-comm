import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();

  const { userInfo } = userSignin;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push("/shipping");
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="primary">
            Sign In
          </button>
        </div>
        <div>
          Not Registered Yet?
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
