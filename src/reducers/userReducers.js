import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RETRIEVE_ALL_MERCHANTS_FAIL,
  USER_RETRIEVE_ALL_MERCHANTS_REQUEST,
  USER_RETRIEVE_ALL_MERCHANTS_SUCCESS,
  USER_RETRIEVE_MERCHANTS_FAIL,
  USER_RETRIEVE_MERCHANTS_REQUEST,
  USER_RETRIEVE_MERCHANTS_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

// MERCHANT_UPDATE_FAIL,
// MERCHANT_UPDATE_REQUEST,
// MERCHANT_UPDATE_RESET,
// MERCHANT_UPDATE_SUCCESS,

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userRetrieveMerchantsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RETRIEVE_MERCHANTS_REQUEST:
      return { loading: true };
    case USER_RETRIEVE_MERCHANTS_SUCCESS:
      return { loading: false, merchant: action.payload };
    case USER_RETRIEVE_MERCHANTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRetrieveAllMerchantsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case USER_RETRIEVE_ALL_MERCHANTS_REQUEST:
      return { loading: true };
    case USER_RETRIEVE_ALL_MERCHANTS_SUCCESS:
      return { loading: false, merchants: action.payload };
    case USER_RETRIEVE_ALL_MERCHANTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const merchantUpdateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case MERCHANT_UPDATE_REQUEST:
//       return { loading: true };
//     case MERCHANT_UPDATE_SUCCESS:
//       return { loading: false, success: true };
//     case MERCHANT_UPDATE_FAIL:
//       return { loading: false, error: action.payload };
//     case MERCHANT_UPDATE_RESET:
//       return {};
//     default:
//       return state;
//   }
// };
