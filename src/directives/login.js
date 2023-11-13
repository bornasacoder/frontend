import React from 'react'
import Header from './header'

function Login() {
  return (
    <div style={{backgroundColor:"#323132",height:"100%",overflow:"hidden"}}>
        <div>
            <Header/>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",marginTop:""}}>
            <div className='loginContentDiv' style={{width:"90%",display:"flex",marginTop:"100px",height:"100%"}}>
                <div className='loginContentDivVideo' style={{width:"100%"}}>
                        <video autoPlay loop muted className='loginContentDivVideo2'>
                            <source
                                src='/login-video.mp4'
                                type='video/mp4'
                            />
                        </video>
                </div>
                <div className="modal-content loginContentDiv2" style={{width:"50%"}}>
                            <div className="modal-header1">
                                <button type="button" style={{
                                    marginRight: '10px',
                                    fontSize: '26px'
                                }} className="close" data-dismiss="modal" data-aos="zoom-in-up" data-aos-duration="800">&times;</button>
                                <h3 className="modal-title1  blue oR m0">Login</h3>
                                <span className="light oR register_popup" style={{ fontSize: '14px' }} >Enter your informations to register.</span>
                            </div>
                            <form 
                            // onSubmit={this.submitForm}
                            >
                                <div className="modal-body">
                                    <div className="input-box">
                                        <input placeholder="Full Name"
                                        //  value={this.state.full_name} onChange={this.onChange} 
                                         name="full_name" type="text" />
                                        <span className="contact_footer"><i className="fa fa-user"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">
                                    {/* {this.state.firstnameError} */}
                                    </div>
                                    <div className="input-box">
                                        <input placeholder="Email Address" 
                                        // value={this.state.email} onChange={this.onChange} 
                                        name="email" type="email" />
                                        <span className="contact_footer"><i className="fa fa-envelope-o"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">
                                    {/* {this.state.emailError} */}
                                    </div>
                                    <div className="input-box">
                                        <input placeholder="Login Key" type="password" 
                                        // value={this.state.password} onChange={this.onChange}
                                         name="password" />
                                        <span className="contact_footer"><i className="fa fa-key"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">
                                        {/* {this.state.passwordError} */}
                                        </div>
                                    <div className="input-box">
                                        <input placeholder="Confirm Login Key" type="password" 
                                            // value={this.state.confirm_password} onChange={this.onChange} 
                                            name="confirm_password" />
                                        <span className="contact_footer"><i className="fa fa-key"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">
                                    {/* {this.state.confirmpasswordError} */}
                                    </div>
                                    <div className="errorMessage_confp">
                                    {/* {this.state.confirmpassword1Error} */}
                                    </div>
                                    <div className="input-box">
                                        <input placeholder="Referral Code" 
                                        // value={this.state.referral_code}
                                        //     onChange={this.onChange} 
                                            name="referral_code" type="text" />
                                        <span className="contact_footer"><i className="fa fa-retweet"></i></span>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-gradient">Register</button>
                                </div>
                            </form>
                        </div>
            </div>
        </div>
    </div>
  )
}

export default Login
