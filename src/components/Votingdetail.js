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
const TITLE = 'Victus-Token-My-votes'
const headers = {
  'Content-Type': 'text/plain'
};
export default class votingDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        votingDetailData:[],
        votingDet:''
      }
      let data = Cookies.getJSON('name');        
      this.loginData = data.user_data
      const { match: { params } } = this.props;
      this.voting_id = params.voting_id
      this.votingDetail()
    }

    componentDidMount() {
      
    }

      //=================================================  voting detail   ==================================
      votingDetail() {
        axios.post(`${process.env.REACT_APP_URL}/api/users/voting_detail`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'voting_title_id': this.voting_id }, { headers })
            .then(response => {

                if (response.data.code === true) {
                  this.setState({
                    votingDet:response.data,
                    votingDetailData:response.data.recdata
                  })  
                  
                }
                else if (response.data.code === false) {

                }

            })

            .catch(err => {
               
            })

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
                                            <div className="col-lg-9 setStick">
                                                <div className="row merged20">
                                                <div class="col-lg-4 pl-3">

<aside class="sidebar static right">

  


  <div class="widget stick-widget">

    <ul class="list-block pt-4">
      <li><div class="pull-left">{this.state.votingDet.title}<br/>
        </div><div class="pull-right">Executed</div>
      </li>
      <hr/>
      <li>
        <div class="pull-left">Active Voting 
          
        </div>
        <div class="pull-right">{this.state.votingDet.vote_count}
      </div>
      </li>
     
      <li><div class="pull-left">Expired Polls</div><div class="pull-right">00</div></li>
      <li><div class="pull-left">Executed</div><div class="pull-right">{this.state.votingDet.vote_count}</div></li>
      <li><div class="pull-left">Expired Votes</div><div class="pull-right">00</div></li>
      
      
    </ul>
   

  </div>

</aside>

</div>
{/* <!-- sidebar --> */}

<div className="col-lg-8">
 {this.state.votingDetailData.map(item => (
  <div className="central-meta new-pst text-left">
  <div className="row">
    <div className="col-sm-6">
 <h5>{item.options}</h5>
      <button className="btn btn-sm btn-primary">Executed</button>
    </div>
    <div className="col-sm-6">
          <span>Threshold</span>
          <div className="progress" style={{height:"10px"}}>
            <div className="progress-bar" style={{ width: item.percent + '%', height: "10px" }}></div>
          </div>
    </div>
    
  </div>

</div>
 ))}

{/* <!-- add post new box --> */}

</div>

</div>
{/* <!-- centerl meta --> */}


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

