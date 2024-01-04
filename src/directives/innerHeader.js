import React, { Component, useState } from 'react';
import Cookies from 'js-cookie';
import { Link,useLocation,withRouter } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import toastr from 'reactjs-toastr';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import InnerSidebar1 from './innerSidebar1';
import { useEffect } from 'react';
import { MdGroups } from "react-icons/md";
import { SiCoinmarketcap } from "react-icons/si";
import { SiCrowdsource } from "react-icons/si";
import { GiVote } from "react-icons/gi";
import { BsCameraReelsFill } from "react-icons/bs";
import { BiSolidHome } from "react-icons/bi";

import inner from './inner.css'


const headers = {
    'Content-Type': 'text/plain'
 };
 class InnerHeader extends Component {

    

    constructor(props) {
        super(props)
        console.log(this.props.location)
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
            NotifData: [],
            open:this.props.open
        }
    }
    

    main_search_val(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        axios.post(`${process.env.REACT_APP_URL}/api/users/all_search`, { 'user_id': this.loginData.id, 'search': this.state.main_search_val, 'api_key': this.loginData.api_key },{headers}).then((res) => {
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
        axios.post(`${process.env.REACT_APP_URL}/api/users/all_search`, { 'user_id': this.loginData.id, 'search': this.state.main_search_val, 'api_key': this.loginData.api_key },{headers}).then((res) => {
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
        axios.post(`${process.env.REACT_APP_URL}/api/users/avatar_banner`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
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
        axios.post(`${process.env.REACT_APP_URL}/api/users/notification_list`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'limit': 10 },{headers}).then((res) => {
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
        axios.post(`${process.env.REACT_APP_URL}/api/users/notification_read`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'notification_id': "0" },{headers}).then((res) => {
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
        axios.post(`${process.env.REACT_APP_URL}/api/users/notification_read`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'notification_id': "0" },{headers}).then((res) => {
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
        axios.post(`${process.env.REACT_APP_URL}/api/users/notification_read`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'notification_id': id.notification_id },{headers}).then((res) => {
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

    handleOpen = ()=>{
        this.setState({open:!this.state.open})
    }

  
    
    
    render() {
      

        return (
            <div className="topbar stick stickClass">

                <div className='middlebar'>

               
                <span className="logo text-right innerLogo">
                    <Link title="" to="/" onClick={this.loginPage}><img className='logosize' src="https://nftstars.shop/images/Logo3_new.png" alt="" /></Link>

                </span>
                <Notifications />


                    {this.state.open &&  <div  style={{position:"absolute",right:"0px",top:"0px",bottom:"0px",padding:"20px",backgroundColor:"#fff",maxHeight:"100vh",zIndex:"1999",width:"100vw",overflow:"scroll",minHeight:"100vh", }}>
                        <div className='d-flex justify-content-end pr-2 ' >
                        <span aria-hidden="true" style={{fontSize:"24px",textAlign:"end"}} onClick={this.handleOpen}>&times;</span>
                        </div>
                   
                      

                        <div className='mt-2'>
                            <InnerSidebar1/>
                        </div>
                   
                    </div>}

                    <span className="crowd_fund" >

                        <Link to='/dashboard' className={this.props.location?.pathname === "/dashboard" ? 'inner active' : 'inner navlink'}>
                        <div className='tool'>
                        <BiSolidHome className='icon' style={{fontSize:'35px',cursor:'pointer'}}
                         />
                      
                        <div className='tip' style={{padding:'5px 10px'}}
                         >
                            Home
                        </div>
                 
                        </div>
                        </Link>
                        <Link to="/MyVotes" className={this.props.location?.pathname === "/MyVotes" ? 'inner active' : 'inner navlink'}>
                            <div className='tool'>
                           <GiVote style={{fontSize:'35px',cursor:'pointer'}}/>
                           <div className='tip' style={{padding:'5px 10px'}}
                         >
                            Vote
                        </div>
                            </div>
                        </Link>
                        <Link to="/allprojects" className={this.props.location?.pathname === "/allprojects" ? 'inner active' : 'inner navlink'}>
                            <div className='tool'>
                            <SiCrowdsource style={{fontSize:'35px',cursor:'pointer'}}/>
                            <div className='tip' style={{padding:'5px 10px'}}
                         >
                            Crowd
                        </div>
                            </div>
                        </Link>
                        <div className='tool'>
                          <SiCoinmarketcap style={{fontSize:'35px',cursor:'pointer'}}/>
                          <div className='tip' style={{padding:'5px 10px'}}
                         >
                            Market
                        </div>
                        </div>
                        <Link to="/discoverygroups" className={this.props.location?.pathname === "/discoverygroups" ? 'inner active' : 'inner navlink'}>
                            <div className='tool'>
                            <MdGroups style={{fontSize:'35px',cursor:'pointer'}}/>
                            <div className='tip' style={{padding:'5px 10px'}}
                         >
                            Groups
                        </div>
                            </div>
                        </Link>
                        {/* <Link to="/BuyEth">

<button className="add-butn menu-button" style={{ color: '#fff', borderRadius: '5px' }} >BuyETH</button>
</Link> */}
                    </span>


<div className="top-area">




                    <ul className="setting-area"  style={{display:"flex",listStyle:"none",alignItems:"center"}}>
                        {/* <li id="notification_bell" onClick={this.abc}>kkk</li> */}

                        <li >
                            <a href="javascript:;" title="Home" data-ripple="" style={{background:'#D8DADF',borderRadius:'50%',height:'40px',width:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <i  className="fa fa-search text-black" aria-hidden="true" style={{fontSize:'20px'}}></i>
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
                            <a href="javascript:;" title="Notification" onClick={this.notificationReadBell} data-ripple="" className="head-menu menu-a" style={{background:'#D8DADF',borderRadius:'50%',height:'40px',width:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <i className="fa fa-bell-o text-black  " aria-hidden="true" style={{fontSize:'20px'}}></i><span className="badge" >{this.notifCount?.unread_count}</span>
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
                      
                        <li><a href="javascript:;" title="Languages" data-ripple="" className="head-menu3 menu-a" style={{background:'#D8DADF',borderRadius:'50%',height:'40px',width:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}><i className="fa fa-globe text-black " style={{fontSize:'20px'}}></i></a>
                            <div className="dropdowns ps-container ps-theme-default ps-active-y languages">
                                <a href="javascript:;" title=""><i className="ti-check text-black " ></i>English</a>
                                <a href="javascript:;" title="">Czech</a>
                                <a href="javascript:;" title="">Hindi</a>
                            </div>
                        </li>
                        <div  className="user-img" >
                        <img src={this.state?.bannerImage?.avatar} alt="" />
                        <span className="status f-online"></span>
                        <div className="user-setting" style={{ marginRight: '30px' }}>
                            
                            <span  style={{ marginLeft: '15px' }}>{this.state?.bannerImage?.full_name}</span>
                            <Link to={`/timeLine/${this.loginData?.id}`} onClick={this.loading.bind(this, this.loginData?.id)} title=""><i className="fa fa-user-o text-black " aria-hidden="true"></i>
                                view profile</Link>
                           
                            <Link to={`/setting`} onClick={this.loadingSetting.bind(this, this.loginData?.id)} title=""><i className="ti-settings"></i>account setting</Link>
                            <Link to="/" onClick={this.Logout} title=""><i className="ti-power-off"></i>log out</Link>
                        </div>
                    </div>
                    
                  
                    </ul>
                   

                   
                </div>

                </div>

                <div className='appbar' >
                <div aria-hidden='true' style={{display:"flex",justifyContent:'space-between',width:'100%'}}>
                      <Link to="/dashboard" className={this.props.location?.pathname === "/dashboard" ? 'inner active' : 'inner navlink'}>
                       <BiSolidHome onClick={this.handleOpen} style={{fontSize:'30px'}}/>
                      </Link>
                        <Link to="/MyVotes" className={this.props.location?.pathname === "/MyVotes" ? 'inner active' : 'inner navlink'}>
                        <GiVote onClick={this.handleOpen} style={{fontSize:'30px'}}/>
                        </Link>
                        <Link to="/allprojects" className={this.props.location?.pathname === "/allProjects" ? 'inner active' : 'inner navlink'}>
                            <SiCrowdsource onClick={this.handleOpen} style={{fontSize:'30px'}}/>
                        </Link >
                        <Link to='/market' className={this.props.location?.pathname === "/market" ? 'inner active' : 'inner navlink'}>
                        <SiCoinmarketcap onClick={this.handleOpen} style={{fontSize:'30px'}}/>
                        </Link>
                        <Link to="/discoverygroups" className={this.props.location?.pathname === "/discoverygroups" ? 'inner active' : 'inner navlink'}>
                            <MdGroups onClick={this.handleOpen} style={{fontSize:'30px'}}/>
                        </Link>
                        </div>
                <div className='sidebar-list' style={{color:"#9A9A9A",zIndex:"999"}}>
                   <i  className="fa fa-list" aria-hidden="true" style={{fontSize:"20px"}} onClick={this.handleOpen}></i>
                    </div> 

                </div>

            </div>
        )
    }
}

export default withRouter(InnerHeader);