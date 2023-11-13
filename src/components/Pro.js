import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import Cookies from 'js-cookie';
import axios from 'axios';
import Fixedsidebarright from '../directives/Fixedsidebarright'
import Messaging from '../components/messaging'
import Toggle from 'react-toggle'
import toastr from 'reactjs-toastr';

const headers = {
    'Content-Type': 'text/plain'
 };
const TITLE = 'Freedom-cells-Pro'

export default class Pro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cheeseIsReady: '',
            listPlan:[]
        }
        this.handleCheeseChange = this.handleCheeseChange.bind(this);
        this.planUpdate = this.planUpdate.bind(this)

    }


    componentDidMount() {
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data
        this.planPriceAPI()
        
    }

   

    handleCheeseChange(event) {
        this.setState({
            cheeseIsReady:event.target.checked
        })
        // this.state.cheeseIsReady =  event.target.checked
       
    }


    //=====================================   Show Display NAme    ====================================

    planPriceAPI() {

        axios.post(`https://freedomcells.net/freedomcell/api/users/plan_price`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            //on success
            this.codeDataPlanPrice = res.data.code
            if (this.codeDataPlanPrice === true) {
                this.setState({
                    listPlan: res.data.recdata[1]
                });               
            }

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }


    planUpdate(e){
        e.preventDefault()
        if(this.state.cheeseIsReady === '' || this.state.cheeseIsReady === false){
            // this.state({
            //     cheeseIsReady:'y'
            // })
            this.state.cheeseIsReady = 'y'
        }
        else if(this.state.cheeseIsReady === true){
            // this.state({
            //     cheeseIsReady:'m'
            // })
            this.state.cheeseIsReady = 'm'
        }
        axios.post('https://freedomcells.net/freedomcell/api/users/plan_update', { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'plan_id': this.state.listPlan.id,'duration':this.state.cheeseIsReady },{headers})
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
                                            <section>
                                                <div className="gap gray-bg">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="row merged20" id="page-contents">
                                                                    {/* <!-- sidebar --> */}
                                                                    <div className="col-lg-12">
                                                                        <div className="central-meta new-pst" style={{marginTop:'50px'}}>
                                                                            <m-marketing className="m-plus__marketing" pagetitle="Freedomcells+">
                                                                                <div className="m-marketing">
                                                                                    <div className="m-marketing__mainWrapper">
                                                                                        <div className="m-marketing__main m-marketing__section--style-2">
                                                                                            <div className="m-grid m-marketing__wrapper">
                                                                                                <div className="m-grid__column-7 m-grid__column-12--mobile m-marketing__body">
                                                                                                    <h1> Freedomcells Pro</h1>
                                                                                                    <h2>
                                                                                                        A new revenue model for creators
                                                                                                    </h2>
                                                                                                    <ul className="ul_plan_pro">
                                                                                                        <li>Get paid for your traffic and referrals</li>
                                                                                                        <li>Launch your own website</li>
                                                                                                        <li>Receive multi-currency tips and subscription payments from fans</li>
                                                                                                        <li>Supports video, images, blogs and more</li>
                                                                                                    </ul>
                                                                                                    {/* <p className="m-marketing__description"> Your monthly payments are shared directly with the creators who submit the most popular content. Unlock new features and help fund Freedomcells filmmakers, writers, artists, memers, podcasters, musicians, journalists and more. </p> */}
                                                                                                    <div className="m-plusMarketing__subscription">
                                                                                                        <m-plus--subscription>
                                                                                                            <div className="">
                                                                                                                {/* <div className="m-plusSubscriptionPlan__toggleContainer">
                                                                                                                    <div className="m-plusSubscriptionPlan__toggle"><span>Yearly</span><span><m-toggle leftvalue="yearly" rightvalue="monthly"><div className="m-toggle__track"></div><div className="m-toggle__switch m-toggle__switch--left"></div></m-toggle></span><span>Monthly</span></div>
                                                                                                                    <div className="m-plusSubscriptionPlan__toggle"><span>USD</span><span><m-toggle leftvalue="usd" rightvalue="tokens"><div className="m-toggle__track"></div><div className="m-toggle__switch m-toggle__switch--left"></div></m-toggle></span><span>Tokens</span></div>
                                                                                                                </div> */}
                                                                                                                {/* <label>
                                                                                                                    <span>Yearly</span>
                                                                                                                    <span>
                                                                                                                    <Toggle icons={false} defaultChecked={this.state.baconIsReady}
                                                                                                                        onChange={this.onChange} />
                                                                                                                   </span> <span>Monthly</span>
                                                                                                                </label> */}
                                                                                                                <label>
                                                                                                                <span>Yearly</span>
                                                                                                                <Toggle
                                                                                                                    id='cheese-status' icons={false}
                                                                                                                    defaultChecked={this.state.cheeseIsReady}
                                                                                                                    onChange={this.handleCheeseChange} />
                                                                                                                    <span>Monthly</span>
                                                                                                                {/* <label htmlFor='cheese-status'>Adjacent label tag</label> */}
                                                                                                                </label>

                                                                                                                <div className="m-plusSubscriptionPlan__pricing">

                                                                                                                {this.state.cheeseIsReady === '' || this.state.cheeseIsReady === false ? <span className="m-plusSubscriptionPlanPricing__amount">
                                                                                                                    
                                                                                                                    <span> {this.state.listPlan?.yearly_charges} </span>
                                                                                                                    Tokens per Year </span>:  <span className="m-plusSubscriptionPlanPricing__amount">
                                                                                                                    
                                                                                                                    <span> {this.state.listPlan?.monthly_charges} </span>
                                                                                                                    Tokens per Month </span>}

                                                                                                                    

                                                                                                                   
                                                                                                                    {/* <span className="m-plusSubscriptionPlanPricing__offer ">
                                                                                                                         <span>$ 7</span> per month </span> */}
                                                                                                                    {/* <!----> */}
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                    { this.state.cheeseIsReady === '' || this.state.cheeseIsReady === false ? <button disabled={parseInt(this.state.listPlan?.yearly_charges) > parseInt(this.state.listPlan?.token_balance)} onClick={this.planUpdate} className="mf-button mf-button--alt"> Upgrade to Freedomcells Pro</button>
                                                                                                                    :<button disabled={parseInt(this.state.listPlan?.monthly_charges) > parseInt(this.state.listPlan?.token_balance)} className="mf-button mf-button--alt" onClick={this.planUpdate}> Upgrade to Freedomcells Pro </button>}
                                                                                                                    
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            {/* <!----> */}
                                                                                                            {/* <!----> */}
                                                                                                            {/* <!----> */}
                                                                                                            {/* <!----> */}
                                                                                                            {/* <!----> */}
                                                                                                        </m-plus--subscription>
                                                                                                    </div>
                                                                                                    {/* <!----> */}
                                                                                                </div>
                                                                                                <div className="m-grid__column-5 m-grid__column-12--mobile m-marketing__image"><span><img src="pro-1.jpg" /></span></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </m-marketing>
                                                                        </div>
                                                                        {/* <!-- add post new box --> */}
                                                                    </div>
                                                                    {/* <!-- centerl meta --> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            {/* <!-- sidebar --> */}
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

