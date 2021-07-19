import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { registerAsMerchant } from "../actions/userActions";
// import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import FlashMessage from "react-flash-message";
import Modal from "react-modal";
import { Checkmark } from "react-checkmark";
// import { retrieveMerchants } from "../actions/userActions";
// import { useDispatch } from "react-redux";

Modal.setAppElement("#root");

export default function MerchantScreen(props) {
  const [address, setAddress] = useState([]);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // const [change, setChange] = useState(false);
  // const [image, setImage] = useState(null)

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // const userRegisterAsMerchant = useSelector(
  //   (state) => state.userRegisterAsMerchant
  // );
  // const { loading, error, success } = userRegisterAsMerchant;

  // const userRegisterAsMerchant = useSelector((state) => state.userRegister);
  // const { loading, error, success } = userRegisterAsMerchant;

  // const dispatch = useDispatch();
  // const history = useHistory();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (!userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  // const formik = useFormik({
  //   initialValues: {
  //     user_id: userInfo ? userInfo._id : redirect,
  //     company_name: "",
  //     company_address: "",
  //     telephone: "",
  //     state_location: "",
  //     city: "",
  //     photo_img: "",
  //     trade_type: "",
  //   },

  //   validationSchema: Yup.object({
  //     company_name: Yup.string()
  //       .min(2, "Mininum 2 characters")
  //       .max(50, "Maximum 50 characters")
  //       .required("Required!"),
  //     company_address: Yup.string().required("Required!"),
  //     telephone: Yup.number().required("Required"),
  //     state_location: Yup.string().required("Required!"),
  //     city: Yup.string().required("Required!"),
  //     photo_img: Yup.mixed().required("Required"),
  //     trade_type: Yup.string().required("Required!"),
  //   }),

  //   onSubmit: (values) => {
  //     // alert(JSON.stringify(values, null, 2));
  //     // console.log(values.photo_img)
  //     dispatch(
  //       registerAsMerchant(
  //         values.user_id,
  //         values.company_name,
  //         values.company_address,
  //         values.telephone,
  //         values.state_location,
  //         values.city,
  //         values.photo_img,
  //         values.trade_type
  //       )
  //     );
  //     console.log(values);
  //   },
  // });

  const formik = useFormik({
    initialValues: {
      user_id: userInfo ? userInfo._id : redirect,
      company_name: "",
      company_address: "",
      telephone: "",
      state_location: "",
      city: "",
      photo_img: "",
      trade_type: "",
    },

    validationSchema: Yup.object({
      company_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(50, "Maximum 50 characters")
        .required("Required!"),
      company_address: Yup.string().required("Required!"),
      telephone: Yup.number().required("Required"),
      state_location: Yup.string().required("Required!"),
      city: Yup.string().required("Required!"),
      photo_img: Yup.mixed().required("Required"),
      trade_type: Yup.string().required("Required!"),
    }),

    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(values.photo_img)
      // dispatch(registerAsMerchant(values.user_id, values.company_name, values.company_address, values.telephone, values.state_location, values.city, values.photo_img, values.trade_type));
      setloading(true);
      let data = new FormData();
      data.append("user_id", values.user_id);
      data.append("company_name", values.company_name);
      data.append("company_address", values.company_address);
      data.append("telephone", values.telephone);
      data.append("state_location", values.state_location);
      data.append("city", values.city);
      data.append("photo_img", values.photo_img);
      data.append("trade_type", values.trade_type);
      return axios
        .post("https://isaacpyth.pythonanywhere.com/api/regmerchants/", data, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((response) => {
          setSuccess(response.data);
          setModalOpen(true);
        })
        .then(() => {
          setloading(false);
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace(redirect);
          }, 7000);
        })

        .catch((error) => {
          setloading(false);
          setError({
            error: error.response.data.detail,
          });
          console.log(error.response.data.detail);
        });
    },
  });

  const locaData = async () => {
    const response = await axios.get(
      "https://isaacpyth.pythonanywhere.com/api/listcity/"
    );
    setAddress(response.data.results);
  };

  // Need to build the City select options
  const [citiesOptions, setCitiesOptions] = useState([]);

  const handleStateSelect = (event) => {
    // set "address state in formik"
    formik.handleChange(event);

    // Filter for the selected state and use to build citiesOptions
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const selectedState = address.filter(
      (item) => item.state.state === event.target.value
    );

    // save filtered state to citiesOptions
    setCitiesOptions(selectedState);
  };

  // useEffect(() => {
  //   dispatch(userRegisterAsMerchant(userInfo.user_id);
  //   },[]);

  useEffect(() => {
    locaData();
  }, []);

  const customStyles = {
    // overlay: {
    //   backgroundColor:'grey'
    // },

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "300px",
      width: "400px",
      overflow: "hidden",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
    },
  };

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div>
          <h1>Register as merchant</h1>
        </div>

        {loading && <LoadingBox>{loading}</LoadingBox>}
        {error && <MessageBox variant="danger">{error.error}</MessageBox>}

        {/* {success && (
          <FlashMessage duration={5000}>
            {" "}
            <Modal
              isOpen={modalOpen}
              toggle={() => setModalOpen(!modalOpen)}
              style={customStyles}
            >
              <Checkmark size="xLarge" color="green" />
              <span>You have Successfully register as merchant</span>
            </Modal>
          </FlashMessage>
        )} */}
        <div style={{ display: "none" }}>
          <label></label>
          <input
            type="text"
            name="user_id"
            readOnly
            value={formik.values.user_id}
            onChange={formik.handleChange}
          />
          {formik.errors.user_id && formik.touched.user_id && (
            <p>{formik.errors.user_id}</p>
          )}
        </div>
        {/* <div style={{display: "none"}}>{userInfo._id}</div> */}
        <div>
          <label>Company name</label>
          <input
            type="text"
            name="company_name"
            value={formik.values.company_name}
            onChange={formik.handleChange}
          />
          {formik.errors.company_name && formik.touched.company_name && (
            <p>{formik.errors.company_name}</p>
          )}
        </div>
        <div className="add-tele">
          <div>
            <label>Company address</label>
            <input
              type="text"
              name="company_address"
              value={formik.values.company_address}
              onChange={formik.handleChange}
            />
            {formik.errors.company_address &&
              formik.touched.company_address && (
                <p>{formik.errors.company_address}</p>
              )}
          </div>

          <div>
            <label>Telephone</label>
            <input
              type="number"
              name="telephone"
              value={formik.values.telephone}
              onChange={formik.handleChange}
            />
            {formik.errors.telephone && formik.touched.telephone && (
              <p>{formik.errors.telephone}</p>
            )}
          </div>
        </div>

        <div>
          <label>State</label>
          <select
            type="select"
            name="state_location"
            value={formik.values.state_location}
            onChange={handleStateSelect}
          >
            <option hidden>Select State</option>
            {address.map((item, index) => {
              return (
                <option key={index} value={item.state.state}>
                  {item.state.state}
                </option>
              );
            })}
            ;
          </select>
          {formik.errors.state_location && formik.touched.state_location && (
            <p>{formik.errors.state_location}</p>
          )}
        </div>

        <div className="city">
          <label>City</label>
          <select
            type="select"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
          >
            <option className="holder" hidden>
              Select City
            </option>
            {citiesOptions.map((item, index) => {
              return (
                <option key={index} value={item.city}>
                  {item.city}
                </option>
              );
            })}
            ;
          </select>
          {formik.errors.city && formik.touched.city && (
            <p>{formik.errors.city}</p>
          )}
        </div>

        <div>
          <label>Photo image</label>
          <input
            type="file"
            id="image"
            // accept="image/png, image/jpeg"
            label="Choose Image"
            name="file"
            // value={formik.values.photo_img}
            onChange={(event) => {
              formik.setFieldValue("photo_img", event.target.files[0]);
            }}
          />
          {formik.errors.photo_img && formik.touched.photo_img && (
            <p>{formik.errors.photo_img}</p>
          )}
        </div>

        <div>
          <label>Trade type</label>
          <input
            type="text"
            name="trade_type"
            value={formik.values.trade_type}
            onChange={formik.handleChange}
          />
          {formik.errors.trade_type && formik.touched.trade_type && (
            <p>{formik.errors.trade_type}</p>
          )}
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
