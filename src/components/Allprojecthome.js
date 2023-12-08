import React, { Component } from 'react';
import $ from 'jquery';
import Header from '../directives/header'
import Footer from '../directives/footer'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import { Link } from 'react-router-dom';

const TITLE = 'Victus-Token-All-Projects'

export default class Allprojectshome extends Component {


    // custom_file_upload_url = `${process.env.REACT_APP_URL}/api/users/group_create`;
    // custom_file_upload_url1 = `${process.env.REACT_APP_URL}/api/users/post_comment`;
    // // custom_file_upload_url2 = `${process.env.REACT_APP_URL}/api/users/post_comment_reply`;

    constructor(props) {
        super(props);
        this.state = {
            listProject: []
        }
    }

    componentDidMount() {

        this.projectAPI()
    }

    // ==================================  Detail of Project List  ==============================


    projectAPI() {
        axios.get(`${process.env.REACT_APP_URL}/api/users/project_list`, {}).then((res) => {
            //on success
            this.codeDataProject = res.data.code
            if (this.codeDataProject === true) {
                this.setState({
                    listProject: res.data.recdata
                });
            }
            else if (this.codeDataProject === false) {
                this.setState({
                    listProject: []
                })
            }
        }).catch((error) => {
        });

    }


    projectLogin(id) {
        setTimeout(() => {

            window.location.hash = '/Login=' + id;
            window.location.reload(true)
        }, 200);
    }


    render() {
        const codeDataProject1 = this.codeDataProject

        return (

            <>
                <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
                <div className="se-pre-con"></div>
                {/* <!-- NAVIGATION --> */}
                <Header />

                <section class="setStickHome">
                    <div class="container">
                        {codeDataProject1 ? '' : <div className="text-center" style={{minHeight:'100vh'}}>Nothing More To Load</div>}

                        {this.state.listProject.map(item => (
                            <div class="col-lg-12 ">
                                <section class="col-lg-4">
                                    <div class="feature-photo1 ">
                                        <figure><img alt="" style={{ width: '100%', height: '221px', objectFit: 'cover' }} src={item.banner} /></figure>
                                        <div class="container">
                                            <div class="row merged1" style={{ maxHeight: '100px' }}>
                                                <div class="col-lg-3 col-sm-3">
                                                    <div class="user-avatar1">
                                                        <figure><img alt="" style={{ width: '65px', height: '65px' }} src={item.avatar} /></figure>
                                                    </div>

                                                </div>
                                                <div class="col-lg-9 col-sm-9">
                                                  
                                                    <div class="dropdown">
                                                        <div class="dropdown-menu setting_menu" aria-labelledby="dropdownMenuButton">
                                                            <ul>
                                                                <li><a class="dropdown-item" href="javascript:;">Edit</a></li>
                                                                <li><a class="dropdown-item" href="javascript:;">Make Closed</a></li>
                                                                <li><a class="dropdown-item" href="javascript:;">Delete Group</a></li>
                                                            </ul>



                                                            <li class="pull-right" style={{ marginRight: '5px', cursor: 'pointer', listStyle: 'none' }}>
                                                                <a data-toggle="modal" href="javascript:;" data-target="#myModal2">
                                                                    <span>Crowdfund&nbsp;<i class="fa fa-dollar"></i></span>
                                                                    <div>30days</div>
                                                                </a>
                                                            </li>
                                                        </div>
                                                        <div class="modal" id="myModal2">
                                                            <div class="modal-dialog box_width">
                                                                <div class="modal-content">
                                                                    <div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button></div>
                                                                    <div class="m-wireCreator__ownerBlock ">
                                                                        <div class="m-wireCreatorOwnerBlock__channelBanner">
                                                                            <div class="m-wireCreatorOwnerBlockChannelBanner__background">
                                                                                <img src="./assets/images/banner.jpg" style={{ width: '100%', height: '166px' }} /></div>
                                                                            <div class="minds-avatar" style={{ top: '90px' }}>
                                                                                <img src="http://espsofttechnologies.com/freedomcell/uploads/group_avatar/16033531920_19.png" style={{ borderRadius: '50%', height: '85px', width: '85px' }} /></div>
                                                                        </div>
                                                                        <div class="m-wireCreatorOwnerBlock__heading">
                                                                            <div class="m-wireCreatorOwnerBlockHeading__title" style={{ marginTop: '45px' }}><span>Pay</span>&nbsp;<span><i class="material-icons   fa fa-angle-right" style={{ fontSize: '1em' }}></i></span>&nbsp;<span></span></div>
                                                                            <div class="m-wireCreatorOwnerBlock__username">@</div>
                                                                        </div>
                                                                        <div class="m-wireCreatorForm__fieldset">
                                                                            <div class="m-wireCreatorForm__fields ">
                                                                                <div class="m-wireCreatorForm__field"><label class="m-wireCreatorForm__label">Tokens</label><input type="text" name="token" placeholder="0" data-cy="wire-v2-amount" class="" /></div>
                                                                            </div>
                                                                            <div class="m-wireCreatorForm__fields">
                                                                                <div class="m-wireCreatorForm__field ">
                                                                                    <div class="m-wireCreatorForm__label"> Wallet Type </div>
                                                                                    <div class="m-wireCreatorForm__toggleContainer"><span class="m-wireCreatorForm__toggleLabel">On-chain</span></div>
                                                                                </div>
                                                                                <div class="m-wireCreatorForm__field ">
                                                                                    <div class="m-wireCreatorForm__label"> Wallet Balance </div>
                                                                                    <span class="m-wireCreatorForm__value ">1.000 </span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <div class="m-poweredBy col-sm-6 text-left"><img class="m-poweredBy__bulb" alt="Nothing Found" src="http://espsofttechnologies.com/favicon.ico" /><span class="m-poweredBy__text"> Powered by <a href="javascript:;">Freedom Cell Pay</a></span></div>
                                                                                <div class="m-wireCreatorToolbar__message col-sm-4">
                                                                                    <div class="m-wireCreatorToolbarMessage__error "> Cannot spend more than  tokens </div>
                                                                                </div>
                                                                                <button type="submit" disabled="" class="btn btn-primary">Send  tokens</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ul class="search_ul"></ul>
                                                        <div style={{ marginLeft: '10px' }}>
                                                            <h6 class="text-black">Crowd Funding target -{item.funding_target} </h6>
                                                            <h6 class="text-black">Funded Percent -{item.funded_percent}</h6>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="col-lg-12 col-sm-12">
                                                    <div class="name-profile2Home" style={{ marginBottom: '10px', paddingLeft: '31px' }}>
                                                        <h4 class="name-profile1Home" style={{ fontSize: '17px' }} title={item.group_name}>{item.short_group_name}</h4>
                                                        <br />
                                                        <p class="bio-data" title={item.description}>{item.short_description}</p>
                                                    </div>
                                                </div>
                                                <Link to={`/Login=${item.id}`} onClick={this.projectLogin.bind(this, item.id)}>
                                                    <button className="btn btn-primary btn-sm pull-right" type="submit" style={{ cursor: 'pointer', marginLeft: '189px' }}>Crowdfund&nbsp;<i className="fa fa-dollar"></i></button>
                                                </Link>


                                            </div>
                                        </div>

                                    </div>
                                </section>
                            
                            
                            </div>
                        
                  
                  ))}
                    </div>
                </section>

                {/* <!-- Footer Section --> */}
                <Footer />
            </>

        )
    }
}

