import React, { Component } from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import InnerSidebar from '../directives/innerSidebar';
import Fixedsidebarright from '../directives/Fixedsidebarright'
import Messaging from '../components/messaging'
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
const headers = {
    'Content-Type': 'text/plain'
 };

const TITLE = 'Freedom-cells-Add-vote'
const initialState = {
    title: '',
    options: '',
    closing_date: '',
}
export default class voteAdd extends Component {

    constructor(props) {
        super(props);
        this.state = initialState
        this.state = {
            option_value_updated: [{ options: '' }],
            showdata: this.displayData,
            dataPush: ''
        }
        this.displayData = [];


        this.onChange = this.onChange.bind(this);
        this.handleSubmitFile = this.handleSubmitFile.bind(this);
        this.addVote = this.addVote.bind(this)

    }


    componentDidMount() {
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data
    }


    addVote() {
        if (this.displayData.length > 3) {
            toastr.error('Maximum 5 options Allowed', { displayDuration: 3000 })
        }
        else {
            var i = parseInt(this.displayData.length)+parseInt(2);
            this.displayData.push(
                <>
                    <div className="m-form__row--label"><label>Option {i}</label></div>
                    <div className="m-form__row--input">
                        <input type="text"
                            name="options_new[]" style={{ fontSize: '18px', width: "86%" }} className="form-control " />
                        {/* <span className="option_value">
                            <i className="fa fa-minus" onClick={this.removeVote.bind(this)}></i>
                        </span> */}
                    </div>
                </>
            )

            this.setState({
                showdata: this.displayData,
            });
        }


    }



    removeVote(index) {
        this.state.showdata.splice(index, 1);
        this.setState({
            showdata: this.state.showdata
        });

    }


    onChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }





    // ========================= Add Post   ==============================
    handleSubmitFile = (e) => {
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        e.preventDefault()

        var mainArr = [];

        var test_data = [this.state.options]
        var options_new = $('input[name="options_new[]"]').map(function () { return $(this).val(); }).get();;
        $.each(options_new, function (i) {
            var id = i + 1;
            mainArr['options' + id] = options_new[i];
            test_data.push(mainArr['options' + id])
        });
        axios.post(`${process.env.REACT_APP_URL}/api/users/create_voting`, {
            'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'title': this.state.title, 'closing_date': this.state.closing_date,
            'options': test_data
        },{headers})


            .then(res => {
                if (res.data.code === true) {
                    $('#main_loader').hide();
                    $('#root').css('opacity', '1');
                    window.location.hash = `/MyVotes`
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
                    {/* <div className="postoverlay"></div> */}

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
                                                <div className="central-meta new-pst">
                                                    <div className="new-postbox">
                                                        <div className="m-modalV2__inner m-groups__create">
                                                            <div className="m-modalV2__header m-groupsCreate__header">
                                                                <h2 className="m-modalV2Header__title"> Create Vote </h2>
                                                            </div>
                                                            <div className="m-modalV2__body m-formWrapper">
                                                                <form onSubmit={this.handleSubmitFile} className="m-groupsCreate__form m-formWrapper m-formLayout--buttonRight ">
                                                                    <div className="m-form__fieldsContainer">
                                                                        <div className="m-form__field--text stretchedField">
                                                                            <div className="m-form__row--label"><label>Title</label></div>
                                                                            <div className="m-form__row--input"><input type="text" value={this.state.title}
                                                                                onChange={this.onChange} placeholder="Title" name="title" style={{ fontSize: '18px' }} className="form-control " /></div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="m-form__fieldsContainer">
                                                                        <div className="m-form__field--text stretchedField">
                                                                            <div className="m-form__row--label"><label>Closing Date</label></div>
                                                                            <div className="m-form__row--input"><input type="date" value={this.state.closing_date}
                                                                                onChange={this.onChange} name="closing_date" style={{ fontSize: '18px' }} className="form-control " /></div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="m-form__fieldsContainer">
                                                                        <div className="m-form__field--text stretchedField">
                                                                            {/* {this.state.option_value_updated.map(item => ( */}
                                                                            <>
                                                                                <div className="m-form__row--label"><label>Option 1</label></div>
                                                                                <div className="m-form__row--input">
                                                                                    <input type="text" value={this.state.options}
                                                                                        onChange={this.onChange} name="options" style={{ fontSize: '18px', width: "86%" }} className="form-control " />
                                                                                        <div>
                                                                            <span className="option_value">
                                                                                <i className="fa fa-plus" onClick={this.addVote}></i>
                                                                            </span>
                                                                            {(this.displayData !='')?
                                                                            <span className="option_value">
                                                                                <i className="fa fa-minus" onClick={this.removeVote.bind(this,this.displayData.length-1)}></i>
                                                                            </span>:''}
                                                                        </div>
                                                                                </div>
                                                                            </>
                                                                            {/* ))} */}
                                                                        </div>

                                                                        <div className="multi-data">

                                                                            {this.displayData}

                                                                            
                                                                        </div>
                                                                        
                                                                        

                                                                    </div>


                                                                    <div className="m-form__buttonsContainer m-groupsCreate__buttonsContainer">
                                                                        <m-shadowboxsubmitbutton type="submit" data-cy="minds-groups-create-submit">
                                                                            <button className="m-shadowboxSubmitButton green" disabled={!this.state.options || !this.state.title || !this.state.closing_date} type="submit">
                                                                                <div className="m-shadowboxSubmitButton__status--unsaved ng-star-inserted"> Create Vote </div>
                                                                            </button>
                                                                        </m-shadowboxsubmitbutton>
                                                                    </div>
                                                                </form>

                                                                {/* <div class="example">
                                                                    <h2>Plain-Text</h2>
                                                                    <form><textarea rows="5" class="emojis-plain">Hello :neckbeard:</textarea></form>
                                                                </div> */}

                                                                {/* <div class="example"> */}
                                                                {/* <form><textarea rows="5" class="emojis-wysiwyg1">Hello :neckbeard:</textarea></form> */}
                                                                {/* </div> */}
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