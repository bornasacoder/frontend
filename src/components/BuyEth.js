import React, { Component } from 'react';
import $ from 'jquery';
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import InnerSidebar from '../directives/innerSidebar';
import Fixedsidebarright from '../directives/Fixedsidebarright'
import Messaging from '../components/messaging'


const TITLE = 'Freedom-cells-BuyETH'

export default class BuyEther extends Component {

    componentDidMount() {

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
                                                <div className="central-meta" style={{ marginBottom: '30px' }}>
                                                <h3 className="text-center">Buy ETH</h3>
                                                    <div className="frnds wallet traffic" style={{marginTop:'-45px'}}>
                                                        <div className=" mt-3 tab-card">
                                                            <div className=" tab-card-header">
                                                                <video width="320" height="240" controls>
                                                                    <source src="https://res.cloudinary.com/dgmepvauo/video/upload/v1605175906/jobs/testvideo_jl6byp.mp4" type="video/mp4" />
                                                                    <source src="https://res.cloudinary.com/dgmepvauo/video/upload/v1605175906/jobs/testvideo_jl6byp.mp4" type="video/ogg" />
                                                                    Your browser does not support the video tag.
                                                        </video>

                                                                <video width="320" height="240" controls style={{ marginLeft: '50px' }}>
                                                                    <source src="https://res.cloudinary.com/dgmepvauo/video/upload/v1605175906/jobs/testvideo_jl6byp.mp4" type="video/mp4" />
                                                                    <source src="https://res.cloudinary.com/dgmepvauo/video/upload/v1605175906/jobs/testvideo_jl6byp.mp4" type="video/ogg" />
                                                                    Your browser does not support the video tag.
                                                        </video>


                                                                <video width="320" height="240" controls>
                                                                    <source src="https://res.cloudinary.com/dgmepvauo/video/upload/v1605175906/jobs/testvideo_jl6byp.mp4" type="video/mp4" />
                                                                    <source src="https://res.cloudinary.com/dgmepvauo/video/upload/v1605175906/jobs/testvideo_jl6byp.mp4" type="video/ogg" />
                                                                    Your browser does not support the video tag.
                                                        </video>


                                                                <video width="320" height="240" controls style={{ marginLeft: '50px' }}>
                                                                    <source src="https://res.cloudinary.com/dgmepvauo/video/upload/v1605175906/jobs/testvideo_jl6byp.mp4" type="video/mp4" />
                                                                    <source src="https://res.cloudinary.com/dgmepvauo/video/upload/v1605175906/jobs/testvideo_jl6byp.mp4" type="video/ogg" />
                                                                    Your browser does not support the video tag.
                                                        </video>
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

