import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_RETRIEVE_MERCHANTS_REQUEST,
  USER_RETRIEVE_MERCHANTS_SUCCESS,
  USER_RETRIEVE_MERCHANTS_FAIL,
  USER_RETRIEVE_ALL_MERCHANTS_REQUEST,
  USER_RETRIEVE_ALL_MERCHANTS_SUCCESS,
  USER_RETRIEVE_ALL_MERCHANTS_FAIL,
} from "../constants/userConstants";

// MERCHANT_UPDATE_REQUEST,MERCHANT_UPDATE_SUCCESS,MERCHANT_UPDATE_FAIL,
import Axios from "axios";
import axios from "axios";

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
      "https://isaacpyth.pythonanywhere.com/auth/obtain_token",
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
  window.location.replace("/");
  // localStorage.removeItem('cartItems');
  // localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
};

export const retrieveMerchants = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_RETRIEVE_MERCHANTS_REQUEST, payload: id });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(
      `https://isaacpyth.pythonanywhere.com/api/retrievemerchants/${id}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: USER_RETRIEVE_MERCHANTS_SUCCESS,
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_RETRIEVE_MERCHANTS_FAIL, payload: message });
  }
};

export const retrieveAllMerchants = () => async (dispatch, getState) => {
  dispatch({ type: USER_RETRIEVE_ALL_MERCHANTS_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(
      "https://isaacpyth.pythonanywhere.com/api/retrievallemerchants/",
      {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: USER_RETRIEVE_ALL_MERCHANTS_SUCCESS,
      payload: data.results,
    });
    // console.log(data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_RETRIEVE_ALL_MERCHANTS_FAIL, payload: message });
  }
};

// export const updateMerchant = (merchant) => async (dispatch, getState) => {
//   dispatch({ type: MERCHANT_UPDATE_REQUEST, payload: merchant });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.put(
//       `https://isaacpyth.pythonanywhere.com/api/retrievemerchants/${merchant.id}`,
//       merchant,
//       {
//         headers: {
//           "content-type": "multipart/form-data",

//           Authorization: `Bearer ${userInfo.token}`,
//           Accept:
//             "application/json, application/xml, text/plain, text/html, *.*",
//         },
//       }
//     );
//     dispatch({ type: MERCHANT_UPDATE_SUCCESS, payload: data });
//     console.log(data);
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: MERCHANT_UPDATE_FAIL, payload: message });
//   }
// };
