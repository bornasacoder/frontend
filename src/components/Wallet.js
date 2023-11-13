import React, { Component } from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet'
import InnerHeader from '../directives/innerHeader';
import InnerSidebar from '../directives/innerSidebar';
import Fixedsidebarright from '../directives/Fixedsidebarright'
import axios from 'axios';
import toastr from 'reactjs-toastr';
import Messaging from '../components/messaging'

var QRCode = require('qrcode.react');
const headers = {
    'Content-Type': 'text/plain'
 };
const TITLE = 'Freedom-cells-Wallet'
const initialState = {
    user_id: '',
    api_key: '',
    currency: '',
    token_value: '',
    currency_value: '',
    fcell: '',
    currency_value_withdraw: '',
    fees: '',
    ether: '',
    fees1: '',
    eth_recieved: '',
    fees2: '',
    transactionTypeData: [],
    transactionTypeListData: []
}

export default class Wallet extends Component {



    constructor(props) {
        super(props);
        this.state = initialState
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.submitFormWithdraw = this.submitFormWithdraw.bind(this)
        this.submitFormETH = this.submitFormETH.bind(this)

        this.onChangeLanguage1 = this.onChangeLanguage1.bind(this)
        this.submitFormToken = this.submitFormToken.bind(this)
        this.onChangeWithdraw = this.onChangeWithdraw.bind(this)
        let data = Cookies.getJSON('name');
        this.loginData = data.user_data
    }


    componentDidMount() {


        $('.sidebar').find('ul').find('li').removeClass('active');
        $('#li_wallet').addClass('active');
        this.walletBalanceAPI()
        this.transactionType()
        this.transactionTypeList()
    }


    onChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onChangeLanguage1(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onChangeWithdraw(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //submit the data
    async submitForm(id, e) {

        e.preventDefault()

        this.setState(initialState)
        const data = this.state
        if (id === 'FCELL') {

            this.state.currency = 'FCELL'
        }
        else if (id === 'ETH') {
            this.state.currency = 'ETH'
        }
        else if (id === 'BTC') {
            this.state.currency = 'BTC'
        }
        this.state.user_id = this.loginData.id
        this.state.api_key = this.loginData.api_key
        this.state.fees = this.state.fees2
        delete this.state.walletBalance

        axios.post(`${process.env.REACT_APP_URL}/api/users/coin_transfer`, data,{headers})
            .then(response => {

                if (response.data.code === true) {
                    toastr.success('Sucess', { displayDuration: 3000 })

                    this.setState({
                        loading: false,
                        message: response.data
                    })
                }
                else if (response.data.code === false) {
                    toastr.error(response.data.message, { displayDuration: 3000 })
                    this.setState({

                        loggedIn: false,

                    });
                }
                this.componentDidMount()
            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }



    //submit the data
    async submitFormETH(id, e) {

        e.preventDefault()

        this.setState(initialState)
        const data = this.state
        if (id === 'FCELL') {

            this.state.currency = 'FCELL'
        }
        else if (id === 'ETH') {
            this.state.currency = 'ETH'
        }
        else if (id === 'BTC') {
            this.state.currency = 'BTC'
        }
        this.state.user_id = this.loginData.id
        this.state.api_key = this.loginData.api_key

        delete this.state.walletBalance
        delete this.state.token_value
        delete this.state.currency_value
        delete this.state.fcell
        delete this.state.currency_value_withdraw
        delete this.state.ether
        delete this.state.currency


        axios.post(`${process.env.REACT_APP_URL}/api/users/withdraw_eth`, data,{headers})
            .then(response => {

                if (response.data.code === true) {
                    toastr.success(response.data.message, { displayDuration: 6000 })

                    this.setState({
                        loading: false,
                        message: response.data
                    })
                }
                else if (response.data.code === false) {
                    toastr.error(response.data.message, { displayDuration: 3000 })
                    this.setState({

                        loggedIn: false,

                    });
                }
                this.componentDidMount()
            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }



    //submit the data
    async submitFormToken(e) {

        e.preventDefault()

        this.setState(initialState)
        const data = this.state
        this.state.currency = 'ETH'
        this.state.user_id = this.loginData.id
        this.state.api_key = this.loginData.api_key

        delete this.state.walletBalance


        axios.post(`${process.env.REACT_APP_URL}/api/users/buy_token`, data,{headers})
            .then(response => {

                if (response.data.code === true) {
                    toastr.success('Sucess', { displayDuration: 3000 })

                    this.setState({
                        loading: false,
                        message: response.data
                    })
                }
                else if (response.data.code === false) {
                    toastr.error(response.data.message, { displayDuration: 3000 })
                    this.setState({

                        loggedIn: false,

                    });
                }
                this.componentDidMount()
            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }





    //submit the data
    async submitFormWithdraw(e) {

        e.preventDefault()


        this.setState(initialState)

        const data = this.state

        this.state.user_id = this.loginData.id
        this.state.api_key = this.loginData.api_key
        this.state.fees = this.state.fees1

        delete this.state.walletBalance
        delete this.state.currency
        delete this.state.token_value
        delete this.state.currency_value



        axios.post(`${process.env.REACT_APP_URL}/api/users/withdraw_token`, data,{headers})
            .then(response => {

                if (response.data.code === true) {
                    toastr.success('Sucess', { displayDuration: 3000 })

                    this.setState({
                        loading: false,
                        message: response.data
                    })
                }
                else if (response.data.code === false) {
                    toastr.error(response.data.message, { displayDuration: 3000 })
                    this.setState({

                        loggedIn: false,

                    });
                }
                this.componentDidMount()
            })

            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    //==================================  Wallet Balance List  ==============================

    walletBalanceAPI() {


        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        axios.post(`${process.env.REACT_APP_URL}/api/users/wallet_balance`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
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

    //===================================   transaction type list  ==========================

    transactionType() {


        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        axios.post(`${process.env.REACT_APP_URL}/api/users/trx_type_list`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            //on success
            this.codeDataTransactionType = res.data.code
            if (this.codeDataTransactionType === true) {

                this.setState({
                    transactionTypeData: res.data.recdata
                });
            }
            $('#main_loader').hide();
            $('#root').css('opacity', '1');

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }

    //=====================================  Transaction list  ==============================

    transactionTypeList() {


        $('#main_loader').show();
        $('#root').css('opacity', '0.5');
        axios.post(`${process.env.REACT_APP_URL}/api/users/transaction_list`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'trx_type_id': '0' },{headers}).then((res) => {
            //on success
            this.codeDataTransactionList = res.data.code
            if (this.codeDataTransactionList === true) {
                this.setState({
                    transactionTypeListData: res.data.recdata
                });
            }
            else {
                this.setState({
                    transactionTypeListData: []
                });
            }


            $('#main_loader').hide();
            $('#root').css('opacity', '1');

        }).catch((error) => {
            //on error
            //alert("There is an error in API call.");
        });

    }


    myFunction() {
        var copyText = document.getElementById("myInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copied";
        // alert("Copied")
        toastr.success('Copied', { displayDuration: 3000 })


    }

    outFunc() {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copy";

    }


    myFunction1() {
        var copyText = document.getElementById("myInput1");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        var tooltip = document.getElementById("myTooltip1");
        tooltip.innerHTML = "Copied";
        // alert("Copied")
        toastr.success('Copied', { displayDuration: 3000 })

    }

    outFunc1() {
        var tooltip = document.getElementById("myTooltip1");
        tooltip.innerHTML = "Copy";
    }


    myFunction2() {
        var copyText = document.getElementById("myInput2");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        var tooltip = document.getElementById("myTooltip2");
        tooltip.innerHTML = "Copied";
    }

    outFunc2() {
        var tooltip = document.getElementById("myTooltip2");
        tooltip.innerHTML = "Copy";
    }


    txnchange() {
        var a = document.getElementById('inputNameData').value;

        setTimeout(() => {

            $('#main_loader').show();
            $('#root').css('opacity', '0.5');
            axios.post(`${process.env.REACT_APP_URL}/api/users/transaction_list`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'trx_type_id': a },{headers}).then((res) => {
                //on success
                this.codeDataTransactionList = res.data.code

                if (this.codeDataTransactionList === true) {

                    this.setState({
                        transactionTypeListData: res.data.recdata
                    });
                }
                else {
                    this.setState({
                        transactionTypeListData: []
                    });
                }
                $('#main_loader').hide();
                $('#root').css('opacity', '1');

            }).catch((error) => {
                //on error
                //alert("There is an error in API call.");
            });
        }, 1500);

    }

    //============================================  copy to clipboard transactions  =============================

    myFunctionCopy(id) {
        var copyText = document.getElementById("myInputCopy" + id);


        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        var tooltip = document.getElementById("myTooltipcopy" + id);
        // tooltip.innerHTML = "Copied";
        // alert("Copied")
        toastr.success('Copied', { displayDuration: 3000 })


    }

    outFuncCopy(id) {
        var tooltip = document.getElementById("myTooltipcopy" + id);
        // tooltip.innerHTML = "Copy";

    }


    render() {
        const codeData = this.codeDataTransactionList
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
                                <li><a href="javascript:;" title="Newsfeed Page" data-toggle="tooltip" data-placement="right"><i className="ti-magnet"></i></a></li>
                                <li><a href="javascript:;" title="favourit page" data-toggle="tooltip" data-placement="right"><i className="fa fa-star-o"></i></a></li>
                                <li><a href="javascript:;" title="Account Stats" data-toggle="tooltip" data-placement="right"><i className="ti-stats-up"></i></a></li>
                                <li><a href="javascript:;" title="inbox" data-toggle="tooltip" data-placement="right"><i className="ti-import"></i></a></li>
                                <li><a href="javascript:;" title="Messages" data-toggle="tooltip" data-placement="right"><i className="ti-comment-alt"></i></a></li>
                                <li><a href="javascript:;" title="Setting" data-toggle="tooltip" data-placement="right"><i className="ti-panel"></i></a></li>
                                <li><a href="javascript:;" title="Faq's" data-toggle="tooltip" data-placement="right"><i className="ti-light-bulb"></i></a></li>
                                <li><a href="javascript:;" title="Friends" data-toggle="tooltip" data-placement="right"><i className="ti-themify-favicon"></i></a></li>
                                <li><a href="javascript:;" title="Widgets" data-toggle="tooltip" data-placement="right"><i className="ti-eraser"></i></a></li>
                                <li><a href="javascript:;" title="Notification" data-toggle="tooltip" data-placement="right"><i className="ti-bookmark-alt"></i></a></li>
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
                                                <div className="central-meta" style={{ width: '100%', minHeight: '600px', paddingTop: '0px' }}>
                                                    <div className="frnds wallet">
                                                        <div className=" mt-3 tab-card">
                                                            <div className=" tab-card-header">

                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">


                                                                            <li className="nav-item">
                                                                                <a className="nav-link active" style={{ fontSize: '18px' }} id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Tokens<br />{this.state?.walletBalance?.fcell_balance}</a>
                                                                            </li>

                                                                            <li className="nav-item">
                                                                                <a className="nav-link" style={{ fontSize: '18px' }} id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Ether<br />{this.state?.walletBalance?.eth_balance}</a>
                                                                            </li>

                                                                            {/* <li className="nav-item">
    <a className="nav-link" style={{ fontSize: '18px' }} id="four-tab" data-toggle="tab" href="#four" role="tab" aria-controls="four" aria-selected="false">Bitcoin<br />{this.state?.walletBalance?.btc_balance}</a>
</li> */}

                                                                        </ul></div>
                                                                    <div className="col-sm-6">
                                                                        <div className="row">

                                                                            <table width="375" border="0">
                                                                                <tr>
                                                                                    <td colSpan="3"><span className="style1"><b>Fcell Balance</b></span></td>
                                                                                    <td colSpan="2"><b>{this.state?.walletBalance?.fcell_balance}</b></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="76"><div align="left">ETH</div></td>
                                                                                    <td width="72"><div align="right">{this.state?.walletBalance?.fcell_balance_eth}</div></td>
                                                                                    <td width="58">&nbsp;</td>
                                                                                    <td width="55">USD</td>
                                                                                    <td width="130"><div align="right">{this.state?.walletBalance?.fcell_balance_usd}</div></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><div align="left">BTC</div></td>
                                                                                    <td><div align="right">{this.state?.walletBalance?.fcell_balance_btc}</div></td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td width="55">CZK</td>
                                                                                    <td width="55"><div align="right">{this.state?.walletBalance?.fcell_balance_czk}</div></td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                        {/* <div className="row wallet_fcell" >
                                                                            <div className="col-sm-6">

                                                                                <div className="row">
                                                                                    <div className="col-sm-12 bold_color">Fcell Balance</div>

                                                                                    <div className="col-sm-6">ETH</div>
                                                                                    <div className="col-sm-6">{this.state?.walletBalance?.fcell_balance_eth}</div>
                                                                                    <div className="col-sm-6">BTC</div>
                                                                                    <div className="col-sm-6">{this.state?.walletBalance?.fcell_balance_btc}</div>


                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-6">

                                                                                <div className="row">
                                                                                    <div className="col-sm-12 bold_color">{this.state?.walletBalance?.fcell_balance}</div>

                                                                                    <div className="col-sm-6">USD</div>
                                                                                    <div className="col-sm-6">{this.state?.walletBalance?.fcell_balance_usd}</div>
                                                                                    <div className="col-sm-6">CZK</div>
                                                                                    <div className="col-sm-6">{this.state?.walletBalance?.fcell_balance_czk}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div> */}
                                                                    </div>

                                                                </div>

                                                            </div>

                                                            <div className="tab-content" id="myTabContent" style={{ borderTop: '1px solid #ddd', marginTop: '11px' }} >
                                                                <div className="tab-pane fade show active " id="one" role="tabpanel" aria-labelledby="one-tab">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            {/* <h6>My Wallet</h6>
                                                                            <div className="wallet_info">
                                                                                <div className="row">
                                                                                    <div className="col-md-8">
                                                                                        <h6>Fcell Balance</h6>
                                                                                        <h6>ETH value</h6>
                                                                                        <h6>BTC value</h6>
                                                                                        <h6>USD value</h6>
                                                                                        <h6>CZK value</h6>

                                                                                    </div>
                                                                                    <div className="col-md-4" style={{ textAlign: 'right' }}>
                                                                                        <h6>{this.state?.walletBalance?.fcell_balance}</h6>
                                                                                        <h6>{this.state?.walletBalance?.fcell_balance_eth}</h6>
                                                                                        <h6>{this.state?.walletBalance?.fcell_balance_btc}</h6>
                                                                                        <h6>{this.state?.walletBalance?.fcell_balance_usd}</h6>
                                                                                        <h6>{this.state?.walletBalance?.fcell_balance_czk}</h6>


                                                                                    </div>
                                                                                </div>
                                                                            </div> */}


                                                                            <h6>Buy FCELL TOKEN</h6>

                                                                            <div className="wallet_info" style={{ height: '273px' }}>
                                                                                {/* <h6>BUY Fcell for ETH</h6> */}
                                                                                {/* <h6> 1 Fcell = {this.state?.walletBalance?.fcell_btc_value} BTC</h6> */}
                                                                                <h6 className="text-left"> 1 Fcell = {this.state?.walletBalance?.fcell_eth_value} ETH</h6>

                                                                                <form onSubmit={this.submitFormToken}>
                                                                                    {/* <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Select the cryptocurrency </label>
                                                                                            <select className="form-control" value={this.state.currency}
                                                                                                onChange={this.onChangeLanguage1} name="currency">
                                                                                                <option value="">Select Currency</option>
                                                                                                <option value="BTC">Bitcoin</option>
                                                                                                <option value="ETH">Ethereum</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <br /> */}
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Freedomcell Tokens to Buy
                                                                                            </label>
                                                                                            <input type="text" value={this.state.token_value}
                                                                                                onChange={this.onChangeLanguage1} name="token_value" style={{ padding: '0px' }} placeholder="Quantity to buy" className="input-receive rece" /><br />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12" style={{ display: 'inherit' }}>

                                                                                            <input type="number" disabled step="0.01" value={this.state.currency_value = parseFloat(this.state.token_value) * parseFloat(this.state?.walletBalance?.fcell_eth_value)}
                                                                                                onChange={this.onChangeLanguage1} name="currency_value" style={{ padding: '0px', width: '90%' }} placeholder="ETH value" className="input-receive rece" />ETH

                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-2">
                                                                                            <button type="submit" disabled={!this.state.token_value || this.state.currency_value > this.state?.walletBalance?.eth_balance} style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt">Buy Tokens</button>

                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            </div>



                                                                            <h6>Withdraw FCELL TOKEN</h6>
                                                                            <div className="wallet_info">
                                                                                <form onSubmit={this.submitForm.bind(this, 'FCELL')}>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Recevier's Addres</label>
                                                                                            <input type="text" value={this.state.to_wallet}
                                                                                                onChange={this.onChange} name="to_wallet" style={{ padding: '0px' }} placeholder="Recevier's Address" className="input-receive rece" /><br />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-10">
                                                                                            <label className="pull-left">Amount</label>
                                                                                            <input type="number" value={this.state.amount}
                                                                                                onChange={this.onChange} name="amount" style={{ padding: '0px' }} placeholder="Amount" className="input-receive rece" />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Fees (Service + Network Fees)</label>
                                                                                            <input type="number" step="0.01" disabled value={this.state.fees2 = parseFloat(this.state.amount) * parseFloat(this.state?.walletBalance?.withdraw_fee_percent) / parseInt(100) * parseFloat(this.state?.walletBalance?.fcell_eth_value)}
                                                                                                onChange={this.onChangeWithdraw} name="fees" style={{ padding: '0px' }} placeholder="Fees" className="input-receive rece" />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-2">
                                                                                            {this.state?.walletBalance?.balance === '0' ? <button type="submit" style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt" disabled>Withdraw Tokens</button>
                                                                                                : <button type="submit" disabled={!this.state.to_wallet && !this.state.amount} style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt">Withdraw Tokens</button>}

                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <h6>Receive FCELL TOKEN</h6>
                                                                            <div className="wallet_info">
                                                                                <p>Use this QR code to deposit funds:</p>

                                                                                <QRCode style={{ height: '166px', width: '85%' }} className="img-fluid QR-code" value={`${this.state?.walletBalance?.ETH_address}`} name="ETH_address" />
                                                                            </div>

                                                                            <div className="wallet_info1" style={{ marginTop: '45px' }}>
                                                                                <input type="text" className="input_wallet wallet_text" value={this.state?.walletBalance?.ETH_address} id="myInput" style={{ padding: '20px 0px 5px 59px' }} />
                                                                                <div className="">

                                                                                    <button className="btn btn-primary" onClick={this.myFunction} onMouseOut={this.outFunc} style={{ padding: '2px' }}>

                                                                                        {/* <h6>{this.state?.walletList?.address}</h6> */}
                                                                                        <span className="tooltiptext" id="myTooltip"
                                                                                        >Copy</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>


                                                                            {/* <h6>Send Coin</h6>
                                                                            <div className="wallet_info" style={{ height: '217px' }}>
                                                                                <form onSubmit={this.submitForm.bind(this, 'FCELL')}>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Recevier's Addres</label>
                                                                                            <input type="text" value={this.state.to_wallet}
                                                                                                onChange={this.onChange} name="to_wallet" style={{ padding: '0px' }} placeholder="Recevier's Address" className="input-receive rece" /><br />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-10">
                                                                                            <label className="pull-left">Amount</label>
                                                                                            <input type="number" value={this.state.amount}
                                                                                                onChange={this.onChange} name="amount" style={{ padding: '0px' }} placeholder="Amount" className="input-receive rece" />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-2">
                                                                                            {this.state?.walletBalance?.balance === '0' ? <button type="submit" style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt" disabled>Send</button>
                                                                                                : <button type="submit" disabled={!this.state.to_wallet && !this.state.amount} style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt">Send</button>}

                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            </div> */}
                                                                            <h6>Sell FCELL TOKEN</h6>
                                                                            <div className="wallet_info">
                                                                                <h6 className="text-left"> 1 Fcell = {this.state?.walletBalance?.fcell_eth_value} ETH</h6>

                                                                                <form onSubmit={this.submitFormWithdraw}>

                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Freedomcell Tokens to Sell 
                                                                                            </label>
                                                                                            <input type="text" value={this.state.fcell}
                                                                                                onChange={this.onChangeWithdraw} name="fcell" autoComplete="off" style={{ padding: '0px' }} placeholder="Quantity to Sell" className="input-receive rece" /><br />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row" style={{ display: 'none' }}>
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">ETH Value
                                                                                            </label>
                                                                                            <input type="text" disabled value={this.state.currency_value_withdraw = parseFloat(this.state.fcell) * parseFloat(this.state?.walletBalance?.fcell_eth_value)}
                                                                                                onChange={this.onChangeWithdraw} name="currency_value_withdraw" style={{ padding: '0px' }} placeholder="ETH Value" className="input-receive rece" />

                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className="row" style={{ display: 'none' }}>
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Fees (Service + Network Fees)
                                                                                            </label>
                                                                                            <input type="number" step="0.01" disabled value={this.state.fees1 = parseFloat(this.state.currency_value_withdraw) * parseFloat(this.state?.walletBalance?.withdraw_fee_percent) / parseInt(100)}
                                                                                                onChange={this.onChangeWithdraw} name="fees1" style={{ padding: '0px' }} placeholder="Fees" className="input-receive rece" />

                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12" style={{ display: 'inherit' }} >
                                                                                            {/* <label className="pull-left">ETH Recieved
                                                                                            parseFloat(this.state.currency_value_withdraw) - parseFloat(this.state.fees1)
                                                                                            </label> */}
                                                                                            <input type="number" step="0.01" disabled value={this.state.ether = parseFloat(this.state.fcell) * parseFloat(this.state?.walletBalance?.fcell_eth_value)}
                                                                                                onChange={this.onChangeWithdraw} name="ether" style={{ padding: '0px', width: '90%' }} placeholder="ETH Value" className="input-receive rece" />ETH

                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-2">
                                                                                            <button type="submit" disabled={!this.state.currency_value_withdraw || !this.state.fees1 || !this.state.ether} style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt">Sell Tokens</button>

                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            </div>




                                                                        </div>



                                                                    </div>



                                                                    {/* <div className="row">
                                                                        <div className="verifyPhone col-sm-6">
                                                                            <div className="m-walletTokenOnboardingStep__title">
                                                                                <span>1.</span><a href="javascript:;">Verify your phone number</a>
                                                                            </div>
                                                                            <div className="m-walletTokenOnboardingStep__desc"> Used simply to verify your uniqueness. </div>
                                                                        </div>
                                                                        <div className="Address col-sm-6">
                                                                            <div className="m-walletTokenOnboardingStep__title">
                                                                                <span>2.</span><a routerlink="settings" className="disabled" href="/wallet/canary/tokens/settings"> Add your on-chain address</a>
                                                                            </div>
                                                                            <div className="m-walletTokenOnboardingStep__desc"> Your Ethereum address allows you to start receiving payments on the blockchain. </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row pad_top">
                                                                        <div className="col-sm-2 pad_spc">
                                                                            <div className="m-walletBalance--tokens__balanceWrapper--total">
                                                                                <div className="m-walletBalance--tokens__balanceTitle"> Token Balance </div>
                                                                                <div className="m-walletBalance--tokens__balanceValWrapper">
                                                                                    <span className="m-walletBalance--tokens__balanceVal--int">0</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-2 pad_spc">
                                                                            <a className="m-walletBalance--tokens__buyButtonWrapper" href="javascript:;">
                                                                                <button className="m-shadowboxSubmitButton green" type="submit">
                                                                                    <div className="m-shadowboxSubmitButton__status--unsaved ">Buy tokens</div>
                                                                                </button>
                                                                            </a>
                                                                        </div>
                                                                        <div className="col-sm-2 text-center">
                                                                            <div className="m-walletBalance--tokens__equationSymbol">=</div>
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <div className="m-walletBalance--tokens__balanceWrapper--subtotal">
                                                                                <div className="m-walletBalance--tokens__balanceTitle">
                                                                                    On-Chain
                                                         <m-tooltip icon="help">
                                                                                        <div className="m-tooltip">
                                                                                            <i className="material-icons "></i>
                                                                                            <div className="m-tooltip--bubble" hidden="">Store tokens on your device instead of our servers for more control and portability</div>
                                                                                        </div>
                                                                                    </m-tooltip>
                                                                                </div>
                                                                                <div className="m-walletBalance--tokens__balanceValWrapper"><span className="m-walletBalance--tokens__balanceVal--int">0</span> tokens </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <div className="m-walletBalance--tokens__equationSymbol">+</div>
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <div className="m-walletBalance--tokens__balanceWrapper--subtotal">
                                                                                <div className="m-walletBalance--tokens__balanceTitle">
                                                                                    Off-Chain
                                                         <m-tooltip icon="help">
                                                                                        <div className="m-tooltip">
                                                                                            <i className="material-icons "></i>
                                                                                            <div className="m-tooltip--bubble" hidden="">Store tokens on our servers for quicker transaction times and no fees</div>
                                                                                        </div>
                                                                                    </m-tooltip>
                                                                                </div>
                                                                                <div className="m-walletBalance--tokens__balanceValWrapper">
                                                                                    <span className="m-walletBalance--tokens__balanceVal--int">0</span> tokens
                                                      </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row ">
                                                                        <div className="m-walletBalance--tokens__payout "><div> Today's estimated payout <span className="m-walletBalance--tokens__payoutEstimate">0</span> tokens. </div><div> Next payout in <span>14h 46m 48s</span> (Daily at 7:00pm) </div></div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="m-walletBalance--tokens__learnMore "><a href="javascript:;">Learn more</a> about Minds Tokens and our Rewards System. </div>

                                                                    </div>
                                                                */}


                                                                    <div className="row">
                                                                        <div className="col-sm-6">
                                                                            <ul className="nav nav-tabs card-header-tabs" id="myTab12" role="tablist">


                                                                                <li className="nav-item">
                                                                                    <a className="nav-link active" disabled style={{ fontSize: '18px', width: '162px' }} data-toggle="tab" href="javascript:;" role="tab" aria-controls="four" aria-selected="true">Transactions</a>
                                                                                </li>



                                                                            </ul></div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="col-md-8">

                                                                            </div>
                                                                            <div className="col-md-4">

                                                                                <select className="form-control" id="inputNameData" onClick={() => this.txnchange()}>
                                                                                    {this.state.transactionTypeData.map(item => (
                                                                                        <option value={item.id}>{item.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-md-12" style={{ marginTop: '15px' }}>
                                                                                <div className="table-scroll">

                                                                                    <div className="table-responsive">
                                                                                        <table className="table">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>Trx Number</th>
                                                                                                    <th>Trx Date</th>
                                                                                                    <th>Trx Type</th>
                                                                                                    <th>Trx Amount</th>
                                                                                                    <th className="text-center">Hash</th>
                                                                                                </tr>
                                                                                            </thead>

                                                                                            <tbody>
                                                                                                {codeData ? '' : <tr><td colSpan="8" className="text-center">No Transaction Found</td></tr>}
                                                                                                {this.state.transactionTypeListData.map(item => (
                                                                                                    <tr>

                                                                                                        <td className="trns_font">{item.trx_number}</td>
                                                                                                        <td className="trns_font">{item.trx_date}</td>
                                                                                                        <td className="trns_font">{item.trx_type} {item.reward_to}</td>
                                                                                                        <td className="trns_font">{item.trx_amount}</td>
                                                                                                        <td id="" title={item.hash} className="trns_font1">
                                                                                                            <a href={item.hash_link} target="_blank">
                                                                                                                {item.short_hash} <input id={"myInputCopy" + item.trx_number} value={item.hash} style={{ opacity: '0', position: 'fixed' }} />
                                                                                                            </a>
                                                                                                            <span onClick={this.myFunctionCopy.bind(this, item.trx_number)} onMouseOut={this.outFuncCopy.bind(this, item.trx_number)}>
                                                                                                                <i class="fa fa-clipboard" id={"myTooltipcopy" + item.trx_number} title="Copy to clipboard" style={{ marginTop: '15px', cursor: 'pointer' }} aria-hidden="true"></i>
                                                                                                            </span>
                                                                                                        </td>

                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="tab-pane fade " id="three" role="tabpanel" aria-labelledby="three-tab">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <h6>Withdraw ETH</h6>
                                                                            <div className="wallet_info">
                                                                                <form onSubmit={this.submitFormETH.bind(this, 'ETH')}>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Recevier's Addres</label>
                                                                                            <input type="text" value={this.state.to_wallet}
                                                                                                onChange={this.onChange} name="to_wallet" style={{ padding: '0px' }} placeholder="Recevier's Address" className="input-receive rece" /><br />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-10">
                                                                                            <label className="pull-left">Amount</label>
                                                                                            <input type="text" value={this.state.amount}
                                                                                                onChange={this.onChange} name="amount" style={{ padding: '0px' }} placeholder="Amount" className="input-receive rece" />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-10">
                                                                                            <label className="pull-left">Fees (Service + Network Fees)</label>
                                                                                            <input type="number" step="0.01" disabled value={this.state.fees = parseFloat(this.state.amount) * parseFloat(this.state?.walletBalance?.withdraw_fee_percent) / parseInt(100)}
                                                                                                onChange={this.onChangeWithdraw} name="fees" style={{ padding: '0px' }} placeholder="Fees" className="input-receive rece" />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-10">
                                                                                            <label className="pull-left">ETH Recieved</label>
                                                                                            {this.state.amount ? <input type="text" disabled step="0.01" value={this.state.eth_recieved = (parseFloat(this.state.amount) - parseFloat(this.state.fees))} name="eth_recieved" style={{ padding: '0px' }} placeholder="ETH Recieved" className="input-receive rece" /> :
                                                                                                <input type="text" step="0.01" value="" disabled placeholder="ETH Recieved" style={{ padding: '0px' }} className="input-receive rece" />
                                                                                            }


                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">

                                                                                        <div className="col-12 col-md-2">
                                                                                            {this.state?.walletBalance?.balance === '0' ? <button type="submit" style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt" disabled>Withdraw ETH</button>
                                                                                                : <button type="submit" disabled={!this.state.to_wallet && !this.state.amount} style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt">Withdraw ETH</button>}

                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            </div>

                                                                            {/* <div className="wallet_info">
                                                                                <h6>Buy freedomcells Tokens</h6>
                                                                                <h6> 1 Fcell = 0.0000005696 BTC</h6>

                                                                                <form onSubmit={this.submitForm}>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Select the cryptocurrency </label>
                                                                                            <select value={this.state.currency}
                                                                                                onChange={this.onChangeLanguage} name="currency">

                                                                                                <option value="1">Bitcoin</option>
                                                                                                <option value="2">Ethereum</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <br />
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">freedomcell Tokens to Buy
</label>
                                                                                            <input type="text" value={this.state.to_wallet}
                                                                                                onChange={this.onChange} name="to_wallet" style={{ padding: '0px' }} placeholder="Enter Minimum 0.001 Amount" className="input-receive rece" /><br />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <input type="number" value={this.state.amount}
                                                                                                onChange={this.onChange} name="amount" style={{ padding: '0px' }} placeholder="Quantity to buy" className="input-receive rece" />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-2">
                                                                                            <button type="submit" disabled={!this.state.to_wallet && !this.state.amount} style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt">Buy Tokens</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            </div> */}

                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <h6>Receive ETH</h6>
                                                                            <div className="wallet_info">
                                                                                <p>Use this QR code to deposit funds:</p>

                                                                                <QRCode style={{ height: '180px', width: '85%' }} className="img-fluid QR-code" value={`${this.state?.walletBalance?.ETH_address}`} name="ETH_address" />
                                                                            </div>

                                                                            <div className="wallet_info1">
                                                                                <input type="text" className="input_wallet wallet_text" value={this.state?.walletBalance?.ETH_address} id="myInput1" style={{ marginLeft: '-50px', width: '118%', padding: '20px 0px 5px 59px' }} />
                                                                                <div className="">

                                                                                    <button className="btn btn-primary" onClick={this.myFunction1.bind(this, 1)} onMouseOut={this.outFunc1} style={{ padding: '2px' }}>

                                                                                        {/* <h6>{this.state?.walletList?.address}</h6> */}
                                                                                        <span className="tooltiptext" id="myTooltip1"
                                                                                        >Copy</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </div>


                                                                <div className="tab-pane fade " id="four" role="tabpanel" aria-labelledby="four-tab">
                                                                    <div className="row">
                                                                        <div className="col-md-6">

                                                                            <h6>Withdraw FCELL TOKEN</h6>
                                                                            <div className="wallet_info">
                                                                                <form onSubmit={this.submitForm.bind(this, 'BTC')}>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Recevier's Addres</label>
                                                                                            <input type="text" value={this.state.to_wallet}
                                                                                                onChange={this.onChange} name="to_wallet" style={{ padding: '0px' }} placeholder="Recevier's Address" className="input-receive rece" /><br />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-10">
                                                                                            <label className="pull-left">Amount</label>
                                                                                            <input type="text" value={this.state.amount}
                                                                                                onChange={this.onChange} name="amount" style={{ padding: '0px' }} placeholder="Amount" className="input-receive rece" />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-2">
                                                                                            {this.state?.walletBalance?.balance === '0' ? <button type="submit" style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt" disabled>Send</button>
                                                                                                : <button type="submit" disabled={!this.state.to_wallet && !this.state.amount} style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt">Send</button>}

                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            </div>

                                                                            {/* <div className="wallet_info">
                                                                            <h6>Buy freedomcells Tokens</h6>
                                                                            <h6> 1 Fcell = 0.0000005696 BTC</h6>

                                                                                <form onSubmit={this.submitForm}>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">Select the cryptocurrency </label>
                                                                                            <select value={this.state.currency}
                                                                                                onChange={this.onChangeLanguage} name="currency">

                                                                                                <option value="1">Bitcoin</option>
                                                                                                <option value="2">Ethereum</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <br/>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <label className="pull-left">freedomcell Tokens to Buy
</label>
                                                                                            <input type="text" value={this.state.to_wallet}
                                                                                                onChange={this.onChange} name="to_wallet" style={{ padding: '0px' }} placeholder="Enter Minimum 0.001 Amount" className="input-receive rece" /><br />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-12">
                                                                                            <input type="number" value={this.state.amount}
                                                                                                onChange={this.onChange} name="amount" style={{ padding: '0px' }} placeholder="Quantity to buy" className="input-receive rece" />
                                                                                            <span className="errorMessage error_mess"></span>
                                                                                        </div>
                                                                                        <div className="col-12 col-md-2">
                                                                                        <button type="submit" disabled={!this.state.to_wallet && !this.state.amount} style={{ marginTop: '15px', marginLeft: '-15px' }} className="btn btn-primary send-bnt">Buy Tokens</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                        */}
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <h6>Recieve2</h6>
                                                                            <div className="wallet_info">
                                                                                <p>Use this QR code to deposit funds:</p>

                                                                                <QRCode style={{ height: '270px', width: '100%' }} className="img-fluid QR-code" value={`${this.state?.walletBalance?.BTC_address}`} name="BTC_address" />
                                                                            </div>

                                                                            <div className="wallet_info1">
                                                                                <input type="text" className="input_wallet" value={this.state?.walletBalance?.BTC_address} id="myInput2" style={{ marginLeft: '-50px', width: '118%' }} />
                                                                                <div className="">

                                                                                    <button className="btn btn-primary" onClick={this.myFunction2} onMouseOut={this.outFunc2}>

                                                                                        {/* <h6>{this.state?.walletList?.address}</h6> */}
                                                                                        <span className="tooltiptext" id="myTooltip2"
                                                                                        >Copy</span>
                                                                                    </button>
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
                            </div>
                        </div>
                    </section>

                </div>
                <Messaging />
            </>
        )
    }
}