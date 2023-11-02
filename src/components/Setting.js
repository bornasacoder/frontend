import React, { Component } from 'react';
import $ from 'jquery';
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import InnerSidebar from '../directives/innerSidebar';
import Fixedsidebarright from '../directives/Fixedsidebarright'
import Cookies from 'js-cookie';
import axios from 'axios';
import toastr from 'reactjs-toastr';
import Pagination from "react-js-pagination";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Messaging from '../components/messaging'
import {Link} from 'react-router-dom'
const headers = {
    'Content-Type': 'text/plain'
 };
const TITLE = 'Freedom-cells-Setting'
const initialState = {
    user_id: '',
    old_password: '',
    new_password: '',
    confirm_password: '',
    api_key: '',
    display_name: '',
    email_notification: '',
    hastagAdd: '',
    lable: '',
    hashtag: '',
    language_id: '',
    listLanguage: [],
    listHashTagList: [],
    listBlockList: [],
    activePage: 1
}

export default class Setting extends Component {

    constructor(props) {
        super(props)
        this.state = initialState
        this.onChange = this.onChange.bind(this);
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.onChangeEmailNotification = this.onChangeEmailNotification.bind(this)
        this.onChangeTwoFa = this.onChangeTwoFa.bind(this)
        this.onChangeLanguage = this.onChangeLanguage.bind(this)

        this.submitFormPassword = this.submitFormPassword.bind(this)
        this.submitFormDisplayName = this.submitFormDisplayName.bind(this)
        this.emailNotificationSubmit = this.emailNotificationSubmit.bind(this)
        this.submitFormTwoFa = this.submitFormTwoFa.bind(this)
        this.submitHahtag = this.submitHahtag.bind(this)
        this.submitFormLanguage = this.submitFormLanguage.bind(this)
    }

    componentDidMount() {

        $('.sidebar').find('ul').find('li').removeClass('active');
        $('#li_settings').addClass('active');
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data
        $(document).ready(function () {
            // general setting
            $("#display_name").click(function () {

                $(".display_name").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();

            });
            $("#email_address").click(function () {

                $(".email_address").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();
            });
            $("#language").click(function () {

                $(".language").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();
            });
            $("#password").click(function () {

                $(".password").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();
            });
            $("#nsfw_content").click(function () {

                $(".nsfw_content").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();
            });
            $("#security").click(function () {

                $(".security").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();
            });
            $("#share_buttons").click(function () {

                $(".share_buttons").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();
            });
            $("#autoplay_videos").click(function () {

                $(".autoplay_videos").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();
            });
            $("#email").click(function () {

                $(".email").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();
            });
            $("#popovers").click(function () {

                $(".popovers").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();
                $("#hide_section3").hide();
            });


            $(".back").click(function () {

                $(".display_name").hide();
                $(".security").hide();
                $(".language").hide();
                $(".password").hide();
                $(".autoplay_videos").hide();
                $(".nsfw_content").hide();
                $(".share_buttons").hide();
                $(".email_address").hide();
                $(".email_address").hide();
                $(".email").hide();
                $(".popovers").hide();
                $("#hide_section").show();
                $("#hide_section2").show();
                $("#hide_section3").show();

                $(".hashtags").hide();


            });
            // general setting end
            // pro setting
            $("#general").click(function () {

                $(".general").show();
                $("#general_hide").hide();

            });
            $("#theme").click(function () {

                $(".theme").show();
                $("#general_hide").hide();
                $(".assets").hide();
                $(".footer").hide();
                $(".hashtags").hide();
                $(".domain").hide();
                $(".payouts").hide();

            });
            $("#assets").click(function () {
                $(".assets").show();
                $(".theme").hide();
                $(".footer").hide();
                $(".hashtags").hide();
                $(".domain").hide();
                $(".payouts").hide();
                $("#general_hide").hide();

            });
            $("#hashtags").click(function () {
                $(".hashtags").show();
                $("#hide_section").hide();
                $("#hide_section2").hide();

            });
            $("#footer").click(function () {
                $(".footer").show();
                $(".assets").hide();
                $(".theme").hide();
                $(".hashtags").hide();
                $(".domain").hide();
                $(".payouts").hide();
                $("#general_hide").hide();

            });
            $("#domain").click(function () {
                $(".domain").show();
                $(".assets").hide();
                $(".theme").hide();
                $(".footer").hide();
                $(".hashtags").hide();
                $(".payouts").hide();
                $("#general_hide").hide();

            });
            $("#payouts").click(function () {

                $(".payouts").show();
                $(".assets").hide();
                $(".theme").hide();
                $(".footer").hide();
                $(".hashtags").hide();
                $(".domain").hide();
                $("#general_hide").hide();

            });
            $(".general_back").click(function () {

                $(".general").hide();
                $(".assets").hide();
                $(".theme").hide();
                $(".footer").hide();
                $(".hashtags").hide();
                $(".domain").hide();
                $(".payouts").hide();
                $("#general_hide").show();
            });


            // pro setting end
            // security
            $("#two-factor_authen").click(function () {

                $(".two-factor_authen").show();
                $(".sessions").hide();
                $("#security_hide").hide();


            });
            $("#sessions").click(function () {

                $(".two-factor_authen").hide();
                $(".sessions").show();
                $("#security_hide").hide();

            });

            $(".security_back").click(function () {

                $(".two-factor_authen").hide();
                $(".sessions").hide();
                $("#security_hide").show();

            });
            // security_end
            // payment
            $("#payment_methods").click(function () {

                $(".payment_methods").show();
                $(".recurring_payments").hide();
                $(".payment_hide").hide();


            });
            $("#recurring_payments").click(function () {

                $(".payment_methods").hide();
                $(".recurring_payments").show();
                $(".payment_hide").hide();

            });

            $(".payment_back").click(function () {

                $(".payment_methods").hide();
                $(".recurring_payments").hide();
                $(".payment_hide").show();

            });
            // payment_end
            // Others
            $("#referrals").click(function () {

                $(".referrals").show();
                $(".reported_content").hide();
                $(".blocked_channels").hide();
                $(".subscription_tier_management").hide();
                $(".deactivate_account").hide();
                $(".delete_account").hide();

                $("#others_hide").hide();


            });
            $("#reported_content").click(function () {

                ;
                $(".reported_content").show();
                $(".referrals").hide()
                $(".blocked_channels").hide();
                $(".subscription_tier_management").hide();
                $(".deactivate_account").hide();
                $(".delete_account").hide();
                $("#others_hide").hide();

            });
            $("#blocked_channels").click(function () {


                $(".blocked_channels").show();
                $(".reported_content").hide();
                $(".referrals").hide()
                $(".blocked_channels").show();
                $(".subscription_tier_management").hide();
                $(".deactivate_account").hide();
                $(".delete_account").hide();
                $("#others_hide").hide();

            });
            $("#subscription_tier_management").click(function () {


                $(".subscription_tier_management").show();
                $(".blocked_channels").hide();
                $(".reported_content").hide();
                $(".referrals").hide()
                $(".blocked_channels").hide();
                $(".deactivate_account").hide();
                $(".delete_account").hide();
                $("#others_hide").hide();

            });
            $("#deactivate_account").click(function () {


                $(".deactivate_account").show();
                $(".blocked_channels").hide();
                $(".reported_content").hide();
                $(".referrals").hide()
                $(".blocked_channels").hide();
                $(".subscription_tier_management").hide();
                $(".delete_account").hide();
                $("#others_hide").hide();

            });
            $("#delete_account").click(function () {


                $(".delete_account").show();
                $(".deactivate_account").hide();
                $(".blocked_channels").hide();
                $(".reported_content").hide();
                $(".referrals").hide()
                $(".blocked_channels").hide();
                $(".subscription_tier_management").hide();
                $(".deactivate_account").hide();
                $("#others_hide").hide();

            });

            $(".other_back").click(function () {

                $("#others_hide").show();
                $(".delete_account").hide();
                $(".deactivate_account").hide();
                $(".blocked_channels").hide();
                $(".reported_content").hide();
                $(".referrals").hide()
                $(".blocked_channels").hide();
                $(".subscription_tier_management").hide();
                $(".deactivate_account").hide();
                $(".delete_account").hide();


            });
            // others_end


        });
        this.showDisplayNameAPI()
        this.showEmailAPI()
        this.showEmailNotificationAPI()
        this.twoFaAPI()
        this.showHashTagListAPI()
        this.blockUserListAPI()
        this.referralAPI()
    }

    //===================================  Onchange data change password  ====================== 

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //===================================  submit the data change password  ====================== 

    async submitFormPassword(e) {



        e.preventDefault()


        this.setState(initialState)

        this.state.user_id = this.loginData.id
        this.state.api_key = this.loginData.api_key

        const data = this.state


        axios.post(`${process.env.REACT_APP_URL}/api/users/change_password`, data,{headers})
            .then(response => {
                if (response.data.code === true) {
                    toastr.success(response.data.message, { displayDuration: 3000 })


                    this.setState({
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

    //===============================  Onchange for display Name    ===============================

    onChangeDisplayName = event => {
        event.persist();

        let value = event.target.value;

        this.setState(prevState => ({
            list: { ...prevState.list, [event.target.name]: value }
        }))

    };

    //=====================================   Show Display NAme    ====================================

    showDisplayNameAPI() {

        axios.post(`${process.env.REACT_APP_URL}/api/users/show_display_name`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }).then((res) => {
            //on success
            this.codeDataDisplayName = res.data.code
            if (this.codeDataDisplayName === true) {
                this.setState({
                    list: res.data
                });
            }

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }

    //============================================= Update Display Name  ==============================

    async submitFormDisplayName(e) {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_URL}/api/users/update_display_name`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'display_name': this.state.list.display_name },{headers})
            .then(response => {
                if (response.data.code === true) {
                    toastr.success(response.data.message, { displayDuration: 30000 })
                    this.setState({
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

    //=====================================   Show Email API    ====================================

    showEmailAPI() {
        axios.post(`${process.env.REACT_APP_URL}/api/users/show_email`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }).then((res) => {
            //on success
            this.codeDataEmail = res.data.code
            if (this.codeDataEmail === true) {
                this.setState({
                    listEmail: res.data
                });
            }
        }).catch((error) => {
        });

    }



    //=====================================   Show Email Notification API    ====================================

    showEmailNotificationAPI() {
        axios.post(`${process.env.REACT_APP_URL}/api/users/show_email_notification`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }).then((res) => {
            //on success
            this.codeDataEmailNotification = res.data.code
            if (this.codeDataEmailNotification === true) {
                this.setState({
                    listEmailNotification: res.data
                });
            }
        }).catch((error) => {
        });

    }

    //========================================  Change Event for Email Notification ===================== 

    onChangeEmailNotification = event => {
        event.persist();
        if (event.target.checked === true && event.target.type === 'checkbox') {
            event.target.value = '1'
        }
        else if (event.target.checked === false && event.target.type === 'checkbox') {
            event.target.value = '0'
        }
        let value = event.target.value;
        this.setState(prevState => ({
            listEmailNotification: { ...prevState.listEmailNotification, [event.target.name]: value }
        }))
    };

    //==========================================  Email Notification Submit API  ================

    async emailNotificationSubmit(e) {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_URL}/api/users/update_email_notification`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'email_notification': this.state.listEmailNotification.email_notification },{headers})
            .then(response => {
                if (response.data.code === true) {
                    toastr.success(response.data.message, { displayDuration: 30000 })
                    this.setState({
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

    //=======================================   2 FA Check ================================================

    twoFaAPI() {

        axios.post(`${process.env.REACT_APP_URL}/api/users/check_two_factor_auth`, { 'user_id': this.loginData.id }).then((res) => {
            //on success
            this.setState({
                listTwoFa: res.data.user_data
            });
        }).catch((error) => {
        });
    }

    //========================================  Change Event for 2 FA ===================== 

    onChangeTwoFa = event => {
        event.persist();
        if (event.target.checked === true && event.target.type === 'checkbox') {
            event.target.value = '1'
        }
        else if (event.target.checked === false && event.target.type === 'checkbox') {
            event.target.value = '0'
        }
        let value = event.target.value;
        this.setState(prevState => ({
            listTwoFa: { ...prevState.listTwoFa, [event.target.name]: value }
        }))
    };

    //======================================    Submit 2FA   ============================================

    async submitFormTwoFa(e) {
        e.preventDefault()
        this.setState(initialState)

        const data = this.state.listTwoFa

        delete data.google_auth_code
        delete data.email
        delete data.qrCodeUrl

        axios.post(`${process.env.REACT_APP_URL}/api/users/two_factor_auth`, data,{headers})
            .then(response => {
                if (response.data.code === true) {
                    toastr.success(response.data.message, { displayDuration: 3000 })
                    this.setState({
                        message: response.data
                    })
                }

                else if (response.data.code === false) {
                    toastr.error(response.data.message.error_label, { displayDuration: 3000 })
                }
                this.twoFaAPI()

            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    //=====================================   HAshTag List  API   =========== ====================================

    showHashTagListAPI() {
        let abc;
        if (this.count === undefined) {
            abc = '0';
        }
        else {
            abc = this.count;
        }

        axios.post(`${process.env.REACT_APP_URL}/api/users/hashtag_list`, {
            'user_id': this.loginData.id, 'api_key': this.loginData.api_key,
            "offset": abc,
            "limit": "5"
        }).then((res) => {
            //on success
            this.codeDataHashTagList = res.data.code
            if (this.codeDataHashTagList === true) {
                this.setState({
                    listoffset: res.data.offset,
                    listCount: res.data.count,
                    listHashTagList: res.data.hashtags,
                    pageCount: Math.ceil(20 / 5),
                });
            }
            else if (this.codeDataHashTagList === false) {
                this.setState({
                    listHashTagList: [],
                });
            }
            document.body.scrollTop = document.documentElement.scrollTop = 0;

        }).catch((error) => {
        });

    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
        this.count = pageNumber * 10 - 10
        this.componentDidMount()
    }

    //===================================================   Hashtag Add  ==========================================

    openHashtag(id) {
        this.setState({
            hastagAdd: id
        })
    }

    //======================================    Submit 2FA   ============================================

    async submitHahtag(e) {
        e.preventDefault()
        this.setState(initialState)

        this.state.user_id = this.loginData.id
        this.state.api_key = this.loginData.api_key

        const data = this.state
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        axios.post(`${process.env.REACT_APP_URL}/api/users/add_hashtag`, data,{headers})
            .then(response => {
                if (response.data.code === true) {
                    toastr.success(response.data.message, { displayDuration: 3000 })
                    this.setState({
                        message: response.data
                    })
                    this.showHashTagListAPI()
                    this.state.hashtag = ''
                }

                else if (response.data.code === false) {
                    toastr.error(response.data.message.error_label, { displayDuration: 3000 })
                }
                $('#main_loader').hide();
                $('#root').css('opacity', '1');
            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    //==============================================  Hashtag Delete API   ====================================

    hashTagDelete = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        axios.post(`${process.env.REACT_APP_URL}/api/users/delete_hashtag`, { 'hashtag_id': id.id, 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }).then((res) => {
                            toastr.success('Deleted Successfully!', { displayDuration: 3000 })

                            this.showHashTagListAPI()
                        }).catch((error) => {
                        })
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    //===================================  Onchange data language change  ====================== 

    onChangeLanguage(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //===================================  submit the data change password  ====================== 

    async submitFormLanguage(e) {



        e.preventDefault()


        this.setState(initialState)

        this.state.user_id = this.loginData.id

        const data = this.state


        axios.post(`${process.env.REACT_APP_URL}/api/users/update_language`, data,{headers})
            .then(response => {
                if (response.data.code === true) {
                    toastr.success(response.data.message, { displayDuration: 3000 })


                    this.setState({
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


    //=====================================   HAshTag List  API   =========== ====================================

    blockUserListAPI() {

        axios.post(`${process.env.REACT_APP_URL}/api/users/blocked_user_list`, {
            'user_id': this.loginData.id, 'api_key': this.loginData.api_key,

        }).then((res) => {
            //on success
            this.codeDataBlockList = res.data.code
            if (this.codeDataBlockList === true) {
                this.setState({

                    listBlockList: res.data.recdata,
                });
            }
            else if (this.codeDataBlockList === false) {
                this.setState({

                    listBlockList: [],
                });
            }
            document.body.scrollTop = document.documentElement.scrollTop = 0;

        }).catch((error) => {
        });

    }

    //==============================================  Block user Delete API   ====================================

    unblockUser = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to Unblock this user.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        axios.post(`${process.env.REACT_APP_URL}/api/users/unblock`, { 'blocked_user_id': id.blocked_user_id, 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }).then((res) => {
                            toastr.success('Unblocked Successfully!', { displayDuration: 3000 })

                            this.componentDidMount()
                        }).catch((error) => {
                        })
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    //==========================================  Referral API  =============

    referralAPI = () => {
        axios.post(`${process.env.REACT_APP_URL}/api/users/show_referral_code`, {
            'user_id': this.loginData.id, 'api_key': this.loginData.api_key,

        }).then((res) => {
            //on success
            this.codeDataReferal = res.data.code
            if (this.codeDataReferal === true) {
                this.setState({

                    listReferral: res.data,
                });
            }
            else if (this.codeDataReferal === false) {

            }
        }).catch((error) => {
        });
    }


    loadingData() {
        setTimeout(() => {

            window.location.reload(true)
        }, 200);
    }

    render() {
        const codeDataHashTagList1 = this.codeDataHashTagList
        const codeDataBlockList1 = this.codeDataBlockList
        return (

            <>
                <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
                <div className="theme-layout">

                    {/* //==================== Top */}

                    <InnerHeader />

                    {/* <!-- topbar --> */}
                    <div className="postoverlay"></div>

                    <Fixedsidebarright />
                    <div className="fixed-sidebar left">
                        <div className="menu-left">
                            <ul className="left-menu">
                                <li><a href="newsfeeds.html" title="Newsfeed Page" data-toggle="tooltip" data-placement="right"><i className="ti-magnet"></i></a></li>
                                <li><a href="fav-page.html" title="favourit page" data-toggle="tooltip" data-placement="right"><i className="fa fa-star-o"></i></a></li>
                                <li><a href="insights.html" title="Account Stats" data-toggle="tooltip" data-placement="right"><i className="ti-stats-up"></i></a></li>
                                <li><a href="inbox.html" title="inbox" data-toggle="tooltip" data-placement="right"><i className="ti-import"></i></a></li>
                                <li><a href="messages.html" title="Messages" data-toggle="tooltip" data-placement="right"><i className="ti-comment-alt"></i></a></li>
                                <li><a href="edit-account-setting.html" title="Setting" data-toggle="tooltip" data-placement="right"><i className="ti-panel"></i></a></li>
                                <li><a href="faq.html" title="Faq's" data-toggle="tooltip" data-placement="right"><i className="ti-light-bulb"></i></a></li>
                                <li><a href="timeline-friends.html" title="Friends" data-toggle="tooltip" data-placement="right"><i className="ti-themify-favicon"></i></a></li>
                                <li><a href="widgets.html" title="Widgets" data-toggle="tooltip" data-placement="right"><i className="ti-eraser"></i></a></li>
                                <li><a href="notifications.html" title="Notification" data-toggle="tooltip" data-placement="right"><i className="ti-bookmark-alt"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- left sidebar menu --> */}

                    <section>
                        <div className="gap gray-bg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row merged20" id="page-contents">
                                            {/* //================== Sidebar */}

                                            <InnerSidebar />

                                            {/* <!-- sidebar --> */}
                                            <div className="col-lg-9 setStick2" style={{ marginTop: '42px' }}>
                                                <div className="central-meta">
                                                    <div className="row">
                                                        <div className="col-sm-12 Left_tabs">
                                                            <div className="row">
                                                                <div className="col-lg-3 setting_tabs">
                                                                    {/* <!-- required for floating --> */}
                                                                    {/* <!-- Nav tabs --> */}
                                                                    <div className="m-nestedMenu__headerLabel">Settings</div>
                                                                    <ul className="nav nav-tabs tabs-left">
                                                                        <li className="active"><a href="#account" className="active show" data-toggle="tab">Account <i className="fa fa-angle-right right-angle"></i></a></li>
                                                                        {/* <li><a href="#pro_settings" data-toggle="tab">Pro<i className="fa fa-angle-right right-angle"></i></a></li> */}
                                                                        <li><a href="#security" data-toggle="tab">Security<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                        <li><a href="#billing" data-toggle="tab">Billing<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                        <li><a href="#others" style={{ borderBottom: '1px solid #c3bbbb' }} data-toggle="tab">Other<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-lg-9 setting_tabs">
                                                                    {/* <!-- Tab panes --> */}
                                                                    <div className="tab-content">
                                                                        <div className="tab-pane active" id="account">
                                                                            <div id="hide_section">
                                                                                <div className="m-nestedMenu__headerLabel1">General Account Settings</div>
                                                                                <ul className="nav nav-tabs tabs-left ">
                                                                                    <li className="active"><a href="javascript:;" id="display_name" data-toggle="tab">Display Name<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="email_address" data-toggle="tab">Email Address<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="language" data-toggle="tab">Language<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="password" data-toggle="tab">Password<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li className="active"><a href="javascript:;" id="email" data-toggle="tab">Email<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" style={{ borderBottom: '1px solid #c3bbbb' }} id="hashtags" data-toggle="tab">Hashtags<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    {/* <li><a href="javascript:;" id="nsfw_content" data-toggle="tab">NSFW Content<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="share_buttons" data-toggle="tab">Share Buttons<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="autoplay_videos" data-toggle="tab">Autoplay Videos<i className="fa fa-angle-right right-angle"></i></a></li> */}
                                                                                </ul>
                                                                            </div>
                                                                            {/* <br />
                                                                            <div id="hide_section2">
                                                                                <div className="m-nestedMenu__headerLabel1">Notifications</div>
                                                                                <ul className="nav nav-tabs tabs-left ">
                                                                                    <li className="active"><a href="javascript:;" id="email" data-toggle="tab">Email<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="popovers" style={{ borderBottom: '1px solid #c3bbbb' }} data-toggle="tab">Popovers<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                </ul>
                                                                            </div> */}

                                                                            <br />
                                                                            <div id="hide_section3">
                                                                                <div className="m-nestedMenu__headerLabel1">Account Upgrade</div>
                                                                                <ul className="nav nav-tabs tabs-left ">
                                                                                    <li className="active"><Link to="/pro" onClick={this.loadingData}>Upgrade to Pro<i className="fa fa-angle-right right-angle"></i></Link></li>
                                                                                    <li><Link to="/plus" onClick={this.loadingData} style={{ borderBottom: '1px solid #c3bbbb' }}>Upgrade to Plus<i className="fa fa-angle-right right-angle"></i></Link></li>
                                                                                </ul>
                                                                            </div>
                                                                            <br />
                                                                            <div className="display_name" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Display Name
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Customize your display name.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form onSubmit={this.submitFormDisplayName}>
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Display Name</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input"><input type="text" id="name" value={this.state.list?.display_name}
                                                                                                    onChange={this.onChangeDisplayName} name="display_name" className="form-control   " /></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled={!this.state.list?.display_name}>
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Save Display Name </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="email_address" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Email Address
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Change the email address where notifications are sent.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Email Address</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input"><input type="text" id="name" value={this.state.listEmail?.display_name} name="display_name" className="form-control   " /></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Update Email Address </div>
                                                                                            </button>
                                                                                        </div> */}
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="language" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel">
                                                                                        Language Settings
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Change your preferred language and, if available, the web interface display.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form onSubmit={this.submitFormLanguage}>
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Language</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input">
                                                                                                    <div class="form-group">

                                                                                                        <select value={this.state.language_id}
                                                                                                            onChange={this.onChangeLanguage} name="language_id">

                                                                                                            <option value="1">English</option>
                                                                                                            <option value="2">Czech</option>
                                                                                                        </select>
                                                                                                    </div>
                                                                                                    {/* <input type="text" id="name" name="name" formcontrolname="name" className="form-control   " /></div> */}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Update Language</div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="password" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Password
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Change account password.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form onSubmit={this.submitFormPassword}>
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Existing Password</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input">
                                                                                                    <input type="password" id="name" value={this.state.old_password}
                                                                                                        onChange={this.onChange} name="old_password" className="form-control" /></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">New Password</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input">
                                                                                                    <input type="password" id="name" value={this.state.new_password}
                                                                                                        onChange={this.onChange} name="new_password" className="form-control" /></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Confirm New Password</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input">
                                                                                                    <input type="password" id="name" value={this.state.confirm_password}
                                                                                                        onChange={this.onChange} name="confirm_password" className="form-control" /></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled={!this.state.old_password || !this.state.new_password || !this.state.confirm_password}>
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Update Password </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="nsfw_content" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> NSFW Content
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Control how NSFW content is displayed in your newsfeed.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="checkbox">
                                                                                            <label>
                                                                                                <input type="checkbox" defaultChecked /><i className="check-box"></i>Always show NSFW content (18+)
                                                      </label>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved ">  Update NSFW Preference </div>
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="share_buttons" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Autoplay Videos
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Control whether videos in your feed play automatically.
                                             </div>
                                                                                <br />
                                                                                <div className="m-settingsV2__desc"> This feature is only available to Plus users. <a href="javascript:;">Upgrade to Plus</a>
                                                                                </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>Enable video autoplay
                                                         </label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Update Preference  </div>
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="autoplay_videos" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Autoplay Videos
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Control whether videos in your feed play automatically.
                                             </div>
                                                                                <br />
                                                                                <div className="m-settingsV2__desc"> This feature is only available to Plus users. <a href="javascript:;">Upgrade to Plus</a>
                                                                                </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>Enable video autoplay
                                                         </label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Update Preference  </div>
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>

                                                                            <div className="email" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Email Notifications
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Control what email notifications you receive, and when.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form onSubmit={this.emailNotificationSubmit} >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="checkbox">
                                                                                                <label>

                                                                                                    {this.state.listEmailNotification?.email_notification === '0' ? <input type="checkbox" name="email_notification" onChange={this.onChangeEmailNotification} value="0" /> :
                                                                                                        ''}

                                                                                                    {this.state.listEmailNotification?.email_notification === '1' ?
                                                                                                        <input type="checkbox" value="1" checked onChange={this.onChangeEmailNotification} name="email_notification" /> :
                                                                                                        ''}


                                                                                                    <i className="check-box"></i>Show All notifications
                                                         </label>
                                                                                            </div>
                                                                                            {/* <div className="m-settingsV2__subheader"> Email me when </div> */}
                                                                                            {/* <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>I have unread notifications
                                                         </label>
                                                                                            </div>
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>I receive a wire
                                                         </label>
                                                                                            </div>
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>My boost has been completed
                                                         </label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <br />
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-settingsV2__subheader"> Email me with </div>
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>Top posts from my network
                                                         </label>
                                                                                            </div>
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>Tips on how to improve my channel
                                                         </label>
                                                                                            </div>
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>Things I've missed since my last login
                                                         </label>
                                                                                            </div>
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>New channels to subscribe to
                                                         </label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <br />
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-settingsV2__subheader"> Keep me updated with</div>
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>News about new Freedom-cells products and features
                                                         </label>
                                                                                            </div>
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>Tips on how to use Minds
                                                         </label>
                                                                                            </div>
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>Exclusive promotions
                                                         </label>
                                                                                            </div> */}
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Update Preference  </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                                <br />
                                                                            </div>
                                                                            <div className="popovers" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Notification Popovers
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc">Control whether you receive notification popovers.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="checkbox">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked /><i className="check-box"></i>Enable notification popovers
                                                         </label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved ">  Update Popover Preference   </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>

                                                                            <div className="hashtags" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel">
                                                                                        Theme
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Set up your category filter hashtags.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form onSubmit={this.submitHahtag}>
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Hashtags</label>
                                                                                                    <button type="button" className="add_hash" onClick={this.openHashtag.bind(this, 1)} > Add </button>
                                                                                                </div>
                                                                                                <div className="m-draggableList__listItem m-draggableList__listHeader ">
                                                                                                    <div className="m-draggableList__cell ">Label</div>
                                                                                                    {/* <!----> */}
                                                                                                    <div className="m-draggableList__cell ">#Hashtag</div>
                                                                                                    {/* <!----><!----> */}
                                                                                                    <div className="m-draggableList__cell"></div>
                                                                                                </div>
                                                                                                {this.state.hastagAdd === 1 ? <div className="m-draggableList__listItem m-draggableList__listHeader ">
                                                                                                    <div className="m-draggableList__cell ">
                                                                                                        <input type="text" value={this.state.lable}
                                                                                                            onChange={this.onChange} name="lable" className="form-control" />
                                                                                                    </div>
                                                                                                    <div className="m-draggableList__cell ">
                                                                                                        <input type="text" value={this.state.hashtag}
                                                                                                            onChange={this.onChange} name="hashtag" className="form-control" />

                                                                                                    </div>
                                                                                                    <div className="m-draggableList__cell"></div>
                                                                                                </div> : ''}
                                                                                                {codeDataHashTagList1 ? '' : <div className="text-center">No Hash Tag Found!</div>}


                                                                                                {this.state.listHashTagList.map(item => (
                                                                                                    <>
                                                                                                        <div className="m-draggableList__listItem m-draggableList__listHeader ">
                                                                                                            <div className="m-draggableList__cell ">
                                                                                                                {item.lable}


                                                                                                            </div>
                                                                                                            <div className="m-draggableList__cell " >
                                                                                                                {item.hashtag}<br />
                                                                                                            </div>
                                                                                                            <div className="m-draggableList__cell">
                                                                                                                <i class="fa fa-trash-o text-center" title="Delete" onClick={this.hashTagDelete.bind(this, item)} style={{ paddingLeft: '20px', cursor: 'pointer' }} aria-hidden="true"></i>

                                                                                                            </div>

                                                                                                        </div>
                                                                                                    </>
                                                                                                ))}
                                                                                                <br />
                                                                                                <div style={{ float: "left" }}>
                                                                                                    <Pagination
                                                                                                        activePage={this.state.activePage}
                                                                                                        itemsCountPerPage={10}
                                                                                                        totalItemsCount={this.state.listCount}
                                                                                                        pageRangeDisplayed={5}
                                                                                                        onChange={this.handlePageChange.bind(this)}
                                                                                                    />
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>

                                                                                        <br />
                                                                                        <div className="m-form__buttonsContainer pull-right">
                                                                                            <br />
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit"
                                                                                                disabled={!this.state.lable && !this.state.hashtag}>
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved ">  Save Hashtags </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="tab-pane" id="pro_settings">
                                                                            <div id="general_hide">
                                                                                <div className="m-nestedMenu__headerLabel1">Pro Settings</div>
                                                                                <ul className="nav nav-tabs tabs-left">
                                                                                    <li className="active"><a href="javascript:;" id="general" data-toggle="tab">General <i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="theme" data-toggle="tab">Theme<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="assets" data-toggle="tab">Assets<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="hashtags" data-toggle="tab">Hashtags<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="footer" data-toggle="tab">Footer<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="domain" data-toggle="tab">Domain<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li><a href="javascript:;" id="payouts" data-toggle="tab">Payouts<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                </ul>
                                                                            </div>
                                                                            <br />
                                                                            <div className="general" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="general_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> General Settings
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Customize your title and headline.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Page Title</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input"><input type="text" id="name" name="name" formcontrolname="name" className="form-control" /></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Headline</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input"><textarea className="form-control" ></textarea></div>
                                                                                                <div className="checkbox">
                                                                                                    <label>
                                                                                                        <input type="checkbox" defaultChecked /><i className="check-box"></i>Enable splash page
                                                            </label>
                                                                                                    <div className="checkbox">
                                                                                                        <label>
                                                                                                            <input type="checkbox" defaultChecked /><i className="check-box"></i>Enable Pro theme
                                                               </label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Save Personal Details </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="assets" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="general_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Assets
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Upload custom logo and background images.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--asset">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="logo">Logo</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input">
                                                                                                    <label htmlFor="logo" className="m-form__filePreview--logo" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
                                                                                                        <input type="file" id="logo" name="logo" accept="image/*" data-minds="logo" className="form-control" />
                                                                                                        <img alt="Nothing Found" src="https://www.minds.com/icon/1145350938320445460/large/1598448943/1598448943/13825648?cb=1599376961694" />
                                                                                                        <span className="m-form__filePreviewOverlay">
                                                                                                            <i className="material-icons"></i>
                                                                                                        </span>
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="m-form__field--asset">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="background">Background Image</label>
                                                                                                </div>
                                                                                                <div className="m-form__row--input">
                                                                                                    <label htmlFor="background" className="m-form__filePreview--background">
                                                                                                        <input type="file" id="background" name="background" accept="image/*" data-minds="background" className="form-control" />
                                                                                                        <img alt="Nothing Found" src="" />
                                                                                                        <span className="m-form__filePreviewOverlay m-form__filePreviewOverlay--show">
                                                                                                            <i className="fa fa-cloud-upload"></i>
                                                                                                        </span>
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer pull-right">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Save Assets </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                        <br />
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="theme" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="general_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Theme
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Set up your site's color theme.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <label htmlFor="text_color">Text Color</label>
                                                                                            <div className="m-form__row--input color_input_field">
                                                                                                <input type="text" id="text_color" name="text_color" className="form-control" /><label htmlFor="text_color_picker" className="m-form__colorPreview" style={{ backgroundColor: 'rgb(0, 0, 0)' }}><input type="color" id="text_color_picker" className="form-control" /></label>
                                                                                            </div>
                                                                                            <br />
                                                                                            <label htmlFor="text_color">Accent Color</label>
                                                                                            <div className="m-form__row--input color_input_field">
                                                                                                <input type="text" id="text_color" name="text_color" className="form-control" /><label htmlFor="text_color_picker" className="m-form__colorPreview" style={{ backgroundColor: 'rgb(0, 0, 0)' }}><input type="color" id="text_color_picker" className="form-control" /></label>
                                                                                            </div>
                                                                                            <br />
                                                                                            <label htmlFor="text_color">Background Color</label>
                                                                                            <div className="m-form__row--input color_input_field">
                                                                                                <input type="text" id="text_color" name="text_color" className="form-control" /><label htmlFor="text_color_picker" className="m-form__colorPreview" style={{ backgroundColor: 'rgb(0, 0, 0)' }}><input type="color" id="text_color_picker" className="form-control" /></label>
                                                                                            </div>
                                                                                            <br />
                                                                                            <label htmlFor="text_color">Color Schema</label>
                                                                                            <div className="form-radio">
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" defaultChecked name="radio" /><i className="check-box"></i>Light
                                                            </label>
                                                                                                </div>
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="check-box"></i>Dark
                                                            </label>
                                                                                                </div>
                                                                                            </div>
                                                                                            <br />
                                                                                            <label htmlFor="text_color">Color Schema</label>
                                                                                            <div className="form-radio">
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" defaultChecked name="radio" /><i className="check-box"></i>16:9
                                                            </label>
                                                                                                </div>
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="check-box"></i>16:10
                                                            </label>
                                                                                                </div>
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="check-box"></i>4:3
                                                            </label>
                                                                                                </div>
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="check-box"></i>1:1
                                                            </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer pull-right">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Save Theme </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                        <br />
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="hashtags" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="general_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel">
                                                                                        Theme
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Set up your category filter hashtags.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Hashtags</label>
                                                                                                    <button type="button" className="add_hash" > Add </button>
                                                                                                </div>
                                                                                                <div className="m-draggableList__listItem m-draggableList__listHeader ">
                                                                                                    <div className="m-draggableList__cell ">Label</div>
                                                                                                    <div className="m-draggableList__cell ">#Hashtag</div>
                                                                                                    <div className="m-draggableList__cell"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer pull-right">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved ">  Save Hashtags </div>
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                             */}

                                                                            <div className="footer" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="general_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel">
                                                                                        Footer
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Set up your site's footer links.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="name">Links</label>
                                                                                                    <button type="button" className="add_hash" > Add </button>
                                                                                                </div>
                                                                                                <div className="m-draggableList__listItem m-draggableList__listHeader ">
                                                                                                    <div className="m-draggableList__cell ">Label</div>
                                                                                                    {/* <!----> */}
                                                                                                    <div className="m-draggableList__cell ">Url</div>
                                                                                                    {/* <!----><!----> */}
                                                                                                    <div className="m-draggableList__cell"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__field--text stretchedField">
                                                                                            <div className="m-form__row--label">
                                                                                                <label htmlFor="footer_text">Text</label>
                                                                                            </div>
                                                                                            <div className="m-form__row--input">
                                                                                                <input type="text" id="footer_text" name="footer_text" className="form-control " />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer pull-right">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved ">  Save Footer </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="domain" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="general_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel">
                                                                                        Domain
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Contact info@freedomcells.com to customize your site domain.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__field--text stretchedField">
                                                                                            <div className="m-form__row--label">
                                                                                                <label htmlFor="footer_text">Domain</label>
                                                                                            </div>
                                                                                            <div className="m-form__row--input">
                                                                                                <input type="text" id="footer_text" name="footer_text" className="form-control " />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__field--text stretchedField">
                                                                                            <div className="m-form__row--label">
                                                                                                <label htmlFor="custom_head">Custom &lt;head&gt; Code</label>
                                                                                            </div>
                                                                                            <div className="m-form__row--input">
                                                                                                <textarea id="custom_head" name="custom_head" className="form-control" readOnly=""></textarea>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer pull-right">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved ">  Save domain </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="payouts" style={{ display: 'none' }}>
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" id="back5"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Payouts
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Select the currency type you wish you be paid out in. Please note payouts only occur after your earnings are equivalent to $100 or greater.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <label htmlFor="text_color">Payout Currency</label>
                                                                                            <div className="form-radio">
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" defaultChecked name="radio" /><i className="check-box"></i>USD
                                                            </label>
                                                                                                </div>
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="check-box"></i>Tokens
                                                            </label>
                                                                                                </div>
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="check-box"></i>Ether
                                                            </label>
                                                                                                </div>
                                                                                                <div className="radio">
                                                                                                    <label>
                                                                                                        <input type="radio" name="radio" /><i className="check-box"></i>Bitcoin
                                                            </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer pull-right">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Save Payouts Currency  </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tab-pane" id="security">
                                                                            <div id="security_hide">
                                                                                <div className="m-nestedMenu__headerLabel1">Security</div>
                                                                                <ul className="nav nav-tabs tabs-left">
                                                                                    <li className="active">
                                                                                        <a href="javascript:;" id="two-factor_authen" style={{ borderBottom: '1px solid #c3bbbb' }} data-toggle="tab">Two-factor Authentication<i className="fa fa-angle-right right-angle"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    {/* <li>
                                                                                        <a href="javascript:;" id="sessions" data-toggle="tab">Sessions<i className="fa fa-angle-right right-angle"></i>
                                                                                        </a>
                                                                                    </li> */}
                                                                                </ul>
                                                                            </div>
                                                                            <div className="two-factor_authen" style={{ display: 'none' }}>
                                                                                <br />
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="security_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Two-factor Authentication
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Add an extra layer of security to your account by enabling 2FA.
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form onSubmit={this.submitFormTwoFa}>
                                                                                        <div className="m-form__fieldsContainer">
                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <p>Step 1: Install Google authenticator</p>

                                                                                                <p>Step 2: Scan the QR code.</p>

                                                                                                <p>Step 3: Enter the code, Each time you want to enter your local coin account, You are then asked to enter a code, this code is generated each few seconds on the google authenticator app
                                                                   </p>

                                                                                                <p>Account Name: 2FA</p>

                                                                                                <p>Key: {this.state.listTwoFa?.google_auth_code}</p>

                                                                                                {/* <QRCode style={{ height: '300px', width: '300px' }} className="img-fluid QR-code" value={`${this.state.listTwoFa?.qrCodeUrl}`} name="address" /> */}

                                                                                                <img src={this.state.listTwoFa?.qrCodeUrl}></img>

                                                                                                <p>Enter Google Authenticator Code *</p>

                                                                                                <p>Enable/Disabled:</p>
                                                                                                {this.state.listTwoFa?.is_enable_google_auth_code === '0' ? <input type="checkbox" style={{ marginLeft: '-132px', marginTop: '-36px' }} value="0" name="is_enable_google_auth_code" onChange={this.onChangeTwoFa} /> :
                                                                                                    <input type="checkbox" checked={this.state.listTwoFa?.is_enable_google_auth_code} value="1" style={{ marginLeft: '-132px', marginTop: '-36px' }} name="is_enable_google_auth_code" onChange={this.onChangeTwoFa} />}
                                                                                                <div className="m-form__row--label">
                                                                                                </div>
                                                                                                <div className="m-form__row--input">
                                                                                                    <input type="text" id="name" value={this.state.listTwoFa?.code} onChange={this.onChangeTwoFa} name="code" className="form-control   " /></div>
                                                                                                {/* <br/> */}
                                                                                                {/* <button type="submit" className="btn btn-success btn-sm">Authenticate</button> */}



                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green" type="submit" disabled={!this.state.listTwoFa?.code}>
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Setup</div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                            <div className="sessions" style={{ display: 'none' }}>
                                                                                <br />
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="security_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Sessions
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Close all sessions with a single click.
                                             </div>
                                                                                <br />
                                                                                <div className="m-settingsV2__desc" style={{ fontSize: 'small' }}>
                                                                                    You currently have 2 open sessions
                                                {/* <!---->.  */}
                                                                                </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__buttonsContainer">
                                                                                            <button className="m-shadowboxSubmitButton green btn-danger" type="submit" disabled="">
                                                                                                <div className="m-shadowboxSubmitButton__status--unsaved "> Close all Sessions </div>
                                                                                                {/* <!----><!----> */}
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tab-pane" id="billing">
                                                                            <div className="payment_hide">
                                                                                <div className="m-nestedMenu__headerLabel1">Billing</div>
                                                                                <ul className="nav nav-tabs tabs-left">
                                                                                    <li className="active">
                                                                                        <a href="javascript:;" id="payment_methods" data-toggle="tab">Payment Methods <i className="fa fa-angle-right right-angle"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="javascript:;" id="recurring_payments" style={{ borderBottom: '1px solid #c3bbbb' }} data-toggle="tab">Recurring Payments<i className="fa fa-angle-right right-angle"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="payment_methods" style={{ display: 'none' }}>
                                                                                <br />
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="payment_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Payment Methods
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Manage credit cards associated with your Freedom-cells account.
                                             </div>
                                                                            </div>
                                                                            <div className="recurring_payments" style={{ display: 'none' }}>
                                                                                <br />
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="payment_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel"> Recurring Payments
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> Track recurring payments you make to support other channels.
                                             </div>
                                                                                <br />
                                                                                <div className="m-settingsV2__desc" style={{ fontSize: 'medium' }}><strong> You haven't set up any recurring payments. </strong>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tab-pane" id="others">
                                                                            <div id="others_hide">
                                                                                <div className="m-nestedMenu__headerLabel1">Referrals</div>
                                                                                <ul className="nav nav-tabs tabs-left">
                                                                                    <li>
                                                                                        <a href="javascript:;" id="referrals" style={{ borderBottom: '1px solid #c3bbbb' }} data-toggle="tab">Referrals<i className="fa fa-angle-right right-angle"></i></a>
                                                                                    </li>
                                                                                </ul>
                                                                                <br />
                                                                                <div className="m-nestedMenu__headerLabel1">Content Admin</div>
                                                                                <ul className="nav nav-tabs tabs-left">
                                                                                    <li className="active">
                                                                                        <a href="javascript:;" id="reported_content" data-toggle="tab">Reported Content <i className="fa fa-angle-right right-angle"></i></a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="javascript:;" id="blocked_channels" style={{ borderBottom: '1px solid #c3bbbb' }} data-toggle="tab">Blocked Channels<i className="fa fa-angle-right right-angle"></i></a>
                                                                                    </li>
                                                                                </ul>
                                                                                <br />
                                                                                <div className="m-nestedMenu__headerLabel1">Paid Content</div>
                                                                                <ul className="nav nav-tabs tabs-left">
                                                                                    <li className="active">
                                                                                        <a href="javascript:;" id="subscription_tier_management" style={{ borderBottom: '1px solid #c3bbbb' }} data-toggle="tab">Subscription Tier Management <i className="fa fa-angle-right right-angle"></i></a>
                                                                                    </li>
                                                                                </ul>
                                                                                <br />
                                                                                <div className="m-nestedMenu__headerLabel1">Deactivate and Delete Account</div>
                                                                                <ul className="nav nav-tabs tabs-left">
                                                                                    <li className="active"><a href="javascript:;" id="deactivate_account" data-toggle="tab">Deactivate Account <i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                    <li className="active"><a href="javascript:;" style={{ borderBottom: '1px solid #c3bbbb' }} id="delete_account" data-toggle="tab">Delete Account<i className="fa fa-angle-right right-angle"></i></a></li>
                                                                                </ul>

                                                                            </div>
                                                                            <div className="clearfix"></div>
                                                                            <div className="referrals" style={{ display: 'none' }}>
                                                                                <br />
                                                                                <div className="m-settingsV2__headerWrapper">
                                                                                    <div className="m-settingsV2__backButton">
                                                                                        <a href="javascript:;" className="other_back"><i className="fa fa-arrow-left"></i></a>
                                                                                    </div>
                                                                                    <div className="m-settingsV2__headerLabel">
                                                                                        Referrals
                                                </div>
                                                                                </div>
                                                                                <div className="m-settingsV2__desc"> If your friend signs up for Freedom-cells within 24 hours of clicking the link you shared with them, they’ll be added to your pending referrals. Once they sign up for the rewards program by setting up their Freedom-cells wallet, the referral is complete and you’ll both get +1 added to your contribution scores!
                                             </div>
                                                                                <div className="pad_left_form">
                                                                                    <form >
                                                                                        <div className="m-form__fieldsContainer">

                                                                                            <div className="m-form__field--text stretchedField">
                                                                                                <div className="m-form__row--label">
                                                                                                    <label htmlFor="footer_text" style={{ fontSize: 'small' }}>Send this link to your friends to earn tokens for referrals</label>
                                                                                                </div>

                                                                                                <div className="m-settingsV2__referralsLinks__copyableLink">
                                                                                                    <input readOnly="" tabIndex="-1" value={this.state.listReferral?.referral_code} placeholder="Referral" className="m-settingsV2__referralsLinks__copyableLinkText m-copyableLink" />
                                                                                                    {/* <div className="m-settingsV2__referralsLinks__copyableLinkButton"> Copy </div> */}
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="m-form__row--label">
                                                                                                <label htmlFor="footer_text" style={{ fontSize: 'small' }}>You can also get referrals by adding this code to the end of any Freedom-cells link you share</label>
                                                                                            </div>
                                                                                            {/* <div className="m-settingsV2__referralsLinks__copyableLink">
                                                                                                <input readOnly="" tabIndex="-1" placeholder="https://www.minds.com/register?referrer=piyush1" className="m-settingsV2__referralsLinks__copyableLinkText m-copyableLink" />
                                                                                                <div className="m-settingsV2__referralsLinks__copyableLinkButton"> Copy </div>
                                                                                            </div> */}
                                                                                            {/* <div className="m-form__row--label">
                                                                                                <label htmlFor="footer_text" style={{ fontSize: 'small' }}>More ways to share</label>
                                                                                            </div>
                                                                                            <div className="m-settingsV2__referralsLinks__shareButtons">
                                                                                                <button className="m-settingsV2__referralsLinks__shareButton m-settingsV2__referralsLinks__shareButton--twitter" title="Twitter">
                                                                                                    <img alt="Nothing Found" src="https://cdn-assets.minds.com/front/dist/en/assets/icons/twitter.svg" />
                                                                                                </button>
                                                                                                <button className="m-settingsV2__referralsLinks__shareButton m-settingsV2__referralsLinks__shareButton--facebook" title="Facebook"><img alt="Nothing Found" src="https://cdn-assets.minds.com/front/dist/en/assets/icons/facebook.svg" />
                                                                                                </button>
                                                                                                <button className="m-settingsV2__referralsLinks__shareButton m-settingsV2__referralsLinks__shareButton--email" title="Email"><img alt="Nothing Found" src="https://cdn-assets.minds.com/front/dist/en/assets/icons/email.svg" />
                                                                                                </button>
                                                                                            </div> */}
                                                                                        </div>


                                                                                        <div className="footer_Label">
                                                                                            Referrals
		                                             </div>
                                                                                    </form>
                                                                                    <div className="m-settingsV2__desc"> You don't have any referrals yet.
		                                             </div>
                                                                                </div>
                                                                                <br />

                                                                            </div>
                                                                        </div>
                                                                        <div className="reported_content" style={{ display: 'none' }}>
                                                                            <br />
                                                                            <div className="m-settingsV2__headerWrapper">
                                                                                <div className="m-settingsV2__backButton">
                                                                                    <a href="javascript:;" className="other_back"><i className="fa fa-arrow-left"></i></a>
                                                                                </div>
                                                                                <div className="m-settingsV2__headerLabel">
                                                                                    Reported Content
                                                </div>
                                                                            </div>
                                                                            <div className="m-settingsV2__desc"> Oversee disciplinary measures taken on your posts and channel.
                                             </div>
                                                                        </div>
                                                                        <div className="blocked_channels" style={{ display: 'none' }}>
                                                                            <br />
                                                                            <div className="m-settingsV2__headerWrapper">
                                                                                <div className="m-settingsV2__backButton">
                                                                                    <a href="javascript:;" className="other_back"><i className="fa fa-arrow-left"></i></a>
                                                                                </div>
                                                                                <div className="m-settingsV2__headerLabel">
                                                                                    Blocked Channels
                                                </div>
                                                                            </div>


                                                                            <div className="m-form__fieldsContainer">
                                                                                <div className="m-form__field--text stretchedField" style={{ padding: '10px' }}>

                                                                                    <div className="m-draggableList__listItem m-draggableList__listHeader ">
                                                                                        <div className="m-draggableList__cell ">Image</div>
                                                                                        {/* <!----> */}
                                                                                        <div className="m-draggableList__cell ">Name</div>
                                                                                        {/* <!----><!----> */}
                                                                                        <div className="m-draggableList__cell">Action</div>
                                                                                    </div>

                                                                                    {/* {codeDataHashTagList1 ? '' : <div className="text-center">No Hash Tag Found!</div>} */}

                                                                                    {codeDataBlockList1 ? '' : <div className="m-settingsV2__desc m-settingsV2__notice text-center"><span>You haven't blocked any channels.</span></div>}

                                                                                    {this.state.listBlockList.map(item => (
                                                                                        <>
                                                                                            <div className="m-draggableList__listItem m-draggableList__listHeader ">
                                                                                                <div className="m-draggableList__cell ">
                                                                                                    <img src={item.profile_pic} style={{ height: '35px', width: '35px' }} />


                                                                                                </div>
                                                                                                <div className="m-draggableList__cell " >
                                                                                                    {item.full_name}<br />
                                                                                                </div>
                                                                                                <div className="m-draggableList__cell">
                                                                                                    <i class="fa fa-unlock text-center" title="Unblock" onClick={this.unblockUser.bind(this, item)} style={{ paddingLeft: '20px', cursor: 'pointer' }} aria-hidden="true"></i>

                                                                                                </div>

                                                                                            </div>
                                                                                        </>
                                                                                    ))}
                                                                                    <br />
                                                                                    {/* <div style={{ float: "left" }}>
                                                                                        <Pagination
                                                                                            activePage={this.state.activePage}
                                                                                            itemsCountPerPage={10}
                                                                                            totalItemsCount={this.state.listCount}
                                                                                            pageRangeDisplayed={5}
                                                                                            onChange={this.handlePageChange.bind(this)}
                                                                                        />
                                                                                    </div> */}

                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                        <div className="subscription_tier_management" style={{ display: 'none' }}>
                                                                            <br />
                                                                            <div className="m-settingsV2__headerWrapper">
                                                                                <div className="m-settingsV2__backButton">
                                                                                    <a href="javascript:;" className="other_back"><i className="fa fa-arrow-left"></i></a>
                                                                                </div>
                                                                                <div className="m-settingsV2__headerLabel">
                                                                                    Subscription tier Management
                                                </div>
                                                                            </div>
                                                                            <div className="m-settingsV2__desc"> Contact info@freedomcells.com to customize your site Subscription tier Management.
                                             </div>
                                                                            <div className="pad_left_form">
                                                                                <form >
                                                                                    <div className="m-form__field--text stretchedField">
                                                                                        <div className="m-form__row--label">
                                                                                            <label htmlFor="footer_text">Name</label>
                                                                                        </div>
                                                                                        <div className="m-form__row--input">
                                                                                            <input type="text" id="footer_text" name="footer_text" className="form-control " />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="m-form__field--text stretchedField">
                                                                                        <div className="m-form__row--label">
                                                                                            <label htmlFor="custom_head">Custom &lt;head&gt; Code</label>
                                                                                        </div>
                                                                                        <div className="m-form__row--input">
                                                                                            <textarea id="custom_head" name="custom_head" className="form-control" readOnly=""></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="m-form__buttonsContainer pull-right">
                                                                                        <button className="m-shadowboxSubmitButton green" type="submit" disabled="">
                                                                                            <div className="m-shadowboxSubmitButton__status--unsaved ">  Save Subscription tier Management </div>
                                                                                            {/* <!----><!----> */}
                                                                                        </button>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                        <div className="deactivate_account" style={{ display: 'none' }}>
                                                                            <br />
                                                                            <div className="m-settingsV2__headerWrapper">
                                                                                <div className="m-settingsV2__backButton">
                                                                                    <a href="javascript:;" className="other_back"><i className="fa fa-arrow-left"></i></a>
                                                                                </div>
                                                                                <div className="m-settingsV2__headerLabel">
                                                                                    Deactivate Account
                                                </div>
                                                                            </div>
                                                                            <div className="m-settingsV2__desc"> Deactivating your account will make your profile invisible. You will also not receive emails or notifications. Your username will be reserved in case you return to Minds.
                                             </div>
                                                                            <div className="pad_left_form">
                                                                                <form>
                                                                                    <div className="m-form__fieldsContainer">
                                                                                        <div className="checkbox">
                                                                                            <label>
                                                                                                <input type="checkbox" defaultChecked /><i className="check-box"></i> I understand and wish to continue.
                                                         </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="m-form__buttonsContainer">
                                                                                        <button className="m-shadowboxSubmitButton green btn-danger" type="submit" disabled="">
                                                                                            <div className="m-shadowboxSubmitButton__status--unsaved  ">  Deactivate Account   </div>
                                                                                            {/* <!----><!----> */}
                                                                                        </button>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                        <div className="delete_account" style={{ display: 'none' }}>
                                                                            <br />
                                                                            <div className="m-settingsV2__headerWrapper">
                                                                                <div className="m-settingsV2__backButton">
                                                                                    <a href="javascript:;" className="other_back"><i className="fa fa-arrow-left"></i></a>
                                                                                </div>
                                                                                <div className="m-settingsV2__headerLabel">
                                                                                    Delete Account
                                                </div>
                                                                            </div>
                                                                            <div className="m-settingsV2__desc"> Warning: This is not reversible and will result in permanent loss of your channel and all of your data. Your channel will not be recoverable. Your username will be released back to the public.
                                             </div>
                                                                            <div className="pad_left_form">
                                                                                <form>
                                                                                    <div className="m-form__fieldsContainer">
                                                                                        <div className="checkbox">
                                                                                            <label>
                                                                                                <input type="checkbox" defaultChecked /><i className="check-box"></i> I understand and wish to continue.
                                                         </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="m-form__buttonsContainer">
                                                                                        <button className="m-shadowboxSubmitButton green btn-danger" type="submit" disabled="">
                                                                                            <div className="m-shadowboxSubmitButton__status--unsaved  ">  Delete Account   </div>
                                                                                            {/* <!----><!----> */}
                                                                                        </button>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                        </div>



                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                </div>
                <Messaging />
            </>
        )
    }
}

