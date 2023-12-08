import React, { Component } from 'react';
import $ from 'jquery';
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import InnerSidebar from '../directives/innerSidebar';
import Fixedsidebarright from '../directives/Fixedsidebarright'
import Messaging from '../components/messaging'


const TITLE = 'Victus-Token-Analytics-traffic'

export default class AnalyticsTraffic extends Component {


    // custom_file_upload_url = `${process.env.REACT_APP_URL}/api/users/group_create`;
    // custom_file_upload_url1 = `${process.env.REACT_APP_URL}/api/users/post_comment`;
    // // custom_file_upload_url2 = `${process.env.REACT_APP_URL}/api/users/post_comment_reply`;



    componentDidMount() {

        $('.sidebar').find('ul').find('li').removeClass('active');
        $('#li_analytics_traffic').addClass('active');

    }





    render() {




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
                                            <div className="col-lg-8 setStick">
                                                <div className="central-meta" style={{marginBottom:'30px'}}>
                                                    <div className="frnds wallet traffic">
                                                        <div className=" mt-3 tab-card">
                                                            <div className=" tab-card-header">
                                                                <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                                                    <li className="nav-item">
                                                                        <a className="nav-link active" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">
                                                                            Pageviews<br />2<br />
                                                                            <div className="goodChange ">
                                                                                <i className="fa fa-long-arrow-up"></i><span>100%</span>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                    <li className="nav-item">
                                                                        <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">
                                                                            Impressions<br />2<br />
                                                                            <div className="goodChange ">
                                                                                <i className="fa fa-long-arrow-up"></i><span>100%</span>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="tab-content" id="myTabContent">
                                                                <div className="tab-pane fade show active " id="one" role="tabpanel" aria-labelledby="one-tab">
                                                                    <div className="row">
                                                                        <div className="col-sm-12">

                                                                            <div id="" style={{ height: '300px', width: '100%' }}></div>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="tab-pane fade " id="two" role="tabpanel" aria-labelledby="two-tab">
                                                                    <div className="row">
                                                                        <div className="col-sm-12">

                                                                            <div id="" style={{ height: '300px', width: '100%' }}></div>

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
                    </section>

                </div>
                <Messaging/>
            </>
        )
    }
}

