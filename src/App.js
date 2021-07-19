import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import RegisterScreen from "./screen/RegisterScreen";
import SigninScreen from "./screen/SigninScreen";
import MerchantScreen from "./screen/MerchantScreen";
import ResetPasswordScreen from "./screen/ResetPasswordScreen";
import { signout, retrieveMerchants } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import MerchantsListScreen from "./screen/MerchantsListScreen";
import MercahantsEditScreen from "./screen/MercahantsEditScreen";
// import MerchantsRoute from "./components/MerchantsRoute";

function App(props) {
  //  const [handleClick, setHandleClick] = useState(false);
  // const [id, setId] = useState("");

  // const redirect = props.location.search
  //   ? props.location.search.split("=")[0]
  //   : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userRetrieveMerchants = useSelector(
    (state) => state.userRetrieveMerchants
  );

  const { merchant } = userRetrieveMerchants;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo._id);
      dispatch(retrieveMerchants(userInfo._id));
    } else {
      return null;
    }
  }, [dispatch, userInfo]);

  // useEffect(() => {
  //   dispatch(retrieveMerchants(merchant.id));
  // }, [dispatch, merchant]);

  // console.log(userRetrieveMerchants);

  // const userRetrieveMerchants = useSelector(
  //   (state) => state.userRetrieveMerchants
  // );

  // const userList = useSelector((state) => state.userList);
  // const { loading, error, users } = userList;

  const signoutHandler = () => {
    dispatch(signout());
    // dispatch(retrieveAllMerchants());
  };

  // const redirect = props.location.search
  //   ? props.location.search.split('=')[0]
  //   : '/';

  // const isAuth = (e) => {
  //   e.preventDefault();

  //   console.log('The link was clicked.');
  //   if(localStorage.getItem(userInfo)) {

  //     return <Redirect to="/merchant" />;

  //   } else {

  //     return <Redirect to="/signin" />;

  //   }

  // };

  return (
    <div className="grid-container">
      <BrowserRouter>
        <header className="row">
          <div>
            {/* <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
                <Link className="brand" to="/">U-ECOM</Link>
            </div>
            <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
           </div>
            <div>
                <Link to="/cart">Cart 
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link> */}

            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.username} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}

            {merchant && merchant && (
              <div className="dropdown">
                <Link to="#admin">
                  {merchant.company_name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}

            {userInfo && userInfo.IsAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/merchantslist">Merchants</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="middle">
            <span>
              <i className="fas fa-shopping-cart"></i> 0
            </span>
          </div>

          <div className="righttop">
            <div className="socialmedia">
              <span>
                <i className="fab fa-facebook-square"></i>
              </span>
              <span>
                <i className="fab fa-twitter-square"></i>
              </span>
              <span>
                <i className="fab fa-instagram-square"></i>
              </span>
              <span className="lastmedia">
                <i className="fab fa-whatsapp-square"></i>
              </span>
            </div>
          </div>
        </header>

        <main>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/merchant" component={MerchantScreen}></Route>
          <Route path="/resetpassword" component={ResetPasswordScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <AdminRoute
            path="/merchantslist"
            component={MerchantsListScreen}
            exact
          ></AdminRoute>

          <AdminRoute
            path="/merchants/:id/edit"
            component={MercahantsEditScreen}
          ></AdminRoute>
        </main>
        <footer className="row center">
          <div>All right reserved</div>
          <br />
          <div>
            {userInfo ? (
              <Link to="/merchant">Register as merchant</Link>
            ) : (
              <Link to="/signin">Register as merchant</Link>
            )}
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
