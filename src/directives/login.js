import React from 'react';
import Header from './header';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toastr from 'reactjs-toastr';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const history = useHistory();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const headers = {
    'Content-Type': 'text/plain',
  };

  const handleSubmit = async (values) => {
    // try {
    //   const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/login`, values, {
    //     headers,
    //   });

    //   // Assuming the API response has a success flag, adjust this based on your API response structure
    //   if (response?.data && response?.data?.success) {
    //     toastr.success('Login successful'); // Use toastr or any other notification library
    //     history.push('/');
    //   } else {
    //     toastr.error('Login failed'); // Adjust based on your API response
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toastr.error('An error occurred'); // Adjust based on your error handling
    // }
    await axios.post(`${process.env.REACT_APP_URL}/api/users/login`, values, { headers })
    .then(response => {

        if (response.data.code === true) {
            toastr.success('Sucess', { displayDuration: 3000 })
            Cookies.set('name', response.data);

           
            if (response?.data?.user_data?.is_enable_google_auth_code === '0') {
                
                window.location.hash = '/dashboard'
            }
            else if (response?.data?.user_data?.is_enable_google_auth_code === '1') {
                // window.location.reload(true);
                window.location.hash = '/twofa'
            }

        }
        else if (response?.data?.code === false) {
            toastr.error(response.data.message, { displayDuration: 3000 })            
        }
    })

    .catch(err => {
        console.log(err)
    })
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div style={{ backgroundColor: '#323132', height: '100%', overflow: 'hidden' }}>
      <div>
        <Header />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '50px', height: '100%' }}>
        <div className="loginContentDiv" style={{ width: '90%', display: 'flex', marginTop: '100px', height: '100%' }}>
          <div className="loginContentDivVideo">
            <video autoPlay loop muted className="loginContentDivVideo2" style={{ width: '100%' }}>
              <source src="/login-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="box_shadow loginpageDiv" style={{ marginTop: '0px', width: '' }}>
            <div className="login-div">
              <div className="head">
                <h3 className="purple oR m0">Join collective Transformation</h3>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="body">
                  <div className="input-box">
                    <input
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="email"
                      className="input11"
                      type="email"
                    />
                    <span style={{ position: 'absolute' }}>
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <span className="errorMessage_signup">{formik.touched.email && formik.errors.email}</span>
                  <div className="input-box">
                    <input
                      placeholder="Password"
                      type="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="password"
                      className="input11"
                    />
                    <span style={{ position: 'absolute' }}>
                      <i className="fa fa-key"></i>
                    </span>
                  </div>
                  <span className="errorMessage_signup">{formik.touched.password && formik.errors.password}</span>
                </div>
                <div className="foot">
                  <Link to="/forgetpassword" className="forgot pull-left">
                    <div style={{ fontSize: '110%' }}>Forgot your password?</div>
                  </Link>
                  <button type="submit" className="btn btn-gradient W100 pull-right" disabled={!formik.isValid}>
                    Login!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
