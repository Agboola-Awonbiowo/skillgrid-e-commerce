import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterScreen(props) {
  
   const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/signin';

  // const history = useHistory();


  const userRegister = useSelector((state) => state.userRegister);
  const {userInfo, loading, error } = userRegister;
  
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(50, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!")
    }),
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(register(values.username, values.email, values.password));
    }
  });

  useEffect(() => {
    if (userInfo) {
      props.history.push('/signin');
    } 
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
      <div>
           <h1>Register</h1>
       </div>
       {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label>username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username && (
            <p>{formik.errors.username}</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmpassword &&
            formik.touched.confirmpassword && (
              <p>{formik.errors.confirmpassword}</p>
            )}
        </div>
        <div>
        <label />
          <button className="primary" type="submit">Register</button>
        </div>
        <div>
         <label />
           <div>
             Already have an account?{' '}
             <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
           </div>
         </div>
      </form>
    </div>
  );
}
