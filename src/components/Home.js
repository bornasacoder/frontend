import React, { Component } from 'react';
import Headerhome from '../directives/headerhome'
import Footer from '../directives/footer'
import axios from 'axios';
import toastr from 'reactjs-toastr';
import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie';
import { browserHistory,Link } from 'react-router-dom';
import $ from 'jquery'
import GliderSlider from './GliderSlider';
const headers = {
    'Content-Type': 'text/plain'
};
const TITLE = 'Freedom-cells-Login'
const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    loggedIn: '',
    code: ''
}

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = initialState

        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

        var pageURL = window.location.hash;
        let res = pageURL.split("/");

        this.investFind = res[5]

        var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('=') + 1);
        var checkLastURL = pageURL.substr(pageURL.lastIndexOf('=') - 9);
        let checkLastURL1 = checkLastURL.split("=")
        this.checkLastURL1 = checkLastURL1[0]


        this.lastUrl = lastURLSegment
        if (Cookies.getJSON('name')) {

            let data = Cookies.getJSON('name');
            this.loginData = data.user_data
        }

    }


    // validation check 

    validate = () => {
        let emailError = '';
        let passwordError = '';

        if (!this.state.email.includes("@")) {

            emailError = "User name is required"
        }

        if (this.state.password.length <= 0) {
            passwordError = "Password is required"
        }
        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false
        }

        return true
    }

    componentDidMount() {
        // $('#topcontrol').hide()
        setTimeout(() => {

            $('#topcontrol').css('display', 'none');
        }, 1000);

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
            this.state.code = this.lastUrl
            delete this.state.emailError
            delete this.state.passwordError
            delete this.state.loggedIn



            const data = this.state


            await axios.post(`${process.env.REACT_APP_URL}/api/users/login`, data, { headers })
                .then(response => {

                    if (response.data.code === true) {
                        toastr.success('Sucess', { displayDuration: 3000 })
                        Cookies.set('name', response.data);

                        this.setState({
                            loading: false,
                            loggedIn: true,
                            message: response.data
                        })
                        if (this.state.message.user_data.is_enable_google_auth_code === '0') {
                            
                            window.location.hash = '/dashboard'
                        }
                        else if (this.state.message.user_data.is_enable_google_auth_code === '1') {
                            // window.location.reload(true);
                            window.location.hash = '/twofa'
                        }

                    }
                    else if (response.data.code === false) {
                        toastr.error(response.data.message, { displayDuration: 3000 })
                        this.setState({

                            loggedIn: false,

                        });
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

    forgot() {
        setTimeout(() => {

            window.location.reload(true)
        }, 100);
    }



    render() {

        return (
            <div>

                <>
                    <Helmet>
                        <title>{TITLE}</title>
                    </Helmet>
                    <div className="se-pre-con"></div>

                    <Headerhome />
                    <>



                        <section id="home-section" className="header-bg" style={{
                            background: "url('bg_banner_img.png') center no-repeat",
                            backgroundSize: 'cover'
                        }}>

                            {/* <div id="particles-js"></div> */}

                            <div className=" sectionP60 header-pad">
                                <div className="container">
                                    <div className="row">

                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6 col-xs-12 header-text sectionP60 pad_bottom_zero">
                                                    <h1 className="rL " style={{ color: '#fff' }}>Take back control of your Internet and Prosper</h1>
                                                    <p className="rL blue-L">A place to have open conversations and bring people together. Free your freedom and grow your cells with others creating content, driving traffic, promoting products or services, voting and referring friends. Become the vital part of the new collective Paradigm transforming OLD society!.</p>


                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12 pull-right box_shadow">
                                                    <div className="login-div centered" data-aos="fade-up" data-aos-duration="1000">
                                                        <div className="head">
                                                            <h3 className="purple oR m0">Join collective Transformation</h3>
                                                        </div>
                                                        <form onSubmit={this.submitForm}>
                                                            <div className="body">
                                                                <div className="input-box">
                                                                    <input placeholder="Email" value={this.state.email}
                                                                        onChange={this.onChange} name="email" className="input11" type="email" />
                                                                    <span style={{ position: 'absolute' }}><i className="fa fa-user"></i></span>
                                                                </div>
                                                                {/* <span className="errorMessage_signup">{this.state.emailError}</span> */}
                                                                <div className="input-box">
                                                                    <input placeholder="Password" type="password" value={this.state.password}
                                                                        onChange={this.onChange} name="password" className="input11" />
                                                                    <span style={{ position: 'absolute' }}><i className="fa fa-key"></i></span>
                                                                </div>
                                                                {/* <span className="errorMessage_signup">{this.state.passwordError}</span> */}

                                                            </div>
                                                            <div className="foot">
                                                                <Link to="/forgetpassword" onClick={this.forgot} className="forgot pull-left">
                                                                    <small style={{ fontSize: '110%' }}>Forgot your password?</small>
                                                                </Link>
                                                                <button type="submit" disabled={!this.state.email || !this.state.password} className="btn btn-gradient W100 pull-right">Login!</button>
                                                            </div>
                                                            <Link to="/register" className="forgot pull-left ml-3   ">
                                                                <small style={{ fontSize: '110%' }}>Don't have an account? SignUp</small>
                                                            </Link>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                        <GliderSlider/>
                        
                        <br /><br /><br />

                        <section style={{ background: '#000' }}>
                            <div className="container">
                                <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                                    <div className="m-marketing__quotation"><h3 style={{ color: '#fff' }}>“Freedomcells is more then Social Media that gives you opportunity to grow.”</h3></div>
                                </div>
                            </div>
                        </section>
                        <section style={{ background: '#000' }} id="why-us-section" className="sectionP60">
                            <div className="container">
                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="col-md-5 col-md-offset-0 col-sm-10 col-sm-offset-1 col-xs-12">
                                            <div className="pull-left responsive rsb" data-aos="fade-right" data-aos-duration="1000">
                                                <div className="heading-text">
                                                    <span className="blue-gradient-color" style={{ color: '#fff' }}>Our principles</span>
                                                </div>
                                                <p className="white oR" style={{ color: '#fff' }}>Our code and algorithms are free and open source for maximum transparency and accountability. Running on decentralised new Internet 3.0 technology registered on the Blockchain.Our content policy is based on the Manila Principles and governed by a community jury in order to minimize bias and censorship suppporting free speech.</p>

                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-offset-1 col-sm-10 col-sm-offset-1  " style={{ float: 'right',width:'100%',overflowX:"hidden"}}>
                                            <div className="" data-aos="fade-left" data-aos-duration="1000">

                                                <div className="m-marketing__image"><span><img className="m-marketing__image--1" alt="No" src="homepage-2.png" /></span></div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                         <section style={{ background: '#000' }} id="why-us-section" className="sectionP60">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-md-5 col-md-offset-0 col-sm-10 col-sm-offset-1 col-xs-12" style={{ marginTop: '60px' ,overflowX:"hidden" }} >
                                            <div className=" pull-left" data-aos="fade-left" data-aos-duration="1000">

                                                <div className=" m-marketing__image">
                                                    <span>
                                                        {this.loginData ? <img className="m-marketing__image--1" alt="No" src="homepage-3.jpg" /> : <img className="m-marketing__image--1" alt="No" src="homepage-3.jpg" />
                                                        }

                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-md-5 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12" style={{ float: 'right' }}>
                                            <div className="responsive rsb" data-aos="fade-right" data-aos-duration="1000">
                                                <div className="heading-text">
                                                    <span className="blue-gradient-color">How does it work?</span>
                                                </div>
                                                <p className="white oR">Post videos, blogs, images and statuses. Message and video chat securely with groups or directly with friends. Discover great content through trending feeds and hashtags. See the conscious state of the whole network by choosing a colour of your own feeling.</p>

                                                <p className="white oR">
                                                    Receive tokens for your daily contributions and use them to upgrade your channel, boost your content for more reach and support other creators to grow.
                        </p>
                                                <p className="white oR">
                                                    Freedomcells is the unique platform uniting all people and develop strong mutual foundation to transform whole society by creating sustainable economics, transparent voting and governing new rules helping in positive change.
                        </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <!-- Google Map --> */}

                        <section style={{ background: '#000' }}>
                            <div id="map-section" className="section">
                                <div className="google-map" id="location" data-lat="48.8580362" data-lng="2.2933471" data-zoom="17"></div>
                            </div>
                        </section>



                        {/* <section style={{ background: '#000' }}>
                            <div className="Features-sektion paddingTB60 ">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 ">
                                            <div className="site-heading text-center">
                                                <h3 style={{ color: '#fff' }}>Features</h3>
                                                <p className="white">The platform includes a wide variety of features, such as free speechmarketplace, voting, analytics, wallet, encrypted messaging, newsfeed, content hosting, blog editing, groups, hashtags, search, payments, advertising and more.
                        decentralizationcommitment to privacy, optional anonymity, radical transparency, free speech, in contrast to the surveillance, secrecy, censorship, and algorithm manipulation it alleges occurs on many proprietary social networks </p>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4 text-center">

                                        </div>
                                        <div className="col-md-4 col-sm-4 text-center">
                                            <div className="video-embed pull-right" data-aos="fade-left" data-aos-duration="1000">

                                                <iframe title="myFrame" width="533" height="300" src="https://www.youtube.com/embed/2LeOH9AGJQM?rel=0" frameBorder="0" allowFullScreen></iframe>

                                            </div>

                                        </div>

                                        <div className="col-md-4 col-sm-4 text-center">



                                        </div>


                                    </div>
                                </div>

                            </div>
                        </section>
                        */}

                        {/* </> */}

                        {/* </Particles> */}
                    </>
                    <Footer />

                </>

            </div>

        )
    }
}



//   <script type="text/javascript" src="assets/js/particles.js"></script>
