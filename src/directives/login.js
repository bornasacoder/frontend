import React from 'react'
import Header from './header'
import {Link} from "react-router-dom"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toastr from 'reactjs-toastr';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory()
    const initialValues = { 
        email: '',
        password: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is required').required(),
        password: Yup.string().required('Password is required'),
      });

      const headers = {
        'Content-Type': 'text/plain'
     };

    const onSubmit = async (values) => {
        console.log(values)
        try{
            const data = values
            const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/login`, data,{headers})
            if(response){
                history.push("/")
            }
        } catch(err){
            console.log(err)
        }
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
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",marginTop:"50px",height:"100%"}}>
            <div className='loginContentDiv' style={{width:"90%",display:"flex",marginTop:"100px",height:"100%"}}>
                <div className='loginContentDivVideo' >
                        <video autoPlay loop muted className='loginContentDivVideo2' style={{width:"100%"}}>
                            <source
                                src='/login-video.mp4'
                                type='video/mp4'
                            />
                        </video>
                </div>
                <div className="box_shadow loginpageDiv" style={{margintop:"0px",width:""}}>
                                                    <div className="login-div">
                                                        <div className="head">
                                                            <h3 className="purple oR m0">Join collective Transformation</h3>
                                                        </div>
                                                        <div 
                                                        onSubmit={formik.handleSubmit}
                                                        >
                                                            <div className="body">
                                                                <div className="input-box">
                                                                    <input placeholder="Email" 
                                                                    value={formik.values.email}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        name="email" className="input11" type="email" />
                                                                    <span style={{ position: 'absolute' }}><i className="fa fa-user"></i></span>
                                                                </div>
                                                                <span className="errorMessage_signup">{formik.errors.email}</span>
                                                                <div className="input-box">
                                                                    <input placeholder="Password" type="password"
                                                                     value={formik.values.password}
                                                                        onBlur={formik.handleBlur}
                                                                        onChange={formik.handleChange}
                                                                         name="password" className="input11" />
                                                                    <span style={{ position: 'absolute' }}><i className="fa fa-key"></i></span>
                                                                </div>
                                                                <span className="errorMessage_signup">{formik.errors.password}</span>

                                                            </div>
                                                            <div className="foot">
                                                                <Link to="/forgetpassword" 
                                                                // onClick={this.forgot} 
                                                                className="forgot pull-left">
                                                                    <div style={{ fontSize: '110%' }}>Forgot your password?</div>
                                                                </Link>
                                                                <button type="submit"
                                                                //  disabled={!this.state.email || !this.state.password} 
                                                                 className="btn btn-gradient W100 pull-right">Login!</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
