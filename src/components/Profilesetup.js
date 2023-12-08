import React, { Component } from 'react';
import Header from '../directives/header'
import Footer from '../directives/footer'
import axios from 'axios';
import toastr from 'reactjs-toastr';
import $ from 'jquery';
import 'reactjs-toastr/lib/toast.css';
import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie';

const TITLE = 'Victus-Token-Profilesetup'

export default class Profilesetup extends Component {
    custom_file_upload_url = `${process.env.REACT_APP_URL}/api/users/add_user_interest`;

    constructor(props) {
        super(props);
        this.state = {
            listHashtag: [],
            image_file: null,
            image_preview: '',
            email_verify: 1
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmitFile = this.handleSubmitFile.bind(this);
    }


    componentDidMount() {
        $(document).ready(function () {

            var navListItems = $('div.setup-panel div a'),
                allWells = $('.setup-content'),
                allNextBtn = $('.nextBtn');

            allWells.hide();

            navListItems.click(function (e) {
                e.preventDefault();
                var $target = $($(this).attr('href')),
                    $item = $(this);

                if (!$item.hasClass('disabled')) {
                    navListItems.removeClass('btn-success').addClass('btn-default');
                    $item.addClass('btn-success');
                    allWells.hide();
                    $target.show();
                    $target.find('input:eq(0)').focus();
                }
            });

            allNextBtn.click(function () {
                var curStep = $(this).closest(".setup-content"),
                    curStepBtn = curStep.attr("id"),
                    nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                    curInputs = curStep.find("input[type='text'],input[type='url']"),
                    isValid = true;

                $(".form-group").removeClass("has-error");
                for (var i = 0; i < curInputs.length; i++) {
                    if (!curInputs[i].validity.valid) {
                        isValid = false;
                        $(curInputs[i]).closest(".form-group").addClass("has-error");
                    }
                }

                if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
            });

            $('div.setup-panel div a.btn-success').trigger('click');
        });

        var pageURL = window.location.hash;
        let res = pageURL.split("/");

        this.investFind = res[5]

        var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('=') + 1);
        var checkLastURL = pageURL.substr(pageURL.lastIndexOf('=') - 9);
        let checkLastURL1 = checkLastURL.split("=")
        this.checkLastURL1 = checkLastURL1[0]


        this.lastUrl = lastURLSegment

        $("body").delegate(".m-hashtags__list .m-hashtagsList__item", 'click', function () {
            // alert('fsf')
            $(this).toggleClass("activeselected");
        });
        this.AllHashtagListAPI();
    }


    //==================================  Detail of Hashtag List  ==============================

    AllHashtagListAPI() {
        axios.get(`${process.env.REACT_APP_URL}/api/users/interest_list`, {}).then((res) => {
            //on success
            this.codeDataHashtagList = res.data.code
            if (this.codeDataHashtagList === true) {
                this.setState({
                    listHashtag: res.data.recdata
                });
            } else {
            }
        }).catch((error) => {
        });

    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Image Preview Handler
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }

    // Image/File Submit Handler
    handleSubmitFile = (e) => {
        e.preventDefault()
        var hashtag = '';
        $(".m-hashtags__list .activeselected").each(function (index) {

            if (hashtag === '') {
                hashtag = ($(this).find('span').attr('id'));
            } else {
                hashtag += ',' + ($(this).find('span').attr('id'));
            }

        });
        if(this.state.mobile === undefined){
            this.setState({
                mobile:''
            })
            // this.state.mobile = ''
        }
        if(this.state.address === undefined){
            this.setState({
                address:''
            })
            // this.state.address = ''
        }
        if(this.state.dob === undefined){
            this.setState({
                dob:''
            })
            // this.state.dob = ''
        }
        // if (this.state.image_file !== null) {
            let formData = new FormData();

            formData.append('profile_pic', this.state.image_file);
            formData.append('interest', hashtag);
            formData.append('mobile', this.state.mobile);
            formData.append('address', this.state.address);
            formData.append('dob', this.state.dob);
            formData.append('code', this.lastUrl);

            axios.post(
                this.custom_file_upload_url,
                formData,
                {
                    headers: {
                        "Authorization": `/redblock/api/users/setting_update_test`,
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(res => {
                    
                    if(res.data.code === true){
                        console.log(res.data)
                        Cookies.set('name', res.data);
                        window.location.reload(true);
                        window.location.hash = '/dashboard'
                    }
                    else{
                    toastr.error(res.data.message, { displayDuration: 3000 })

                    }
                })
                .catch(err => {
                })
        // }
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


                <section id="Notice">
                    <div className="row">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-6 border">
                            <div className=" contact-container ">
                                <h2 className="m-onboarding__noticeTitle"> Profile Setup</h2>
                                <br />
                                {/* <!-- <a href="http://15.207.99.96/gloriouschain/">
                     <button style="margin-top: -67px;" name="btnForgotPass" className="btn btn-primary mt-10 btn-corner right-15 pull-left">Back</button></a> --> */}
                                <div className="contact-outer-wrapper">
                                    <div className="stepwizard">
                                        <div className="stepwizard-row setup-panel">
                                            <div className="stepwizard-step col-xs-3">
                                                <a href="#step-1" type="button" className="btn btn-success btn-circle">1</a>
                                                <p><small>HASHTAGS</small></p>
                                            </div>
                                            <div className="stepwizard-step col-xs-3">
                                                <a href="#step-2" type="button" className="btn btn-default btn-circle" disabled="disabled">2</a>
                                                <p><small>INFO</small></p>
                                            </div>
                                            <div className="stepwizard-step col-xs-3">
                                                <a href="#step-3" type="button" className="btn btn-default btn-circle" disabled="disabled">3</a>
                                                <p><small>AVATAR</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={this.handleSubmitFile}>
                                        <div className="panel panel-primary setup-content" id="step-1">
                                            <div className="panel-body">
                                                <div className="m-onboarding__controls">
                                                    <div className="m-onboarding__description"> Select some hashtags that are of interest to you. </div>
                                                    <ul className="m-hashtags__list">

                                                        {/* <div className="hashtagsList__item_tag_area"> */}

                                                        {this.state.listHashtag.map(item => {
                                                            return (
                                                                // activeselected
                                                                <li className='m-hashtagsList__item' >
                                                                    <span id={item.id}> {item.name} </span>
                                                                </li>
                                                            )
                                                        })}
                                                        <input type="text" style={{ display: 'none' }} readOnly value={this.state.nsfw_hold_input} onChange={this.onChange} name="nsfw_hold_input" id="nsfw_hold_input" />

                                                        {/* </div> */}
                                                    </ul>
                                                    <div className="m-onboarding__error">

                                                    </div>
                                                    <div className="m-onboarding__actionButtons">
                                                        <button type="button" className="mf-button mf-button--hollow nextBtn"> Skip </button>
                                                        <button type="button" className="mf-button mf-button--alt nextBtn"> Continue </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel panel-primary setup-content" id="step-2">

                                            <div className="panel-body">
                                                <div className="form-group">
                                                    {/* <label className="control-label">Mobile Phone Number</label> */}
                                                    <input type="number" className="form-control input_profile" value={this.state.mobile} name="mobile" onChange={this.onChange} placeholder="Enter Phone Number" />
                                                </div>
                                                <div className="form-group">
                                                    {/* <label className="control-label">Location</label> */}
                                                    <input type="text" className="form-control input_profile" value={this.state.address} name="address" onChange={this.onChange} placeholder="Enter Location" />
                                                </div>
                                                <div className="form-group">
                                                    {/* <label className="control-label">Date of Birth</label> */}
                                                    <input type="date" placeholder="Date of birth" onChange={this.onChange} value={this.state.dob} name="dob" className="form-control input_profile" />
                                                </div>
                                                <div className="m-onboarding__actionButtons"><button type="button" className="mf-button mf-button--hollow nextBtn"> Skip </button>
                                                    <button type="button" className="mf-button mf-button--alt nextBtn"> Continue </button></div>
                                            </div>
                                        </div>
                                        <div className="panel panel-primary setup-content" id="step-3">

                                            <div className="panel-body">
                                                <div className="m-onboarding__controls">
                                                    {this.state.image_preview ? <img src={this.state.image_preview} alt="image preview" /> :
                                                        <img src="profileimage.png  " className="" />}


                                                    <input id="onboarding-avatar-input" type="file" accept="image/*" onChange={this.handleImagePreview} />
                                                    <div className="m-onboarding__actionButtons">
                                                        <button type="submit" className="mf-button mf-button--hollow "> Skip </button>
                                                        <button className="mf-button mf-button--alt nextBtn " type="submit"> Submit </button>
                                                    </div></div>

                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                </section>


                {/* <!-- Footer Section --> */}
                <Footer />
            </>
        )
    }
}