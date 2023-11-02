import React, { Component } from 'react';


export default class Footer extends Component {

    //scroll to top function 

    topFunction() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    render() {
        return (
            <>
                <footer id="contact-section" className="sectionP60" style={{ background: '#000' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {/* <div className="col-md-7 col-sm-7 col-xs-12 pull-right resCont">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="heading-text">
                                            <span className="gold-gradient-color">Get in touch.</span>
                                        </div>
                                    </div>
                                    <form action="">
                                        <div className="col-md-12 col-sm-12 col-xs-12 p0">
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <div className="input-box">
                                                    <input placeholder="Full Name" type="text" className="footer_input" required />
                                                    <span style={{ position: 'absolute' }}><i className="fa fa-user"></i></span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <div className="input-box">
                                                    <input placeholder="Email Address" type="text" className="footer_input" required />
                                                    <span style={{ position: 'absolute' }}><i className="fa fa-envelope-o"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 p0">
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <div className="input-box">
                                                    <input placeholder="Mobile or Telephone" type="text" className="footer_input" required />
                                                    <span style={{ position: 'absolute' }}><i className="fa fa-phone"></i></span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <div className="input-box">
                                                    <input placeholder="Subject" type="text" className="footer_input" required />
                                                    <span style={{ position: 'absolute' }}><i className="fa fa-puzzle-piece"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 p0">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <div className="input-box">
                                                    <textarea className="footer_input" placeholder="Type your message here..." name="" id="" cols="30" rows="5"></textarea>
                                                    <span style={{ position: 'absolute' }}><i className="fa fa-comments"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn1234 btn-gradient outline-button pull-right mtb20"><div style={{ background: '#0C1222', transition: 'all 0.3s' }}>Send <div className="hidden-xs">Message</div></div></button>
                                    </form>
                                </div> */}
                                <div class="col-md-4 col-sm-4 col-xs-12 pull-right resCont" style={{marginTop:"70px"}}>
                                <div class="company-desc logoo">
                                        {/* <a href="#home-section"><img class="img-responsive" src="logo_freedom_white.png" /></a>
                                        <p class="light2 rl">Place for healthy and prosperous community.</p> */}
                                    </div>
                                    <div class="meet-us">
                                        {/* <!--  <p class="gold rL">MEET US</p> --> */}
                                        <span class="light2 oR"><b>We are many they are few – collective power.</b></span>
                                    </div>
                                    <div class="cont-us">
                                        {/* <!-- <p class="gold rL">Contact Us</p>
                                            <div><a class="light2 g" href="javascript:;"><span class="oR">Landline : +061 - 1234 - 5678</span></a></div>
                                            <div><a class="light2 g" href="javascript:;"><span class="oR">Mobile : +1 987654 - 3210</span></a></div>
                                            <div><a class="light2 g" href="javascript:;"><span class="oR">Email : info@example.com</span></a></div> --> */}
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4 col-xs-12 pull-right resCont" style={{marginTop:"70px"}}>
                                <div class="company-desc logoo">
                                        {/* <a href="#home-section"><img class="img-responsive" src="logo_freedom_white.png" /></a>
                                        <p class="light2 rl">Place for healthy and prosperous community.</p> */}
                                    </div>
                                    <div class="meet-us">
                                        {/* <!--  <p class="gold rL">MEET US</p> --> */}
                                        <span class="light2 oR"><b>Become the partner</b></span><br />
                                        <span class="light2 oR"><b>Help us Grow</b></span><br/>
                                             </div>
                                    <div class="cont-us">
                                        {/* <!-- <p class="gold rL">Contact Us</p>
                                            <div><a class="light2 g" href="javascript:;"><span class="oR">Landline : +061 - 1234 - 5678</span></a></div>
                                            <div><a class="light2 g" href="javascript:;"><span class="oR">Mobile : +1 987654 - 3210</span></a></div>
                                            <div><a class="light2 g" href="javascript:;"><span class="oR">Email : info@example.com</span></a></div> --> */}
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12 resCompany">
                                    <div class="company-desc logoo">
                                        <a href="#home-section"><img class="img-responsive" alt="" src="logo_freedom_white.png" /></a>
                                        <p class="light2 rl"><b>Place for healthy and prosperous community.</b></p>
                                    </div>
                                    {/* <div class="meet-us">
                                        <span class="light2 oR">Become the partner</span><br />
                                        <span class="light2 oR">Help us Grow</span><br/>
                                        <span class="light2 oR">We are many they are few – collective power.</span>
                                    </div> */}
                                    <div class="cont-us">
                                        {/* <!-- <p class="gold rL">Contact Us</p>
                                            <div><a class="light2 g" href="javascript:;"><span class="oR">Landline : +061 - 1234 - 5678</span></a></div>
                                            <div><a class="light2 g" href="javascript:;"><span class="oR">Mobile : +1 987654 - 3210</span></a></div>
                                            <div><a class="light2 g" href="javascript:;"><span class="oR">Email : info@example.com</span></a></div> --> */}
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </footer>

                {/* <section className="sectionP20">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="col-md-12">
                                    <p className="light oR m0 copy_right">&copy; Copyright 2020, all rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <button onClick={this.topFunction} id="myBtn" className="btn btn-gradient"><i className="visible-xs fa fa-arrow-up"></i><label className="hidden-xs">Back To Top</label></button>
            </>
        )
    }
}