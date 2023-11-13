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
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, EmailIcon, EmailShareButton } from 'react-share';
import TextareaAutosize from "react-autosize-textarea"

const headers = {
    'Content-Type': 'text/plain'
};
const TITLE = 'Freedom-cells-Group-detail'
const initialState = {
    message: '',
    file_type: '',
    group_name: '',
    description: '',
    token: '',
    tag_hold_input: '',
    messageChat: ''

}

export default class Groupdetail extends Component {


    custom_file_upload_url = `https://freedomcells.net/freedomcell/api/users/add_post`;
    custom_file_upload_urlEdit = `https://freedomcells.net/freedomcell/api/users/edit_post`;

    custom_file_upload_url1 = `https://freedomcells.net/freedomcell/api/users/post_comment`;
    custom_file_upload_url2 = `https://freedomcells.net/freedomcell/api/users/post_comment_reply`;
    custom_file_upload_urlMessage = `https://freedomcells.net/freedomcell/api/users/group_chat`;
    custom_file_upload_url2Message = `https://freedomcells.net/freedomcell/api/users/group_chat_reply`;






    constructor(props) {
        super(props);
        this.state = initialState
        this.state = {
            exchangeData: '',
            repost_comment: '',
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
            image_fileGroupAvatar: null,
            image_previewGroupAvatar: '',
            image_fileGroupBanner: null,
            image_previewMessage: '',
            image_fileMessage: null,
            image_previewGroupBanner: '',
            listTimeline: [],
            img_post_id: '',
            img_post_cmt_id: '',
            file_type: '',
            file_typeMessage: '',
            listFollowing: [],
            listFollower: [],
            searchData: [],
            groupMemberList: [],
            listHashtag: [],
            listHashtags: [],
            listNSFWtag: [],
            suggestedChannelList: [],
            ListMessageChat: [],
            img_post_cmt_id_Message: '',
            image_preview2Message: '',
            image_file2Message: '',
            file_type2Message: ''

        }
        const { match: { params } } = this.props;
        this.group_id = params.group_id

        this.onChange = this.onChange.bind(this);
        this.onChangereply = this.onChangereply.bind(this);
        this.updtaeChange = this.updtaeChange.bind(this);
        this.tokenChange = this.tokenChange.bind(this);

        this.updateClick = this.updateClick.bind(this);
        this.exchangeDataSubmit = this.exchangeDataSubmit.bind(this)


    }


    componentDidMount() {

        let data = Cookies.getJSON('name');
        this.loginData = data.user_data

        $('.sidebar').find('ul').find('li').removeClass('active');
        $('#li_detailgroup').addClass('active');

        this.setState({
            editData: 0
        })
        this.setState({
            memberAdd: 0
        })
        // this.state.editData = 0
        // this.state.memberAdd = 0


        this.timelineAPI()
        this.followingAPI()
        this.followerAPI()
        this.groupDetailAPI()
        this.groupMemberListAPI()
        this.hashtagListAPI()
        this.AllNSFWAPI()
        this.BannerImageAPI()
        setInterval(() => {
            this.MessageChatList()

        }, 1500);

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

        $('body').delegate('.main_msg_area textarea', 'keyup', function (e) {
            if (e.keyCode === 13) {
                $(this).closest('.main_msg_area').find('#send_btn').click();
            }
        });

        $('body').delegate('.main_msg_area TextareaAutosize', 'keyup', function (e) {
            if (e.keyCode === 13) {
                $(this).closest('.main_msg_area').find('#send_btn').click();
            }
        });

        $("body").delegate(".nsfw_tag_area .select_nsfw a", "click", function () {
            $(this).closest('.select_nsfw').toggleClass('active');
            // $(this).closest('.select_tag').remove();
        })


        $('body').delegate('.main_msg_area1 textarea', 'keyup', function (e) {
            if (e.keyCode === 13) {
                $(this).closest('.main_msg_area1').find('#send_btn1').click();
            }
        });

        $('body').delegate('.main_msg_area1 TextareaAutosize', 'keyup', function (e) {
            if (e.keyCode === 13) {
                $(this).closest('.main_msg_area1').find('#send_btn1').click();
            }
        });

        //=====================  Enter Submit Messages/chat  =================================


        $('body').delegate('.groupProjectEnter textarea', 'keyup', function (e) {
            if (e.keyCode === 13) {
                // alert('11')
                $(this).closest('.groupProjectEnter').find('#groupProjectEnterData').click();
            }
        });

        $('body').delegate('.groupProjectEnter TextareaAutosize', 'keyup', function (e) {
            if (e.keyCode === 13) {
                // alert('11')
                $(this).closest('.groupProjectEnter').find('#groupProjectEnterData').click();
            }
        });

        //=====================  Enter Submit Messages/chat Reply  =================================


        $('body').delegate('.groupProjectEnterMessage textarea', 'keyup', function (e) {
            if (e.keyCode === 13) {
                // alert('11')
                $(this).closest('.groupProjectEnterMessage').find('#groupProjectEnterMessageData').click();
            }
        });

        $('body').delegate('.groupProjectEnterMessage TextareaAutosize', 'keyup', function (e) {
            if (e.keyCode === 13) {
                // alert('11')
                $(this).closest('.groupProjectEnterMessage').find('#groupProjectEnterMessageData').click();
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

    searchAPI(item) {
        this.add_user_id = item.user_id
        $("#myInput").val(item.full_name);
        $(".search_ul").html('').hide();
        this.groupMemberAddAPI()
    }



    //==================================  Detail of Hashtag List  ==============================

    AllHashtagListAPI() {

        var search = $('input[name="input_tag"]').val().replace(/\s/g, '');
        axios.post(`https://freedomcells.net/freedomcell/api/users/search_hashtag`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'search': search }, { headers }).then((res) => {
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
        axios.get(`https://freedomcells.net/freedomcell/api/users/nsfw`, { headers }).then((res) => {
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

        axios.post(`https://freedomcells.net/freedomcell/api/users/select_hashtag`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
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



    groupMemberAddAPI() {
        //=======================================  Group Member Add data ======================

        axios.post(`https://freedomcells.net/freedomcell/api/users/group_member_add`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, "group_id": this.group_id, "add_user_id": this.add_user_id }, { headers }).then((res) => {
            //on success
            this.codeDataGroupAdd = res.data.code
            if (this.codeDataGroupAdd === true) {
                toastr.success('Request Sent to user', { displayDuration: 3000 })
                setTimeout(() => {

                    window.location.reload(true)
                }, 4000);
            }
            else {
                toastr.error(res.data.message, { displayDuration: 3000 })
            }

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });
    }


    tokenChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    reply_box(data) {

        $('#reply_box' + data.post_comment_id).toggle();
    }




    timelineAPI() {
        //=======================================  Timeline data ======================

        axios.post(`https://freedomcells.net/freedomcell/api/users/group_timeline`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, "group_id": this.group_id }, { headers }).then((res) => {
            //on success
            this.codeData1 = res.data.code
            if (this.codeData1 === true) {
                this.setState({
                    listTimeline: res.data.recdata
                });
                $('#post_text').val('');
                $('#image_text').val('')
                $('.preview_image_data').hide();
            }

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });
    }



    groupDetailAPI() {
        //=======================================  Group Detail data ======================
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');

        axios.post(`https://freedomcells.net/freedomcell/api/users/group_detail`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, group_id: this.group_id }, { headers }).then((res) => {
            //on success
            this.codeDataGroup = res.data.code
            if (this.codeDataGroup === true) {
                this.setState({
                    groupDetail: res.data.recdata
                });
                $('#main_loader').hide();
                $('#root').css('opacity', '1');
            }

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });
    }


    groupMemberListAPI() {
        //=======================================  Group Member data ======================
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');

        axios.post(`https://freedomcells.net/freedomcell/api/users/group_member_list`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, group_id: this.group_id }, { headers }).then((res) => {
            //on success
            this.codeDataGroupMember = res.data.code
            if (this.codeDataGroupMember === true) {
                this.setState({
                    groupMemberList: res.data.recdata
                });
                $('#main_loader').hide();
                $('#root').css('opacity', '1');
            }

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });
    }


    updtaeChange = event => {
        event.persist();

        let value = event.target.value;

        this.setState(prevState => ({
            groupDetail: { ...prevState.groupDetail, [event.target.name]: value }
        }))
    };


    //==================================  Detail of Following List  ==============================


    followingAPI() {



        axios.post(`https://freedomcells.net/freedomcell/api/users/following_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
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



        axios.post(`https://freedomcells.net/freedomcell/api/users/follower_list`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
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


    // Image Preview Handler
    handleImagePreviewGroupAvatar = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];


        this.setState({
            image_previewGroupAvatar: image_as_base64,
            image_fileGroupAvatar: image_as_files,
        })


    }


    // Image Preview Handler
    handleImagePreviewGroupBanner = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        this.setState({
            image_previewGroupBanner: image_as_base64,
            image_fileGroupBanner: image_as_files,
        })

    }


    onChange(e) {

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
    strip1(tmp) {

        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return tmp.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank" + style="word-break:break-all">' + url + '</a>';

        })
    }

    handleSubmitFile = (e) => {

        e.preventDefault()
        this.state.message = $('#post_text').val();
        console.log(this.state.message);
        console.log(this.state.image_file);

        if (this.state.message === '' && this.state.image_file === null) {
            return false
        }

        if (this.state.image_file === '' && this.state.message === '') {
            return false;
        }

        $('#main_loader').show();
        $('#root').css('opacity', '0.5');

        let formData = new FormData();
        var msg_val = this.strip1(this.state.message);

        // if (this.state.message != undefined) {
        //     var msg_val = this.strip1(this.state.message);
        //     // var text = this.state.message.split(' ');
        //     // var msg_val = '';
        //     // for (var t = 0; t < text.length; t++) {
        //     //     if (text[t].indexOf('https://') == 0 || text[t].indexOf('http://') == 0) {

        //     //         msg_val += ' <a href="' + text[t] + '" target="_blank" + style="word-break:break-all">' + text[t] + '</a>'
        //     //     } else {
        //     //         msg_val += ' ' + text[t]
        //     //     }
        //     // }
        // }
        // else {
        //     msg_val = ''
        // }

        // console.log(formData);
        // if (this.state.image_file === '' && this.state.message === '') {
        //     return false;
        // }
        formData.append('post_id', this.state.detailPost.post_id);
        formData.append('is_repost', this.state.detailPost.is_repost);

        formData.append('old_file_type', $("#edit_file_type").val());
        formData.append('old_file_path', $("#edit_file_path").val());

        formData.append('group_id', this.group_id);
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
            { headers }
        )

            .then(res => {
                // $('#post_text').val('');
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

        axios.post('https://freedomcells.net/freedomcell/api/users/post_like', { 'post_id': id.post_id, 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers })
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

        axios.post('https://freedomcells.net/freedomcell/api/users/post_dislike', { 'post_id': id.post_id, 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers })
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
    strip3(tmp) {

        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return tmp.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank" + style="word-break:break-all">' + url + '</a>';

            // return '<a href="'+url+'">' + url +'</a>'
        })
    }
    replyOnComment = (id) => {
        if (this.state.image_file1 === '' && $('#message1' + id.post_id).val().trim() === '') {
            return false;
        }
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        let formData = new FormData();
        var msg_val = this.strip3($('#message1' + id.post_id).val());
        // var text = $('#message1' + id.post_id).val().split(' ');
        // var msg_val = '';
        // for (var t = 0; t < text.length; t++) {
        //     if (text[t].indexOf('https://') == 0 || text[t].indexOf('http://') == 0) {

        //         msg_val += ' <a href="' + text[t] + '" target="_blank" + style="word-break:break-all">' + text[t] + '</a>'
        //     } else {
        //         msg_val += ' ' + text[t]
        //     }
        // }
        formData.append('group_id', this.group_id);

        formData.append('file', this.state.image_file1);
        formData.append('user_id', this.loginData.id);
        formData.append('comment', msg_val);
        formData.append('post_id', id.post_id);
        formData.append('api_key', this.loginData.api_key);
        formData.append('file_type', this.state.file_type);




        axios.post(
            this.custom_file_upload_url1,
            formData,
            { headers }
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
        $('#message1' + id.post_id).val('')
        $('#cmt_img' + id.post_id).hide();
    }


    //  ======================================= replyonreply submit  =================================

    replyOnReplyComment = (id) => {
        if (this.state.image_file2 === '' && $('#message2' + id.post_comment_id).val().trim() === '') {
            return false;
        }
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');

        let formData = new FormData();

        var text = $('#message2' + id.post_comment_id).val().split(' ');
        var msg_val = '';
        for (var t = 0; t < text.length; t++) {
            if (text[t].indexOf('https://') == 0 || text[t].indexOf('http://') == 0) {

                msg_val += ' <a href="' + text[t] + '" target="_blank" + style="word-break:break-all">' + text[t] + '</a>'
            } else {
                msg_val += ' ' + text[t]
            }
        }
        formData.append('group_id', this.group_id);

        formData.append('file', this.state.image_file2);
        formData.append('user_id', this.loginData.id);
        formData.append('reply', msg_val);
        formData.append('post_comment_id', id.post_comment_id);
        formData.append('api_key', this.loginData.api_key);
        formData.append('file_type', this.state.file_type);




        axios.post(
            this.custom_file_upload_url2,
            formData,
            { headers }
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
                            axios.post(`https://freedomcells.net/freedomcell/api/users/post_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'post_id': id.post_id }, { headers }).then((res) => {
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

                        axios.post(`https://freedomcells.net/freedomcell/api/users/block`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'blocked_user_id': id.user_id }, { headers }).then((res) => {
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
                            axios.post(`https://freedomcells.net/freedomcell/api/users/follow`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'following_id': id.user_id }, { headers }).then((res) => {
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
                            axios.post(`https://freedomcells.net/freedomcell/api/users/unfollow`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'following_id': id.user_id }, { headers }).then((res) => {
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
                        axios.post(`https://freedomcells.net/freedomcell/api/users/post_comment_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'post_comment_id': id.post_comment_id }, { headers }).then((res) => {
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


    //==========================================  Delete comment reply Post  ================================

    postCommentReplyDelete = (id) => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        axios.post(`https://freedomcells.net/freedomcell/api/users/post_comment_reply_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'post_comment_id': id.post_comment_reply_id }, { headers }).then((res) => {
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


    //==========================================  Delete Group  ================================

    groupDelete = (id) => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        axios.post(`https://freedomcells.net/freedomcell/api/users/group_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_id': id }, { headers }).then((res) => {
                            $('#main_loader').show();
                            $('#root').css('opacity', '0.5');

                            setTimeout(() => {
                                $('#main_loader').hide();
                                $('#root').css('opacity', '1');
                            }, 1000);
                            window.location.hash = '/dashboard'

                        }).catch((error) => {
                        })
                },
                {
                    label: 'No',
                }
            ]
        });
    }


    //==========================================  Delete Group  ================================

    groupType = (id) => {

        if (id.type === "Public") {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure to Change this to Private.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            axios.post(`https://freedomcells.net/freedomcell/api/users/group_type_update`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_id': id.id, 'type': 1 }, { headers }).then((res) => {
                                $('#main_loader').show();
                                $('#root').css('opacity', '0.5');

                                setTimeout(() => {
                                    $('#main_loader').hide();
                                    $('#root').css('opacity', '1');
                                }, 1000);
                                this.componentDidMount()
                            }).catch((error) => {
                            })
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }
        else {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure to Change this to Public.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            axios.post(`https://freedomcells.net/freedomcell/api/users/group_type_update`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_id': id.id, 'type': "0" }, { headers }).then((res) => {
                                $('#main_loader').show();
                                $('#root').css('opacity', '0.5');

                                setTimeout(() => {
                                    $('#main_loader').hide();
                                    $('#root').css('opacity', '1');
                                }, 1000);
                                this.componentDidMount()
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





    //=================================================  Search API   ==================================
    getInputValue(id) {

        var inputVal = document.getElementById("myInput").value;

        axios.post('https://freedomcells.net/freedomcell/api/users/user_search', { 'user_id': id.id, 'api_key': id.api_key, 'search': inputVal }, { headers })
            .then(response => {

                if (response.data.code === true) {
                    this.setState({
                        searchData: response.data.recdata
                    })
                    $('.search_ul').show();
                }
                else if (response.data.code === false) {

                }

            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })

    }

    editClick(id) {
        this.setState({
            editData: id
        })
        // this.state.editData = id

    }

    updateClick(e) {
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        e.preventDefault()

        let formData = new FormData();

        formData.append('user_id', this.loginData.id);
        formData.append('api_key', this.loginData.api_key);
        formData.append('group_id', this.group_id);

        formData.append('group_name', this.state.groupDetail.group_name);
        formData.append('avatar', this.state.image_fileGroupAvatar);
        formData.append('banner', this.state.image_fileGroupBanner);
        formData.append('description', this.state.groupDetail.description);


        axios.post(
            'https://freedomcells.net/freedomcell/api/users/group_update',
            formData,
            { headers }

        )

            .then(res => {
                if (res.data.code === true) {


                    $('#main_loader').hide();
                    $('#root').css('opacity', '1');
                    this.componentDidMount()
                }

            })
            .catch(err => {

            })
    }

    addMember(id) {
        this.setState({
            memberAdd: id
        })
        // this.state.memberAdd = id
        this.groupMemberListAPI()

    }





    //==========================================  postGroupMemberDelete Post  ================================

    postGroupMemberDelete = (id) => {
        console.log(id);

        confirmAlert(

            {
                title: 'Confirm to submit',
                message: 'Are you sure to delete this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            axios.post(`https://freedomcells.net/freedomcell/api/users/group_member_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_id': this.group_id, 'delete_user_id': id.user_id }, { headers }).then((res) => {
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


    postGroupMemberDelete1 = (id) => {

        confirmAlert(

            {
                title: 'Confirm to submit',
                message: 'Are you sure to delete this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            axios.post(`https://freedomcells.net/freedomcell/api/users/group_member_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_id': this.group_id, 'delete_user_id': id }, { headers }).then((res) => {
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

    //==================================  Wallet Balance List  ==============================

    walletBalanceAPI() {


        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        axios.post(`https://freedomcells.net/freedomcell/api/users/wallet_balance`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
            //on success
            this.codeDataWalletBalance = res.data.code
            if (this.codeDataWalletBalance === true) {

                this.setState({
                    walletBalance: res.data.recdata
                });
            }

            $('#main_loader').hide();
            $('#root').css('opacity', '1');
        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

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
                        axios.post(`https://freedomcells.net/freedomcell/api/users/crowdfunding`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_id': this.state.groupDetail.id, 'token': this.state.token }, { headers }).then((res) => {

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



    postEdit(editPost) {

        axios.post(`https://freedomcells.net/freedomcell/api/users/post_detail`, { 'user_id': this.loginData.id, 'post_id': editPost.post_id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
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


    aboveEighteen(id) {

        $("#print_post_area" + id).show();
        $("#nsfw_post_area" + id).hide();
    }

    show_hide_comment(id) {
        $("#comment_box" + id).toggle(100);
    }


    exchangeDetail(id) {
        this.setState({
            exchangeData: id
        })
    }


    exchangeDataSubmit(e) {
        e.preventDefault()


        axios.post('https://freedomcells.net/freedomcell/api/users/repost', {
            'user_id': this.loginData.id, 'api_key': this.loginData.api_key,
            'post_id': this.state.exchangeData?.post_id, 'repost_comment': this.state.repost_comment
        }, { headers })
            .then(response => {

                if (response.data.code === true) {
                    $("#myModalExchange").hide()
                }
                else if (response.data.code === false) {

                }
                this.componentDidMount()
                $('.modal-open').css('overflow', 'auto')
                $('.modal-backdrop').css('position', 'inherit')
            })

            .catch(err => {

            })
    }

    //================================  JoinOpen Group  ==============

    groupJoinOpen(id) {

        axios.post('https://freedomcells.net/freedomcell/api/users/join_group', {
            'user_id': this.loginData.id, 'api_key': this.loginData.api_key,
            'group_id': id
        }, { headers })
            .then(response => {

                if (response.data.code === true) {
                }
                else if (response.data.code === false) {

                }
                this.componentDidMount()
            })

            .catch(err => {

            })
    }



    //===========================================  Image Preview on Message  =========================


    // No Data Handler
    handleImagePreviewMessage = (e) => {

        let image_as_base64 = URL.createObjectURL(e.target.files[0])

        let image_as_files = e.target.files[0];

        let file_type = '';
        if (image_as_files.type.indexOf('image') === 0) {
            file_type = 'image';
        } else {
            file_type = 'video';
        }

        this.setState({
            image_previewMessage: image_as_base64,
            image_fileMessage: image_as_files,
            file_typeMessage: file_type,
        })


        setTimeout(() => {
            $('.preview_image_data_Message').show();
        }, 1000);
        // $(".image_remove").show();
    }

    //==============================================  Messages Group/Project  ================================

    handleSubmitFileMessage = (e) => {
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        e.preventDefault();
        if (this.state.messageChat === undefined && this.state.image_fileMessage === '') {
            return false
        }

        if (this.state.image_fileMessage === '' && this.state.messageChat === '') {
            return false;
        }
        let formData = new FormData();
        if (this.state.messageChat !== undefined) {

            var text = this.state.messageChat.split(' ');
            var msg_val = '';
            for (var t = 0; t < text.length; t++) {
                if (text[t].indexOf('https://') == 0 || text[t].indexOf('http://') == 0) {

                    msg_val += ' <a href="' + text[t] + '" target="_blank" + style="word-break:break-all">' + text[t] + '</a>'
                } else {
                    msg_val += ' ' + text[t]
                }
            }
        }

        if (this.state.messageChat === undefined) {
            // delete msg_val
        }



        // formData.append('post_id', this.state.detailPost.post_id);
        // formData.append('is_repost', this.state.detailPost.is_repost);

        // formData.append('old_file_type', $("#edit_file_type").val());
        // formData.append('old_file_path', $("#edit_file_path").val());

        formData.append('file', this.state.image_fileMessage);
        formData.append('user_id', this.loginData.id);
        if (this.state.messageChat !== undefined) {
            // delete msg_val
            formData.append('message', msg_val);
        }
        formData.append('api_key', this.loginData.api_key);
        formData.append('file_type', this.state.file_type);
        formData.append('group_id', this.state.groupDetail.id)
        formData.append('file_type', this.state.file_typeMessage);
        // formData.append('nsfw', $("#nsfw_hold_input").val());


        // $('#pay_now').prop('disabled', true);
        // $('#pay_now').html('processing...');

        // if (this.state.detailPost != '') {
        //     var url = this.custom_file_upload_urlEdit;
        // } else {
        //     var url = this.custom_file_upload_url;
        // }

        axios.post(
            this.custom_file_upload_urlMessage,
            formData,
            { headers }
        )

            .then(res => {

                $('#message_sent').val('');
                $('.preview_image_data_Message').css('display', 'none')
                // $('.image_remove').hide();
                // $(".nsfw_tag_area .select_nsfw").removeClass('active');
                // $(".select_tag_area").html("");

                // $('.postoverlay').hide();
                this.MessageChatList()
                // $('#scroll_chat_box').scrollTop($('#scroll_chat_box')[0].scrollHeight);
                setTimeout(() => {

                    $('#scroll_chat_box').scrollTop(5000000000);
                }, 1000);
                // $('#pay_now').prop('disabled', false);
                // $('#pay_now').html('Post');
                this.setState({
                    image_fileMessage: '',
                    messageChat: '',
                    // tag_hold_input: '',
                    // nsfw_hold_input: '',
                    // edit_file_path: '',
                    // edit_file_type: '',
                    // detailPost: ''
                })
                $('#main_loader').hide();
                $('#root').css('opacity', '1');
                window.scrollBy(100, 0);
                // $("#tag_hold_input").val('');
                // $("#nsfw_hold_input").val('');
                // $('.modal-open').css('overflow', 'auto')
                // $('.modal-backdrop').css('position', 'inherit')
            })
            .catch(err => {

            })


    }


    //==============================================  Messages Group/Project List  ===========================

    MessageChatList() {


        // $('#main_loader').show();
        // $('#root').css('opacity', '0.5');
        axios.post(`https://freedomcells.net/freedomcell/api/users/group_chat_list`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_chat_id': this.group_id }, { headers }).then((res) => {
            //on success
            this.codeDataMessageChat = res.data.code
            if (this.codeDataMessageChat === true) {

                if(this.state.ListMessageChat.length!=res.data.recdata.length){
                    setTimeout(() => {

                        $('#scroll_chat_box').scrollTop(5000000000);
                    }, 1000);
                }

                this.setState({
                    ListMessageChat: res.data.recdata
                });
            }
            else {
                this.setState({
                    ListMessageChat: []
                });
            }
            // $('#scroll_chat_box').scrollTop($('#scroll_chat_box')[0].scrollHeight);

            // $('#main_loader').hide();
            // $('#root').css('opacity', '1');
            setTimeout(() => {

                // alert(                $(document).scrollTop($(document).height()));
            }, 1000);
        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }

    // =========================================  GroupChat Delete ===================================

    groupChatDelete = (id) => {

        confirmAlert(

            {
                title: 'Confirm to submit',
                message: 'Are you sure to delete this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            axios.post(`https://freedomcells.net/freedomcell/api/users/group_chat_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_chat_id': id.chat_id }, { headers }).then((res) => {
                                this.MessageChatList()
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


    //==============================================  GroupChatReply delete  ======================

    groupChatReplyDelete = (id) => {

        confirmAlert(

            {
                title: 'Confirm to submit',
                message: 'Are you sure to delete this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            axios.post(`https://freedomcells.net/freedomcell/api/users/group_chat_reply_delete`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'group_chat_reply_id': id.chat_reply_id }, { headers }).then((res) => {
                                this.MessageChatList()
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



    //===============================================  Reply the message ==============================

    reply_box_message(data) {
        $('#reply_box_message' + data.chat_id).toggle();
    }


    //=====================================  Image Preview Reply ============================

    // No Data Handler
    handleImagePreview2Message = (id) => {
        let image_as_base64 = URL.createObjectURL($('#imggMessage' + id)[0].files[0])
        let image_as_files = $('#imggMessage' + id)[0].files[0];
        let file_type = '';
        if (image_as_files.type.indexOf('image') === 0) {
            file_type = 'image';
        } else {
            file_type = 'video';
        }
        this.setState({
            img_post_cmt_id_Message: id,
            image_preview2Message: image_as_base64,
            image_file2Message: image_as_files,
            file_type2Message: file_type,
        })
        $('#cmt_imggMessage' + id).show();
    }


    //=====================================  Submit reply =======================================================
    strip(tmp) {

        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return tmp.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank" + style="word-break:break-all">' + url + '</a>';

        })
    }
    replyOnReplyCommentMessage = (id) => {
        if (this.state.image_file2 === '' && $('#message2Message' + id.chat_id).val().trim() === '') {
            return false;
        }
        $('#main_loader').show();
        $('#root').css('opacity', '0.5');

        let formData = new FormData();
        var msg_val = this.strip($('#message2Message' + id.chat_id).val());
        // var text = $('#message2Message' + id.chat_id).val().split(' ');
        // var msg_val = '';
        // for (var t = 0; t < text.length; t++) {
        //     if (text[t].indexOf('https://') == 0 || text[t].indexOf('http://') == 0) {

        //         msg_val += ' <a href="' + text[t] + '" target="_blank" + style="word-break:break-all">' + text[t] + '</a>'
        //     } else {
        //         msg_val += ' ' + text[t]
        //     }
        // }
        formData.append('file', this.state.image_file2Message);
        formData.append('user_id', this.loginData.id);
        formData.append('message', msg_val);
        formData.append('group_chat_id', id.chat_id);
        formData.append('api_key', this.loginData.api_key);
        formData.append('file_type', this.state.file_type2Message);




        axios.post(
            this.custom_file_upload_url2Message,
            formData,
            { headers }
        )
            .then(res => {
                this.MessageChatList()
                this.setState({
                    image_file2Message: '',
                })
                $('#main_loader').hide();
                $('#root').css('opacity', '1');
            })
            .catch(err => {

            })

        $('#message2Message' + id.chat_id).val('')
        $('#cmt_imggMessage' + id.chat_id).hide();
    }

    //======================================================  like Message/chat  =======================

    submitLikeMessage(id) {

        axios.post('https://freedomcells.net/freedomcell/api/users/group_chat_like', { 'group_chat_id': id.chat_id, 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers })
            .then(response => {
                if (response.data.code === true) {

                }

                else if (response.data.code === false) {

                }
                this.MessageChatList()

            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }



    //==============================================   Dislike Message/chat  ====================================

    submitdisLikeMessage(id) {

        axios.post('https://freedomcells.net/freedomcell/api/users/group_chat_dislike', { 'group_chat_id': id.chat_id, 'user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers })
            .then(response => {
                if (response.data.code === true) {

                }

                else if (response.data.code === false) {

                }
                this.MessageChatList()

            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    postShare(id) {
        this.setState({
            sharePost: id
        })

    }

    //==================================  Detail of Avatar Banner  ==============================


    BannerImageAPI() {

        axios.post(`https://freedomcells.net/freedomcell/api/users/avatar_banner`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key }, { headers }).then((res) => {
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

        axios.post(`https://freedomcells.net/freedomcell/api/users/group_hash_timeline`, { 'user_id': this.loginData.id, 'hashtag': id.hashtag, 'api_key': this.loginData.api_key, "group_id": this.group_id }, { headers }).then((res) => {
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


    render() {
        const memberAdd1 = this.state.memberAdd
        const codeData1 = this.codeData1
        const crowdDetail1 = this.state.crowdDetail
        const ListMessageChat1 = this.state.ListMessageChat


        // const codeDataFollower1 = this.codeDataFollower
        // const codeDataFollowing1 = this.codeDataFollowing


        return (
            // scroll_chat_box
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

                    <section>
                        <div className="gap gray-bg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row merged20" id="page-contents">
                                            {/* //================== Sidebar */}

                                            <InnerSidebar />

                                            {/* <!-- sidebar --> */}
                                            <div className="col-lg-6 setStick" >
                                                <section>
                                                    <div className="feature-photo1">

                                                        {this.state.image_previewGroupBanner ? <figure><img src={this.state.image_previewGroupBanner} style={{ width: '100%', height: '221px', objectFit: 'cover' }} alt="" /></figure>
                                                            : <figure><img src={this.state.groupDetail?.banner} style={{ width: '100%', height: '221px', objectFit: 'cover' }} alt="" /></figure>}
                                                        {this.state.editData === 0 ? '' :
                                                            <form className="edit-phto11">
                                                                <i className="fa fa-camera-retro"></i>
                                                                <label className="fileContainer1">
                                                                    Edit Cover Photo
					                                        <input type="file" accept=".jpg,.jpeg,.png" onChange={this.handleImagePreviewGroupBanner} />
                                                                </label>

                                                            </form>
                                                        }
                                                        <div className="container-fluid">
                                                            <div className="row merged1">
                                                                <div className="col-lg-2 col-sm-3">
                                                                    <div className="user-avatar1">
                                                                        <figure>
                                                                            {this.state.image_previewGroupAvatar ? <img src={this.state.image_previewGroupAvatar} style={{ width: '65px', height: '65px' }} alt="" /> :
                                                                                <img src={this.state.groupDetail?.avatar} style={{ width: '65px', height: '65px' }} alt="" />}

                                                                            {this.state.editData === 0 ? '' :
                                                                                <form className="edit-phto">
                                                                                    <i className="fa fa-camera-retro"></i>
                                                                                    <label className="fileContainer1">
                                                                                        Edit Photo
					                                        <input type="file" accept=".jpg,.jpeg,.png" onChange={this.handleImagePreviewGroupAvatar} />
                                                                                    </label>
                                                                                </form>
                                                                            }

                                                                        </figure>
                                                                    </div>

                                                                </div>

                                                                <div className="col-lg-10 col-sm-9">
                                                                    <div className="timeline-info1">
                                                                        <figure className="group_member_icon">
                                                                            {
                                                                                this.state.groupMemberList.map(item => (
                                                                                    <Link to={`/timeLine/${item.user_id}`} key={item.user_id}>
                                                                                        <img src={item.profile_pic} alt="Nothing Found" className="member-profile1" />
                                                                                    </Link>
                                                                                ))}
                                                                            <form className="edit-phto" style={{ display: 'none' }}>
                                                                                <i className="fa fa-camera-retro"></i>
                                                                            </form>
                                                                            {this.loginData?.id === this.state.groupDetail?.user_id ? <a href="javascript:;" className="member-btn" onClick={this.addMember.bind(this, 1)}>+ Member</a> : ''}

                                                                        </figure>


                                                                    </div>


                                                                    {this.state.groupDetail?.user_id === this.loginData?.id ?
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <i className="fa fa-cog" aria-hidden="true"></i>
                                                                            </button>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                {this.state.editData === 0 ? <a className="dropdown-item" href="javascript:;" onClick={this.editClick.bind(this, 1)}>Edit</a>
                                                                                    : <a className="dropdown-item" button="submit" href="javascript:;" onClick={this.updateClick}>Update</a>}

                                                                                <a className="dropdown-item" href="javascript:;" onClick={this.groupType.bind(this, this.state.groupDetail)}>
                                                                                    {this.state.groupDetail?.type === 'Public' ? 'Make Closed' : 'Make Open'}
                                                                                </a>
                                                                                {this.state.groupDetail?.is_project === '1' ? <a className="dropdown-item" onClick={this.groupDelete.bind(this, this.state.groupDetail?.id)} href="javascript:;">Delete Project</a> :
                                                                                    <a className="dropdown-item" onClick={this.groupDelete.bind(this, this.state.groupDetail?.id)} href="javascript:;">Delete Group</a>}


                                                                            </div>
                                                                            {this.state.groupDetail?.is_project === '1' ?

                                                                                <div className="pull-right">{this.state.groupDetail?.days}</div>
                                                                                : ''}

                                                                        </div> :
                                                                        this.state.groupDetail?.type === 'Public' ?
                                                                            <div className="dropdown">
                                                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                    <i className="fa fa-cog" aria-hidden="true"></i>
                                                                                </button>
                                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">


                                                                                    {this.state.groupDetail?.is_project === '1' ?


                                                                                        <>

                                                                                            {this.state.groupDetail?.is_group_member === 'Leave' ?

                                                                                                <a className="dropdown-item" onClick={this.postGroupMemberDelete1.bind(this, this.loginData?.id)} href="javascript:;">Remove From  Project</a> :
                                                                                                <a className="dropdown-item" onClick={this.groupJoinOpen.bind(this, this.state.groupDetail?.id)} href="javascript:;">Join Project</a>}
                                                                                        </>

                                                                                        :
                                                                                        <>
                                                                                            {this.state.groupDetail?.is_group_member === 'Leave' ?
                                                                                                <a className="dropdown-item" onClick={this.postGroupMemberDelete1.bind(this, this.loginData?.id)} href="javascript:;">Remove From Group</a> :
                                                                                                <a className="dropdown-item" onClick={this.groupJoinOpen.bind(this, this.state.groupDetail?.id)} href="javascript:;">Join Group</a>
                                                                                            }
                                                                                        </>
                                                                                    }



                                                                                </div>
                                                                                {this.state.groupDetail?.is_project === '1' ?

                                                                                    <div className="pull-right">{this.state.groupDetail?.days}</div>
                                                                                    : ''}

                                                                            </div>

                                                                            :
                                                                            this.state.groupDetail?.is_group_member === 'Leave' ?

                                                                                <div className="dropdown">
                                                                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                        <i className="fa fa-cog" aria-hidden="true"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">


                                                                                        {this.state.groupDetail?.is_project === '1' ?


                                                                                            <>

                                                                                                {this.state.groupDetail?.is_group_member === 'Leave' ?

                                                                                                    <a className="dropdown-item" onClick={this.postGroupMemberDelete1.bind(this, this.loginData?.id)} href="javascript:;">Remove From  Project</a> :
                                                                                                    <a className="dropdown-item" onClick={this.groupJoinOpen.bind(this, this.state.groupDetail?.id)} href="javascript:;">Join Project</a>}
                                                                                            </>

                                                                                            :
                                                                                            <>
                                                                                                {this.state.groupDetail?.is_group_member === 'Leave' ?
                                                                                                    <a className="dropdown-item" onClick={this.postGroupMemberDelete1.bind(this, this.loginData?.id)} href="javascript:;">Remove From Group</a> :
                                                                                                    <a className="dropdown-item" onClick={this.groupJoinOpen.bind(this, this.state.groupDetail?.id)} href="javascript:;">Join Group</a>
                                                                                                }
                                                                                            </>
                                                                                        }



                                                                                    </div>
                                                                                    {this.state.groupDetail?.is_project === '1' ?

                                                                                        <div className="pull-right">{this.state.groupDetail?.days}</div>
                                                                                        : ''}

                                                                                </div>


                                                                                : ''}






                                                                    {/* //========================  MOdal  */}


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
                                                                                            <img src={crowdDetail1?.banner} alt="Nothing Found" style={{ width: '837px', height: '166px', objectFit: 'cover' }} />
                                                                                        </div>
                                                                                        <div className="freedom-avatar" style={{ top: '113px', textAlign: 'center', maxWidth: '810px' }}>
                                                                                            <img src={crowdDetail1?.avatar} alt="Nothing Found" style={{ borderRadius: '50%', height: '85px', width: '85px' }} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="m-wireCreatorOwnerBlock__heading">
                                                                                        <div className="m-wireCreatorOwnerBlockHeading__title" style={{ marginTop: '45px' }}>
                                                                                            <span >Pay</span>&nbsp;
                  <span >
                                                                                                <i className="material-icons   fa fa-angle-right" style={{ fontSize: '1em' }}></i>
                                                                                            </span>
                                                                                            &nbsp;
                  <span >{crowdDetail1?.group_name}</span>
                                                                                        </div>
                                                                                        <div className="m-wireCreatorOwnerBlock__username">@{crowdDetail1?.group_name}</div>
                                                                                    </div>
                                                                                    <div className="m-wireCreatorForm__fieldset">
                                                                                        <div className="m-wireCreatorForm__fields ">
                                                                                            <div className="m-wireCreatorForm__field">
                                                                                                <label className="m-wireCreatorForm__label">Tokens</label>
                                                                                                <input type="text" state={this.state.token} name="token" onChange={this.tokenChange} placeholder="0" data-cy="wire-v2-amount" className="" />
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
                                                                                            </div>
                                                                                            <button type="submit" disabled={!this.state.token || parseInt(this.state.token) > parseInt(this.state.walletBalance?.fcell_balance)} onClick={this.tipAPI} className="btn btn-primary" >Send {this.state.token} tokens</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    {memberAdd1 === 0 ? '' :
                                                                        <input type="text" className="form-control" placeholder="Search of a channel"
                                                                            id="myInput" onChange={this.getInputValue.bind(this, this.loginData)} />}


                                                                    <ul className="search_ul">
                                                                        {this.state.searchData.map(item => {
                                                                            return (
                                                                                <>
                                                                                    <li style={{ cursor: 'pointer' }} onClick={this.searchAPI.bind(this, item)}><img src={item.profile_pic} alt="Nothing Found" height="50px" width="50px" /> <span data-id={item.id} style={{ marginLeft: "10px" }}>{item.full_name}</span></li>
                                                                                </>
                                                                            )
                                                                        })}
                                                                    </ul>
                                                                    {this.state.groupDetail?.is_project === '1' ? <div>
                                                                        <h6>Crowd Funding target - {this.state.groupDetail?.funding_target} <i className="fa fa-dollar"></i></h6>
                                                                        <h6>Funded Percent - {this.state.groupDetail?.funded_percent}</h6>
                                                                    </div> : ''}
                                                                    {this.state.groupDetail?.is_project === '1' ?
                                                                        <li className="pull-left" onClick={this.detailCrowd.bind(this, this.state.groupDetail)} style={{ marginRight: '5px', cursor: 'pointer', listStyle: 'none' }}>
                                                                            <a data-toggle="modal" href="javascript:;" data-target="#myModal2" ><button className="btn btn-primary btn-sm">Crowdfund&nbsp;<i className="fa fa-dollar"></i></button>

                                                                            </a>
                                                                        </li> : ''}

                                                                </div>

                                                                <div className="name-profile2" style={{ marginBottom: '10px' }}>
                                                                    {this.state.editData === 0 ?
                                                                        <h4 className="name-profile1" style={{ marginTop: '20px' }}>{this.state.groupDetail?.group_name}</h4>
                                                                        : <input value={this.state.groupDetail?.group_name} style={{ marginTop: '20px' }} name="group_name" type="text" className="form-control" onChange={this.updtaeChange} />
                                                                    }
                                                                </div>
                                                                {this.state.editData === 0 ? <p className="bio-data">{this.state.groupDetail?.description}</p> : <textarea value={this.state.groupDetail?.description} name="description" onChange={this.updtaeChange} className="form-control description_text" />}

                                                            </div>

                                                            {memberAdd1 === 0 ? '' : <div className="mdl-grid m-groupMembers__list m-border">
                                                                {
                                                                    this.state.groupMemberList.map(item => (
                                                                        <>
                                                                            <Link to={`/timeLine/${item.user_id}`} >
                                                                                <div className="mdl-cell mdl-cell--6-col m-groupMembers__memberCard ng-star-inserted">
                                                                                    <div className="mdl-card m-border">
                                                                                        <minds-card-user style={{ margin: '15px 15px 15px 15px' }}>
                                                                                            <div className="m-card--user--banner">
                                                                                                <div className="m-card--user--banner--img">
                                                                                                    <img src={item.background_image} alt="Nothing Found" />
                                                                                                </div>
                                                                                                <div className="minds-banner-overlay">
                                                                                                </div>
                                                                                            </div>
                                                                                            <a className="mdl-card__supporting-text minds-usercard-block" href="javascript:;">
                                                                                                <div className="avatar">
                                                                                                    <img src={item.profile_pic} alt="Nothing Found" />
                                                                                                </div>
                                                                                                <div className="body">
                                                                                                    <h3 style={{ color: '#fff' }}>{item.full_name}</h3>
                                                                                                    <span style={{ color: '#fff' }}>@{item.full_name}</span>

                                                                                                </div>
                                                                                            </a>

                                                                                            {item.isadmin === '1' ? '' : <button className="btn subscribed ng-star-inserted" style={{ right: '15px' }}>
                                                                                                <i className="material-icons fa fa-close"></i>
                                                                                                <span>Unsubscribe</span>&nbsp;<i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                                    aria-hidden="true" className="fa fa-cog"></i>
                                                                                                <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                                    <Link className="dropdown-item" onClick={this.postGroupMemberDelete.bind(this, item)}>Delete From Group</Link>
                                                                                                    {/* <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a> */}
                                                                                                </div>
                                                                                            </button>}


                                                                                            <div className="minds-usercard-buttons">
                                                                                                <div buttons=""></div></div>

                                                                                        </minds-card-user>

                                                                                    </div></div>
                                                                            </Link>
                                                                        </>
                                                                    ))
                                                                }
                                                            </div>
                                                            }

                                                            <br />
                                                        </div>

                                                    </div>
                                                </section>




                                                {memberAdd1 === 1 ?
                                                    ''
                                                    :
                                                    <>

                                                        {/* <!-- add post new box --> */}


                                                        {/* //======================  Update Modal */}

                                                        {this.state.groupDetail?.user_id === this.loginData?.id || this.state.groupDetail?.is_group_member === 'Leave' ?
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
                                                                                    {/* <li>
                                                <i className="fa fa-video-camera"></i>
                                                <label className="fileContainer">
                                                    <input type="file" onChange={this.handleImagePreview}/>
                                                </label>
                                            </li> */}

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
                                                            : ''}

                                                        {this.state.groupDetail?.is_group_member === 'Leave' || this.state.groupDetail?.user_id === this.loginData?.id ?
                                                            <div className="loadMore">

                                                                {this.state.listTimeline.map(item => (
                                                                    <>


                                                                        <div className="central-meta item" key={item.post_id}>

                                                                            <div className="user-post">
                                                                                <div className="friend-info">
                                                                                    {this.loginData.id === item.user_id ? <div className="dropdown three_dots">

                                                                                        <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                            className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                                        <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                            {/* {this.loginData.id === item.group_owner_id ? */}
                                                                                            <>
                                                                                                <a className="dropdown-item" style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#myModalShare" onClick={this.postShare.bind(this, item)}>Share</a>

                                                                                                <a className="dropdown-item" href="javascript:;" onClick={this.postDelete.bind(this, item)}>Delete Post</a>
                                                                                                <a className="dropdown-item" href="javascript:;" onClick={this.postEdit.bind(this, item)}>Edit Post</a>
                                                                                            </>
                                                                                            {/* <>
                                                                                            <a className="dropdown-item" href="javascript:;" onClick={this.postEdit.bind(this, item)}>Edit Post</a> */}
                                                                                            {/* </>} */}

                                                                                            {/* <a className="dropdown-item" href="#">Something else here</a> */}
                                                                                        </div>
                                                                                    </div> : <div className="dropdown three_dots">

                                                                                            <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                                className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                                            <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                                {this.loginData.id === item.group_owner_id ?
                                                                                                    <>
                                                                                                        {/* <a className="dropdown-item" style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#myModalShare" onClick={this.postShare.bind(this, item)}>Share</a> */}
                                                                                                        <a className="dropdown-item" href="javascript:;" onClick={this.postDelete.bind(this, item)}>Delete Post</a>
                                                                                                    </> :
                                                                                                    ''}
                                                                                                <a className="dropdown-item" style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#myModalShare" onClick={this.postShare.bind(this, item)}>Share</a>

                                                                                                <a className="dropdown-item" href="javascript:;" onClick={this.postBlock.bind(this, item)}>Block User</a>
                                                                                                {item.is_following === '0' ? <a className="dropdown-item" href="javascript:;" onClick={this.postFollow.bind(this, item)}>Follow User</a>
                                                                                                    : <a className="dropdown-item" href="javascript:;" onClick={this.postFollow.bind(this, item)}>Unfollow User</a>}

                                                                                            </div>
                                                                                        </div>}
                                                                                    <figure>
                                                                                        <Link to={`/timeLine/${item.user_id}`}>
                                                                                            <img src={item.profile_pic} style={{ width: '44px', height: '43px', objectFit: 'cover' }} alt="" />
                                                                                        </Link>
                                                                                    </figure>

                                                                                    <div className="friend-name">
                                                                                        <ins><Link to={`/timeLine/${item.user_id}`} title="">{item.full_name}</Link></ins>
                                                                                        <div className="time_line_ago">published111: {item.duration}</div>
                                                                                    </div>
                                                                                    <div className="post-meta">


                                                                                        <div id={"print_post_area" + item.post_id} style={{ display: item.is_nsfw === '0' ? "" : "none" }}>
                                                                                            {item.file_type === 'video' ?
                                                                                                <Player src={item.file} /> :
                                                                                                <>
                                                                                                    <img className="image_post_css" src={item.file} alt="" />
                                                                                                </>
                                                                                            }
                                                                                            <div className="description">

                                                                                                <p dangerouslySetInnerHTML={{ __html: item.message }}>

                                                                                                </p>
                                                                                                {item.hashtag_link.map(hashtagitem => (

                                                                                                    <span style={{ cursor: 'pointer' }} onClick={this.hashtagListData.bind(this, hashtagitem)}>
                                                                                                        {hashtagitem.hashtag}&nbsp;
</span>
                                                                                                ))}
                                                                                            </div>

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
                                                                                                    <a data-toggle="modal" href="javascript:;" data-target="#myModal2" ><button>CrowdFund&nbsp;<i className="fa fa-dollar"></i></button></a>
                                                                                                </li>}
                                                                                                <li>
                                                                                                    <span className="comment" data-toggle="tooltip" title="Comments">
                                                                                                        <i className="fa fa-comments-o"></i>
                                                                                                        <ins>{item.comments_count}</ins>
                                                                                                    </span>
                                                                                                </li>


                                                                                            </ul>
                                                                                            {(item.comments_count > 0) ?
                                                                                                <div><a href="javascript::void(0)" onClick={this.show_hide_comment.bind(this, item.post_id)}>View {item.comments_count} comments</a></div>
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
                                                                                                        <img src={crowdDetail1?.background_image} alt="Nothing Found" style={{ width: '837px', height: '166px', objectFit: 'cover' }} />
                                                                                                    </div>
                                                                                                    <div className="freedom-avatar" style={{ top: '113px', textAlign: 'center', maxWidth: '810px' }}>
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
                                                                                                                placeholder="0" data-cy="wire-v2-amount" className="token_value" />
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
                                                                                    <ul className="we-comet" style={{ display: "none" }} id={"comment_box" + item.post_id}>
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
                                                                                                                    {/* <a className="dropdown-item" href="#">Another action</a>
<a className="dropdown-item" href="#">Something else here</a> */}
                                                                                                                </div>
                                                                                                            </div> : ''}
                                                                                                            <h5><Link to={`/timeLine/${item1.user_id}`} title="">{item1.full_name}</Link></h5>
                                                                                                            <span>{item1.duration}</span>
                                                                                                            <a className="we-reply" href="javascript:;" onClick={this.reply_box.bind(this, item1)} title="Reply"><i className="fa fa-reply"></i> {item1.reply_count > 0 ? item1.reply_count + ' Replies' : ''} </a>
                                                                                                        </div>
                                                                                                        <p dangerouslySetInnerHTML={{ __html: item1.comment }}></p>
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
                                                                                                                    <TextareaAutosize id={"message2" + item1.post_comment_id} placeholder="Post your comment"></TextareaAutosize>
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
                                                                                                                                        {/* <a className="dropdown-item" href="#">Another action</a>
<a className="dropdown-item" href="#">Something else here</a> */}
                                                                                                                                    </div>
                                                                                                                                </div> : ''}
                                                                                                                                <h5><Link to={`/timeLine/${item2.user_id}`} title="">{item2.full_name}</Link></h5>
                                                                                                                                <span>{item2.duration}</span>

                                                                                                                            </div>
                                                                                                                            <p dangerouslySetInnerHTML={{ __html: item2.reply }}></p>
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
                                                                                                    <TextareaAutosize id={"message1" + item.post_id} placeholder="Post your comment"></TextareaAutosize>
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
                                                                {/* {codeData1 ? '' : <div className="text-center">Nothing More To Load</div>} */}


                                                            </div> : ''}


                                                    </>}
                                            </div>
                                            {/* <!-- centerl meta --> */}

                                            {/* Right Sidebar */}





                                            <div className="col-lg-3">
                                                <div className="m-groupGrid__right m-pageLayout__pane--right ">
                                                    <div className="minds-groups-profile-conversation">
                                                        <div className="m-group__chat m-comments__tree" style={{ width: '100%' }}>
                                                            <div className="m-comment-threads">
                                                                <div commentsscroll="" id="scroll_chat_box" className="m-comment-threads">
                                                                    <div className="m-layout--spacer"></div>
                                                                    <div className="m-comment-box">
                                                                        <div className="m-comment minds-comment minds-block">

                                                                            <div className="minds-body">
                                                                                {ListMessageChat1 ? '' : <div className="text-center">Nothing More To Load</div>}

                                                                                {this.state.ListMessageChat.map(item => (
                                                                                    <>
                                                                                        <div className="m-comment-box">
                                                                                            <div className="m-comment minds-comment minds-block">
                                                                                                <div className="freedom-avatar">
                                                                                                    <a href="/aman_gupta11"><img className="m-border" src={item.avatar} /></a>
                                                                                                </div>
                                                                                                <div className="minds-body">
                                                                                                    <div className="m-comment__bubble">
                                                                                                        <div className="m-commentBubble__username">
                                                                                                            <a href="/aman_gupta11">
                                                                                                                <span title={item.full_name} style={{ marginTop: '-3px' }}>{item.full_name}</span>
                                                                                                                <m-channel--badges badges="[ 'admin', 'verified' ]" className="m-channel--badges-activity">
                                                                                                                    <ul className="m-channel--badges"></ul>
                                                                                                                </m-channel--badges>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                        <p className="m-commentBubble__message m-mature-message-content">{item.message}</p>
                                                                                                        <m-translate>
                                                                                                            <div className="m-translate__hasNav2020"> </div>
                                                                                                        </m-translate>
                                                                                                    </div>
                                                                                                    {/* <br/> */}
                                                                                                    {item.file ? item.file_type === 'image' ? <img src={item.file} style={{ marginTop: '5px' }} /> : <Player className="preview_image_data_Message_data" src={item.file} /> : ''}

                                                                                                    <button className="m-comment__ribbonBtn m-comment__ribbonBtn--collapsed"><i className="material-icons fa fa-ellipsis-v"></i></button>

                                                                                                    <div className="m-comment__attachment"> </div>
                                                                                                    <div className="m-comment__toolbar ">
                                                                                                        <div className="m-commentToolbar__buttons">
                                                                                                            {item.user_like === '1' ? <div ><a data-cy="data-minds-thumbs-up-button"><i style={{ cursor: 'pointer', color: '#088dcd' }} onClick={this.submitLikeMessage.bind(this, item)} className="material-icons fa fa-thumbs-up"></i></a></div> :
                                                                                                                <div ><a data-cy="data-minds-thumbs-up-button"><i style={{ cursor: 'pointer' }} onClick={this.submitLikeMessage.bind(this, item)} className="material-icons fa fa-thumbs-up"></i></a></div>}
                                                                                                            <ins>{item.like_count}</ins>
                                                                                                            {item.user_dislike === '1' ? <div ><a _ngcontent-m-app-c208="" data-cy="data-minds-thumbs-down-button"><i style={{ cursor: 'pointer', color: '#088dcd' }} onClick={this.submitdisLikeMessage.bind(this, item)} className="material-icons fa fa-thumbs-down"></i></a></div> :
                                                                                                                <div ><a _ngcontent-m-app-c208="" data-cy="data-minds-thumbs-down-button"><i style={{ cursor: 'pointer' }} onClick={this.submitdisLikeMessage.bind(this, item)} className="material-icons fa fa-thumbs-down"></i></a></div>}
                                                                                                            <ins>{item.dislike_count}</ins>

                                                                                                            {item.reply_count > '0' ? <span className="m-clickable " style={{ cursor: 'pointer', color: '#088dcd' }} onClick={this.reply_box_message.bind(this, item)}><i className="material-icons fa fa-reply"></i><span className="">{item.reply_count} Replies</span> </span> :
                                                                                                                <span className="m-clickable " style={{ cursor: 'pointer' }} onClick={this.reply_box_message.bind(this, item)}><i className="material-icons fa fa-reply"></i><span className="">Reply</span> </span>}

                                                                                                        </div>
                                                                                                        <span className="m-commentToolbar__timestamp " title="Nov 4, 2020, 11:27:56 PM">{item.duration}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                                {this.loginData.id === item.id || this.loginData.id === item.group_owner_id ? <div className="dropdown three_dots">

                                                                                                    <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                                        className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                                                    <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                                        <a className="dropdown-item" onClick={this.groupChatDelete.bind(this, item)} href="javascript:;">Delete</a>

                                                                                                    </div>
                                                                                                </div> : ''}

                                                                                                {/* <span>

            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            </span> */}

                                                                                                {/* <i className="material-icons">more_vert</i> */}
                                                                                            </div>
                                                                                        </div>



                                                                                        <div className="m-comment-threads" >
                                                                                            <div className="m-comment__poster" id={"reply_box_message" + item.chat_id} style={{ display: 'none' }}>
                                                                                                {item.reply.map(item1 => (
                                                                                                    <div commentsscroll="" className="m-comment-threads">
                                                                                                        <div className="m-layout--spacer"></div>
                                                                                                        <div className="m-comment-box">
                                                                                                            <div className="m-comment minds-comment minds-block" style={{ marginLeft: '30px' }}>
                                                                                                                <div className="freedom-avatar">
                                                                                                                    <a href="/amttiwari"><img className="m-border" src={item1.avatar} /></a>
                                                                                                                </div>
                                                                                                                <div className="minds-body">
                                                                                                                    <div className="m-comment__bubble">
                                                                                                                        <div className="m-commentBubble__username">
                                                                                                                            <a href="/amttiwari">
                                                                                                                                <span title={item1.full_name}>{item1.full_name}</span>
                                                                                                                                <m-channel--badges badges="[ 'admin', 'verified' ]" className="m-channel--badges-activity">
                                                                                                                                    <ul className="m-channel--badges">
                                                                                                                                    </ul>
                                                                                                                                </m-channel--badges>
                                                                                                                            </a>
                                                                                                                        </div>
                                                                                                                        <p className="m-commentBubble__message m-mature-message-content">{item1.message}</p>
                                                                                                                        {item1.file ? item1.file_type === 'image' ? <img src={item1.file} style={{ marginTop: '5px' }} /> : <Player className="preview_image_data_Message_data" src={item1.file} /> : ''}

                                                                                                                        <m-translate>
                                                                                                                            <div className="m-translate__hasNav2020">

                                                                                                                            </div>
                                                                                                                        </m-translate>
                                                                                                                    </div>
                                                                                                                    <div className="dropdown three_dots">

                                                                                                                        <i type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                                                                            className="fa fa-ellipsis-v" aria-hidden="true"></i>

                                                                                                                        <div className="dropdown-menu" style={{ fontSize: '15px' }} aria-labelledby="dropdownMenuButton">
                                                                                                                            <a className="dropdown-item" onClick={this.groupChatReplyDelete.bind(this, item1)} href="javascript:;">Delete</a>

                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <button className="m-comment__ribbonBtn m-comment__ribbonBtn--collapsed"><i className="material-icons fa fa-ellipse-v"></i></button>

                                                                                                                    <div className="m-comment__attachment">

                                                                                                                    </div>

                                                                                                                    <div className="m-comment__toolbar ">
                                                                                                                        <div className="m-commentToolbar__buttons">
                                                                                                                            <div >
                                                                                                                                <a data-cy="data-minds-thumbs-up-button">
                                                                                                                                </a>
                                                                                                                            </div>
                                                                                                                            <div >
                                                                                                                                <a _ngcontent-m-app-c208="" data-cy="data-minds-thumbs-down-button">
                                                                                                                                </a>
                                                                                                                            </div>
                                                                                                                            <span className="m-clickable selected ">

                                                                                                                            </span>

                                                                                                                        </div>
                                                                                                                        <span className="m-commentToolbar__timestamp " title="Oct 30, 2020, 6:57:08 AM">{item1.duration}</span>
                                                                                                                    </div>

                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>

                                                                                                    </div>
                                                                                                ))}


                                                                                                <div className="m-comment m-comment--poster minds-block ">
                                                                                                    <div className="freedom-avatar">
                                                                                                        <a href="/aman_gupta11"><img className="m-border" src="https://cdn.minds.com/icon/1158705945748971523/large/1601905066" /></a>
                                                                                                    </div>
                                                                                                    <div className="minds-body">
                                                                                                        <div className="m-comments-composer">
                                                                                                            <form className="groupProjectEnterMessage">

                                                                                                                <m-text-input--autocomplete-container >
                                                                                                                    <div className="minds-textarea">
                                                                                                                        <textarea id={"message2Message" + item.chat_id} placeholder="Write your comment" ></textarea>
                                                                                                                        {/* <span className="m-placeholder "></span> */}

                                                                                                                    </div>

                                                                                                                </m-text-input--autocomplete-container>

                                                                                                                <div className="mdl-card__actions">
                                                                                                                    <div className="m-comments-composer--overflow"></div>
                                                                                                                    <div className="attachment-button"><i className="material-icons fa fa-image"></i>
                                                                                                                        <input type="file" accept=".jpg,.jpeg,.png,.mp4" id={"imggMessage" + item.chat_id} onChange={this.handleImagePreview2Message.bind(this, item.chat_id)} name="attachment" />

                                                                                                                    </div>


                                                                                                                    <div className="m-commentPoster__limit hidden"><span className="m-commentPosterLimit__inputed"> 0 </span><span> / 1500</span></div>
                                                                                                                    <i className="fa fa-paper-plane post_commentcssMessage" type="submit" id="groupProjectEnterMessageData" style={{ position: 'absolute', top: '2px' }} onClick={this.replyOnReplyCommentMessage.bind(this, item)} aria-hidden="true"></i>
                                                                                                                </div>
                                                                                                            </form>

                                                                                                            {this.state.image_preview2Message && this.state.img_post_cmt_id_Message === item.chat_id ?
                                                                                                                <>
                                                                                                                    {this.state.file_type2Message === 'video' ? <Player id={"cmt_imggMessage" + item.chat_id} className="preview_image_data_message" src={this.state.image_preview2Message} />
                                                                                                                        : <img id={"cmt_imggMessage" + item.chat_id} className="preview_image_data_message" src={this.state.image_preview2Message} alt="No Data" />}

                                                                                                                </>
                                                                                                                : ''}


                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>


                                                                                            </div>

                                                                                        </div>
                                                                                    </>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                            {this.state.groupDetail?.is_group_member === 'Leave' ? <div className="m-comment__poster">
                                                                <div className="m-comment m-comment--poster minds-block ">
                                                                    <div className="freedom-avatar">
                                                                        <a href="/aman_gupta11"><img className="m-border" src={this.state.bannerImage?.avatar} /></a>
                                                                    </div>
                                                                    <div className="minds-body" style={{ marginBottom: '24px' }}>
                                                                        <div className="m-comments-composer">
                                                                            <form className="groupProjectEnter">
                                                                                <m-text-input--autocomplete-container>
                                                                                    <div className="minds-textarea">
                                                                                        <textarea m-attachment-paste="" id="message_sent" value={this.state.messageChat}
                                                                                            onChange={this.onChange} name="messageChat" placeholder="Write your message" tabindex="0" className="m-editor" style={{ width: '79%', border: 'none' }} contenteditable="true"></textarea>
                                                                                        <i className="fa fa-paper-plane post_commentcss" type="submit" style={{ position: 'absolute', zIndex: '99999', marginLeft: '-7px' }} id="groupProjectEnterData" onClick={this.handleSubmitFileMessage.bind(this)} aria-hidden="true"></i>
                                                                                    </div>

                                                                                </m-text-input--autocomplete-container>
                                                                                <div className="mdl-card__actions">
                                                                                    <div className="m-comments-composer--overflow"></div>
                                                                                    <div className="attachment-button"><i className="material-icons fa fa-image"></i>
                                                                                        <input type="file" accept=".jpg,.jpeg,.png" id="image_text_message" onChange={this.handleImagePreviewMessage} />
                                                                                    </div>
                                                                                    <div className="m-commentPoster__limit hidden"><span className="m-commentPosterLimit__inputed"> 0 </span><span> / 1500</span></div>
                                                                                </div>


                                                                            </form>
                                                                            {this.state.image_previewMessage ? this.state.file_type === 'video' ? <Player className="preview_image_data_Message" src={this.state.image_previewMessage} /> :
                                                                                <img className="preview_image_data_Message" src={this.state.image_previewMessage} style={{ display: 'block' }} /> : ''}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* </div> */}
                                            {/* <!-- sidebar --> */}
                                            {/* </div> */}















                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
                <Messaging />
                <div id="myModal3" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog2">
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">Tag111</h3>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p className=""> Tagging your post will make your content more easily discoverable. Add up to five. </p>
                                <div className="m-composerTags__trending">
                                    <m-hashtags__trending>
                                        <ul className="m-hashtags__trending">
                                            <li className="m-hashtagsTrending__decoration "><img alt="" src="http://espsofttechnologies.com/favicon.ico" /></li>
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
                                        </ul>
                                    </m-hashtags__trending>
                                </div>
                                <div className="m-composerPopup__field">
                                    <label for="minds-m-composer__tags--1005-tags">Tag1</label>
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
                                        <div class={($.inArray(item.nsfw, this.state.selectnsfw) !== -1) ? 'select_nsfw active' : 'select_nsfw '} style={{ marginLeft: '10px' }}>
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



                <div className="modal" id="myModalExchange">
                    <div className="modal-dialog box_width">
                        <div className="modal-content">
                            <div className="modal-header remindCss">Remind
                                {/* <h4 className="modal-title text-center"></h4> */}
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form className="main_msg_area1" >
                                    <textarea placeholder="Enter your remind status here (optional)" name="repost_comment" onChange={this.onChange} value={this.state.repost_comment}></textarea>
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