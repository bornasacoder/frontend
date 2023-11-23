import React from 'react'
import Header from './header'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toastr from 'reactjs-toastr';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Register() {
    const history = useHistory()
    const initialValues = {
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
        referral_code: '',
    }
    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required('First Name is required'),
        email: Yup.string().email('Email is required').required(),
        password: Yup.string().required('Password is required'),
        confirm_password: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Password and Confirm Password Should be same')
      });

      const headers = {
        'Content-Type': 'text/plain',
      };

    const onSubmit = async (values) => {
        console.log(values)
        // try{
            const data = values
            axios.post(`${process.env.REACT_APP_URL}/api/users/register`, data,{headers})
            .then(response => {

                if (response.data.code === true) {
                    toastr.success(response.data.message, { displayDuration: 3000 })
                  
                    window.location.hash = '/login'
                }

                else if (response.data.code === false) {
                    toastr.error(response.data.message, { displayDuration: 3000 })

                }

            })

            .catch(err => {
              console.log(err)
            })
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const formik = useFormik({
          initialValues,
          onSubmit ,
          validationSchema
      })
  return (
    <div style={{backgroundColor:"#323132",height:"100%",overflow:"hidden"}}>
        <div>
            <Header/>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",marginTop:""}}>
            <div className='loginContentDiv' style={{width:"90%",display:"flex",marginTop:"100px",height:"100%"}}>
                <div className='loginContentDivVideo' style={{width:"100%"}}>
                        <video autoPlay loop muted className='loginContentDivVideo2' style={{width:"100%"}}>
                            <source
                                src='/login-video.mp4'
                                type='video/mp4'
                            />
                        </video>
                </div>
                <div className="modal-content loginContentDiv2" style={{width:"500px",marginTop:"10px"}}>
                            <div className="modal-header1">
                                <button type="button" style={{
                                    marginRight: '10px',
                                    fontSize: '26px'
                                }} className="close" data-dismiss="modal" data-aos="zoom-in-up" data-aos-duration="800">&times;</button>
                                <h3 className="modal-title1  blue oR m0">REGISTER</h3>
                                <span className="light oR register_popup" style={{ fontSize: '14px' }} >Enter your informations to register.</span>
                            </div>
                            <form onSubmit={formik.handleSubmit}
                            >
                                <div className="modal-body">
                                    <div className="input-box">
                                        <input placeholder="Full Name"
                                            onBlur={formik.handleBlur}
                                         value={formik.values.full_name} onChange={formik.handleChange} 
                                         name="full_name" type="text" />
                                        <span className="contact_footer"><i className="fa fa-user"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">
                                    {formik.errors.full_name}
                                    </div>
                                    <div className="input-box">
                                        <input placeholder="Email Address" 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email} onChange={formik.handleChange} 
                                        name="email" type="email" />
                                        <span className="contact_footer"><i className="fa fa-envelope-o"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">
                                    {formik.errors.email}
                                    </div>
                                    <div className="input-box">
                                        <input placeholder="Login Key" type="password" 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password} onChange={formik.handleChange}
                                         name="password" />
                                        <span className="contact_footer"><i className="fa fa-key"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">
                                        {formik.errors.password}
                                        </div>
                                    <div className="input-box">
                                        <input placeholder="Confirm Login Key" type="password" 
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirm_password} onChange={formik.handleChange} 
                                            name="confirm_password" />
                                        <span className="contact_footer"><i className="fa fa-key"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">
                                    {formik.errors.confirm_password}
                                    </div>
                                    <div className="errorMessage_confp">
                                    {/* {formik.errors.confirm_password} */}
                                    </div>
                                    <div className="input-box">
                                        <input placeholder="Referral Code" 
                                        value={formik.values.referral_code}
                                            onChange={formik.handleChange} 
                                            onBlur={formik.handleBlur}
                                            name="referral_code" type="text" />
                                        <span className="contact_footer"><i className="fa fa-retweet"></i></span>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-gradient" >Register</button>
                                </div>
                            </form>
                        </div>
            </div>
        </div>
    </div>
  )
}

export default Register
