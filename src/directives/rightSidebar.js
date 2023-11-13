import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
const headers = {
    'Content-Type': 'text/plain'
 };
export default class RightSidebar extends Component {



    constructor(props) {
        super(props)
        this.state = {
            listFollowing: [],
            listFollower: []
        }
    }

    componentDidMount() {
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data
        this.followerAPI()
        this.followingAPI()
    }


    //==================================  Detail of Following List  ==============================


    followingAPI() {



        axios.post(`https://freedomcells.net/freedomcell/api/users/following_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            //on success
            this.codeDataFollowing = res.data.code
            if (this.codeDataFollowing === true) {
                this.setState({
                    listFollowing: res.data.recdata
                });
            }


        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }

    //==================================  Detail of Followers List  ==============================


    followerAPI() {



        axios.post(`https://freedomcells.net/freedomcell/api/users/follower_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            //on success
            this.codeDataFollower = res.data.code
            if (this.codeDataFollower === true) {
                this.setState({
                    listFollower: res.data.recdata
                });
            }


        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }


    render() {
        const codeDataFollower1 = this.codeDataFollower
        const codeDataFollowing1 = this.codeDataFollowing

        return (
            <div className="col-lg-3">

                <aside className="sidebar static">
                    <div className="m-sidebarWidget">
                        <h2 className="m-sidebarWidget__title">Followers</h2>
                        {/* <!----> */}
                        <div className="m-sidebarWidget__body">
                            {/* <!----><!----> */}
                            <ul className="m-suggestionsSidebar__list ">
                                {codeDataFollower1 ? '' : <div className="text-center">Nothing More To Load</div>}

                                {this.state.listFollower.map(item => (
                                    <li className="m-suggestionsSidebarList__item m-suggestionsSidebarList__item--user " key={item.id}>
                                        <a href="javascript:;" className="">
                                            {/* style="background-image: url(&quot;https://cdn.minds.com/icon/626772382194872329&quot;);" */}
                                            <div className="m-suggestionsSidebarListItem__avatar" >
                                                <img alt="No" className="img-responsive suggested_channele" src={item.profile_pic} />
                                            </div>
                                            <div className="m-suggestionsSidebarListItem__body">
                                                <div title="Award Winning Journalist and Technologist Making Documentaries, VR, Drones, Immersion Storytelling, and Live Video | Tim@Timcast.com">
                                                    <h4 >{item.full_name}</h4>
                                                    <span >
                                                        {item.duration}
                                                        {/* @Timcast  */}
                                                    </span>
                                                </div>
                                                <div className="m-layout__spacer"></div>
                                                {/* <i className="fa fa-close m-suggestionsSidebarListItem__passBtn"></i> */}
                                                {/* <minds-button-subscribe >
                                                <button className="m-btn m-btn--with-icon m-btn--subscribe ">
                                                    <i className="fa fa-user-plus"></i>
                                                    <span>
                                                        Subscribe
        </span>
                                                </button>
                                            </minds-button-subscribe> */}
                                            </div>
                                        </a>
                                        {/* <!----><!----><!----> */}
                                    </li>
                                ))}

                            </ul>
                            {/* <!----> */}
                            <div className="mdl-spinner mdl-js-spinner is-active is-upgraded " hidden="" data-upgraded=",MaterialSpinner">
                                <div className="mdl-spinner__layer mdl-spinner__layer-1">
                                    <div className="mdl-spinner__circle-clipper mdl-spinner__left">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                    <div className="mdl-spinner__gap-patch">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                    <div className="mdl-spinner__circle-clipper mdl-spinner__right">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                </div>
                                <div className="mdl-spinner__layer mdl-spinner__layer-2">
                                    <div className="mdl-spinner__circle-clipper mdl-spinner__left">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                    <div className="mdl-spinner__gap-patch">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                    <div className="mdl-spinner__circle-clipper mdl-spinner__right">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                </div>
                                <div className="mdl-spinner__layer mdl-spinner__layer-3">
                                    <div className="mdl-spinner__circle-clipper mdl-spinner__left">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                    <div className="mdl-spinner__gap-patch">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                    <div className="mdl-spinner__circle-clipper mdl-spinner__right">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                </div>
                                <div className="mdl-spinner__layer mdl-spinner__layer-4">
                                    <div className="mdl-spinner__circle-clipper mdl-spinner__left">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                    <div className="mdl-spinner__gap-patch">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                    <div className="mdl-spinner__circle-clipper mdl-spinner__right">
                                        <div className="mdl-spinner__circle"></div>
                                    </div>
                                </div>
                            </div>
                            {/* <!----> */}
                        </div>
                        {/* <a href="javascript:;" className="m-sidebarWidget__seeMore ">See more</a> */}
                    </div>
                </aside>
                <aside className="sidebar static">
                    {/* <!-- page like widget --> */}

                    <div className="widget friend-list stick-widget">
                        <h4 className="widget-title">Followings</h4>
                        {/* <div id="searchDir"></div> */}
                        <ul id="people-list" className="friendz-list">
                            {codeDataFollowing1 ? '' : <div className="text-center">Nothing More To Load</div>}

                            {this.state.listFollowing.map(item => (
                                <li key={item.id}>
                                    <figure>
                                        <img src={item.profile_pic} alt="" />
                                        {/* <span className="status f-online"></span> */}
                                    </figure>
                                    <div className="friendz-meta">
                                        <a href="javascript:;">{item.full_name}</a>
                                        <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="ddaab4b3a9b8afaeb2b1b9b8af9dbab0bcb4b1f3beb2b0">{item.duration}</a></i>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="chat-box">
                            <div className="chat-head">
                                <span className="status f-online"></span>
                                <h6>Bucky Barnes</h6>
                                <div className="more">
                                    <span><i className="ti-more-alt"></i></span>
                                    <span className="close-mesage"><i className="ti-close"></i></span>
                                </div>
                            </div>
                            <div className="chat-list">
                                <ul>
                                    <li className="me">
                                        <div className="chat-thumb"><img src="../../chatlist1.jpg" alt="" /></div>
                                        <div className="notification-event">
                                            <span className="chat-message-item">
                                                Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                    </span>
                                            <span className="notification-date"><time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                                        </div>
                                    </li>
                                    <li className="you">
                                        <div className="chat-thumb"><img src="../../chatlist2.jpg" alt="" /></div>
                                        <div className="notification-event">
                                            <span className="chat-message-item">
                                                Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                    </span>
                                            <span className="notification-date"><time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                                        </div>
                                    </li>
                                    <li className="me">
                                        <div className="chat-thumb"><img src="../../chatlist1.jpg" alt="" /></div>
                                        <div className="notification-event">
                                            <span className="chat-message-item">
                                                Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                                    </span>
                                            <span className="notification-date"><time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                                        </div>
                                    </li>
                                </ul>
                                <form className="text-box">
                                    <textarea placeholder="Post enter to post..."></textarea>
                                    <div className="add-smiles">
                                        <span title="add icon" className="em em-expressionless"></span>
                                    </div>
                                    <div className="smiles-bunch">
                                        <i className="em em---1"></i>
                                        <i className="em em-smiley"></i>
                                        <i className="em em-anguished"></i>
                                        <i className="em em-laughing"></i>
                                        <i className="em em-angry"></i>
                                        <i className="em em-astonished"></i>
                                        <i className="em em-blush"></i>
                                        <i className="em em-disappointed"></i>
                                        <i className="em em-worried"></i>
                                        <i className="em em-kissing_heart"></i>
                                        <i className="em em-rage"></i>
                                        <i className="em em-stuck_out_tongue"></i>
                                    </div>
                                    <button type="submit"></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>


        )
    }
}