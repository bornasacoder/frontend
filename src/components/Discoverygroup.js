import React, { Component } from 'react';
import $ from 'jquery';
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import InnerSidebar from '../directives/innerSidebar';
import Fixedsidebarright from '../directives/Fixedsidebarright'
import Messaging from '../components/messaging'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const TITLE = 'Victus-Token-Discovery-Groups'
const headers = {
    'Content-Type': 'text/plain'
};
export default class DiscoveryGroups extends Component {


    // custom_file_upload_url = `${process.env.REACT_APP_URL}/api/users/group_create`;
    // custom_file_upload_url1 = `${process.env.REACT_APP_URL}/api/users/post_comment`;
    // // custom_file_upload_url2 = `${process.env.REACT_APP_URL}/api/users/post_comment_reply`;

    constructor(props) {
        super(props);
        this.state = {

            listGroup: [],
            listProject: []
        }
    }

    componentDidMount() {
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data
        $('.sidebar').find('ul').find('li').removeClass('active');
        $('#li_discovery_groups').addClass('active');
        $('#li_discovery_groups').closest('.sidebar-submenu').show();
        $('#li_discovery_groups').closest('.sidebar-submenu').closest('.sidebar-dropdown').addClass('active');
        this.groupAPI()
        this.projectAPI()
    }


    //==================================  Detail of Group List  ==============================


    groupAPI() {
  
        axios.post(`${process.env.REACT_APP_URL}/api/users/all_group_list`, { 'user_id': this.loginData.id,  'api_key': this.loginData.api_key },{headers}).then((res) => {
            //on success
            this.codeDataGroup = res.data.code
            if (this.codeDataGroup === true) {
                this.setState({
                    listGroup: res.data.recdata
                });
            }
            else if (this.codeDataGroup === false) {
                this.setState({
                    listGroup: []
                })
            }
        }).catch((error) => {
        });

    }


    //==================================  Detail of Project List  ==============================


    projectAPI() {
       
        axios.post(`${process.env.REACT_APP_URL}/api/users/project_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            //on success
            this.codeDataProject = res.data.code
            if (this.codeDataProject === true) {
                this.setState({
                    listProject: res.data.recdata
                });
            }
            else if (this.codeDataProject === false) {
                this.setState({
                    listProject: []
                })
            }
        }).catch((error) => {
        });

    }


    groupDetail(id) {

        setTimeout(() => {

            window.location.hash = '/groupDetail/' + id;
            window.location.reload(true)
        }, 200);
    }


    //==========================================  Delete Group  ================================

    groupDelete = (id) => {
        
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        axios.post(`${process.env.REACT_APP_URL}/api/users/group_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_id': id },{headers}).then((res) => {
                            $('#main_loader').show();
                            $('#root').css('opacity', '0.5');

                            setTimeout(() => {
                                $('#main_loader').hide();
                                $('#root').css('opacity', '1');
                            }, 1000);
                            this.componentDidMount()
                            // window.location.href = '/dashboard'

                        }).catch((error) => {
                        })
                },
                {
                    label: 'No',
                }
            ]
        });
    }




    render() {

        const codeDataGroup1 = this.codeDataGroup
        // const codeDataProject1 = this.codeDataProject

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
                                            <div className="col-lg-9 setStick">
                                                <div className="central-meta">
                                                    <div className="frnds">
                                                        <ul className="nav nav-tabs">
                                                            {/* <li className="nav-item"><a className="active" href="#frends" data-toggle="tab">Project</a> </li> */}
                                                            <li className="nav-item"><a className="" href="#frends-req" data-toggle="tab">All Group</a></li>
                                                        </ul>

                                                        <div className="tab-content">
                                                            {/* <div className="tab-pane active fade show" id="frends" style={{ minHeight: '314px' }}>
                                                                <ul className="nearby-contct">
                                                                    {codeDataProject1 ? '' : <div className="text-center">Nothing More To Load</div>}

                                                                    {this.state.listProject.map(item => (
                                                                        <li>
                                                                            <div className="nearly-pepls">
                                                                                <figure>
                                                                                    <Link to={`/groupdetail/${item.id}`}
                                                                                        onClick={this.groupDetail.bind(this, item.id)} title="">
                                                                                        <img className="discover_image" src={item.vatar} alt="" /></Link>
                                                                                </figure>
                                                                                <div className="pepl-info">
                                                                                    <h4><Link to={`/groupdetail/${item.id}`} onClick={this.groupDetail.bind(this, item.id)}
                                                                                        title="">{item.group_name}</Link></h4>
                                                                                    <span>{item.type}</span>
                                                                                    <a href="#/" onClick={this.groupDelete.bind(this, item.id)} alt="Nothing Found" title="" className="add-butn" data-ripple="">Delete Project<span className="ripple"><span className="ink" style={{ height: '83px', width: '83px', backgroundColor: 'rgb(10, 169, 246)', top: '-28.4063px', left: '39.9219px' }}></span></span></a>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                             */}
                                                            <div className="tab-pane active fade show" id="frends-req" style={{ minHeight: '314px' }}>
                                                                <ul className="nearby-contct">
                                                                    {codeDataGroup1 ? '' : <div className="text-center">Nothing More To Load</div>}

                                                                    {this.state.listGroup.map(item => (
                                                                        <li>
                                                                            <div className="nearly-pepls">
                                                                                <figure>
                                                                                    <Link to={`/groupdetail/${item.id}`}
                                                                                        onClick={this.groupDetail.bind(this, item.id)} title="">
                                                                                        <img className="discover_image" src={item.avatar} alt="" /></Link>
                                                                                </figure>
                                                                                <div className="pepl-info">
                                                                                    <h4><Link to={`/groupdetail/${item.id}`} onClick={this.groupDetail.bind(this, item.id)}
                                                                                        title="">{item.group_name}</Link></h4>
                                                                                    <span>{item.type}</span>
                                                                                    {/* <a href="#/" alt="Nothing Found" title="" className="add-butn more-action" data-ripple="">unfriend<span className="ripple"><span className="ink" style={{ height: '70px', width: '70px', backgroundColor: 'rgb(143, 163, 184)', top: '-33.9063px', left: '4.96875px' }}></span></span></a> */}
                                                                                    {/* <a href="#/" onClick={this.groupDelete.bind(this, item.id)} alt="Nothing Found" title="" className="add-butn" data-ripple="">Delete Group<span className="ripple"><span className="ink" style={{ height: '83px', width: '83px', backgroundColor: 'rgb(10, 169, 246)', top: '-28.4063px', left: '39.9219px' }}></span></span></a> */}
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>

                                                                {/* <ul className="nearby-contct">
                                                                    <li>
                                                                        <div className="nearly-pepls">
                                                                            <figure>
                                                                                <a href="#/" title=""><img src="./nearly5.jpg" alt="" /></a>
                                                                            </figure>
                                                                            <div className="pepl-info">
                                                                                <h4><a href="#/" title="">Amy watson</a></h4>
                                                                                <span>ftv model</span>
                                                                                <a href="#/" title="" className="add-butn more-action" data-ripple="">delete Request</a>
                                                                                <a href="#/" title="" className="add-butn" data-ripple="">Confirm</a>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li>
                                                                        <div className="nearly-pepls">
                                                                            <figure>
                                                                                <a href="#/" title=""><img src="./nearly1.jpg" alt="" /></a>
                                                                            </figure>
                                                                            <div className="pepl-info">
                                                                                <h4><a href="#/" title="">sophia Gate</a></h4>
                                                                                <span>ftv model</span>
                                                                                <a href="#/" title="" className="add-butn more-action" data-ripple="">delete Request</a>
                                                                                <a href="#/" title="" className="add-butn" data-ripple="">Confirm</a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="nearly-pepls">
                                                                            <figure>
                                                                                <a href="#/" title=""><img src="./nearly6.jpg" alt="" /></a>
                                                                            </figure>
                                                                            <div className="pepl-info">
                                                                                <h4><a href="#/" title="">caty lasbo</a></h4>
                                                                                <span>ftv model</span>
                                                                                <a href="#/" title="" className="add-butn more-action" data-ripple="">delete Request</a>
                                                                                <a href="#/" title="" className="add-butn" data-ripple="">Confirm</a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="nearly-pepls">
                                                                            <figure>
                                                                                <a href="#/" title=""><img src="./friend-avatar9.jpg" alt="" /></a>
                                                                            </figure>
                                                                            <div className="pepl-info">
                                                                                <h4><a href="#/" title="">jhon kates</a></h4>
                                                                                <span>ftv model</span>
                                                                                <a href="#/" title="" className="add-butn more-action" data-ripple="">delete Request</a>
                                                                                <a href="#/" title="" className="add-butn" data-ripple="">Confirm</a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="nearly-pepls">
                                                                            <figure>
                                                                                <a href="#/" title=""><img src="./nearly2.jpg" alt="" /></a>
                                                                            </figure>
                                                                            <div className="pepl-info">
                                                                                <h4><a href="#/" title="">sara grey</a></h4>
                                                                                <span>ftv model</span>
                                                                                <a href="#/" title="" className="add-butn more-action" data-ripple="">delete Request</a>
                                                                                <a href="#/" title="" className="add-butn" data-ripple="">Confirm</a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="nearly-pepls">
                                                                            <figure>
                                                                                <a href="#/" title=""><img src="./nearly4.jpg" alt="" /></a>
                                                                            </figure>
                                                                            <div className="pepl-info">
                                                                                <h4><a href="#/" title="">Sara grey</a></h4>
                                                                                <span>ftv model</span>
                                                                                <a href="#/" title="" className="add-butn more-action" data-ripple="">delete Request</a>
                                                                                <a href="#/" title="" className="add-butn" data-ripple="">Confirm</a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="nearly-pepls">
                                                                            <figure>
                                                                                <a href="#/" title=""><img src="./nearly3.jpg" alt="" /></a>
                                                                            </figure>
                                                                            <div className="pepl-info">
                                                                                <h4><a href="#/" title="">Sexy cat</a></h4>
                                                                                <span>ftv model</span>
                                                                                <a href="#/" title="" className="add-butn more-action" data-ripple="">delete Request</a>
                                                                                <a href="#/" title="" className="add-butn" data-ripple="">Confirm</a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="nearly-pepls">
                                                                            <figure>
                                                                                <a href="#/" title=""><img src="./friend-avatar9.jpg" alt="" /></a>
                                                                            </figure>
                                                                            <div className="pepl-info">
                                                                                <h4><a href="#/" title="">jhon kates</a></h4>
                                                                                <span>ftv model</span>
                                                                                <a href="#/" title="" className="add-butn more-action" data-ripple="">delete Request</a>
                                                                                <a href="#/" title="" className="add-butn" data-ripple="">Confirm</a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                                <button className="btn-view btn-load-more"></button> */}
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
                    </section>

                </div>
                <Messaging />
            </>
        )
    }
}

