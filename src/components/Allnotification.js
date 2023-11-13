import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import InnerSidebar from '../directives/innerSidebar';
import Fixedsidebarright from '../directives/Fixedsidebarright'
import Messaging from '../components/messaging'
import axios from 'axios';
import Cookies from 'js-cookie';

const TITLE = 'Freedom-cells-All-Notifications'
const headers = {
    'Content-Type': 'text/plain'
};
export default class AllNotifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            NotifData: []
        }
    }

    componentDidMount() {
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data
        this.notificationList()
        
    }

    //==================================  Detail of Project List  ==============================

    notificationList() {
        
        axios.post(`https://freedomcells.net/freedomcell/api/users/notification_list`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            this.codeDataNotification = res.data.code
            if (this.codeDataNotification === true) {
                this.notifCount = res.data
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

    render() {
        const codeDataNotification1 = this.codeDataNotification
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
                                                            <li className="nav-item"><a className="active" href="#frends" data-toggle="tab">All Notifications</a> </li>
                                                        </ul>
                                                        <div className="tab-content">
                                                            <div className="tab-pane active fade show" id="frends" style={{ minHeight: '314px' }}>
                                                                <ul className="nearby-contct">
                                                                    {codeDataNotification1 ? '' : <div className="text-center">Nothing More To Load</div>}

                                                                    {this.state.NotifData.map(item => (
                                                                        <li>
                                                                            <div className="nearly-pepls">
                                                                                <figure>
                                                                                    <img src={item.profile_pic} alt="" />
                                                                                </figure>
                                                                                <div className="pepl-info">
                                                                                    <h4>{item.sender}</h4>
                                                                                    <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
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

