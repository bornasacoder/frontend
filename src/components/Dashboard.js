import React, { Component } from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import InnerSidebar from '../directives/innerSidebar';
import { Player } from 'video-react';
import { Link } from 'react-router-dom';
import toastr from 'reactjs-toastr';
import Messaging from '../components/messaging'
// import * as jsx from 'react/jsx-runtime';
// import nl2br from 'react-nl2br'
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, EmailIcon, EmailShareButton } from 'react-share';
// const nl2br = require('react-nl2br');
import TextareaAutosize from "react-autosize-textarea"

// const {
//     FacebookShareButton,
//     GooglePlusShareButton,
//     LinkedinShareButton,
//     PinterestShareButton,
//     VKShareButton,
// } = ShareButtons;
const headers = {
    'Content-Type': 'text/plain'
};
const TITLE = 'Victus-Token-Dashboard'
const initialState = {
    message: '',
    file_type: '',
    token: '',
    tag_hold_input: '',
    nsfw_hold_input: '',
    eighteenplus: '',
}
export default class Dashboard extends Component {

    custom_file_upload_url = `${process.env.REACT_APP_URL}/api/users/add_post`;
    custom_file_upload_urlEdit = `${process.env.REACT_APP_URL}/api/users/edit_post`;

    custom_file_upload_url1 = `${process.env.REACT_APP_URL}/api/users/post_comment`;
    custom_file_upload_url2 = `${process.env.REACT_APP_URL}/api/users/post_comment_reply`;

    constructor(props) {
        super(props);
        this.state = initialState
        this.state = {
            exchangeData: '',
            repost_comment: '',
            dataImage: '',
            selecthashtag: [],
            selectnsfw: [],
            suggestedHashTagList: [],
            detailPost: '',
            edit_file_path: '',
            edit_file_type: '',
            image_file: null,
            image_preview: '',
            image_file1: null,
            image_preview1: '',
            image_file2: null,
            image_preview2: '',
            listTimeline: [],
            img_post_id: '',
            img_post_cmt_id: '',
            file_type: '',
            listFollowing: [],
            listFollower: [],
            listGroup: [],
            listFriends: [],
            listHashtag: [],
            listHashtags: [],
            listNSFWtag: [],
            suggestedChannelList: [],
            showVotingList: [],
            option_id: '',
            showVotingListGraph: [],
        }


        this.onChange = this.onChange.bind(this);
        this.onChangereply = this.onChangereply.bind(this);
        this.tokenChange = this.tokenChange.bind(this);
        this.exchangeDataSubmit = this.exchangeDataSubmit.bind(this)
    }

    componentDidMount() {
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data

        $('.sidebar').find('ul').find('li').removeClass('active');
        $('#li_dashboard').addClass('active');

        var urlGroup = window.location.hash.split('groupdetail/')[1]

        this.setState({
            urlGroup: urlGroup,
        })

        this.timelineAPI()
        // this.followingAPI()
        // this.followerAPI()
        this.groupAPI()
        this.friendsAPI()
        this.hashtagListAPI()
        this.AllNSFWAPI()
        this.suggestedChannel()
        this.suggestedTags()
        this.BannerImageAPI()
        this.showVoting()

        // this.AllHashtagListAPI()


        $("body").delegate(".fa-close", "click", function () {

            $(this).closest('.select_tag').remove();
        })
        $("body").delegate(".m-hashtags__trending>li>a", "click", function () {

            var input = $(this).text();
            if ($(".select_tag_area").children().length < 5) {
                $(".select_tag_area").append('<span class="select_tag"><b>' + input + '</b><i  class="fa fa-close"></i></span>');
            }
        })
        $("body").delegate(".nsfw_tag_area .select_nsfw a", "click", function () {
            $(this).closest('.select_nsfw').toggleClass('active');
            // $(this).closest('.select_tag').remove();
        })
        setTimeout(() => {

            $(".token_value").val('1');
        }, 2000);

        $('body').delegate('.main_msg_area textarea', 'keyup', function (e) {
            if (e.keyCode === 13) {
                $(this).closest('.main_msg_area').find('#send_btn').click();
            }
        });


        $('body').delegate('.main_msg_area1 textarea', 'keyup', function (e) {
            if (e.keyCode === 13) {
                $(this).closest('.main_msg_area1').find('#send_btn1').click();
            }
        });

        $('body').delegate('.main_msg_area TextareaAutosize', 'keyup', function (e) {
            if (e.keyCode === 13) {
                $(this).closest('.main_msg_area').find('#send_btn').click();
            }
        });

        $('body').delegate('.main_msg_area1 TextareaAutosize', 'keyup', function (e) {
            if (e.keyCode === 13) {
                $(this).closest('.main_msg_area1').find('#send_btn1').click();
            }
        });

        $('body').delegate('.m-emoji-selector-list span', 'click', function () {

            var val = $('#post_text').val() + $(this).text();

            $('#post_text').val(val);


        });

    }

    removeImage(e) {

        this.setState({
            file_type: '',
            image_file: '',
            edit_file_path: '',
            edit_file_type: ''
        })
        $(".image_remove").closest('.image_preview_area').find('.preview_image_data').hide();
        $(".image_remove").hide();
        $("#image_text").val('');
        $("#edit_file_path").val('');
        $("#edit_file_type").val('');


    }

    save_nsfw() {
        var val = '';
        $(".nsfw_tag_area .active").each(function (index) {
            if (val === '') {
                val = ($(this).find('a').text());
            } else {
                val += ',' + ($(this).find('a').text());
            }

        });
        $("#nsfw_hold_input").val(val);

        $("#myModalNSFW").hide();
    }
    submit_tag(e) {
        e.preventDefault();
        if ($(".select_tag_area").children().length < 5) {
            var input = $('input[name="input_tag"]').val().replace(/\s/g, '');
            input = input.replace(/[#_]/g, '');
            $(".select_tag_area").append('<span class="select_tag"><b>#' + input + '</b><i  class="fa fa-close"></i></span>');
            $('input[name="input_tag"]').val('');
        }
    }

    select_serach_tag(item) {
        if ($(".select_tag_area").children().length < 5) {
            $(".select_tag_area").append('<span class="select_tag"><b>' + item.hashtag + '</b><i  class="fa fa-close"></i></span>');
            $('.m-hashtagsTypeaheadInput__list').hide();
            $('input[name="input_tag"]').val('');
        }
    }

    save_tag() {
        var val = '';
        $(".select_tag_area span b").each(function (index) {
            if (val === '') {
                val = ($(this).text());
            } else {
                val += ',' + ($(this).text());
            }

        });
        $("#tag_hold_input").val(val);
        $("#myModal3").hide();

    }

    reply_box(data) {

        $('#reply_box' + data.post_comment_id).toggle();
    }

    timelineAPI() {
       
        //=======================================  Timeline data ======================
        // $('#main_loader').show();
        // $('#root').css('opacity', '0.5');
        axios.post(`${process.env.REACT_APP_URL}/api/users/timeline`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeData1 = res.data.code
            if (this.codeData1 === true) {
                this.setState({
                    listTimeline: res.data.recdata
                });

            }
            else if (this.codeData1 === false) {
                this.setState({
                    listTimeline: []
                });

            }

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });
    }

    //==================================  Detail of Following List  ==============================

    followingAPI() {

        axios.post(`${process.env.REACT_APP_URL}/api/users/following_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
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

    //==================================  Detail of Hashtag List  ==============================

    AllHashtagListAPI() {
        
        var search = $('input[name="input_tag"]').val().replace(/\s/g, '');
        axios.post(`${process.env.REACT_APP_URL}/api/users/search_hashtag`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'search': search }, { headers }).then((res) => {
            //on success
            this.codeDataHashtagList = res.data.code
            if (this.codeDataHashtagList === true) {
                this.setState({
                    listHashtag: res.data.recdata
                });
                $('.m-hashtagsTypeaheadInput__list').show();
            } else {

                $('.m-hashtagsTypeaheadInput__list').hide();
            }


        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }

    //==================================  List of nsfw List  ==============================

    AllNSFWAPI() {
        axios.get(`${process.env.REACT_APP_URL}/api/users/nsfw`, {}).then((res) => {
            //on success
            this.codeDataNsfwList = res.data.code
            if (this.codeDataNsfwList === true) {
                this.setState({
                    listNSFWtag: res.data.recdata
                });
                // $('.m-hashtagsTypeaheadInput__list').show();
            } else {

                // $('.m-hashtagsTypeaheadInput__list').hide();
            }


        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });
    }
    //==================================  Detail of Hashtag List  ==============================

    hashtagListAPI() {
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/select_hashtag`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataHashtagsList = res.data.code
            if (this.codeDataHashtagsList === true) {
                this.setState({
                    listHashtags: res.data.hashtags
                });
            }


        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }

    //==================================  Detail of Friends List  ==============================

    friendsAPI() {
        axios.post(`${process.env.REACT_APP_URL}/api/users/friend_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataFriends = res.data.code
            if (this.codeDataFriends === true) {
                this.setState({
                    listFriends: res.data.recdata
                });
            }


        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }


    //==================================  Detail of Followers List  ==============================

    followerAPI() {


        axios.post(`${process.env.REACT_APP_URL}/api/users/follower_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
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

    //==================================  Wallet Balance List  ==============================

    walletBalanceAPI() {


        axios.post(`${process.env.REACT_APP_URL}/api/users/wallet_balance`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataWalletBalance = res.data.code
            if (this.codeDataWalletBalance === true) {

                this.setState({
                    walletBalance: res.data.recdata
                });
            }


        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }

    // No Data Handler
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        let file_type = '';
        if (image_as_files.type.indexOf('image') === 0) {
            file_type = 'image';
        } else {
            file_type = 'video';
        }

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
            file_type: file_type,
        })
        $('.preview_image_data').show();
        $(".image_remove").show();
    }

    // No Data Handler
    handleImagePreview1 = (id) => {
        let image_as_base64 = URL.createObjectURL($('#img' + id)[0].files[0])
        let image_as_files = $('#img' + id)[0].files[0];

        let file_type = '';
        if (image_as_files.type.indexOf('image') === 0) {
            file_type = 'image';
        } else {
            file_type = 'video';
        }
        this.setState({
            img_post_id: id,
            image_preview1: image_as_base64,
            image_file1: image_as_files,
            file_type: file_type,
        })
        $('#cmt_img' + id.id).show();
    }

    // No Data Handler
    handleImagePreview2 = (id) => {
        let image_as_base64 = URL.createObjectURL($('#imgg' + id)[0].files[0])
        let image_as_files = $('#imgg' + id)[0].files[0];
        let file_type = '';
        if (image_as_files.type.indexOf('image') === 0) {
            file_type = 'image';
        } else {
            file_type = 'video';
        }
        this.setState({
            img_post_cmt_id: id,
            image_preview2: image_as_base64,
            image_file2: image_as_files,
            file_type: file_type,
        })
        $('#cmt_imgg' + id).show();
    }

    onChange(e) {

        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'radio') {
            this.state.option_id = e.target.value
        }

    }

    tokenChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    onChangereply(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // ========================= Add Post   ==============================
    strip(tmp) {
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return tmp.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank" + style="word-break:break-all">' + url + '</a>';

            // return '<a href="'+url+'" >' + url +'</a>'
        })
    }

    handleSubmitFile = (e) => {
        e.preventDefault();
        this.state.message = $('#post_text').val();


        if (this.state.message === '' && this.state.image_file === null) {
            return false
        }

        if (this.state.image_file === '' && this.state.message === '') {
            return false;
        }

        $('#main_loader').show();
        $('#root').css('opacity', '0.5');

        let formData = new FormData();
        var msg_val = this.strip(this.state.message);
        // console.log(msg_val);

        formData.append('post_id', this.state.detailPost.post_id);
        formData.append('is_repost', this.state.detailPost.is_repost);

        formData.append('old_file_type', $("#edit_file_type").val());
        formData.append('old_file_path', $("#edit_file_path").val());

        formData.append('file', this.state.image_file);
        formData.append('user_id', this.loginData.id);
        formData.append('message', msg_val);
        formData.append('api_key', this.loginData.api_key);
        formData.append('file_type', this.state.file_type);
        formData.append('hashtag', $("#tag_hold_input").val());
        formData.append('nsfw', $("#nsfw_hold_input").val());


        $('#pay_now').prop('disabled', true);
        $('#pay_now').html('processing...');

        if (this.state.detailPost != '') {
            var url = this.custom_file_upload_urlEdit;
        } else {
            var url = this.custom_file_upload_url;
        }

        axios.post(
            url,
            formData,
            {headers}
        )

            .then(res => {

                $('#post_text').val('');
                $('#image_text').val('')
                $('.preview_image_data').hide();
                $('.image_remove').hide();
                $(".nsfw_tag_area .select_nsfw").removeClass('active');
                $(".select_tag_area").html("");

                $('.postoverlay').hide();
                this.timelineAPI()
                $('#pay_now').prop('disabled', false);
                $('#pay_now').html('Post');
                this.setState({
                    image_file: '',
                    message: '',
                    tag_hold_input: '',
                    nsfw_hold_input: '',
                    edit_file_path: '',
                    edit_file_type: '',
                    detailPost: ''
                })
                $('#main_loader').hide();
                $('#root').css('opacity', '1');
                $("#tag_hold_input").val('');
                $("#nsfw_hold_input").val('');
                $('.modal-open').css('overflow', 'auto')
                $('.modal-backdrop').css('position', 'inherit')
            })
            .catch(err => {

            })


    }

    //=======================================  Like API   ===============================================

    submitLike(id) {
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/post_like`, { 'post_id': id.post_id, 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers })
            .then(response => {
                if (response.data.code === true) {

                }

                else if (response.data.code === false) {
                    // toastr.error(response.data.message, { displayDuration: 3000 })

                }
                this.componentDidMount()

            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    //=======================================  Like API   ===============================================

    submitdisLike(id) {
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/post_dislike`, { 'post_id': id.post_id, 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers })
            .then(response => {
                if (response.data.code === true) {

                }

                else if (response.data.code === false) {

                }
                this.componentDidMount()

            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    //  ======================================= replyon submit  =================================
    strip1(tmp) {

        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return tmp.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank" + style="word-break:break-all">' + url + '</a>';

            // return '<a href="'+url+'">' + url +'</a>'
        })
    }
    replyOnComment = (id) => {

        
        if (this.state.image_file1 === null && $('#message1' + id.post_id).val().trim() === '') {
            return false;
        }
        if (this.state.image_file1 === '' && $('#message1' + id.post_id).val().trim() === '') {
            return false;
        }
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        let formData = new FormData();
        var msg_val = this.strip1($('#message1' + id.post_id).val());

        // var text = $('#message1' + id.post_id).val().split(' ');
        // var msg_val = '';
        // for (var t = 0; t < text.length; t++) {
        //     if (text[t].indexOf('https://') == 0 || text[t].indexOf('http://') == 0) {

        //         msg_val += ' <a href="' + text[t] + '" target="_blank">' + text[t] + '</a>'
        //     } else {
        //         msg_val += ' ' + text[t]
        //     }
        // }
        formData.append('file', this.state.image_file1);
        formData.append('user_id', this.loginData.id);
        formData.append('comment', msg_val);
        formData.append('post_id', id.post_id);
        formData.append('api_key', this.loginData.api_key);
        formData.append('file_type', this.state.file_type);




        axios.post(
            this.custom_file_upload_url1,
            formData,
            {headers}
        )
            .then(res => {
                this.setState({
                    image_file1: '',
                })
                $('#main_loader').hide();
                $('#root').css('opacity', '1');
                setTimeout(() => {

                    this.timelineAPI()
                    $("#comment_box" + id.post_id).show();
                });
                setTimeout(() => {
                    $("#comment_box" + id.post_id).show();
                }, 1000);
            })
            .catch(err => {

            })

        $('#message1' + id.post_id).val('')
        $('#cmt_img' + id.post_id).hide();

    }

    //  ======================================= replyon submit  =================================

    replyOnCommentPic = (id) => {

        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        if (this.state.image_file1 === null && $('#messageImgPopup' + id).val() === '') {
            return false;
        }
        if (this.state.image_file1 === '' && $('#messageImgPopup' + id).val() === '') {
            return false;
        }
        let formData = new FormData();
        formData.append('file', this.state.image_file1);
        formData.append('user_id', this.loginData.id);
        formData.append('comment', $('#messageImgPopup' + id).val());
        formData.append('post_id', id);
        formData.append('api_key', this.loginData.api_key);
        formData.append('file_type', this.state.file_type);
        axios.post(
            this.custom_file_upload_url1,
            formData,
            {headers}
        )
            .then(res => {
                this.setState({
                    image_file1: '',
                })
                $('#main_loader').hide();
                $('#root').css('opacity', '1');
                setTimeout(() => {

                    this.timelineAPI()
                    $("#comment_box" + id.post_id).show();
                });
            })
            .catch(err => {

            })
        this.componentDidMount()
        $('#message1' + id.post_id).val('')
        $('#cmt_img' + id.post_id).hide();

    }


    //  ======================================= replyonreply submit  =================================
    strip2(tmp) {

        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return tmp.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank" + style="word-break:break-all">' + url + '</a>';

        })
    }
    replyOnReplyComment = (id) => {
        if (this.state.image_file2 === '' && $('#message2' + id.post_comment_id).val().trim() === '') {
            return false;
        }
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');

        let formData = new FormData();
        var msg_val = this.strip2($('#message2' + id.post_comment_id).val());

        // var text = $('#message2' + id.post_comment_id).val().split(' ');
        // var msg_val = '';
        // for (var t = 0; t < text.length; t++) {
        //     if (text[t].indexOf('https://') == 0 || text[t].indexOf('http://') == 0) {

        //         msg_val += ' <a href="' + text[t] + '" target="_blank">' + text[t] + '</a>'
        //     } else {
        //         msg_val += ' ' + text[t]
        //     }
        // }
        formData.append('file', this.state.image_file2);
        formData.append('user_id', this.loginData.id);
        formData.append('reply', msg_val);
        formData.append('post_comment_id', id.post_comment_id);
        formData.append('api_key', this.loginData.api_key);
        formData.append('file_type', this.state.file_type);




        axios.post(
            this.custom_file_upload_url2,
            formData,
            {headers}
        )
            .then(res => {
                this.timelineAPI()
                this.setState({
                    image_file2: '',
                })
                $('#main_loader').hide();
                $('#root').css('opacity', '1');
            })
            .catch(err => {

            })

        $('#message2' + id.post_comment_id).val('')
        $('#cmt_imgg' + id.post_comment_id).hide();
    }

    //==========================================  Delete Post  ================================

    postDelete = (id) => {
        
        confirmAlert(

            {
                title: 'Confirm to submit',
                message: 'Are you sure to delete this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            axios.post(`${process.env.REACT_APP_URL}/api/users/post_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'post_id': id.post_id }, { headers }).then((res) => {
                                this.timelineAPI()
                                $('#main_loader').show();
                                $('#root').css('opacity', '0.5');

                                setTimeout(() => {

                                    $('#main_loader').hide();
                                    $('#root').css('opacity', '1');
                                }, 2000);

                            }).catch((error) => {
                            })
                    },
                    {
                        label: 'No',
                    }
                ]
            });
    }

    //==========================================  Block/Unblock Post  ================================

    postBlock = (id) => {
        
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to Block this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>

                        axios.post(`${process.env.REACT_APP_URL}/api/users/block`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'blocked_user_id': id.user_id }, { headers }).then((res) => {
                            this.timelineAPI()

                        }).catch((error) => {
                        })
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    //==========================================  Follow/Unfollow Post  ================================

    postFollow = (id) => {
        
        if (id.is_following === '0') {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure to Follow this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            axios.post(`${process.env.REACT_APP_URL}/api/users/follow`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'following_id': id.user_id }, { headers }).then((res) => {
                                this.timelineAPI()

                            }).catch((error) => {
                            })
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }
        else if (id.is_following === '1') {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure to Unfollow this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            axios.post(`${process.env.REACT_APP_URL}/api/users/unfollow`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'following_id': id.user_id }, { headers }).then((res) => {
                                this.timelineAPI()

                            }).catch((error) => {
                            })
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }

    }

    //==========================================  Delete Comment Post  ================================

    postCommentDelete = (id) => {
        
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        axios.post(`${process.env.REACT_APP_URL}/api/users/post_comment_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'post_comment_id': id.post_comment_id }, { headers }).then((res) => {
                            this.timelineAPI()
                            $('#main_loader').show();
                            $('#root').css('opacity', '0.5');

                            setTimeout(() => {

                                $('#main_loader').hide();
                                $('#root').css('opacity', '1');
                            }, 2000);

                        }).catch((error) => {
                        })
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    //==========================================  Delete comment reply Post  ================================

    postCommentReplyDelete = (id) => {
        
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        axios.post(`${process.env.REACT_APP_URL}/api/users/post_comment_reply_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'post_comment_id': id.post_comment_reply_id }, { headers }).then((res) => {
                            this.timelineAPI()
                            $('#main_loader').show();
                            $('#root').css('opacity', '0.5');

                            setTimeout(() => {

                                $('#main_loader').hide();
                                $('#root').css('opacity', '1');
                            }, 2000);

                        }).catch((error) => {
                        })
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    //=============================================  Crowd Funding detail    =============================

    detailCrowd(crowdDetail) {
        this.walletBalanceAPI()
        this.setState({
            crowdDetail: crowdDetail
        })

    }

    //==========================================  Tip Add Post  ================================

    tipAPI = () => {
        $('div#myModal2').css('z-index', '99');
        
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to Pay this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        axios.post(`${process.env.REACT_APP_URL}/api/users/tip`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'post_id': this.state.crowdDetail.post_id, 'token': this.state.token }, { headers }).then((res) => {

                            if (res.data.code === true) {

                                toastr.success('Success', { displayDuration: 3000 })
                                setTimeout(() => {
                                    window.location.reload()
                                }, 2000);
                            }
                            else {
                                toastr.error('Some Error Occured!', { displayDuration: 3000 })

                            }


                            // this.componentDidMount()

                        }).catch((error) => {
                        })
                },
                {
                    label: 'No',
                }
            ]
        });
    }


    //===========================================  
    //==================================  Detail of Group List  ==============================

    groupAPI() {
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/group_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataGroup = res.data.code
            if (this.codeDataGroup === true) {
                this.setState({
                    listGroup: res.data.recdata
                });
            }
        }).catch((error) => {
        });

    }

    //====================================   Group Detail   =======================

    groupDetail(id) {
        window.location.hash = '/timeLine/' + id;
        setTimeout(() => {

            window.location.reload(true)
        }, 500);
    }


    loading(id) {

        setTimeout(() => {

            window.location.hash = '/timeLine/' + id;
            // window.location.reload(true)
        }, 500);
    }
    show_hide_comment(id) {
        $("#comment_box" + id).toggle(100);
    }

    aboveEighteen(id) {

        $("#print_post_area" + id).show();
        $("#nsfw_post_area" + id).hide();
    }


    postEdit(editPost) {
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/post_detail`, { 'user_id': this.loginData.id, 'post_id': editPost.post_id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataPostDetail = res.data.code
            if (this.codeDataPostDetail === true) {
                this.setState({
                    detailPost: res.data.recdata
                });
                $(".preview_image_data").show();
                var arr = [];
                if (this.state.detailPost.hashtag) {
                    var tag = this.state.detailPost.hashtag.split(',');
                    tag.map(i => {
                        arr.push(i);

                    })
                }
                // alert('fasfasf');
                var arr1 = [];
                if (this.state.detailPost.nsfw) {
                    var ns = this.state.detailPost.nsfw.split(',');
                    ns.map(i => {
                        arr1.push(i);

                    })
                }
                // alert('123');
                this.setState({
                    message: this.state.detailPost?.message,
                    tag_hold_input: this.state.detailPost?.hashtag,
                    nsfw_hold_input: this.state.detailPost?.nsfw,
                    file_type: this.state.detailPost?.file_type,
                    image_preview: this.state.detailPost?.file,
                    selecthashtag: arr,
                    selectnsfw: arr1,
                    edit_file_path: this.state.detailPost?.file,
                    edit_file_type: this.state.detailPost?.file_type,
                })

                if (this.state.detailPost.file != '') {
                    $(".image_remove").show();
                }

                $('.postoverlay').show();
                $('body').scrollTop();

            }
        }).catch((error) => {
        });

    }

    suggestedChannel() {
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/sujjested_channels`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataSuggested = res.data.code
            if (this.codeDataSuggested === true) {
                this.setState({
                    suggestedChannelList: res.data.recdata
                });

            }
        }).catch((error) => {
        });

    }

    groupDetail(id) {

        window.location.hash = '/timeLine/' + id;
        setTimeout(() => {

            window.location.reload(true)
        }, 500);
    }


    deleteChannnels(channelsId) {
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/block`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'blocked_user_id': channelsId.user_id }, { headers }).then((res) => {
            //on success
            this.codeDataBlockChannels = res.data.code
            if (this.codeDataBlockChannels === true) {
                this.componentDidMount()
            }
        }).catch((error) => {
        });
    }


    //============================================   Join Open Group  ===============================================

    joinGroup(channelsId) {
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/follow`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'following_id': channelsId.user_id },{headers}).then((res) => {
            //on success
            this.codeDataJoinChannels = res.data.code
            if (this.codeDataJoinChannels === true) {

                // toastr.success('You Successfully join the group', { displayDuration: 3000 })
                this.componentDidMount()
            }
            else {
                toastr.error('Failure', { displayDuration: 3000 })
            }
        }).catch((error) => {
        });
    }


    //============================================   Suggested Hash Tags  ===============================================

    suggestedTags() {
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/sujjested_hashtag`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataSuggestedHasTags = res.data.code
            if (this.codeDataSuggestedHasTags === true) {
                this.setState({
                    suggestedHashTagList: res.data.recdata
                });
            }
            else {
            }
        }).catch((error) => {
        });
    }


    imagePast(dataImage) {
        this.setState({
            dataImage: dataImage
        })
    }


    exchangeDetail(id) {
        this.setState({
            exchangeData: id
        })
    }


    exchangeDataSubmit(e) {
        e.preventDefault()
        
        axios.post(`${process.env.REACT_APP_URL}/api/users/repost`, {
            'user_id': this.loginData.id, 'api_key': this.loginData.api_key,
            'post_id': this.state.exchangeData?.post_id, 'repost_comment': this.state.repost_comment
        }, { headers })
            .then(response => {

                if (response.data.code === true) {
                    $("#myModalExchange").hide()
                }
                else if (response.data.code === false) {

                }
                $('.modal-open').css('overflow', 'auto')
                $('.modal-backdrop').css('position', 'inherit')
                $('#repostComment').val()
                this.componentDidMount()
            })

            .catch(err => {

            })
    }

    postShare(id) {
        this.setState({
            sharePost: id
        })

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


    show_emoji_box(item) {
        // console.log(item);

        $('#emoji_box').toggle(200);
    }


    manage_emoji_style(i) {
        if (i == 0) {
            return 320;
        } else {
            return (240 * i) + 320;
        }
    }


    //===================================  hashtag detail data  =======================

    hashtagListData(id) {
        
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        axios.post(`${process.env.REACT_APP_URL}/api/users/hashtag_timeline`, { 'user_id': this.loginData.id, 'hashtag': id.hashtag, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataHashtagDetail = res.data.code
            if (this.codeDataHashtagDetail === true) {
                this.setState({
                    listTimeline: res.data.recdata
                });
            }
            else {

            }
            $('#main_loader').hide();
            $('#root').css('opacity', '1.0');

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }

        //====================================  VOTING lIST        ================
        showVoting() {
            axios.post(`${process.env.REACT_APP_URL}/api/users/show_voting`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
                //on success
                this.codeShowVotingList = res.data.code
                if (this.codeShowVotingList === true) {
                    this.setState({
                        showVotingList: res.data.recdata
                    });
                }
    
    
            }).catch((error) => {
                //on error
                //alert("There is an error in API call.");
            });
    
        }
    
        //================================  Voting Result =========================
    
        userVoting(id) {
            axios.post(`${process.env.REACT_APP_URL}/api/users/user_voting`, {
                'user_id': this.loginData.id, 'api_key': this.loginData.api_key,
                "voting_title_id": id, "option_id": this.state.option_id
            }, { headers }).then((res) => {
                //on success
                this.codeUserVoting = res.data.code
                if (this.codeUserVoting === true) {
    
    
                    this.setState({
                        showVotingListGraph: res.data.recdata
                    });
                }
    
    
    
            }).catch((error) => {
                //on error
                //alert("There is an error in API call.");
            });
    
        }

    render() {
        const crowdDetail1 = this.state.crowdDetail
        const codeData1 = this.codeData1
        const codeDataFollower1 = this.codeDataFollower
        const codeDataFollowing1 = this.codeDataFollowing
        const codeDataGroup1 = this.codeDataGroup
        const codeDataFriends1 = this.codeDataFriends


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

                    {/* <div className="fixed-sidebar right">
                        <div className="chat-friendz">
                            <ul className="chat-users">
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend1.jpg" alt="" />
                                        <span className="status f-online"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend2.jpg" alt="" />
                                        <span className="status f-away"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend3.jpg" alt="" />
                                        <span className="status f-online"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend4.jpg" alt="" />
                                        <span className="status f-offline"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend5.jpg" alt="" />
                                        <span className="status f-online"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend6.jpg" alt="" />
                                        <span className="status f-online"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend7.jpg" alt="" />
                                        <span className="status f-offline"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend8.jpg" alt="" />
                                        <span className="status f-online"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend9.jpg" alt="" />
                                        <span className="status f-away"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend10.jpg" alt="" />
                                        <span className="status f-away"></span>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thmb">
                                        <img src="../../side-friend8.jpg" alt="" />
                                        <span className="status f-online"></span>
                                    </div>
                                </li>
                            </ul>
                            <div className="chat-box">
                                <div className="chat-head">
                                    <span className="status f-online"></span>
                                    <h6>Bucky Barnes</h6>
                                    <div className="more">
                                        <span className="more-optns"><i className="ti-more-alt"></i>
                                            <ul>
                                                <li>block chat</li>
                                                <li>unblock chat</li>
                                                <li>conversation</li>
                                            </ul>
                                        </span>
                                        <span className="-mesage"><i className="ti-"></i></span>
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
                    </div>
                 */}
                    {/* <!-- right sidebar user chat --> */}

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

                    <section className='mt-3' >
                        <div className="gap gray-bg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row merged20" id="page-contents">
                                            {/* //================== Sidebar */}
                                            <InnerSidebar />
                                            {/* <!-- sidebar --> */}
                                            <div className="col-lg-6  setStick" >
                                                <div className="central-meta new-pst" >
                                                    <div className="new-postbox">
                                                        <figure>
                                                            <img src={this.state.bannerImage?.avatar} alt="" style={{ height: '54px', width: '54px' }} />
                                                        </figure>
                                                        <div className="newpst-input">
                                                            <form onSubmit={(this.state.detailPost != '') ? this.handleSubmitFile : this.handleSubmitFile}>
                                                                <TextareaAutosize rows="2" id="post_text" style={{ fontSize: '17px' }} value={this.state.message}
                                                                    onChange={this.onChange} name="message" placeholder="Write something"></TextareaAutosize>
                                                                <input type="text" style={{ display: 'none' }} readOnly value={this.state.tag_hold_input} onChange={this.onChange} name="tag_hold_input" id="tag_hold_input" />
                                                                <input type="text" style={{ display: 'none' }} readOnly value={this.state.nsfw_hold_input} onChange={this.onChange} name="nsfw_hold_input" id="nsfw_hold_input" />

                                                                <input type="text" style={{ display: 'none' }} readOnly value={this.state.edit_file_path} onChange={this.onChange} name="edit_file_path" id="edit_file_path" />
                                                                <input type="text" style={{ display: 'none' }} readOnly value={this.state.edit_file_type} onChange={this.onChange} name="edit_file_type" id="edit_file_type" />

                                                                <div className="attachments">
                                                                    <ul>

                                                                        <li>
                                                                            <i className="fa fa-image" style={{ fontSize: '20px', marginRight: '5px' }}></i>
                                                                            Upload
                                                                            <label className="fileContainer">
                                                                                <input type="file" id="image_text" accept=".jpg,.jpeg,.png,.mp4" onChange={this.handleImagePreview} />
                                                                            </label>


                                                                        </li>

                                                                        <li>
                                                                            <a className="btn" data-toggle="modal" data-target="#myModalNSFW" ><span className="fa fa-etsy nsfw_etsy"></span>NSFW</a>
                                                                        </li>

                                                                        <li>
                                                                            <a className="btn" data-toggle="modal" data-target="#myModal3" style={{ marginLeft: '-13px' }}><span className="fa fa-hashtag nsfw_hash"></span>Tags</a>
                                                                        </li>

                                                                        <li className="smileyPost">
                                                                            <i class="material-icons mdl-color-text--blue-grey-600 fa fa-smile-o" onClick={this.show_emoji_box.bind(this, 1)} ></i>
                                                                            <div class="m-bubble-popup mdl-shadow--4dp ng-star-inserted" id={"emoji_box"} style={{ top: "auto", bottom: "36px", left: "auto", display: "none" }}><div class="m-emoji-selector-title"><span style={{ float: 'left' }}>Emoji</span><i class="fa fa-close" onClick={this.show_emoji_box.bind(this)} style={{ color: '#333', float: 'right' }}></i></div><div class="m-emoji-selector-list"><span tabindex="0" class="m-emoji ng-star-inserted" title="ELECTRIC LIGHT BULB">💡</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH TEARS OF JOY">😂</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK HEART SUIT">♥</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HEAVY BLACK HEART">❤</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH HEART-SHAPED EYES">😍</span><span tabindex="0" class="m-emoji ng-star-inserted" title="UNAMUSED FACE">😒</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH SMILING EYES">😊</span><span tabindex="0" class="m-emoji ng-star-inserted" title="LOUDLY CRYING FACE">😭</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE THROWING A KISS">😘</span><span tabindex="0" class="m-emoji ng-star-inserted" title="TWO HEARTS">💕</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE SMILING FACE">☺</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WEARY FACE">😩</span><span tabindex="0" class="m-emoji ng-star-inserted" title="OK HAND SIGN">👌</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PENSIVE FACE">😔</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMIRKING FACE">😏</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GRINNING FACE WITH SMILING EYES">😁</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WINKING FACE">😉</span><span tabindex="0" class="m-emoji ng-star-inserted" title="THUMBS UP SIGN">👍</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PERSON WITH FOLDED HANDS">🙏</span><span tabindex="0" class="m-emoji ng-star-inserted" title="RELIEVED FACE">😌</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK UNIVERSAL RECYCLING SYMBOL">♻</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FLUSHED FACE">😳</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PERSON RAISING BOTH HANDS IN CELEBRATION">🙌</span><span tabindex="0" class="m-emoji ng-star-inserted" title="MULTIPLE MUSICAL NOTES">🎶</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SEE-NO-EVIL MONKEY">🙈</span><span tabindex="0" class="m-emoji ng-star-inserted" title="VICTORY HAND">✌</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH SUNGLASSES">😎</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CRYING FACE">😢</span><span tabindex="0" class="m-emoji ng-star-inserted" title="EYES">👀</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH OPEN MOUTH AND COLD SWEAT">😅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SPARKLES">✨</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SLEEPING FACE">😴</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH OPEN MOUTH AND SMILING EYES">😄</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PURPLE HEART">💜</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HUNDRED POINTS SYMBOL">💯</span><span tabindex="0" class="m-emoji ng-star-inserted" title="EXPRESSIONLESS FACE">😑</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SPARKLING HEART">💖</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BROKEN HEART">💔</span><span tabindex="0" class="m-emoji ng-star-inserted" title="INFORMATION DESK PERSON">💁</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLUE HEART">💙</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CONFUSED FACE">😕</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH STUCK-OUT TONGUE AND WINKING EYE">😜</span><span tabindex="0" class="m-emoji ng-star-inserted" title="DISAPPOINTED FACE">😞</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE SAVOURING DELICIOUS FOOD">😋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="NEUTRAL FACE">😐</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CLAPPING HANDS SIGN">👏</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SLEEPY FACE">😪</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HEART WITH ARROW">💘</span><span tabindex="0" class="m-emoji ng-star-inserted" title="REVOLVING HEARTS">💞</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GROWING HEART">💗</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SPEAK-NO-EVIL MONKEY">🙊</span><span tabindex="0" class="m-emoji ng-star-inserted" title="RAISED HAND">✋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="KISS MARK">💋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE RIGHT POINTING BACKHAND INDEX">👉</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CHERRY BLOSSOM">🌸</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE SCREAMING IN FEAR">😱</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH HORNS">😈</span><span tabindex="0" class="m-emoji ng-star-inserted" title="LEFTWARDS BLACK ARROW">⬅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="POUTING FACE">😡</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FIRE">🔥</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH OPEN MOUTH">😃</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FISTED HAND SIGN">👊</span><span tabindex="0" class="m-emoji ng-star-inserted" title="TIRED FACE">😫</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PARTY POPPER">🎉</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES">😝</span><span tabindex="0" class="m-emoji ng-star-inserted" title="ROSE">🌹</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK SUN WITH RAYS">☀</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FLEXED BICEPS">💪</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH LOOK OF TRIUMPH">😤</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SKULL">💀</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH COLD SWEAT">😓</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE LEFT POINTING BACKHAND INDEX">👈</span><span tabindex="0" class="m-emoji ng-star-inserted" title="YELLOW HEART">💛</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES">😆</span><span tabindex="0" class="m-emoji ng-star-inserted" title="NEW MOON WITH FACE">🌚</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HEAVY CHECK MARK">✔</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CAMERA">📷</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING CAT FACE WITH HEART-SHAPED EYES">😻</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WAVING HAND SIGN">👋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH MEDICAL MASK">😷</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PERSEVERING FACE">😣</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GREEN HEART">💚</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GRINNING FACE">😀</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BEATING HEART">💓</span><span tabindex="0" class="m-emoji ng-star-inserted" title="KISSING FACE WITH CLOSED EYES">😚</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CROWN">👑</span><span tabindex="0" class="m-emoji ng-star-inserted" title="DISAPPOINTED BUT RELIEVED FACE">😥</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK RIGHT-POINTING TRIANGLE">▶</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH STUCK-OUT TONGUE">😛</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HEADPHONE">🎧</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CONFOUNDED FACE">😖</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE HEAVY CHECK MARK">✅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH HALO">😇</span><span tabindex="0" class="m-emoji ng-star-inserted" title="ANGRY FACE">😠</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PISTOL">🔫</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HAPPY PERSON RAISING ONE HAND">🙋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GLOWING STAR">🌟</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GRIMACING FACE">😬</span><span tabindex="0" class="m-emoji ng-star-inserted" title="THUMBS DOWN SIGN">👎</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK RIGHTWARDS ARROW">➡</span><span tabindex="0" class="m-emoji ng-star-inserted" title="DANCER">💃</span><span tabindex="0" class="m-emoji ng-star-inserted" title="MUSICAL NOTE">🎵</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITHOUT MOUTH">😶</span><span tabindex="0" class="m-emoji ng-star-inserted" title="RAISED FIST">✊</span><span tabindex="0" class="m-emoji ng-star-inserted" title="DIZZY SYMBOL">💫</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH NO GOOD GESTURE">🙅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="COLLISION SYMBOL">💥</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE DOWN POINTING BACKHAND INDEX">👇</span><span tabindex="0" class="m-emoji ng-star-inserted" title="LARGE RED CIRCLE">🔴</span><span tabindex="0" class="m-emoji ng-star-inserted" title="COPYRIGHT SIGN">©</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PILE OF POO">💩</span><span tabindex="0" class="m-emoji ng-star-inserted" title="THOUGHT BALLOON">💭</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GEM STONE">💎</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SLICE OF PIZZA">🍕</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH OK GESTURE">🙆</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH OPEN MOUTH AND COLD SWEAT">😰</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PENGUIN">🐧</span><span tabindex="0" class="m-emoji ng-star-inserted" title="TONGUE">👅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SUN WITH FACE">🌞</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PEDESTRIAN">🚶</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CAT FACE WITH TEARS OF JOY">😹</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SPLASHING SWEAT SYMBOL">💦</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SLEEPING SYMBOL">💤</span><span tabindex="0" class="m-emoji ng-star-inserted" title="LEAF FLUTTERING IN WIND">🍃</span><span tabindex="0" class="m-emoji ng-star-inserted" title="AIRPLANE">✈</span></div></div>

                                                                        </li>

                                                                        <li>
                                                                            <button className="post_Data" id="pay_now" type="submit">Post</button>
                                                                        </li>
                                                                    </ul>
                                                                    <br />
                                                                    <div className="image_preview_area">
                                                                        {this.state.image_preview || this.state.detailPost.file ?
                                                                            <>
                                                                                <i className="fa fa-times image_remove" onClick={this.removeImage.bind(this)} aria-hidden="true"></i>

                                                                                {this.state.file_type === 'video' || this.state.detailPost.file_type == 'video' ? <Player className="preview_image_data" src={(this.state.image_preview != '') ? this.state.image_preview : this.state.detailPost.file} /> : <img className="preview_image_data" src={(this.state.image_preview != '') ? this.state.image_preview : this.state.detailPost.file} alt="No Data" />}

                                                                                {/* <video className="preview_image_data" ref="vidRef" src={this.state.image_preview} type="video/mp4"></video> */}
                                                                            </>
                                                                            : ''}
                                                                    </div>
                                                                </div>
                                                            </form>




                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <!-- add post new box --> */}


                                                {/* //======================  Update Modal */}



                                                <div className="loadMore">

                                                    {codeData1 ? '' : <div className="text-center">Nothing More To Load</div>}

                                                    {this.state.listTimeline.map(item => (
                                                        <>


                                                            <div className="central-meta item" key={item.post_id}>

                                                                <div className="user-post">
                                                                    <div className="friend-info">
                                                                        {this.loginData.id === item.user_id ? <div className="dropdown three_dots">

                                                                            <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                            <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                {/* <a className="dropdown-item" href="javascript:;">Share</a> */}
                                                                                {/* <FacebookShareButton>Share</FacebookShareButton>
                                                                            <FacebookShareCount url={item.message} /> */}
                                                                                {/* <TwitterShareButton
                                                                                    url="https://"
                                                                                    title={item.message}
                                                                                    className="Demo__some-network__share-button">
                                                                                    <TwitterIcon
                                                                                        size={32}
                                                                                        round />
                                                                                </TwitterShareButton> */}
                                                                                <a className="dropdown-item" style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#myModalShare" onClick={this.postShare.bind(this, item)}>Share</a>
                                                                                <a className="dropdown-item" href="javascript:;" onClick={this.postDelete.bind(this, item)}>Delete</a>
                                                                                <a className="dropdown-item" href="javascript:;" onClick={this.postEdit.bind(this, item)}>Edit Post</a>
                                                                                {/* <a className="dropdown-item" href="javascript:;">Something else here</a> */}


                                                                            </div>
                                                                        </div> :
                                                                            <div className="dropdown three_dots">

                                                                                <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                    className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                                <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                    <a className="dropdown-item" style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#myModalShare" onClick={this.postShare.bind(this, item)}>Share</a>
                                                                                    <a className="dropdown-item" href="javascript:;" onClick={this.postBlock.bind(this, item)}>Block User</a>
                                                                                    {item.is_following === '0' ? <a className="dropdown-item" href="javascript:;" onClick={this.postFollow.bind(this, item)}>Follow User</a> : <a className="dropdown-item" href="javascript:;" onClick={this.postFollow.bind(this, item)}>Unfollow User</a>}

                                                                                </div>
                                                                            </div>}
                                                                        <figure>
                                                                            <Link to={`/timeLine/${item.user_id}`}>
                                                                                <img src={item.profile_pic} style={{ width: '44px', height: '43px', objectFit: 'cover' }} alt="" />
                                                                            </Link>
                                                                        </figure>

                                                                        <div className="friend-name">

                                                                            <ins>
                                                                                {item.is_repost === '1' ? <span><i className="fa fa-exchange" style={{ marginRight: '5px' }}></i></span> : ''}

                                                                                <Link to={`/timeLine/${item.user_id}`} title="">{item.full_name}</Link></ins>
                                                                            <div className="time_line_ago">published: {item.duration}</div>
                                                                        </div>
                                                                        <div className="post-meta">


                                                                            <div id={"print_post_area" + item.post_id} style={{ display: item.is_nsfw === '0' ? "" : "none" }}>
                                                                                {item.file_type === 'video' ?
                                                                                    <Player src={item.file} /> :
                                                                                    <>
                                                                                        {item.file === '' ? '' :
                                                                                            // <a href="javascript:;" data-toggle="modal" data-target="#myModal">
                                                                                            <img className="image_post_css" style={{ height: 'auto', width: '545px' }} onClick={this.imagePast.bind(this, item)} src={item.file} alt="" />
                                                                                            // </a>
                                                                                        }

                                                                                    </>
                                                                                }

                                                                                {item.is_repost === '0' ? <div className="description">

                                                                                    <p className="newLineText" dangerouslySetInnerHTML={{ __html: item.message }}>

                                                                                    </p>


                                                                                    {item.hashtag_link.map(hashtagitem => (

                                                                                        <span style={{ cursor: 'pointer' }} onClick={this.hashtagListData.bind(this, hashtagitem)}>
                                                                                            {hashtagitem.hashtag}&nbsp;
                                                                                        </span>
                                                                                    ))}
                                                                                </div> :
                                                                                    <>
                                                                                        <div className="description">

                                                                                            <p className="newLineText" dangerouslySetInnerHTML={{ __html: item.message }}>
                                                                                            </p>

                                                                                        </div>
                                                                                        <div className="central-meta item" style={{ height: '172px', overflowX: 'auto' }}>
                                                                                            <div className="user-post">
                                                                                                <div className="friend-info">
                                                                                                    <figure>
                                                                                                        <Link to={`/timeLine/${item.repost_user_id}`}>
                                                                                                            <img src={item.repost_profile_pic} alt="" style={{ height: '47px', width: '47px' }} />
                                                                                                        </Link>
                                                                                                    </figure>

                                                                                                    <div className="friend-name">
                                                                                                        <ins><Link to={`/timeLine/${item.repost_user_id}`}>{item.repost_user}</Link></ins>
                                                                                                        {item.group_id === '' ? '' : <Link to={`/groupdetail/${item.group_id}`}>
                                                                                                            <ins>({item.group_name})</ins></Link>}

                                                                                                        <span>published: {item.repost_duration}</span>
                                                                                                    </div>
                                                                                                    <div className="post-meta">
                                                                                                        <a data-toggle="modal" data-target="#myModal"><img src="images/resources/user-post.jpg" alt="" /></a>
                                                                                                        <div className="description">

                                                                                                            <p>
                                                                                                                {item.repost_comment}
                                                                                                                <img src={item.file} />
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </>}


                                                                            </div>
                                                                            <div className="m-activityNsfwConsent__container" id={"nsfw_post_area" + item.post_id} style={{ display: item.is_nsfw === '0' ? "none" : "" }}>
                                                                                <m-paywallbadge _nghost-m-app-c196="">
                                                                                </m-paywallbadge><i className="material-icons m-activityNsfwConsent__icon">
                                                                                    <i className="fa fa-lock nsfw_lock" aria-hidden="true"></i>
                                                                                </i><h2 className="m-activityNsfwConsent__title">NSFW</h2>
                                                                                <h3 className="m-activityNsfwConsent__reasons">{item.nsfw}</h3>
                                                                                <button className="m-activityNsfwConsent__button" onClick={this.aboveEighteen.bind(this, item.post_id)}> I am over 18 years of age
                                                                                             </button>
                                                                            </div>


                                                                            <div className="we-video-info">
                                                                                <ul>
                                                                                    {/* <li>
                                                <span className="views" data-toggle="tooltip" title="views">
                                                    <i className="fa fa-eye"></i>
                                                    <ins>1.2k</ins>
                                                </span>
                                            </li> */}

                                                                                    <li onClick={this.submitLike.bind(this, item)}>
                                                                                        <span className="like" data-toggle="tooltip">
                                                                                            {item.user_like === '0' ? <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> : <i className="fa fa-thumbs-up" aria-hidden="true"></i>}
                                                                                            <ins>{item.like_count}</ins>
                                                                                        </span>
                                                                                    </li>
                                                                                    <li onClick={this.submitdisLike.bind(this, item)}>
                                                                                        <span className="dislike" data-toggle="tooltip">
                                                                                            {item.user_dislike === '0' ? <i className="fa fa-thumbs-o-down" style={{ color: '#000' }}></i> : <i className="fa fa-thumbs-o-down"></i>}


                                                                                            <ins>{item.dislike_count}</ins>
                                                                                        </span>
                                                                                    </li>

                                                                                    <li>
                                                                                        <span className="comment" data-toggle="tooltip">

                                                                                            <a data-toggle="modal" href="javascript:;" onClick={this.exchangeDetail.bind(this, item)} data-target="#myModalExchange"><i className="fa fa-exchange"></i></a>

                                                                                            <ins>{item.repost_count}</ins>
                                                                                        </span>
                                                                                    </li>

                                                                                    {this.loginData?.id === item.user_id ? '' : <li className="pull-right" onClick={this.detailCrowd.bind(this, item)} style={{ marginRight: '5px', cursor: 'pointer' }}>
                                                                                        <a data-toggle="modal" href="javascript:;" data-target="#myModal2" ><span>Reward&nbsp;<i className="fa fa-dollar"></i></span></a>
                                                                                    </li>}

                                                                                    <li>
                                                                                        <span className="comment" data-toggle="tooltip" title="Comments">
                                                                                            <i className="fa fa-comments-o"></i>
                                                                                            <ins>{item.comments_count}</ins>
                                                                                        </span>
                                                                                    </li>

                                                                                </ul>
                                                                                {(item.comments_count > 0) ?
                                                                                    <div><a href="javascript:;" onClick={this.show_hide_comment.bind(this, item.post_id)}>View {item.comments_count} comments</a></div>
                                                                                    : ''
                                                                                }
                                                                            </div>

                                                                        </div>
                                                                    </div>


                                                                    {/* Modal of Crowd Funding */}


                                                                    <div className="modal" id="myModal2">
                                                                        <div className="modal-dialog box_width">
                                                                            <div className="modal-content">
                                                                                {/* <!-- Modal Header --> */}
                                                                                <div className="modal-header">
                                                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                                                </div>
                                                                                {/* <!-- Modal body --> */}
                                                                                <div className="m-wireCreator__ownerBlock ">
                                                                                    <div className="m-wireCreatorOwnerBlock__channelBanner">
                                                                                        <div className="m-wireCreatorOwnerBlockChannelBanner__background">
                                                                                            <img src={crowdDetail1?.background_image} alt="Nothing Found" style={{ width: '837px', height: '166px' }} />
                                                                                        </div>
                                                                                        <div className="minds-avatar" style={{ top: '90px' }}>
                                                                                            <img src={crowdDetail1?.profile_pic} alt="Nothing Found" style={{ borderRadius: '50%', height: '85px', width: '85px' }} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="m-wireCreatorOwnerBlock__heading">
                                                                                        <div className="m-wireCreatorOwnerBlockHeading__title" style={{ marginTop: '45px' }}>
                                                                                            <span >Pay</span>&nbsp;
                  <span >
                                                                                                <i className="material-icons   fa fa-angle-right" style={{ fontSize: '1em' }}></i>
                                                                                            </span>
                                                                                            &nbsp;
                  <span >{crowdDetail1?.full_name}</span>
                                                                                        </div>
                                                                                        <div className="m-wireCreatorOwnerBlock__username">@{crowdDetail1?.full_name}</div>
                                                                                    </div>
                                                                                    <div className="m-wireCreatorForm__fieldset">
                                                                                        <div className="m-wireCreatorForm__fields ">
                                                                                            <div className="m-wireCreatorForm__field">
                                                                                                <label className="m-wireCreatorForm__label">Tokens</label>
                                                                                                <input type="text" state={this.state.token} name="token" onChange={this.tokenChange}
                                                                                                    placeholder="0" data-cy="wire-v2-amount" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="m-wireCreatorForm__fields">
                                                                                            <div className="m-wireCreatorForm__field ">
                                                                                                <div className="m-wireCreatorForm__label"> Wallet Type </div>
                                                                                                <div className="m-wireCreatorForm__toggleContainer">
                                                                                                    <span className="m-wireCreatorForm__toggleLabel">On-chain</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="m-wireCreatorForm__field ">
                                                                                                <div className="m-wireCreatorForm__label"> Wallet Balance </div>
                                                                                                <span className="m-wireCreatorForm__value "> {this.state.walletBalance?.fcell_balance}</span>
                                                                                            </div>
                                                                                            {/* <div className="m-wireCreatorForm__field m-wireCreatorForm__field--recurring ">
                                                                                                <label for="m-wireCreatorForm__recurring" className="m-wireCreatorForm__label">Repeat Payment Monthly</label>
                                                                                                <div className="checkbox">
                                                                                                    <label>
                                                                                                        <input type="checkbox" checked="checked" /><i className="check-box"></i>Repeat &nbsp;<span className="fa fa-question"></span>
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div> */}
                                                                                        </div>
                                                                                        {/* <!-- Modal footer --> */}
                                                                                        <div className="modal-footer">
                                                                                            <div className="m-poweredBy col-sm-6" ><img className="m-poweredBy__bulb" alt="Nothing Found" src="http://espsofttechnologies.com/favicon.ico" /><span className="m-poweredBy__text"> Powered by <a href="/pay">Freedom Cell Pay</a></span></div>
                                                                                            <div className="m-wireCreatorToolbar__message col-sm-4">
                                                                                                <div className="m-wireCreatorToolbarMessage__error "> Cannot spend more than {this.state.walletBalance?.fcell_balance} tokens </div>
                                                                                                {/*  */}
                                                                                            </div>

                                                                                            {/* <button type="submit" disabled={!this.state.token} onClick={this.tipAPI} className="btn btn-primary" >Send {this.state.token} tokens</button> */}
                                                                                            <button type="submit" disabled={!this.state.token || parseInt(this.state.token) > parseInt(this.state.walletBalance?.fcell_balance)} onClick={this.tipAPI} className="btn btn-primary" >Send {this.state.token} tokens</button>


                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="coment-area" >
                                                                        <ul className="we-comet" id={"comment_box" + item.post_id} style={{ display: item.comments.length > 3 ? 'none' : '' }}>
                                                                            {item.comments ? item.comments.map(item1 => (
                                                                                <li key={item1.post_comment_id}>
                                                                                    <>

                                                                                        <div className="comet-avatar">
                                                                                            <img src={item1.profile_pic} alt="" />
                                                                                        </div>
                                                                                        <div className="we-comment" >

                                                                                            <div className="coment-head">
                                                                                                {this.loginData.id === item1.user_id ? <div className="dropdown three_dots" style={{ fontSize: '17px' }}>

                                                                                                    <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                                        className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                                                    <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                                        <a className="dropdown-item" href="javascript:;" onClick={this.postCommentDelete.bind(this, item1)}>Delete</a>
                                                                                                        {/* <a className="dropdown-item" href="javascript:;">Another action</a>
                                <a className="dropdown-item" href="javascript:;">Something else here</a> */}
                                                                                                    </div>
                                                                                                </div> : ''}
                                                                                                <h5><Link to={`/timeLine/${item1.user_id}`} title="">{item1.full_name}</Link></h5>
                                                                                                <span>{item1.duration}</span>
                                                                                                <a className="we-reply" href="javascript:;" onClick={this.reply_box.bind(this, item1)} title="Reply"><i className="fa fa-reply"></i> {item1.reply_count > 0 ? item1.reply_count + ' Replies' : ''} </a>
                                                                                            </div>
                                                                                            <p className="newLineText" dangerouslySetInnerHTML={{ __html: item1.comment }}></p>
                                                                                            {item1.file ? item1.file_type === 'video' ? <Player src={item1.file} alt="" style={{ width: '100%', height: '160px' }} /> :
                                                                                                <img src={item1.file} alt="" style={{ width: '100%', height: '160px' }} /> : ''}


                                                                                        </div>
                                                                                        <ul>
                                                                                            {/* <br/> */}
                                                                                            <li className="post-comment" id={"reply_box" + item1.post_comment_id} style={{ display: 'none', marginLeft: '63px', marginTop: '10px' }}>
                                                                                                <div className="comet-avatar">
                                                                                                    <img src={this.state.bannerImage?.avatar} alt="" />
                                                                                                </div>
                                                                                                <div className="post-comt-box" style={{ width: '77%' }}>
                                                                                                    <form className="main_msg_area1">
                                                                                                        <TextareaAutosize id={"message2" + item1.post_comment_id} placeholder="Post your comment"/>
                                                                                                        <div className="add-smiles" style={{ top: '10%' }}>
                                                                                                            {/* <span className="em em-expressionless" title="add icon"> */}
                                                                                                            <i className="fa fa-picture-o post_commentcss" aria-hidden="true"></i> &nbsp;
                                        <label className="fileContainer image_uploadcontainer"><input type="file" accept=".jpg,.jpeg,.png,.mp4" id={"imgg" + item1.post_comment_id} onChange={this.handleImagePreview2.bind(this, item1.post_comment_id)} /></label>
                                                                                                            <i className="fa fa-paper-plane post_commentcss" type="submit" id="send_btn1" onClick={this.replyOnReplyComment.bind(this, item1)} aria-hidden="true"></i>
                                                                                                        </div>

                                                                                                        {/* </span> */}

                                                                                                    </form>
                                                                                                    {this.state.image_preview2 && this.state.img_post_cmt_id === item1.post_comment_id ?
                                                                                                        <>
                                                                                                            {this.state.file_type === 'video' ? <Player id={"cmt_imgg" + item1.post_comment_id} className="preview_image_data" src={this.state.image_preview2} />
                                                                                                                : <img id={"cmt_imgg" + item1.post_comment_id} className="preview_image_data" src={this.state.image_preview2} alt="No Data" />}

                                                                                                        </>
                                                                                                        : ''}
                                                                                                </div>


                                                                                                <ul>
                                                                                                    {item1.reply ? item1.reply.map(item2 => (

                                                                                                        <li key={item2.post_comment_reply_id}>

                                                                                                            <div className="comet-avatar comment_data">
                                                                                                                <img src={item2.profile_pic} alt="" />
                                                                                                            </div>
                                                                                                            <div className="we-comment comment_data1" >

                                                                                                                <div className="coment-head">
                                                                                                                    {this.loginData.id === item2.user_id ? <div className="dropdown three_dots" style={{ fontSize: '15px' }}>

                                                                                                                        <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                                                            className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                                                                        <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                                                            <a className="dropdown-item" href="javascript:;" onClick={this.postCommentReplyDelete.bind(this, item2)}>Delete</a>
                                                                                                                            {/* <a className="dropdown-item" href="javascript:;">Another action</a>
                                <a className="dropdown-item" href="javascript:;">Something else here</a> */}
                                                                                                                        </div>
                                                                                                                    </div> : ''}
                                                                                                                    <h5><Link to={`/timeLine/${item2.user_id}`} title="">{item2.full_name}</Link></h5>
                                                                                                                    <span>{item2.duration}</span>

                                                                                                                </div>
                                                                                                                <p className="newLineText" dangerouslySetInnerHTML={{ __html: item2.reply }}>

                                                                                                                </p>
                                                                                                                {item2.file ? item2.file_type === 'video' ? <Player src={item2.file} alt="" style={{ width: '100%', height: '160px' }} /> : <img src={item2.file} alt="" style={{ width: '100%', height: '160px' }} />
                                                                                                                    : ''}

                                                                                                            </div>


                                                                                                        </li>

                                                                                                    )) : ''}
                                                                                                </ul>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </>

                                                                                </li>
                                                                            )) : ''}





                                                                        </ul>
                                                                        <ul className="toggle_post_css">
                                                                            <li className="post-comment">
                                                                                <div className="comet-avatar">
                                                                                    <img src={this.state.bannerImage?.avatar} alt="" />
                                                                                </div>
                                                                                <div className="post-comt-box">
                                                                                    <form className="main_msg_area">
                                                                                        <TextareaAutosize id={"message1" + item.post_id} placeholder="Post your comment"/>
                                                                                        <div className="add-smiles">
                                                                                            {/* <span className="em em-expressionless" title="add icon"> */}
                                                                                            <i className="fa fa-picture-o post_commentcss" aria-hidden="true"></i> &nbsp;
                                        <label className="fileContainer image_uploadcontainer"><input type="file" accept=".jpg,.jpeg,.png,.mp4" id={"img" + item.post_id} onChange={this.handleImagePreview1.bind(this, item.post_id)} /></label>
                                                                                            <i className="fa fa-paper-plane post_commentcss" type="submit" id="send_btn" onClick={this.replyOnComment.bind(this, item)} aria-hidden="true"></i>
                                                                                        </div>

                                                                                        {/* </span> */}

                                                                                    </form>
                                                                                </div>
                                                                                {this.state.image_preview1 && this.state.img_post_id === item.post_id ?
                                                                                    <>
                                                                                        {this.state.file_type === 'video' ? <Player id={"cmt_img" + item.post_id} className="preview_image_data" src={this.state.image_preview1} /> : <img id={"cmt_img" + item.post_id} className="preview_image_data" src={this.state.image_preview1} alt="No Data" />}

                                                                                    </>
                                                                                    : ''}
                                                                            </li>

                                                                        </ul>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}

                                                </div>
                                            </div>

                                            <div className="col-lg-3 setStick">
                                                <aside className="sidebar static">
                                                    <div className="m-sidebarWidget">
                                                        <h2 className="m-sidebarWidget__title">Suggested Users</h2>
                                                        <div className="m-sidebarWidget__body">
                                                            <ul className="m-suggestionsSidebar__list ">
                                                                {this.state.suggestedChannelList.map(item => {
                                                                    return <li className="m-suggestionsSidebarList__item m-suggestionsSidebarList__item--user ">
                                                                        <div className="m-suggestionsSidebarListItem__avatar">
                                                                            <img style={{ borderRadius: '50%', height: '35px', width: '35px' }} src={item.profile_pic} />
                                                                        </div>
                                                                        <div className="m-suggestionsSidebarListItem__body">
                                                                            <Link to={`/timeline/${item.user_id}`} onClick={this.groupDetail.bind(this, item.id)} className="">
                                                                                <div>
                                                                                    <h4 >{item.full_name}</h4>
                                                                                    <span title="follower">
                                                                                        {item.follower}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="m-layout__spacer"></div>
                                                                            </Link>
                                                                            <div className="" style={{ textAlign: 'end' }}>
                                                                                <a onClick={this.deleteChannnels.bind(this, item)}>
                                                                                    <i className="fa fa-close m-suggestionsSidebarListItem__passBtn" style={{ cursor: 'pointer' }} ></i>
                                                                                </a>
                                                                                <minds-button-subscribe >

                                                                                    <button type="submit" onClick={this.joinGroup.bind(this, item)} className="m-btn m-btn--with-icon m-btn--subscribe ">
                                                                                        <i className="fa fa-user-plus"></i>
                                                                                        <span>
                                                                                        </span>
                                                                                    </button>
                                                                                </minds-button-subscribe>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                })}

                                                            </ul>

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

                                                        </div>
                                                    </div>
                                                </aside>


                                                <aside className="sidebar static">
                                                    <div className="m-sidebarWidget">
                                                        {this.state.showVotingList.map(item => (
                                                            <>
                                                                <h2 className="m-sidebarWidget__title voting_title">{item.title}</h2>
                                                                <hr className="vote_hr" />
                                                                <div className="m-sidebarWidget__body voting_body">
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="panel panel-primary">

                                                                                    <div className="panel-body">
                                                                                        <ul className="list-group list_vote">

                                                                                            {this.state.showVotingListGraph.length === 0 ?

                                                                                                item.options.map(item1 => (
                                                                                                    <li className="list-group-item voting_li">
                                                                                                        <div className="form-radio">
                                                                                                            <div className="radio">
                                                                                                                <label>
                                                                                                                    <input type="radio" onChange={this.onChange} value={item1.id} name="radio" /><i className="check-box"></i>{item1.options}
                                                                                                                </label>
                                                                                                            </div>

                                                                                                        </div>

                                                                                                    </li>

                                                                                                ))
                                                                                                :
                                                                                                this.state.showVotingListGraph.map(item => (
                                                                                                    <>
                                                                                                        <div class="col-sm-12">
                                                                                                            <span>{item.options}</span>
                                                                                                            <div class="progress" style={{ height: "10px" }}>
                                                                                                                <div class="progress-bar" title={`Total vote ${item.vote_count}`} style={{ width: item.percent + '%', height: "10px" }}></div>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                    </>
                                                                                                ))
                                                                                            }




                                                                                        </ul>




                                                                                    </div>
                                                                                    {this.state.showVotingListGraph.length === 0 ?
                                                                                        <div className="panel-footer mt-2 vote_footer">
                                                                                            <button type="button" className="btn btn-primary btn-sm mr-3 vote_button" onClick={this.userVoting.bind(this, item.id)}>
                                                                                                Vote</button>
                                                                                        </div> : ''}

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </>
                                                        ))}
                                                    </div>
                                                </aside>



                                                <div m-pagelayout__pane="right" className="m-newsfeed--boost-sidebar m-newsfeed__sidebar m-pageLayout__pane--right ng-star-inserted hastagsection">
                                                    <div className="m-pageLayoutPane__inner">
                                                        <div m-stickysidebar="" className="m-pageLayoutPane__sticky"
                                                            style={{ position: 'sticky', top: '95px' }}>
                                                            <m-language__sidebarprompt>
                                                            </m-language__sidebarprompt><m-suggestions__sidebar type="user"
                                                                _nghost-m-app-c330="">
                                                            </m-suggestions__sidebar>
                                                            <m-discovery__sidebartags _nghost-m-app-c376=""
                                                                className="ng-star-inserted"><m-sidebarwidget _ngcontent-m-app-c376="">
                                                                    <div className="m-sidebarWidget" style={{ width: '94%' }}>
                                                                        <h2 className="m-sidebarWidget__title">Tags for you</h2>
                                                                        <div _ngcontent-m-app-c376="" className="m-sidebarWidget__body">
                                                                            <m-loadingspinner _ngcontent-m-app-c376="" className="ng-tns-c83-174">
                                                                            </m-loadingspinner><ul _ngcontent-m-app-c376="">
                                                                                {this.state.suggestedHashTagList.map(item => (

                                                                                    <li _ngcontent-m-app-c376="" className="m-discoveryTrends__trend ng-star-inserted" onClick={this.hashtagListData.bind(this, item)} style={{ listStyle: 'none' }}>
                                                                                        <a _ngcontent-m-app-c376="" href="javascript:;">
                                                                                            <div _ngcontent-m-app-c376=""><h5 _ngcontent-m-app-c376="">{item.hashtag}</h5>
                                                                                                <div _ngcontent-m-app-c376="" className="m-discoveryTrendListItem__supportingText--below ng-star-inserted">
                                                                                                    <span _ngcontent-m-app-c376="">{item.post_count} posts</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </a>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div></m-sidebarwidget></m-discovery__sidebartags><div className="m-spacer"></div><m-ads-boost limit="8" className="m-ad-block m-ad-block-boosts ng-star-inserted">
                                                                <br />
                                                            </m-ads-boost><div className="m-spacer"></div></div></div></div>

                                                <aside className="sidebar static">
                                                    <div className="widget friend-list stick-widget">
                                                        <div className="central-meta">
                                                            <div className="frnds">
                                                                <ul className="nav nav-tabs" style={{ flexWrap: 'inherit' }}>
                                                                    <li className="nav-item"><a className="active" href="#frends" data-toggle="tab">Friends</a> </li>
                                                                    <li className="nav-item" style={{ marginRight: '70px' }}><a className="" href="#frends-req" data-toggle="tab">Group</a></li>
                                                                </ul>
                                                                <div className="tab-content">
                                                                    <div className="tab-pane active fade show" id="frends">
                                                                        <ul id="people-list" className="friendz-list" style={{ marginLeft: '-43px' }}>
                                                                            {codeDataFriends1 ? '' : <div className="text-center">No Friends Yet!</div>}

                                                                            {this.state.listFriends.map(item => (
                                                                                <li>
                                                                                    <figure>
                                                                                        <img src={item.profile_pic} alt="" />
                                                                                    </figure>
                                                                                    <div className="friendz-meta">
                                                                                        <Link to={`/timeLine/${item.id}`}
                                                                                            onClick={this.loading.bind(this, item.id)}>{item.full_name}</Link>
                                                                                    </div>
                                                                                </li>
                                                                            ))}
                                                                        </ul>

                                                                        <div className="chat-box">
                                                                            <div className="chat-head">
                                                                                <h6>Bucky Barnes</h6>
                                                                                <div className="more">
                                                                                    <span><i className="ti-more-alt"></i></span>
                                                                                    <span className="close-mesage"><i className="ti-close"></i></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="chat-list">
                                                                                <ul id="people-list" className="friendz-list">
                                                                                    <li>
                                                                                        <figure>
                                                                                            <img src="../../friend-avatar.jpg" alt="" />
                                                                                        </figure>
                                                                                        <div className="friendz-meta">
                                                                                            <a href="time-line.html">bucky barnes</a>
                                                                                            <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="ddaab4b3a9b8afaeb2b1b9b8af9dbab0bcb4b1f3beb2b0">[email&#160;protected]</a></i>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <figure>
                                                                                            <img src="../../friend-avatar2.jpg" alt="" />
                                                                                            <span className="status f-away"></span>
                                                                                        </figure>
                                                                                        <div className="friendz-meta">
                                                                                            <a href="time-line.html">Sarah Loren</a>
                                                                                            <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="e28083908c8791a2858f838b8ecc818d8f">[email&#160;protected]</a></i>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <figure>
                                                                                            <img src="../../friend-avatar3.jpg" alt="" />
                                                                                            <span className="status f-off"></span>
                                                                                        </figure>
                                                                                        <div className="friendz-meta">
                                                                                            <a href="time-line.html">jason borne</a>
                                                                                            <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="abc1cad8c4c5c9ebccc6cac2c785c8c4c6">[email&#160;protected]</a></i>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <figure>
                                                                                            <img src="../../friend-avatar4.jpg" alt="" />
                                                                                            <span className="status f-off"></span>
                                                                                        </figure>
                                                                                        <div className="friendz-meta">
                                                                                            <a href="time-line.html">Cameron diaz</a>
                                                                                            <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="2c464d5f43424e6c4b414d4540024f4341">[email&#160;protected]</a></i>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>

                                                                                        <figure>
                                                                                            <img src="../../friend-avatar5.jpg" alt="" />
                                                                                        </figure>
                                                                                        <div className="friendz-meta">
                                                                                            <a href="time-line.html">daniel warber</a>
                                                                                            <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="83e9e2f0ecede1c3e4eee2eaefade0ecee">[email&#160;protected]</a></i>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>

                                                                                        <figure>
                                                                                            <img src="../../friend-avatar6.jpg" alt="" />
                                                                                            <span className="status f-away"></span>
                                                                                        </figure>
                                                                                        <div className="friendz-meta">
                                                                                            <a href="time-line.html">andrew</a>
                                                                                            <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="f19b90829e9f93b1969c90989ddf929e9c">[email&#160;protected]</a></i>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>

                                                                                        <figure>
                                                                                            <img src="../../friend-avatar7.jpg" alt="" />
                                                                                            <span className="status f-off"></span>
                                                                                        </figure>
                                                                                        <div className="friendz-meta">
                                                                                            <a href="time-line.html">amy watson</a>
                                                                                            <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="4822293b27262a082f25292124662b2725">[email&#160;protected]</a></i>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>

                                                                                        <figure>
                                                                                            <img src="../../friend-avatar5.jpg" alt="" />
                                                                                        </figure>
                                                                                        <div className="friendz-meta">
                                                                                            <a href="time-line.html">daniel warber</a>
                                                                                            <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="731912001c1d1133141e121a1f5d101c1e">[email&#160;protected]</a></i>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>

                                                                                        <figure>
                                                                                            <img src="../../friend-avatar2.jpg" alt="" />
                                                                                            <span className="status f-away"></span>
                                                                                        </figure>
                                                                                        <div className="friendz-meta">
                                                                                            <a href="time-line.html">Sarah Loren</a>
                                                                                            <i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="0f6d6e7d616a7c4f68626e6663216c6062">[email&#160;protected]</a></i>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="tab-pane fade" id="frends-req">
                                                                        <ul id="people-list" className="friendz-list" style={{ marginLeft: '-43px' }}>
                                                                            {codeDataGroup1 ? '' : <div className="text-center">No Group Yet!</div>}

                                                                            {this.state.listGroup.map(item => (
                                                                                <li id="li_detailgroup" className={(this.state.urlGroup === item.id) ? 'active' : ''} key={item.id}>
                                                                                    <figure>
                                                                                        <img src={item.vatar} alt="" />
                                                                                    </figure>
                                                                                    <div className="friendz-meta">
                                                                                        <Link to={`/groupdetail/${item.id}`} onClick={this.groupDetail.bind(this, item.id)}>{item.group_name}</Link>
                                                                                    </div>
                                                                                </li>
                                                                            ))}
                                                                        </ul>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </aside>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                <Messaging />

                {/* // <!-- side panel -->     */}

                <div id="myModal3" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog2">
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">Tag</h3>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p className=""> Tagging your post will make your content more easily discoverable. Add up to five. </p>
                                <div className="m-composerTags__trending">
                                    <m-hashtags__trending>
                                        <ul className="m-hashtags__trending">
                                            <li className="m-hashtagsTrending__decoration "><img alt="" src="http://espsofttechnologies.com/favicon.ico" /></li>
                                            {/*  */}


                                            {this.state.listHashtags.map(item => (

                                                <li style={{ cursor: 'pointer' }} className=""><a>{item.hashtag}</a></li>
                                            ))}
                                            {/* <li className=""><a>#funny</a></li>
                                            <li className=""><a>#mindsth</a></li>
                                            <li className=""><a>#blacklivesmatter</a></li>
                                            <li className=""><a>#meme</a></li>
                                            <li className=""><a>#biden</a></li>
                                            <li className=""><a>#freedom</a></li>
                                            <li className=""><a>#coronavirus</a></li>
                                            <li className=""><a>#joebiden</a></li>
                                            <li className=""><a>#democrats</a></li> */}
                                            {/*  */}
                                        </ul>
                                    </m-hashtags__trending>
                                </div>
                                <div className="m-composerPopup__field">
                                    <label>Tag</label>
                                    <div className="m-composerTags__tagInput">
                                        <form onSubmit={this.submit_tag}>

                                            <m-hashtags__typeaheadinput placeholder="Enter tag" historykey="composer">
                                                <div className="m-hashtags__typeaheadInput">
                                                    <input type="text" name="input_tag" onKeyUp={this.AllHashtagListAPI.bind(this)} className="m-hashtagsTypeaheadInput__input form-control"
                                                        id="minds-m-composer__tags--1005-tags" placeholder="Enter tag" style={{ width: '400px' }} />
                                                    <ul className="m-hashtagsTypeaheadInput__list ng-star-inserted" style={{ display: "none" }}>

                                                        {this.state.listHashtag.map(item => {
                                                            return (<li className="m-hashtagsTypeaheadInputList__mruHeader ng-star-inserted" onClick={this.select_serach_tag.bind(this, item)}><a>{item.hashtag}</a></li>);
                                                        })}
                                                    </ul>
                                                    {/*  */}
                                                </div>
                                            </m-hashtags__typeaheadinput>
                                            <button className="btn btn-default" style={{ height: '40px' }} > Add </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="select_tag_area">
                                {(this.state.selecthashtag !== '') ?
                                    this.state.selecthashtag.map(item => {
                                        return (<span className="select_tag"><b>{item}</b><i className="fa fa-close"></i></span>)
                                    })
                                    : ''}

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={this.save_tag} >Save Tags</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* NSFW */}

                <div id="myModalNSFW" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog2">
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">NSFW</h3>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p className=""> If this post contains content that is NSFW (Not Safe for Work) it is your responsibility to tag it accordingly. Failing to do so will violate our terms of use.

</p>
                                <div className="nsfw_tag_area">
                                    {this.state.listNSFWtag.map(item => (
                                        <div className={($.inArray(item.nsfw, this.state.selectnsfw) !== -1) ? 'select_nsfw active' : 'select_nsfw '} style={{ marginLeft: '10px' }}>
                                            <>
                                                <a href="javascript:;">{item.nsfw}</a>
                                            </>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={this.save_nsfw} >Save NSFW</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image hover modal */}

                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content pad_spc">

                            <div className="modal-body img_modal">
                                <button type="button" style={{ padding: '10px' }} className="close" data-dismiss="modal">&times;</button>
                                <div className="row">
                                    <div className="col-sm-8 modal_bg_blck">
                                        <img className="ng-tns-c205-88 " src={this.state.dataImage.file} />
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="m-activity__ownerBlock ">
                                            <div className="aviator_circle"><a href=""><img className="m-border" src={this.state.dataImage.profile_pic} /></a></div>
                                            <div className="aviator__body">
                                                <a className="aviator__displayName" href="javascript:;">
                                                    <strong title="aman_gupta11">{this.state.dataImage.full_name}</strong>
                                                    <div className="div-activity">
                                                        <ul className="div">
                                                        </ul>
                                                    </div>
                                                </a>
                                                <a className="aviator__permalink " href="javascript:;">
                                                    <span className="aviatorPermalink__text--timestamp " title="Oct 8, 2020, 2:55:08 AM"> {this.state.dataImage.duration} </span>
                                                </a>
                                            </div>

                                            <div className="aviator__right">
                                                <div className="m-dropdown--v2">
                                                    <a className="m-postMenu__button"><i className="material-icons fa fa-ellipsis-v"></i></a>
                                                    <ul className="m-dropdown__list" >
                                                        <li className="m-dropdownList__item "> Share </li>
                                                        <span className="m-dropdownMenu__divider"></span>
                                                        <li disabled="" className="m-dropdownList__item "> Follow post </li>
                                                        <div></div>
                                                    </ul>
                                                </div>
                                                <div className="m-bgOverlay--v2" hidden=""></div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="m-activityModal__toolbarWrapper ">
                                            <div className="m-activity__toolbar">
                                                <div className="we-video-info">
                                                    <ul>
                                                        <li onClick={this.submitLike.bind(this, this.state.dataImage)}>
                                                            <span className="like" data-toggle="tooltip">
                                                                {this.state.dataImage?.user_like === '0' ? <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> : <i className="fa fa-thumbs-up" aria-hidden="true"></i>}
                                                                <ins>{this.state.dataImage?.like_count}</ins>
                                                            </span>
                                                        </li>
                                                        <li onClick={this.submitdisLike.bind(this, this.state.dataImage)}>
                                                            <span className="dislike" data-toggle="tooltip">
                                                                {this.state.dataImage?.user_dislike === '0' ? <i className="fa fa-thumbs-o-down" style={{ color: '#000' }}></i> : <i className="fa fa-thumbs-o-down"></i>}


                                                                <ins>{this.state.dataImage?.dislike_count}</ins>
                                                            </span>
                                                        </li>

                                                        <li>
                                                            <span className="comment" data-toggle="tooltip">

                                                                <a data-toggle="modal" href="javascript:;" onClick={this.exchangeDetail.bind(this, this.state.dataImage)} data-target="#myModalExchange"><i className="fa fa-exchange"></i></a>

                                                                <ins>{this.state.dataImage?.repost_count}</ins>
                                                            </span>
                                                        </li>

                                                        {this.loginData?.id === this.state.dataImage?.user_id ? '' : <li className="pull-right" onClick={this.detailCrowd.bind(this, this.state.dataImage)} style={{ marginRight: '5px', cursor: 'pointer' }}>
                                                            <a data-toggle="modal" href="javascript:;" data-target="#myModal2" ><span>Reward&nbsp;<i className="fa fa-dollar"></i></span></a>
                                                        </li>}

                                                        <li>
                                                            <span className="comment" data-toggle="tooltip" title="Comments">
                                                                <i className="fa fa-comments-o"></i>
                                                                <ins>{this.state.dataImage?.comments_count}</ins>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <div >
                                                    <a>
                                                        <i className="material-icons fa fa-thumbs-up"></i>
                                                    </a>
                                                </div>
                                                <div >
                                                    <a>
                                                        <i className="material-icons fa fa-thumbs-down"></i>
                                                    </a>
                                                </div>
                                                <div className="">
                                                    <a>
                                                        <i className="material-icons fa fa-exchange"></i>
                                                    </a>
                                                </div>
                                                <div className="">
                                                    <a>
                                                        <i className="material-icons  ">&#xe111;</i>
                                                    </a>
                                                </div>
                                                <div className="m-layout__spacer "></div> */}

                                            </div>
                                        </div>
                                        <div className="post-comment pcmt">
                                            <div className="comet-avatar">
                                                <img src={this.state.bannerImage?.avatar} alt="" />
                                            </div>

                                            <div className="post-comt-box">
                                                <form className="main_msg_area">
                                                    <textarea id={"messageImgPopup" + this.state.dataImage.post_id} placeholder="Write your comment"></textarea>
                                                    <div className="add-smiles">
                                                        <i className="fa fa-picture-o post_commentcss" aria-hidden="true"></i> &nbsp;
                                        <label className="fileContainer image_uploadcontainer"><input type="file" accept=".jpg,.jpeg,.png,.mp4" id={"img" + this.state.dataImage.post_id} onChange={this.handleImagePreview1.bind(this, this.state.dataImage.post_id)} /></label>
                                                        <i className="fa fa-paper-plane post_commentcss" type="submit" id="send_btn" onClick={this.replyOnCommentPic.bind(this, this.state.dataImage.post_id)} aria-hidden="true"></i>
                                                    </div>



                                                </form>
                                            </div>
                                            {this.state.image_preview1 && this.state.img_post_id === this.state.dataImage.post_id ?
                                                <>
                                                    {this.state.file_type === 'video' ? <Player id={"cmt_img" + this.state.dataImage.post_id} className="preview_image_data" src={this.state.image_preview1} /> : <img id={"cmt_img" + this.state.dataImage.post_id} className="preview_image_data" src={this.state.image_preview1} alt="No Data" />}

                                                </>
                                                : ''}

                                        </div>

                                        <div className="coment-area" >
                                            <ul className="we-comet" id={"comment_box" + this.state.dataImage?.post_id}>
                                                {this.state.dataImage?.comments ? this.state.dataImage?.comments.map(item1 => (
                                                    <li key={item1.post_comment_id}>
                                                        <>

                                                            <div className="comet-avatar">
                                                                <img src={item1.profile_pic} alt="" />
                                                            </div>
                                                            <div className="we-comment" >

                                                                <div className="coment-head">
                                                                    {this.loginData.id === item1.user_id ? <div className="dropdown three_dots" style={{ fontSize: '17px' }}>

                                                                        <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                            className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                        <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                            <a className="dropdown-item" href="javascript:;" onClick={this.postCommentDelete.bind(this, item1)}>Delete</a>
                                                                            {/* <a className="dropdown-item" href="javascript:;">Another action</a>
                                <a className="dropdown-item" href="javascript:;">Something else here</a> */}
                                                                        </div>
                                                                    </div> : ''}
                                                                    <h5><Link to={`/timeLine/${item1.user_id}`} title="">{item1.full_name}</Link></h5>
                                                                    <span>{item1.duration}</span>
                                                                    <a className="we-reply" href="javascript:;" onClick={this.reply_box.bind(this, item1)} title="Reply"><i className="fa fa-reply"></i> {item1.reply_count > 0 ? item1.reply_count + ' Replies' : ''} </a>
                                                                </div>
                                                                <p className="newLineText" dangerouslySetInnerHTML={{ __html: item1.comment }}></p>
                                                                {item1.file ? item1.file_type === 'video' ? <Player src={item1.file} alt="" style={{ width: '100%', height: '160px' }} /> :
                                                                    <img src={item1.file} alt="" style={{ width: '100%', height: '160px' }} /> : ''}


                                                            </div>
                                                            <ul>
                                                                {/* <br/> */}
                                                                <li className="post-comment" id={"reply_box" + item1.post_comment_id} style={{ display: 'none', marginLeft: '63px', marginTop: '10px' }}>
                                                                    <div className="comet-avatar">
                                                                        <img src={this.state.bannerImage?.avatar} alt="" />
                                                                    </div>
                                                                    <div className="post-comt-box" style={{ width: '77%' }}>
                                                                        <form className="main_msg_area1">
                                                                            <TextareaAutosize id={"message2" + item1.post_comment_id} placeholder="Post your comment"/>
                                                                            <div className="add-smiles" style={{ top: '10%' }}>
                                                                                {/* <span className="em em-expressionless" title="add icon"> */}
                                                                                <i className="fa fa-picture-o post_commentcss" aria-hidden="true"></i> &nbsp;
                                        <label className="fileContainer image_uploadcontainer"><input type="file" accept=".jpg,.jpeg,.png,.mp4" id={"imgg" + item1.post_comment_id} onChange={this.handleImagePreview2.bind(this, item1.post_comment_id)} /></label>
                                                                                <i className="fa fa-paper-plane post_commentcss" type="submit" id="send_btn1" onClick={this.replyOnReplyComment.bind(this, item1)} aria-hidden="true"></i>
                                                                            </div>

                                                                            {/* </span> */}

                                                                        </form>
                                                                        {this.state.image_preview2 && this.state.img_post_cmt_id === item1.post_comment_id ?
                                                                            <>
                                                                                {this.state.file_type === 'video' ? <Player id={"cmt_imgg" + item1.post_comment_id} className="preview_image_data" src={this.state.image_preview2} />
                                                                                    : <img id={"cmt_imgg" + item1.post_comment_id} className="preview_image_data" src={this.state.image_preview2} alt="No Data" />}

                                                                            </>
                                                                            : ''}
                                                                    </div>


                                                                    <ul>
                                                                        {item1.reply ? item1.reply.map(item2 => (

                                                                            <li key={item2.post_comment_reply_id}>

                                                                                <div className="comet-avatar comment_data">
                                                                                    <img src={item2.profile_pic} alt="" />
                                                                                </div>
                                                                                <div className="we-comment comment_data1" >

                                                                                    <div className="coment-head">
                                                                                        {this.loginData.id === item2.user_id ? <div className="dropdown three_dots" style={{ fontSize: '15px' }}>

                                                                                            <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                                className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                                            <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                                <a className="dropdown-item" href="javascript:;" onClick={this.postCommentReplyDelete.bind(this, item2)}>Delete</a>
                                                                                                {/* <a className="dropdown-item" href="javascript:;">Another action</a>
                                <a className="dropdown-item" href="javascript:;">Something else here</a> */}
                                                                                            </div>
                                                                                        </div> : ''}
                                                                                        <h5><Link to={`/timeLine/${item2.user_id}`} title="">{item2.full_name}</Link></h5>
                                                                                        <span>{item2.duration}</span>

                                                                                    </div>
                                                                                    <p className="newLineText" dangerouslySetInnerHTML={{ __html: item2.reply }}></p>
                                                                                    {item2.file ? item2.file_type === 'video' ? <Player src={item2.file} alt="" style={{ width: '100%', height: '160px' }} /> : <img src={item2.file} alt="" style={{ width: '100%', height: '160px' }} />
                                                                                        : ''}

                                                                                </div>


                                                                            </li>

                                                                        )) : ''}
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </>

                                                    </li>
                                                )) : ''}





                                            </ul>

                                        </div>

                                    </div>
                                </div>




                            </div>
                        </div>


                    </div>

                </div>

                {/* repost modal */}

                <div className="modal" id="myModalExchange">
                    <div className="modal-dialog box_width">
                        <div className="modal-content">
                            <div className="modal-header remindCss">Remind
                                {/* <h4 className="modal-title text-center"></h4> */}
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form className="main_msg_area1" >
                                    <textarea placeholder="Enter your remind status here (optional)" name="repost_comment" id="#repostComment" onChange={this.onChange} value={this.state.repost_comment}></textarea>
                                    <div className="add-smiles exchange_modal">
                                        {/* <span className="em em-expressionless" title="add icon"> */}

                                        <i className="fa fa-paper-plane post_commentcss" onClick={this.exchangeDataSubmit} type="submit" aria-hidden="true"></i>
                                    </div>
                                </form>
                                <div className="central-meta item" style={{ height: '172px', overflowX: 'auto' }}>
                                    <div className="user-post">
                                        <div className="friend-info">
                                            <figure>
                                                <img src={this.state.exchangeData?.profile_pic} alt="" style={{ height: '47px', width: '47px' }} />
                                            </figure>
                                            <div className="friend-name">
                                                <ins><a href="time-line.html" title="">{this.state.exchangeData?.full_name}</a></ins>
                                                <span>published: {this.state.exchangeData?.duration}</span>
                                            </div>
                                            <div className="post-meta">
                                                <a data-toggle="modal" data-target="#myModal"><img src="images/resources/user-post.jpg" alt="" /></a>
                                                <div className="description">

                                                    <p>
                                                        {this.state.exchangeData?.message}
                                                        <img src={this.state.exchangeData?.file} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* </span> */}

                            </div>

                        </div>
                    </div>
                </div>



                <div id="myModalShare" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog2">
                        {/* <!-- Modal content--> */}
                        <div className="modal-content" style={{ marginTop: '138px' }}>
                            <div className="modal-header">
                                <h3 className="modal-title">Share this post</h3>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-footer" style={{ justifyContent: 'end' }}>
                                <TwitterShareButton
                                    url={this.state?.sharePost?.message}

                                    className="Demo__some-network__share-button">
                                    <TwitterIcon
                                        size={32}
                                        round />
                                </TwitterShareButton>
                                <FacebookShareButton
                                    url={`https://www.facebook.com/sharer/sharer.php?u= + encodeURIComponent${this.state?.sharePost?.message}`}
                                    title={this.state?.sharePost?.message}
                                    className="Demo__some-network__share-button">
                                    <FacebookIcon
                                        size={32}
                                        round />
                                </FacebookShareButton>

                                <EmailShareButton
                                    url={this.state?.sharePost?.message}
                                    title={this.state?.sharePost?.message}
                                    className="Demo__some-network__share-button">
                                    <EmailIcon
                                        size={32}
                                        round />
                                </EmailShareButton>
                                {/* <FacebookShareCount url={this.state?.sharePost?.message} /> */}

                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}