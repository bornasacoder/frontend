import React, { Component } from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import InnerSidebar from '../directives/innerSidebar';
import Fixedsidebarright from '../directives/Fixedsidebarright'
import Messaging from '../components/messaging'

const headers = {
    'Content-Type': 'text/plain'
};
const TITLE = 'Victus-Token-Creategroup'
const initialState = {
    group_name: '',
    description: '',
    is_closed_group: '',
}
export default class Creategroup extends Component {


    // custom_file_upload_url = `${process.env.REACT_APP_URL}/api/users/group_create`;
    // custom_file_upload_url1 = `${process.env.REACT_APP_URL}/api/users/post_comment`;
    // // custom_file_upload_url2 = `${process.env.REACT_APP_URL}/api/users/post_comment_reply`;



    constructor(props) {
        super(props);
        this.state = initialState
        this.state = {
            image_file: null,
            image_preview: '',
            image_file1: null,
            image_preview1: '',
        }


        this.onChange = this.onChange.bind(this);
        this.handleSubmitFile = this.handleSubmitFile.bind(this);

    }


    componentDidMount() {

        let data = Cookies.getJSON('name');
        this.loginData = data.user_data

        $('.sidebar').find('ul').find('li').removeClass('active');
        $('#li_creategroup').addClass('active');
        $('#li_creategroup').closest('.sidebar-submenu').show();
        $('#li_creategroup').closest('.sidebar-submenu').closest('.sidebar-dropdown').addClass('active');

    }




    // Image Preview Handler
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];


        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })


    }


    // Image Preview Handler
    handleImagePreview1 = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        this.setState({
            image_preview1: image_as_base64,
            image_file1: image_as_files,
        })

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
        
        let formData = new FormData();
        if (this.state.is_closed_group === undefined) {
            formData.append('is_closed_group', '0')

            // this.state.is_closed_group = '0'
        }
        else {
            formData.append('is_closed_group', this.state.is_closed_group)
        }
        if (this.state.description === undefined) {
            // this.state.description = ''
            formData.append('description', '');
        }
        else {
            formData.append('description', this.state.description);

        }



        formData.append('user_id', this.loginData.id);
        formData.append('api_key', this.loginData.api_key);
        formData.append('group_name', this.state.group_name);
        formData.append('avatar', this.state.image_file1);
        formData.append('banner', this.state.image_file);
        formData.append('funding_target', this.state.funding_target)


        $('#pay_now').prop('disabled', true);
        $('#pay_now').html('processing...');
        axios.post(
            `${process.env.REACT_APP_URL}/api/users/group_create`,
            formData,
            {headers}

        )

            .then(res => {
                if (res.data.code === true) {

                    this.group_id = res.data.recdata.id
                    window.location.hash = '/groupdetail/' + this.group_id
                    $('#main_loader').hide();
                    $('#root').css('opacity', '1');
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
                        <div className="gap gray-bg " >
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row merged20" id="page-contents">
                                            {/* //================== Sidebar */}

                                            <InnerSidebar />

                                            {/* <!-- sidebar --> */}
                                            <div className="col-lg-8 setStick" >
                                                <div className="central-meta new-pst" >
                                                    <div className="new-postbox" >
                                                        <div className="m-modalV2__inner m-groups__create m-border" style={{padding:"20px"}}>
                                                            <div className="m-modalV2__header m-groupsCreate__header">
                                                                <h2 className="m-modalV2Header__title"> Create Group </h2>
                                                            </div>
                                                            <div className="m-modalV2__body m-formWrapper">
                                                                <form onSubmit={this.handleSubmitFile} className="m-groupsCreate__form m-formWrapper m-formLayout--buttonRight ">
                                                                    <div className="m-form__fieldsContainer">
                                                                        <div className="m-form__field--text stretchedField">
                                                                            <div className="m-form__row--label"><label>Name</label></div>
                                                                            <div className="m-form__row--input"><input type="text" value={this.state.group_name}
                                                                                onChange={this.onChange} name="group_name" style={{ fontSize: '18px' }} className="form-control " /></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="m-form__fieldsContainer">
                                                                            <div className="m-form__row--label"><label>Avatar and Banner</label></div>
                                                                        <div className="m-form__field--text" >
                                                                            {/* <div style={{display:"flex",gap:"20px"}}> */}
                                                                            <div className="m-channelEdit__imagery" style={{padding:"10px",display:"flex",gap:"20px"}}>
                                                                                
                                                                                <div className='' style={{}}>
                                                                                {this.state.image_preview ? <img src={this.state.image_preview} alt="No Data" /> : ''}

<label htmlFor="channel-v2-edit-banner" className="m-channelEditImagery__uploadTrigger m-channelEditImagery__uploadBanner">
    <m-icon iconid="file_upload">
        <i className="fa fa-upload" style={{ fontSize: '1em',position:"absolute",top:"30px",left:"30px" }}></i>
    </m-icon>
    <input data-cy="minds-groups-create-banner" id="channel-v2-edit-banner" accept=".jpg,.jpeg,.png" onChange={this.handleImagePreview} type="file" />
</label>
                                                                                </div>
                                                                                
                                                                                <div className="" style={{display:"flex",justifyContent:"center",alignItems:"center",position:"relative"}}>
                                                                                    <div>
                                                                                    <label htmlFor="channel-v2-edit-avatar" className="m-channelEditImagery__uploadTrigger m-channelEditImagery__uploadAvatar">
                                                                                        <m-icon iconid="file_upload">
                                                                                            <i className="fa fa-upload" style={{ fontSize: '1em',position:"absolute",top:"50px",left:"30px" }}></i>
                                                                                            {this.state.image_preview1 ? <img src={this.state.image_preview1} alt="No Data" style={{ height: '148px', width: '217px', left: '229px' }} /> : ''}
                                                                                        </m-icon>
                                                                                        <input id="channel-v2-edit-avatar" type="file" accept=".jpg,.jpeg,.png" onChange={this.handleImagePreview1} />
                                                                                    </label>  
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            </div>
                                                                        </div>
                                                                    <div className="m-form__fieldsContainer">
                                                                        <div className="m-form__field--text stretchedField">
                                                                            <div className="m-form__row--label"><label>Description</label></div>
                                                                            <div className="m-form__row--input"><textarea value={this.state.description}
                                                                                onChange={this.onChange} name="description" style={{ fontSize: '18px' }} data-cy="minds-groups-create-description-input" className="form-control ng-untouched ng-pristine ng-valid"></textarea></div>
                                                                        </div>
                                                                    </div>

                                                                    

                                                                    <div className="m-form__fieldsContainer">
                                                                        <div className="m-form__row--label"><label>Group Type</label></div>

                                                                    </div>
                                                                    <div className="form-radio">
                                                                        <div className="radio">
                                                                            <label>
                                                                                <input type="radio" value="1" name="is_closed_group" onChange={this.onChange} /><i className="check-box"></i>Close
                                                </label>
                                                                        </div>
                                                                        <div className="radio">
                                                                            <label>
                                                                                <input type="radio" value="0" checked="checked" name="is_closed_group" onChange={this.onChange} /><i className="check-box"></i>Open
                                                </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="m-form__buttonsContainer m-groupsCreate__buttonsContainer">
                                                                        <m-shadowboxsubmitbutton type="submit" data-cy="minds-groups-create-submit">
                                                                            <button className="m-shadowboxSubmitButton green" disabled={!this.state.group_name} type="submit">
                                                                                <div className="m-shadowboxSubmitButton__status--unsaved ng-star-inserted"> Create Group </div>
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