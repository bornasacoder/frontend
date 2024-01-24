import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery'
const headers = {
    'Content-Type': 'text/plain'
};
export default class InnerSidebar extends Component {

    constructor(props) {
        super(props)
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data
        this.state = {
            listGroup: [],
            openSideBar:false
        }
    }

    componentDidMount() {
        this.groupAPI()
        this.showDisplayNameAPI()
        this.BannerImageAPI()
        setInterval(() => {
            this.BannerImageAPI()
        }, 10000);
        var urlGroup = window.location.hash.split('groupdetail/')[1]
        this.setState({
            urlGroup: urlGroup
        })
        $(".sidebar-dropdown > a").click(function () {
            $(".sidebar-submenu").slideUp(250);
            if (
                $(this)
                    .parent()
                    .hasClass("active")
            ) {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .parent()
                    .removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .next(".sidebar-submenu")
                    .slideDown(250);
                $(this)
                    .parent()
                    .addClass("active");
            }
        });

        $("#toggle-sidebar").click(function () {
            $(".page-wrapper").toggleClass("toggled");
        });
    }

    //==================================  Detail of Group List  ==============================

    groupAPI() {
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        axios.post(`${process.env.REACT_APP_URL}/api/users/group_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            this.codeDataGroup = res.data.code
            if (this.codeDataGroup === true) {
                this.setState({
                    listGroup: res.data.recdata
                });
            }
            $('#main_loader').hide();
            $('#root').css('opacity', '1.0');
        }).catch((error) => {
        });
    }

    loading(id) {
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        setTimeout(() => {
            window.location.hash = '/timeLine/' + id;
            window.location.reload()
            $('#main_loader').hide();
            $('#root').css('opacity', '1.0');
        }, 200);
    }

    groupDetail(id) {
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        setTimeout(() => {
            window.location.hash = '/timeLine/' + id;
            $('#main_loader').hide();
            $('#root').css('opacity', '1.0');
        }, 200);
    }

    //=====================================   Show Display NAme    ====================================

    showDisplayNameAPI() {
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        axios.post(`${process.env.REACT_APP_URL}/api/users/show_display_name`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            this.codeDataDisplayName = res.data.code
            if (this.codeDataDisplayName === true) {
                this.setState({
                    list: res.data
                });
            }
            $('#main_loader').hide();
            $('#root').css('opacity', '1.0');
        }).catch((error) => {
        });
    }

    //==================================  Detail of Avatar Banner  ==============================


    BannerImageAPI() {
 
        axios.post(`${process.env.REACT_APP_URL}/api/users/avatar_banner`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataAvatarBanner = res.data.code
            if (this.codeDataAvatarBanner === true) {
                this.setState({
                    bannerImage: res.data.recdata
                });
                
            }


        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }

    render() {
        return (
            <div className="col-lg-3 col-md-0  ">
                <aside className="sidebar fixed main-sidebar" style={{top:"115px"}}>
                    <div className="widget" style={{ height: '100vh', overflowY: 'auto', width: '350px', marginLeft: '-10px' }}>
                        <br />
                        <ul className="naves">
                            <li id="li_self">
                                <img style={{width:"35px", height:"35px"}} src={this.state.bannerImage?.avatar}/>
                                {/* <i className="ti-user"></i> */}
                                <Link to={`/timeLine/${this.loginData?.id}`} style={{marginLeft: '7px', top:"0px",zIndex:999999}} onClick={this.loading.bind(this, this.loginData?.id)}>{this.state.list?.display_name} </Link>
                            </li>
                            <li id="li_dashboard">
                                <i className="fa fa-home" aria-hidden="true"></i>
                                <Link to="/dashboard" > Home </Link>
                            </li>
                            <li id="li_wallet">
                                <i className="ti-wallet"></i>
                                <Link to="/wallet" title="" > Wallet </Link>
                            </li>
                            <li className="sidebar-dropdown">
                                <a href="javascript:;" className="group_arrow" style={{ marginLeft: '23px' }}> <img style={{ color: '#999', marginLeft: '-28px' }} src="https://victus.club/Projects_icon_small.png" /><span>Projects</span></a>
                                <div className="sidebar-submenu" style={{ display: 'none' }}>
                                    <ul>
                                        <li id="li_projects">
                                            <Link to="/createproject" title="" >  Create New Project </Link>
                                        </li>
                                        <li id="li_my_projects"><Link to="/MyProject" ><span>My Projects</span> </Link></li>
                                        <li id="li_discovery_projects"><Link to="/DiscoveryProject" ><span>Discover Projects</span> </Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="sidebar-dropdown">
                                <a href="javascript:;" className="group_arrow" style={{ marginLeft: '23px' }}>  <i className="fa fa-users" style={{ color: '#999', marginLeft: '-42px' }} aria-hidden="true"></i><span>Groups</span></a>
                                <div className="sidebar-submenu" style={{ display: 'none' }}>
                                    <ul>
                                        <li id="li_creategroup"><Link to="/creategroup" >
                                            <span>Create Group</span> </Link></li>
                                        <li id="li_my_groups"><Link to="/MyGroup" ><span>My Groups</span> </Link></li>
                                        <li id="li_discovery_groups"><Link to="/discoverygroups" ><span>Discover Group</span> </Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li id="li_analytics_traffic">
                                <i className="fa fa-bar-chart-o"></i>
                                <Link to="/analyticstraffic" title=""> Analytics </Link>
                            </li>
                            <li id="li_settings">
                                <i className="fa fa-gear"></i>
                                <Link to="/setting" title=""> Settings  </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        )
    }
}