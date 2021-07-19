import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function MerchantsRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo._id);
      // dispatch(retrieveMerchants(userInfo._id));
    }
  }, [userInfo._id, userInfo]);
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo._id ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
