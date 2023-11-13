import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import toastr from 'reactjs-toastr';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
const headers = {
    'Content-Type': 'text/plain'
 };
export default class InnerHeader extends Component {

    constructor(props) {
        super(props)
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data
        this.main_search = this.main_search.bind(this);
        this.main_search_val = this.main_search_val.bind(this);
        this.notificationRead = this.notificationRead.bind(this)
        this.notificationReadBell = this.notificationReadBell.bind(this);
        this.notificationReadSingle = this.notificationReadSingle.bind(this)
        this.state = {
            main_search_val: '',
            searchData: [],
            NotifData: []
        }
    }

    main_search_val(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        axios.post(`https://freedomcells.net/freedomcell/api/users/all_search`, { 'user_id': this.loginData.id, 'search': this.state.main_search_val, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            this.codeDataAvatarBanner1 = res.data.code
            if (this.codeDataAvatarBanner1 === true) {
                this.setState({
                    searchData: res.data.recdata
                });
                $('.search_ul').show();
            } else {
                this.setState({
                    searchData: ['']
                });
                $('.search_ul').hide();
            }

        }).catch((error) => {
        });
    }

    componentDidMount() {
        $('#particles-js').hide();
        this.BannerImageAPI()
        setInterval(() => {

            this.notificationList()
        }, 10000);

        $("body").delegate("#search-friends", "click", function (e) {
            e.stopPropagation();
        });

        $("body").click(function () {
            $('.searched').removeClass("active");
            $('.user-setting').removeClass("active");
        });
        $('body').delegate('.top-area > .setting-area > li > .menu-a', "click", function () {
            var $parent = $(this).parent('li');
            $parent.siblings().children('div').removeClass('active');
            $(this).siblings('div').addClass('active');
        });
        $('body').delegate('.top-area > .setting-area > li > .menu-search', "click", function () {
            var $parent = $(this).parent('li');
            $parent.siblings().children('div').removeClass('active');
            $(this).siblings('div').addClass('active');
            return false;
        });
        $('.user-img img').click(function (e) {
            $('.user-setting').toggleClass("active");
            setTimeout(function(){
            $('.searched').removeClass('active');
            });
            e.stopPropagation();
         });
    }

    async  main_search(e) {
        e.preventDefault()
        if (this.state.main_search_val.length === 0) {
            this.setState({
                searchData: ['']
            });
            $('.search_ul').hide();
            return false;
        }
        axios.post(`https://freedomcells.net/freedomcell/api/users/all_search`, { 'user_id': this.loginData.id, 'search': this.state.main_search_val, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            this.codeDataAvatarBanner1 = res.data.code
            if (this.codeDataAvatarBanner1 === true) {
                this.setState({
                    searchData: res.data.recdata
                });
                $('.search_ul').show();
            } else {
                this.setState({
                    searchData: ['']
                });
                $('.search_ul').hide();
            }
        }).catch((error) => {
        });

    }
    //==================================  Detail of Avatar Banner  ==============================

    BannerImageAPI() {
        axios.post(`https://freedomcells.net/freedomcell/api/users/avatar_banner`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            this.codeDataAvatarBanner = res.data.code
            if (this.codeDataAvatarBanner === true) {
                this.setState({
                    bannerImage: res.data.recdata
                });
            }
            else {
                toastr.error("This account is open at somewhere, So it's logout", { displayDuration: 3000 })
                setTimeout(() => {
                    Cookies.remove('name');

                    window.location.hash = '/';
                }, 200);
            }
        }).catch((error) => {
        });

    }
    //================   Logout  ==============================

    Logout() {
        Cookies.remove('name');
        setTimeout(() => {

            window.location.hash = '/';
            window.location.reload(true)

        }, 200);
    }

    loading(id) {
        setTimeout(() => {
            window.location.hash = '/timeLine/' + id;
            window.location.reload(true)
        }, 500);
    }

    loadingSetting(id) {
        setTimeout(() => {
            window.location.hash = '/setting'
            window.location.reload(true)
        }, 500);
    }

    loadingGroup(id) {
        setTimeout(() => {
            window.location.hash = '/groupdetail/' + id;
            window.location.reload(true)
        }, 500);
    }

    loginPage() {
        setTimeout(() => {
            window.location.reload(true)
        }, 200);
    }

    //==================================  Notifications list  ==============================

    notificationList() {
        axios.post(`https://freedomcells.net/freedomcell/api/users/notification_list`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'limit': 10 },{headers}).then((res) => {
            this.codeDataNotification = res.data.code
            if (this.codeDataNotification === true) {
                this.notifCount = res.data
                setTimeout(() => {

                    $.each(res.data.recdata, function () {
                        if (this.is_flash === '0') {
                            addNotification({
                                title: this.title,
                                subtitle: 'This is a subtitle',
                                // message: this.message,
                                theme: 'darkblue',
                                native: true // when using native, your OS will handle theming.

                            })
                        } else {
                        }

                    })
                }, 1000);

                this.setState({
                    NotifData: res.data.recdata
                });

            }
            else {
                this.setState({
                    NotifData: []
                })
            }
        }).catch((error) => {
        });

    }

    pushnotification(item) {
        addNotification({
            title: item.title,
            subtitle: 'This is a subtitle',
            message: item.message,
            theme: 'darkblue',
            duration: 3000,
            native: true // when using native, your OS will handle theming.

        })
    }

    //===================================== Notification Read  ===========================

    notificationRead() {
        axios.post(`https://freedomcells.net/freedomcell/api/users/notification_read`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'notification_id': "0" },{headers}).then((res) => {
            this.codeDataNotificationReadAll = res.data.code
            if (this.codeDataNotificationReadAll === true) {
                window.location.hash = '/AllNotification';
                window.location.reload(true)

            }
            else {

            }
        }).catch((error) => {
        });
    }

    //===================================== Notification Bell click Read  ===========================

    notificationReadBell() {
        axios.post(`https://freedomcells.net/freedomcell/api/users/notification_read`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'notification_id': "0" },{headers}).then((res) => {
            this.codeDataNotificationReadAll = res.data.code
            if (this.codeDataNotificationReadAll === true) {

            }
            else {

            }
        }).catch((error) => {
        });
    }

    //===================================== Notification read single  ====================

    notificationReadSingle(id) {
        console.log(id)
        axios.post(`https://freedomcells.net/freedomcell/api/users/notification_read`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'notification_id': id.notification_id },{headers}).then((res) => {
            this.codeDataNotificationReadAll = res.data.code
            if (this.codeDataNotificationReadAll === true) {
                window.location.hash = id.link
                setTimeout(() => {
                    window.location.reload(true)
                }, 1000);

            }
            else {

            }
        }).catch((error) => {
        });
    }

    loading1(id) {
        console.log(id.link);
        
        window.location.hash = id.link
        setTimeout(() => {
            window.location.reload(true)
        }, 1000);
    }

    render() {
        return (
            <div className="topbar stick stickClass">
                <div className="logo text-right innerLogo">
                    <Link title="" to="/" onClick={this.loginPage}><img src="https://freedomcells.net/logo_freedom.png" alt="" /></Link>

                </div>
                <Notifications />


                <div className="top-area">

                    <span className="crowd_fund" style={{ marginLeft: '300px' }}>
                        <button className="add-butn menu-button" style={{ color: '#fff', borderRadius: '5px', marginRight: '10px' }}>Vtube</button>
                        <Link to="/MyVotes">
                        <button className="add-butn menu-button" style={{ color: '#fff', borderRadius: '5px', marginRight: '10px' }}>Vote</button>
                        </Link>
                        <Link to="/allprojects">
                            <button className="add-butn menu-button" style={{ color: '#fff', borderRadius: '5px', marginRight: '10px' }}>CrowdFund</button>
                        </Link>
                        <button className="add-butn menu-button" style={{ color: '#fff', borderRadius: '5px', marginRight: '10px' }}>Market</button>
                        <Link to="/discoverygroups">
                            <button className="add-butn menu-button" style={{ color: '#fff', borderRadius: '5px', marginRight: '10px' }}>Groups</button>
                        </Link>
                        {/* <Link to="/BuyEth">

                            <button className="add-butn menu-button" style={{ color: '#fff', borderRadius: '5px' }} >BuyETH</button>
                        </Link> */}
                    </span>


                    <ul className="setting-area" >
                        {/* <li id="notification_bell" onClick={this.abc}>kkk</li> */}
                        <li >
                            <a href="javascript:;" title="Home" data-ripple="" className="head-menu menu-search">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </a>


                            <div className="searched">
                                <form className="form-search" onSubmit={this.main_search}>
                                    <input type="text" id="search-friends" placeholder="Search Friend" autoComplete="off" onChange={this.main_search_val.bind(this)} name="main_search_val" value={this.state.main_search_val} />
                                    <button data-ripple type="submit"><i className="ti-search"></i></button>
                                    <ul className="search_ul">
                                        {this.state.searchData.map(item => {


                                            return (
                                                (item.type === 'user') ?
                                                    <>
                                                        <li style={{ cursor: 'pointer', textAlign: 'left', width: '100%' }} title={item.fullname} >
                                                            <Link to={`/timeLine/${item.id}`} onClick={this.loading.bind(this, item.id)}>

                                                                <img src={item.profile_pic} alt="Nothing Found" style={{ height: '50px', width: '50px', borderRadius: '50%' }} /> <span data-id={item.id} style={{ marginLeft: "10px" }}>{item.name}</span>

                                                            </Link>
                                                        </li>
                                                    </>
                                                    :
                                                    <>
                                                        <li style={{ cursor: 'pointer', textAlign: 'left', width: '100%' }} title={item.fullname}>
                                                            <Link to={`/groupdetail/${item.id}`} onClick={this.loadingGroup.bind(this, item.id)}>
                                                                <img src={item.profile_pic} alt="Nothing Found" style={{ height: '50px', width: '50px', borderRadius: '50%' }} /> <span data-id={item.id} style={{ marginLeft: "10px" }}>{item.name}</span>
                                                            </Link>
                                                        </li>
                                                    </>
                                            )


                                        })}
                                    </ul>
                                </form>
                            </div>
                        </li>
                        {/* <li><a href="newsfeeds.html" title="Home" data-ripple="" className="head-menu">
                            <i className="fa fa-home" aria-hidden="true"></i>

                        </a></li> */}
                        {/* <span > */}
                        <li >
                            <a href="javascript:;" title="Notification" onClick={this.notificationReadBell} data-ripple="" className="head-menu menu-a">
                                <i className="fa fa-bell-o" aria-hidden="true"></i><span className="badge" >{this.notifCount?.unread_count}</span>
                            </a>
                            <div className="dropdowns ps-container ps-theme-default ps-active-y notif" >
                                <span>{this.notifCount?.unread_count} New Notifications</span>
                                <ul className="drops-menu">
                                    {this.state.NotifData.map(item => (
                                        item.isread === '0' ? <li onClick={this.notificationReadSingle.bind(this, item)} style={{ background: 'whitesmoke' }}>
                                            <Link to="/" title="">
                                                <img src={item.profile_pic} alt="" />
                                                <div className="mesg-meta">
                                                    <h6>{item.sender}</h6>
                                                    <span title={item.message}>{item.title}</span>
                                                    <i>{item.duration}</i>
                                                </div>
                                            </Link>
                                            {/* <span className="tag green">New</span> */}
                                        </li> :
                                            <li onClick={this.loading1.bind(this, item)} >
                                                <Link to="/" title="">
                                                    <img src={item.profile_pic} alt="" />
                                                    <div className="mesg-meta">
                                                        <h6>{item.sender}</h6>
                                                        <span title={item.message}>{item.title}</span>
                                                        <i>{item.duration}</i>
                                                    </div>
                                                </Link>
                                                {/* <span className="tag green">New</span> */}
                                            </li>
                                    ))}
                                </ul>
                                <Link to="/AllNotification" onClick={this.notificationRead} title="" className="more-mesg">view more</Link>
                            </div>
                            {/* </span> */}
                        </li>
                        {/* <li>
                            <a href="javascript:;" title="Messages" data-ripple="" className="head-menu">
                                <i className="ti-comment"></i>
                                <span>1200</span></a>
                            <div className="dropdowns ps-container ps-theme-default ps-active-y ">
                                <span>5 New Messages</span>
                                <ul className="drops-menu">
                                    <li>
                                        <a href="javascript:;" title="">
                                            <img src="../../thumb-1.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>sarah Loren</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag green">New</span>
                                    </li>
                                    <li>
                                        <a href="javascript:;" title="">
                                            <img src="../../thumb-2.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>Jhon doe</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag red">Reply</span>
                                    </li>
                                    <li>
                                        <a href="javascript:;" title="">
                                            <img src="../../thumb-3.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>Andrew</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag blue">Unseen</span>
                                    </li>
                                    <li>
                                        <a href="javascript:;" title="">
                                            <img src="../../thumb-4.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>Tom cruse</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag">New</span>
                                    </li>
                                    <li>
                                        <a href="javascript:;" title="">
                                            <img src="../../thumb-5.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>Amy</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag">New</span>
                                    </li>
                                </ul>
                                <a href="messages.html" title="" className="more-mesg">view more</a>
                            </div>
                        </li>
                         */}
                        <li><a href="javascript:;" title="Languages" data-ripple="" className="head-menu menu-a"><i className="fa fa-globe"></i></a>
                            <div className="dropdowns ps-container ps-theme-default ps-active-y languages">
                                <a href="javascript:;" title=""><i className="ti-check"></i>English</a>
                                <a href="javascript:;" title="">Czech</a>
                                <a href="javascript:;" title="">Hindi</a>
                            </div>
                        </li>
                    </ul>

                    <div className="user-img">
                        <img src={this.state?.bannerImage?.avatar} alt="" />
                        <span className="status f-online"></span>
                        <div className="user-setting" style={{ marginRight: '30px' }}>
                            {/* <a href="javascript:;" title=""><span className="status f-online"></span>online</a>
                            <a href="javascript:;" title=""><span className="status f-away"></span>away</a>
                            <a href="javascript:;" title=""><span className="status f-off"></span>offline</a> */}
                            <span style={{ marginLeft: '15px' }}>{this.state?.bannerImage?.full_name}</span>
                            <Link to={`/timeLine/${this.loginData?.id}`} onClick={this.loading.bind(this, this.loginData?.id)} title=""><i className="fa fa-user-o" aria-hidden="true"></i>
                                view profile</Link>
                            {/* <Link to={`/timeLine/${this.loginData?.id}`} onClick={this.loading.bind(this, this.loginData?.id)} title=""><i className="ti-pencil-alt"></i>edit profile</Link> */}
                            {/* <a href="javascript:;" title=""><i className="ti-target"></i>activity log</a> */}
                            <Link to={`/setting`} onClick={this.loadingSetting.bind(this, this.loginData?.id)} title=""><i className="ti-settings"></i>account setting</Link>
                            <Link to="/" onClick={this.Logout} title=""><i className="ti-power-off"></i>log out</Link>
                        </div>
                    </div>
                    {/* <span className="ti-menu main-menu" data-ripple=""><span className="ripple"><span className="ink" style={{ height: '20px', width: '20px', backgroundColor: 'rgb(217, 217, 217)', top: '-3px', left: '-1.39062px' }}></span></span></span> */}
                    {/* <i className="fa fa-bars font_login" aria-hidden="true"></i> */}
                    <div className="side-panel">
                        <h4 className="panel-title">General Setting</h4>
                        <form method="post">
                            <div className="setting-row">
                                <span>use night mode</span>
                                <input type="checkbox" id="nightmode1" />
                                <label data-on-label="ON" data-off-label="OFF"></label>
                            </div>
                            <div className="setting-row">
                                <span>Notifications</span>
                                <input type="checkbox" id="switch22" />
                                <label data-on-label="ON" data-off-label="OFF"></label>
                            </div>
                            <div className="setting-row">
                                <span>Notification sound</span>
                                <input type="checkbox" id="switch33" />
                                <label data-on-label="ON" data-off-label="OFF"></label>
                            </div>
                            <div className="setting-row">
                                <span>My profile</span>
                                <input type="checkbox" id="switch44" />
                                <label data-on-label="ON" data-off-label="OFF"></label>
                            </div>
                            <div className="setting-row">
                                <span>Show profile</span>
                                <input type="checkbox" id="switch55" />
                                <label data-on-label="ON" data-off-label="OFF"></label>
                            </div>
                        </form>


                    </div>
                </div>


            </div>
        )
    }
}