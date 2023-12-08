import React, { Component } from 'react';
import Header from '../directives/header'
import Footer from '../directives/footer'
import axios from 'axios';
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { Helmet } from 'react-helmet'
const headers = {
    'Content-Type': 'text/plain'
 };
const TITLE = 'Victus-Token-Resetpassword'
const initialState = {
    code: '',
    new_password: '',
    confirm_password: '',
    passwordError: '',
    confirmpasswordError: '',
    confirmpassword1Error: '',
}

export default class Resetpassword extends Component {



    constructor(props) {
        super(props);
        const { match: { params } } = this.props;
        this.code = params.code

        this.state = initialState

        this.onChange = this.onChange.bind(this);

        this.submitForm = this.submitForm.bind(this);
    }

    // validation check 

    validate = () => {
        let passwordError = '';
        let confirmpasswordError = '';
        let confirmpassword1Error = '';


        if (this.state.new_password.length <= 0) {
            passwordError = "Password is required"
        }


        if (this.state.confirm_password.length <= 0) {
            confirmpasswordError = "Confirm Password is required"
        }

        if (this.state.new_password !== this.state.confirm_password) {
            confirmpassword1Error = "Password and Confirm Password Should be same"
        }


        if (passwordError || confirmpasswordError || confirmpassword1Error) {
            this.setState({ passwordError, confirmpasswordError, confirmpassword1Error });
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

            delete this.state.passwordError
            delete this.state.confirmpasswordError
            delete this.state.confirmpassword1Error

            this.state.code = this.code
            const data = this.state


            axios.post(`${process.env.REACT_APP_URL}/api/users/reset_password`, data,{headers})
                .then(response => {

                    if (response.data.code === true) {
                        toastr.success(response.data.message, { displayDuration: 3000 })
                        this.setState({
                            loading: false,
                            message: response.data,
                        })
                        window.location.hash = '/'
                        setTimeout(() => {
                            window.location.reload(true)
                        }, 2000);
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


    render() {


        

        return (

            <>
                <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
                <div className="se-pre-con"></div>
                {/* <!-- NAVIGATION --> */}
                <Header />
                <section id="ContactUs">

                    <div className="row">
                        <div className="col-sm-4">

                        </div>

                        <div className="col-sm-4 border">
                            <div className=" contact-container ">

                                <h1 className="contact-title">Reset Password</h1>

                                {/* <!-- <a href="http://15.207.99.96/gloriouschain/">
                        <button style="margin-top: -67px;" name="btnForgotPass" className="btn btn-primary mt-10 btn-corner right-15 pull-left">Back</button></a> --> */}

                                <div className="contact-outer-wrapper col-sm-12 col-12">
                                    <div className="form-wrap">


                                        <form className="no-mb no-mt" onSubmit={this.submitForm}>
                                            <div className="row">
                                                <div className="col-xs-12 col-md-12" style={{ marginBottom: '20px' }}>

                                                    <div className="form-group" style={{ marginTop: '15px', padding: '0px', marginBottom: '0px' }}>
                                                        <div className="controls">
                                                            <input type="password" className="form-control" value={this.state.new_password}
                                                                onChange={this.onChange} name="new_password" style={{ border: '1px solid #ddd', padding: '14px' }} placeholder="Password" />
                                                        </div>
                                                        <div className="errorMessage_reset">{this.state.passwordError}</div>

                                                    </div>

                                                    <div className="form-group" style={{ marginTop: '15px', padding: '0px', marginBottom: '15px' }}>
                                                        <div className="controls">
                                                            <input type="password" className="form-control" value={this.state.confirm_password}
                                                                onChange={this.onChange} name="confirm_password" style={{ border: '1px solid #ddd', padding: '14px' }} placeholder="Confirm Password" />
                                                        </div>
                                                        <div className="errorMessage_reset">{this.state.confirmpasswordError}</div>
                                                        <div className="errorMessage_reset">{this.state.confirmpassword1Error}</div>
                                                    </div>

                                                    <div className="pull-left">
                                                        <button name="btnForgotPass" className="btn btn-primary mt-10 btn-corner right-15">Submit</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-4">

                        </div>

                    </div>


                </section>
                {/* <!-- Footer Section --> */}
                <Footer />
            </>
        )
    }
}