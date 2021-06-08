import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
} from "../constants/userConstants";
// USER_REGISTER_ASMERCHANTS_REQUEST, USER_REGISTER_ASMERCHANTS_SUCCESS, USER_REGISTER_ASMERCHANTS_FAIL

import Axios from "axios";

export const register = (username, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { username, email, password },
  });
  try {
    const { data } = await Axios.post(
      "https://isaacpyth.pythonanywhere.com/api/register/",
      {
        username,
        email,
        password,
      }
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
  try {
    const { data } = await Axios.post(
      "https://digital-gang.com/auth/obtain_token",
      { username, password }
    );

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  // localStorage.removeItem('cartItems');
  // localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
};

// export const registerAsMerchant = (
//   user_id,
//   company_name,
//   company_address,
//   telephone,
//   state_location,
//   city,
//   photo_img,
//   trade_type
//   ) => async (dispatch) => {
//   dispatch({ type: USER_REGISTER_ASMERCHANTS_REQUEST, payload: {
//     user_id,
//     company_name,
//     company_address,
//     telephone,
//     state_location,
//     photo_img,
//     city,
//     trade_type} });
//   // const {
//   //   userSignin: { userInfo },
//   // } = getState();
//   try {
//     const { data } = await Axios.post('https://digital-gang.com/api/regmerchants/',
//     {
//       user_id,
//       company_name,
//       company_address,
//       telephone,
//       state_location,
//       photo_img,
//       city,
//       trade_type
//     }
//     //  { headers: { Authorization: `Bearer ${userInfo.token}`}
//     );
//     dispatch({ type: USER_REGISTER_ASMERCHANTS_SUCCESS, payload: data });
//     console.log(data)
//     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
//     localStorage.setItem('userInfo', JSON.stringify(data));
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_REGISTER_ASMERCHANTS_FAIL, payload: message });
//   };
// }
