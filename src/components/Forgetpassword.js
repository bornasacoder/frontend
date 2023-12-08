import React, { Component } from 'react';
import Header from '../directives/header'
import Footer from '../directives/footer'
import axios from 'axios';
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Victus-Token-Forgetpassword'

const initialState = {
    email: '',
    emailError: '',
}
const headers = {
    'Content-Type': 'text/plain'
};
export default class Forgetpassword extends Component {

    constructor(props) {
        super(props);
        this.state = initialState
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    // validation check 

    validate = () => {
        let emailError = '';

        if (!this.state.email.includes("@")) {

            emailError = "Email is required"
        }


        if (emailError) {
            this.setState({ emailError });
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

            delete this.state.emailError

            const data = this.state


            axios.post(`${process.env.REACT_APP_URL}/api/users/forget_password`, data, { headers })
                .then(response => {

                    if (response.data.code === true) {
                        toastr.success(response.data.message, { displayDuration: 3000 })
                        this.setState({
                            loading: false,
                            message: response.data
                        })
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

                                <h1 className="contact-title">Forgot password!</h1>

                                {/* <!-- <a href="http://15.207.99.96/gloriouschain/">
                        <button style="margin-top: -67px;" name="btnForgotPass" className="btn btn-primary mt-10 btn-corner right-15 pull-left">Back</button></a> --> */}

                                <div className="contact-outer-wrapper col-sm-12 col-12">
                                    <div className="form-wrap">


                                        <form className="no-mb no-mt" onSubmit={this.submitForm}>
                                            <div className="row">
                                                <div className="col-xs-12 col-md-12" style={{ marginBottom: '20px' }}>

                                                    <div className="form-group">
                                                        <div className="controls">
                                                            <input type="email" className="form-control" value={this.state.email}
                                                                onChange={this.onChange} name="email" style={{ border: '1px solid #ddd', padding: '14px' }} placeholder="email" />
                                                        </div>
                                                        <div className="errorMessage_signup">{this.state.emailError}</div>
                                                    </div>

                                                    <div className="pull-left">
                                                        <button name="btnForgotPass" type="submit" className="btn btn-primary mt-10 btn-corner right-15">Submit</button>
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