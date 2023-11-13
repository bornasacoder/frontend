import React from 'react'
import Header from './header'
import {Link} from "react-router-dom"

function Login() {
  return (
    <div style={{backgroundColor:"#323132",height:"100%",overflow:"hidden"}}>
        <div>
            <Header/>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",marginTop:"50px",height:"100vh"}}>
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
                                                        <form 
                                                        // onSubmit={this.submitForm}
                                                        >
                                                            <div className="body">
                                                                <div className="input-box">
                                                                    <input placeholder="Email" 
                                                                    // value={this.state.email}
                                                                    //     onChange={this.onChange}
                                                                         name="email" className="input11" type="email" />
                                                                    <span style={{ position: 'absolute' }}><i className="fa fa-user"></i></span>
                                                                </div>
                                                                {/* <span className="errorMessage_signup">{this.state.emailError}</span> */}
                                                                <div className="input-box">
                                                                    <input placeholder="Password" type="password"
                                                                    //  value={this.state.password}
                                                                    //     onChange={this.onChange}
                                                                         name="password" className="input11" />
                                                                    <span style={{ position: 'absolute' }}><i className="fa fa-key"></i></span>
                                                                </div>
                                                                {/* <span className="errorMessage_signup">{this.state.passwordError}</span> */}

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
                                                        </form>
                                                    </div>
                                                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
