import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { Link } from 'react-router-dom';
// import '../assets/css/bootstrap.css';
import Cookies from 'js-cookie';

const headers = {
    'Content-Type': 'text/plain'
 };
const initialState = {
    full_name: '',
    email: '',
    password: '',
    referral_code: '',
    confirm_password: '',
    firstnameError: '',
    emailError: '',
    passwordError: '',
    confirmpasswordError: '',
    confirmpassword1Error: '',

}

export default class Headerhome extends Component {

    constructor(props) {
        super(props)
        this.state = initialState

        this.onChange = this.onChange.bind(this);

        this.submitForm = this.submitForm.bind(this);
        if (Cookies.getJSON('name')) {

            let data = Cookies.getJSON('name');
            this.loginData = data.user_data
        }
    }




    // validation check 

    validate = () => {
        let firstnameError = '';
        let emailError = '';
        let passwordError = '';
        let confirmpasswordError = '';
        let confirmpassword1Error = '';


        if (this.state.full_name.length <= 0) {
            firstnameError = "First Name is required"
        }


        if (!this.state.email.includes("@")) {

            emailError = "Email is required"
        }

        if (this.state.password.length <= 0) {
            passwordError = "Password is required"
        }


        if (this.state.confirm_password.length <= 0) {
            confirmpasswordError = "Confirm Password is required"
        }

        if (this.state.password !== this.state.confirm_password) {
            confirmpassword1Error = "Password and Confirm Password Should be same"
        }


        if (emailError || passwordError || firstnameError || confirmpasswordError || confirmpassword1Error) {
            this.setState({ emailError, passwordError, firstnameError, confirmpasswordError, confirmpassword1Error });
            return false
        }

        return true
    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    //submit the data
    async submitForm(e) {
        e.preventDefault()

        const isValid = this.validate();
        if (isValid) {


            this.setState(initialState)

            this.setState({
                loading: true
            })

            delete this.state.firstnameError
            delete this.state.emailError
            delete this.state.passwordError
            delete this.state.confirmpasswordError
            delete this.state.confirmpassword1Error


            const data = this.state


            axios.post(`${process.env.REACT_APP_URL}/api/users/register`, data,{headers})
                .then(response => {

                    if (response.data.code === true) {
                        toastr.success(response.data.message, { displayDuration: 3000 })
                        this.setState({
                            loading: false,
                            message: response.data
                        })
                        // window.location.reload();
                    }

                    else if (response.data.code === false) {
                        toastr.error(response.data.message, { displayDuration: 3000 })

                    }

                })

                .catch(err => {
                    this.setState({
                        loading: false
                    })
                })

        }
        else {
        }


    }


    loginPage() {
        setTimeout(() => {
            window.location.reload(true)
        }, 200);
    }

    render() {


        return (
            <>

                {/* <!-- NAVIGATION --> */}
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header logoo">
                            <button id="tog-btn" type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="javascript:;"><img className="img-responsive" alt="Notjing" src="logo_freedom_white.png" /></a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right hidden-xs hidden-sm">
                                <li className="gold">
                                    <a href="javasript:void(0);">
                                        {this.loginData ? <>
                                            <button className="btn12 btn-gradient outline-button" style={{ marginBottom: '0px', marginRight: '10px' }}><div style={{ background: '#1C589B', transition: 'all 0.3s' }}>
                                                <Link to="/dashboard" onClick={this.loginPage}> Dashboard</Link> </div></button>
                                            {/* <button className="btn12 btn-gradient outline-button" style={{ marginBottom: '0px', marginRight: '10px' }} data-toggle="modal" data-target="#pop-register"><div style={{ background: '#1C589B', transition: 'all 0.3s' }}>Register</div></button> */}
                                            <button className="btn12 btn-gradient outline-button" style={{ marginBottom: '0px', marginRight: '10px' }}><div style={{ background: '#1C589B', transition: 'all 0.3s' }}>
                                                <Link to="/allprojectslist" onClick={this.loginPage}> All Projects</Link> </div></button>
                                        </> : <> <button className="btn12 btn-gradient outline-button" style={{ marginBottom: '0px', marginRight: '10px' }} data-toggle="modal" data-target="#pop-register"><div style={{ background: '#1C589B', transition: 'all 0.3s' }}>Register</div></button>
                                                <button className="btn12 btn-gradient outline-button" style={{ marginBottom: '0px', marginRight: '10px' }}><div style={{ background: '#1C589B', transition: 'all 0.3s' }}>
                                                    <Link to="/allprojectslist" onClick={this.loginPage}> All Projects</Link> </div></button>
                                            </>
                                        }



                                    </a></li>
                            </ul>
                            {/* <ul id="navigation" className="nav navbar-nav navbar-right">

                                <li><Link to="/" onClick={this.loginPage}>Login</Link></li>
                            </ul> */}
                            <ul className="nav navbar-nav navbar-right visible-xs visible-sm">
                                <li className="gold" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} ><a href="javasript:void(0);" data-toggle="modal" data-target="#pop-register">Register</a></li>
                            </ul>
                        </div>

                    </div>
                </nav>
                {/* <!-- NAVIGATION --> */}

                <div id="pop-register" className="modal fade" role="dialog" style={{ paddingLeft: '0px !important' }}>
                    <div className="modal-dialog" style={{ top: '80px' }}>

                        <div className="modal-content">
                            <div className="modal-header1">
                                <button type="button" style={{
                                    marginRight: '10px',
                                    fontSize: '26px'
                                }} className="close" data-dismiss="modal" data-aos="zoom-in-up" data-aos-duration="800">&times;</button>
                                <h3 className="modal-title1  blue oR m0">REGISTER</h3>
                                <span className="light oR register_popup" style={{ fontSize: '14px' }} >Enter your informations to register.</span>
                            </div>
                            <form onSubmit={this.submitForm}>
                                <div className="modal-body">
                                    <div className="input-box">
                                        <input placeholder="Full Name" value={this.state.full_name}
                                            onChange={this.onChange} name="full_name" type="text" />
                                        <span className="contact_footer"><i className="fa fa-user"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">{this.state.firstnameError}</div>
                                    <div className="input-box">
                                        <input placeholder="Email Address" value={this.state.email}
                                            onChange={this.onChange} name="email" type="email" />
                                        <span className="contact_footer"><i className="fa fa-envelope-o"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">{this.state.emailError}</div>
                                    <div className="input-box">
                                        <input placeholder="Login Key" type="password" value={this.state.password}
                                            onChange={this.onChange} name="password" />
                                        <span className="contact_footer"><i className="fa fa-key"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">{this.state.passwordError}</div>
                                    <div className="input-box">
                                        <input placeholder="Confirm Login Key" type="password" value={this.state.confirm_password}
                                            onChange={this.onChange} name="confirm_password" />
                                        <span className="contact_footer"><i className="fa fa-key"></i></span>
                                    </div>
                                    <div className="errorMessage_signup">{this.state.confirmpasswordError}</div>
                                    <div className="errorMessage_confp">{this.state.confirmpassword1Error}</div>
                                    <div className="input-box">
                                        <input placeholder="Referral Code" value={this.state.referral_code}
                                            onChange={this.onChange} name="referral_code" type="text" />
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

            </>
        )
    }
}