import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  userRegisterReducer,
  userRetrieveAllMerchantsReducer,
  userRetrieveMerchantsReducer,
  userSigninReducer,
} from "./reducers/userReducers";
// merchantUpdateReducer,

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userRetrieveMerchants: userRetrieveMerchantsReducer,
  userRetrieveAllMerchants: userRetrieveAllMerchantsReducer,
  // merchantUpdate: merchantUpdateReducer,
});
const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhanser(applyMiddleware(thunk))
);

export default store;
