import {USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";
// USER_REGISTER_ASMERCHANTS_FAIL, USER_REGISTER_ASMERCHANTS_REQUEST, USER_REGISTER_ASMERCHANTS_SUCCESS,

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false,  userInfo: action.payload};
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

// export const userRegisterAsMerchantReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_REGISTER_ASMERCHANTS_REQUEST:
//       return { loading: true };
//     case USER_REGISTER_ASMERCHANTS_SUCCESS:
//       return { laoding: false, success: true }
//     case USER_REGISTER_ASMERCHANTS_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };