import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import userRouter from "../../../backend/routers/userRouters";

export default function SellerRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const [userInfo] = userSignin;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isSeller ? (
          <Component {...rest} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
