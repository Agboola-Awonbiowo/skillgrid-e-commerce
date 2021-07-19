import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveMerchants } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import axios from "axios";
// import { MERCHANT_UPDATE_RESET } from "../constants/userConstants";

export default function MercahantsEditScreen(props) {
  const userId = props.match.params.id;
  // const [id, setId] = useState("");
  const [user_id, setUser_Id] = useState("");
  const [photo_img, setPhoto_Image] = useState(null);
  const [company_name, setCompany_Name] = useState("");
  const [company_address, setCompany_Address] = useState("");
  const [telephone, setTelephone] = useState("");
  const [state_location, setState_Location] = useState("");
  const [city, setCity] = useState("");
  const [trade_type, setTrade_Type] = useState("");
  const [approval, setApproval] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState("");
  // const [reset, setReset] = useState([]);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userRetrieveMerchants = useSelector(
    (state) => state.userRetrieveMerchants
  );

  const { loading, error, merchant } = userRetrieveMerchants;

  // const merchantUpdate = useSelector((state) => state.merchantUpdate);
  // const {
  //   loading: loadingUpdate,
  //   error: errorUpdate,
  //   success: successUpdate,
  // } = merchantUpdate;
  const dispatch = useDispatch();

  // const changeHandler = (e) => {
  //   setPhoto_Image(e.target.files[0]);
  //   setIsSelected(true);
  // };

  useEffect(() => {
    if (successUpdate) {
      // dispatch({ type: MERCHANT_UPDATE_RESET });
      props.history.push("/merchantslist");
    }
    if (!merchant) {
      dispatch(retrieveMerchants(userId));
    } else {
      // setPhoto_Image(merchant.photo_img);
      setCompany_Name(merchant.company_name);
      setCompany_Address(merchant.company_address);
      setTelephone(merchant.telephone);
      setState_Location(merchant.state_location);
      setCity(merchant.city);
      setTrade_Type(merchant.trade_type);
      //setApproval(merchant.approval);
      setUser_Id(merchant.user_id);
    }
  }, [dispatch, props.history, successUpdate, merchant, userId, approval]);

  // const changeApproval = () => {
  //   setApproval({ approval: approval ? false : true });
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    // dispatch(
    //   updateMerchant({
    //     id: userId,
    //     user_id,
    //     photo_img,
    //     company_name,
    //     company_address,
    //     telephone,
    //     state_location,
    //     city,
    //     trade_type,
    //     approval,
    //   })
    // );
    setLoadingUpdate(true);
    let form_data = new FormData();
    // form_data.append("photo_img", photo_img);
    form_data.append("company_name", merchant.company_name);
    form_data.append("company_address", merchant.company_address);
    form_data.append("user_id", merchant.user_id);
    // form_data.append("telephone", merchant.telephone);
    // form_data.append("state_loaction", merchant.state_location);
    // form_data.append("city", merchant.city);
    form_data.append("trade_type", merchant.trade_type);
    form_data.append("approval", approval);
    // form_data.append("id", merchant.id);
    // console.log(approval);
    return (
      axios
        .put(
          `https://isaacpyth.pythonanywhere.com/api/retrievemerchants/${merchant.id}`,
          merchant,
          {
            headers: {
              // "content-type": "multipart/form-data",
              "Content-Type": "application/json",

              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        )

        .then((res) => {
          setSuccessUpdate(res.data);
        })

        .then(() => {
          setLoadingUpdate(false);
        })

        //  .then(() => {
        //     props.history.push("/merchantslist");
        //   })
        .catch((errorUpdate) => {
          setLoadingUpdate(false);
          setErrorUpdate({
            errorUpdate: errorUpdate.response.data.d,
          });
          console.log(errorUpdate);
        })
    );
  };

  return (
    <div>
      {/* <div className="photo_merchant">
        <img src={photo_img} alt={userId}></img>
      </div> */}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {company_name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate.errorUpdate}</MessageBox>
          )}
          {/* {successUpdate && <MessageBox>{successUpdate}</MessageBox>} */}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {/* <div className="photo_merchant">
              <img src={photo_img} alt={userId}></img>
            </div> */}
            {/* <div style={{ display: "none" }}>
              <label></label>
              <input
                type="text"
                namnId"
    readOnly
              ={userId}
                onChange={userId}
              />
            </div>
            <div style={{ display: "none" }}>
              <label></label>
              <input
                type="text"
                name="user_id"
                readOnly
                value={user_id}
                onChange={(e) => setUser_Id(e.target.value)}
              />
            </div> */}
            <div>
              <label htmlFor="photo_img">photo_img</label>
              <input
                id="image"
                name="file"
                type="file"
                placeholder="Enter photo_img"
                accept="image/png, image/jpeg"
                // value={photo_img}
                onChange={(e) => {
                  setPhoto_Image("photo_img", e.target.files[0]);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="company_name">Company Name</label>
              <input
                id="company_name"
                type="text"
                placeholder="Enter company_name"
                value={company_name}
                onChange={(e) => setCompany_Name(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="company_address">company_address</label>
              <input
                id="company_address"
                type="company_address"
                placeholder="Enter company_address"
                value={company_address}
                onChange={(e) => setCompany_Address(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="telephone">Telephone</label>
              <input
                id="telephone"
                type="telephone"
                placeholder="Enter telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="state_location">State</label>
              <input
                id="state_location"
                type="state_location"
                placeholder="Enter state_location"
                value={state_location}
                onChange={(e) => setState_Location(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="City">City</label>
              <input
                id="City"
                type="City"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="trde_type">Trade</label>
              <input
                id="trade_type"
                type="trade_type"
                placeholder="Enter trade_type"
                value={trade_type}
                onChange={(e) => setTrade_Type(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="approval">Approve</label>
              <input
                id="approval"
                type="checkbox"
                checked={approval}
                onChange={() => setApproval((value) => !value)}
              ></input>
            </div>

            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
