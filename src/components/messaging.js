import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
const headers = {
   'Content-Type': 'text/plain'
};
export default class Messaging extends Component {
   //==================================  Wallet Balance List  ==============================

   constructor(props) {

      super(props);
      let data = Cookies.getJSON('name');
      this.loginData = data.user_data

      // this.state = initialState;
      this.state = {
         msg_textarea_val:'',
         msg_textarea_id:'',
         users_list: [],
         chat_user: [],
         message: ''
      }

   }


   componentDidMount() {
      this.current_chating();
      this.user_search1()
      $('.m-messenger--dockpane-tab').click(function () {
         $(this).parent().find('.m-messenger--dockpane-container').slideToggle(500);
      })
      //   this.followingAPI()
      setInterval(() => {
         this.current_chating();
         this.user_search1()
         this.BannerImageAPI()
      }, 10000);


      $('body').delegate('.m-emoji-selector-list span', 'click', function () {
         var val = $(this).closest('.main_msg_area').find('textarea').val() + $(this).text();
         $(this).closest('.main_msg_area').find('textarea').val(val);
      });


      // $('body').delegate('.main_msg_area textarea', 'keyup', function (e) {
      //    if (e.keyCode == 13) {
      //       $(this).closest('.main_msg_area').find('#send_btn').click();
      //    }
      // });

   }

   user_search1(id) {
      //  e.preventDefault();
      // alert('2')
      let val = $('#user_search').val();
      // if (val === '') {
      //    alert('1')
      //    return true;
      // }
      // console.log(val);
      
      axios.post(`https://freedomcells.net/freedomcell/api/users/search_user`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key, 'name': val },{headers}).then((res) => {
         //on success
      // alert('2')

         if (res.data.code === true) {
            this.setState({
               users_list: res.data.users,
               message: ''
            });
            // console.log(this.state.users_list);
         }
         else {
            this.setState({
               message: res.data.message
            });

         }

         //   alert(res.data.code);

      }).catch((error) => {
         //on error
         //   alert("There is an error in API call22222.");
      });
   }

   select_user(item) {
      axios.post(`https://freedomcells.net/freedomcell/api/users/start_chat`, { 'user_id': this.loginData.id, 'friend_id': item.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
         //on success
         if (res.data.code === true) {
            this.current_chating();
            setTimeout(() => {
               $('#scroll_chat_box' + item.id).scrollTop($('#scroll_chat_box' + item.id)[0].scrollHeight);
            }, 1000);
         }

      }).catch((error) => {
         //on error
      });

   }
   current_chating() {
      
      axios.post(`https://freedomcells.net/freedomcell/api/users/current_chat`, { 'user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
         //on success
         if (res.data.code === true) {
            this.setState({
               chat_user: res.data.users
            })
            setTimeout(() => {
               if(this.state.msg_textarea_val){
                  // $("#msg_textarea"+this.state.msg_textarea_id).val(this.state.msg_textarea_val);
               }
            }, 1000);
         } else {
            this.setState({
               chat_user: []
            })
         }

      }).catch((error) => {
         //on error
      });
   }
 updateScroll(id){
   
       $('#'+id).scrollTop( 1100000 );
  }

   manage_style(i) {
      if (i === 0) {
         return 245;
      } else {
         return (245 * i) + 240;
      }
   }
   minimize_chat(item) {
      $('#chat_box' + item.id).slideToggle(500);
      var status = '';
      setTimeout(() => {
         if ($('#chat_box' + item.id).css('display') == 'none') {
            var status = '0';
         } else {
            var status = '1';
         }
         axios.post(`https://freedomcells.net/freedomcell/api/users/minimize_chat_box`, { 'user_id': this.loginData.id, 'chat_id': item.chat_id, 'status': status, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            //on success
            if (res.data.code === true) {
               // this.current_chating();
            }
         }).catch((error) => {
            //on error
         });
      }, 600);
   }
   close_chat(item) {
      axios.post(`https://freedomcells.net/freedomcell/api/users/close_chat`, { 'user_id': this.loginData.id, 'chat_id': item.chat_id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
         //on success
         if (res.data.code === true) {
            this.current_chating();
         }

      }).catch((error) => {
         //on error
      });
   }

      // ========================= Add Post   ==============================
      strip11(tmp) {
         var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
         return tmp.replace(urlRegex, function (url) {
             return '<a href="' + url + '" target="_blank" + style="word-break:break-all;color:#007bff">' + url + '</a>';
   
             // return '<a href="'+url+'" >' + url +'</a>'
         })
     }
   

   send_massage(item) {
      this.hide_emoji_box(item);
      var msg = $('#msg_textarea' + item.id).val();
      if (msg.trim() === '') {
         return;
      }
      var msg = this.strip11(msg);

      axios.post(`https://freedomcells.net/freedomcell/api/users/send_massage`, { 'user_id': this.loginData.id, 'friend_id': item.id, 'message': msg, 'api_key': this.loginData.api_key },{headers}).then((res) => {
         //on success
         if (res.data.code === true) {
            this.current_chating();
         }
         $('#msg_textarea' + item.id).val('');
         setTimeout(() => {
            $('#scroll_chat_box' + item.id).scrollTop($('#scroll_chat_box' + item.id)[0].scrollHeight);
         }, 1100);
      }).catch((error) => {
         //on error
      });
   }


   // ========================= Add Post   ==============================
   strip(tmp) {
      var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return tmp.replace(urlRegex, function (url) {
          return '<a href="' + url + '" target="_blank" + style="word-break:break-all;color:#007bff">' + url + '</a>';

          // return '<a href="'+url+'" >' + url +'</a>'
      })
  }


   something=(event,item)=> {
      var msg =  $('#msg_textarea' + item.id).val();
      this.setState({
         msg_textarea_val:msg,
         msg_textarea_id:item.id
      });
     
      if (event.keyCode === 13) {
         var msg = $('#msg_textarea' + item.id).val();
         if (msg.trim() === '') {
            return;
         }
         var msg = this.strip(msg);
         axios.post(`https://freedomcells.net/freedomcell/api/users/send_massage`, { 'user_id': this.loginData.id, 'friend_id': item.id, 'message': msg, 'api_key': this.loginData.api_key },{headers}).then((res) => {
            //on success
            if (res.data.code === true) {
               this.current_chating();
            }
            $('#msg_textarea' + item.id).val('');
            setTimeout(() => {
               $('#scroll_chat_box' + item.id).scrollTop($('#scroll_chat_box' + item.id)[0].scrollHeight);
            }, 1100);
         }).catch((error) => {
            //on error
         });
      }
   }


   // --------------------------------

   option_chat(item) {
      $('#chat_box_option' + item.id).toggle();
   }
   block_chat(item, status) {
      if (window.confirm('This action will block all parties site-wide. Are you sure?') == false) {
         return;
      }
      axios.post(`https://freedomcells.net/freedomcell/api/users/block_chat`, { 'user_id': this.loginData.id, 'friend_id': item.id, 'status': status, 'api_key': this.loginData.api_key },{headers}).then((res) => {
         //on success
         if (res.data.code === true) {
            this.current_chating();
            this.option_chat(item);
         }
      }).catch((error) => {
         //on error
      });
   }

   destroy_chat(item) {
      if (window.confirm('All messages will be deleted. You cannot UNDO this action. Are you sure?') == false) {
         return;
      }
      axios.post(`https://freedomcells.net/freedomcell/api/users/destroy_chat`, { 'user_id': this.loginData.id, 'friend_id': item.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
         //on success
         if (res.data.code === true) {
            this.current_chating();
            this.option_chat(item);
         }
      }).catch((error) => {
         //on error
      });

   }

   // ---------------------------------


   loading(id) {

      setTimeout(() => {

         window.location.hash = '/timeLine/' + id;
         window.location.reload(true)
      }, 200);
   }


   // something = (event, item) => {

   //    if (event.keyCode === 13) {
   //       var msg = $('#msg_textarea' + item.id).val();
   //       if (msg.trim() === '') {
   //          return;
   //       }
   //       axios.post(`https://freedomcells.net/freedomcell/api/users/send_massage`, { 'user_id': this.loginData.id, 'friend_id': item.id, 'message': msg, 'api_key': this.loginData.api_key },{headers}).then((res) => {
   //          //on success
   //          if (res.data.code === true) {
   //             this.current_chating();
   //          }
   //          $('#msg_textarea' + item.id).val('');
   //          setTimeout(() => {
   //             $('#scroll_chat_box' + item.id).scrollTop($('#scroll_chat_box' + item.id)[0].scrollHeight);
   //          }, 1100);
   //       }).catch((error) => {
   //          //on error
   //       });
   //    }
   // }

   show_emoji_box(item) {
      console.log(item);
      
      $('#emoji_box' + item.id).toggle(200);
   }
   hide_emoji_box(item){
      $('#emoji_box' + item.id).hide(200);
   }
   manage_emoji_style(i) {
      if (i == 0) {
         return 320;
      } else {
         return (240 * i) + 320;
      }
   }



   //========================================   avatar image  ==============================

    BannerImageAPI() {

      axios.post(`https://freedomcells.net/freedomcell/api/users/avatar_banner`, { 'user_id': this.loginData.id, 'view_user_id': this.loginData.id, 'api_key': this.loginData.api_key },{headers}).then((res) => {
          this.codeDataAvatarBanner = res.data.code
          if (this.codeDataAvatarBanner === true) {
              this.setState({
                  bannerImage: res.data.recdata
              });
          }
      }).catch((error) => {
         });

  }


   render() {
      // console.log(this.state.chat_user);
      return (
         <>


            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

            {(this.state.chat_user.length > 0) ?
               this.state.chat_user.map((item, i) => (

                  <div>
                     {/* style={{right:'424px'}} */}


                     {/* <div class="chat-box show">
                        <div class="chat-head">
                           <span class="status f-online"></span>
                           <h6>Bucky Barnes</h6>
                           <div class="more">
                              <span class="more-optns"><i class="ti-more-alt"></i>
                                 <ul>
                                    <li>block chat</li>
                                    <li>unblock chat</li>
                                    <li>conversation</li>
                                 </ul>
                              </span>
                              <span class="-mesage"><i class="ti-"></i></span>
                           </div>
                        </div>
                        <div class="chat-list">
                           <ul class="ps-container ps-theme-default ps-active-y" data-ps-id="b5fcc5ec-436a-3d02-ddbe-0b16bd77b2c0">
                              <li class="me">
                                 <div class="chat-thumb"><img src="images/resources/chatlist1.jpg" alt="" /></div>
                                 <div class="notification-event">
                                    <span class="chat-message-item">
                                       Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
								</span>
                                    <span class="notification-date"><time datetime="2004-07-24T18:18" class="entry-date updated">Yesterday at 8:10pm</time></span>
                                 </div>
                              </li>
                              <li class="you">
                                 <div class="chat-thumb"><img src="images/resources/chatlist2.jpg" alt="" /></div>
                                 <div class="notification-event">
                                    <span class="chat-message-item">
                                       Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
								</span>
                                    <span class="notification-date"><time datetime="2004-07-24T18:18" class="entry-date updated">Yesterday at 8:10pm</time></span>
                                 </div>
                              </li>
                              <li class="me">
                                 <div class="chat-thumb"><img src="images/resources/chatlist1.jpg" alt="" /></div>
                                 <div class="notification-event">
                                    <span class="chat-message-item">
                                       Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
								</span>
                                    <span class="notification-date"><time datetime="2004-07-24T18:18" class="entry-date updated">Yesterday at 8:10pm</time></span>
                                 </div>
                              </li>
                              <div class="ps-scrollbar-x-rail" style={{left: '0px', bottom: '0px'}}><div class="ps-scrollbar-x" tabindex="0" style={{left: '0px', width: '0px'}}></div></div><div class="ps-scrollbar-y-rail" style={{top: '0px', height: '290px', right: '0px'}}><div class="ps-scrollbar-y" tabindex="0" style={{top: '0px', height: '191px'}}></div></div></ul>
                           <form class="text-box">
                              <textarea placeholder="Post enter to post..."></textarea>
                              <div class="add-smiles">
                                 <span title="add icon" class="em em-expressionless"></span>
                              </div>
                              <div class="smiles-bunch">
                                 <i class="em em---1"></i>
                                 <i class="em em-smiley"></i>
                                 <i class="em em-anguished"></i>
                                 <i class="em em-laughing"></i>
                                 <i class="em em-angry"></i>
                                 <i class="em em-astonished"></i>
                                 <i class="em em-blush"></i>
                                 <i class="em em-disappointed"></i>
                                 <i class="em em-worried"></i>
                                 <i class="em em-kissing_heart"></i>
                                 <i class="em em-rage"></i>
                                 <i class="em em-stuck_out_tongue"></i>
                              </div>
                              <button type="submit"></button>
                           </form>
                        </div>
                     </div>
                     */}
                    
                    
                     <div className="m-messenger--conversation m-messenger--dockpane m-messenger--dockpane-open" style={{ right: `${this.manage_style(i)}px`, bottom: "5px" }} >
                        <div className="m-messenger--dockpane-tab chat-head coment_box">
                           <div className="m-messenger--dockpane-tab-title" onClick={this.minimize_chat.bind(this, item)}>
                              <span className="">{item.full_name}</span>
                           </div>
                           <div className="m-messenger--dockpane-tab-actions"><i className="material-icons mdl-color-text--blue-grey-100" hidden=""></i><i data-cy="data-minds-conversation-options" className="material-icons fa fa-ellipsis-v" onClick={this.option_chat.bind(this, item)}></i>&nbsp;<i data-cy="data-minds-conversation-close" onClick={this.close_chat.bind(this, item)} className="material-icons fa fa-close"></i></div>
                        </div>
                        <div className="m-messenger--dockpane-container" id={"chat_box" + item.id} style={{ display: item.open_chat_box == 0 ? 'none' : '' }}>

                           <div className="m-messenger--dockpane-tab-ribbon" id={"chat_box_option" + item.id} style={{ display: 'none' }} >
                              <div data-cy="data-minds-conversation-destroy" className="m-messenger--dockpane-tab-icon mdl-color-text--blue-grey-300" onClick={this.destroy_chat.bind(this, item)}>
                                 <i className="material-icons mdl-color-text--blue-grey-100 fa fa-trash" title="Delete chat history"></i>Destroy
               </div>
                              <div className="m-messenger--dockpane-tab-icon mdl-color-text--blue-grey-300 ng-star-inserted" onClick={this.block_chat.bind(this, item, (item.blocked_chat_by === 0) ? '1' : '0')}>
                                 {(item.blocked_chat_by == 0) ?
                                    <>
                                       <i className="material-icons mdl-color-text--blue-grey-100 fa fa-ban" title="Block chat"></i>Block
                  </>
                                    : (item.blocked_chat_by == this.loginData.id) ?
                                       <>
                                          <i className="material-icons mdl-color-text--blue-grey-100 fa fa-history" title="Un-block chat" ></i>Un-block
                  </>
                                       :
                                       <>
                                          <i className="material-icons mdl-color-text--blue-grey-100 fa fa-ban" title="Block chat"></i>Block
                  </>
                                 }

                              </div>
                           </div>

                           {(item.unread_count>0)?this.updateScroll('scroll_chat_box'+item.id):''}   

                           <div minds-messenger-scroll="" id={"scroll_chat_box" + item.id} className="div_bottom_set m-messenger--conversation-messages ng-star-inserted">
                              {(item.message.length > 0) ?
                                 item.message.map((msg, i) => (
                                    (msg.sender_id == this.loginData.id) ?
                                       <>
                                          <div className="m-messenger--conversation-messages-message ng-star-inserted">
                                             <div className="m-messenger--conversation-message-bubble mdl-color--blue-grey-50 mdl-color-text--blue-grey-700 ng-star-inserted" dangerouslySetInnerHTML={{ __html: msg.message }}></div>
                                             <Link to={`/timeLine/${msg.sender_id}`} onClick={this.loading.bind(this, msg.sender_id)}>
                                                <img tabIndex="0" src={this.state.bannerImage?.avatar} className="ng-star-inserted" />
                                             </Link>
                                             <div className="m-messenger--conversations-ts mdl-color-text--blue-grey-100" hidden=""> {msg.date} </div>
                                          </div>
                                       </>
                                       :
                                       <>
                                          <div className="m-messenger--conversation-messages-message odd ng-star-inserted">
                                             <Link to={`/timeLine/${msg.sender_id}`} onClick={this.loading.bind(this, msg.sender_id)}>

                                                <img tabIndex="0" style={{ height: '18px', width: '18px' }} src={item.avatar} className="ng-star-inserted" />
                                             </Link>
                                             <div className="m-messenger--conversation-message-bubble mdl-color--blue-grey-50 mdl-color-text--blue-grey-700 ng-star-inserted" dangerouslySetInnerHTML={{ __html: msg.message }}></div>
                                             <div className="m-messenger--conversations-ts mdl-color-text--blue-grey-100" hidden=""> {msg.date} </div>
                                          </div>
                                       </>
                                 ))
                                 :
                                 <p className="center"><small>Please write a new message.</small></p>
                              }

                           </div>

                           {(item.blocked_chat_by == 0) ?
                              <>
                                 <div class="m-messenger--conversation-composer ng-star-inserted main_msg_area" style={{background:'#f0f0f0'}}>
                                    <textarea name="message" maxlength="180" rows="1" id={"msg_textarea" + item.id} placeholder="Send a message..." onKeyUp={(e) => this.something(e,item) } class="ng-untouched ng-pristine ng-valid" style={{ height: " 36px" }} onClick={this.hide_emoji_box.bind(this, item)}></textarea>
                                    <i class="material-icons mdl-color-text--blue-grey-600 fa fa-smile-o" onClick={this.show_emoji_box.bind(this, item)} ></i>
                                    <i data-cy="data-minds-conversation-send" onClick={this.send_massage.bind(this, item)} class="material-icons mdl-color-text--blue-grey-600 fa fa-send"></i>
                                    <div class="m-bubble-popup mdl-shadow--4dp ng-star-inserted" id={"emoji_box" + item.id} style={{ top: "auto", right: `${this.manage_emoji_style(i)}px`, bottom: "36px", left: "auto", display: "none" }}><div class="m-emoji-selector-title">Emoji<i class="fa fa-close" onClick={this.show_emoji_box.bind(this, item)} style={{color:'#333', float:'right'}}></i></div><div class="m-emoji-selector-list"><span tabindex="0" class="m-emoji ng-star-inserted" title="ELECTRIC LIGHT BULB">💡</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH TEARS OF JOY">😂</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK HEART SUIT">♥</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HEAVY BLACK HEART">❤</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH HEART-SHAPED EYES">😍</span><span tabindex="0" class="m-emoji ng-star-inserted" title="UNAMUSED FACE">😒</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH SMILING EYES">😊</span><span tabindex="0" class="m-emoji ng-star-inserted" title="LOUDLY CRYING FACE">😭</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE THROWING A KISS">😘</span><span tabindex="0" class="m-emoji ng-star-inserted" title="TWO HEARTS">💕</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE SMILING FACE">☺</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WEARY FACE">😩</span><span tabindex="0" class="m-emoji ng-star-inserted" title="OK HAND SIGN">👌</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PENSIVE FACE">😔</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMIRKING FACE">😏</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GRINNING FACE WITH SMILING EYES">😁</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WINKING FACE">😉</span><span tabindex="0" class="m-emoji ng-star-inserted" title="THUMBS UP SIGN">👍</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PERSON WITH FOLDED HANDS">🙏</span><span tabindex="0" class="m-emoji ng-star-inserted" title="RELIEVED FACE">😌</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK UNIVERSAL RECYCLING SYMBOL">♻</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FLUSHED FACE">😳</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PERSON RAISING BOTH HANDS IN CELEBRATION">🙌</span><span tabindex="0" class="m-emoji ng-star-inserted" title="MULTIPLE MUSICAL NOTES">🎶</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SEE-NO-EVIL MONKEY">🙈</span><span tabindex="0" class="m-emoji ng-star-inserted" title="VICTORY HAND">✌</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH SUNGLASSES">😎</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CRYING FACE">😢</span><span tabindex="0" class="m-emoji ng-star-inserted" title="EYES">👀</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH OPEN MOUTH AND COLD SWEAT">😅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SPARKLES">✨</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SLEEPING FACE">😴</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH OPEN MOUTH AND SMILING EYES">😄</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PURPLE HEART">💜</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HUNDRED POINTS SYMBOL">💯</span><span tabindex="0" class="m-emoji ng-star-inserted" title="EXPRESSIONLESS FACE">😑</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SPARKLING HEART">💖</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BROKEN HEART">💔</span><span tabindex="0" class="m-emoji ng-star-inserted" title="INFORMATION DESK PERSON">💁</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLUE HEART">💙</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CONFUSED FACE">😕</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH STUCK-OUT TONGUE AND WINKING EYE">😜</span><span tabindex="0" class="m-emoji ng-star-inserted" title="DISAPPOINTED FACE">😞</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE SAVOURING DELICIOUS FOOD">😋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="NEUTRAL FACE">😐</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CLAPPING HANDS SIGN">👏</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SLEEPY FACE">😪</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HEART WITH ARROW">💘</span><span tabindex="0" class="m-emoji ng-star-inserted" title="REVOLVING HEARTS">💞</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GROWING HEART">💗</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SPEAK-NO-EVIL MONKEY">🙊</span><span tabindex="0" class="m-emoji ng-star-inserted" title="RAISED HAND">✋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="KISS MARK">💋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE RIGHT POINTING BACKHAND INDEX">👉</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CHERRY BLOSSOM">🌸</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE SCREAMING IN FEAR">😱</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH HORNS">😈</span><span tabindex="0" class="m-emoji ng-star-inserted" title="LEFTWARDS BLACK ARROW">⬅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="POUTING FACE">😡</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FIRE">🔥</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH OPEN MOUTH">😃</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FISTED HAND SIGN">👊</span><span tabindex="0" class="m-emoji ng-star-inserted" title="TIRED FACE">😫</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PARTY POPPER">🎉</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES">😝</span><span tabindex="0" class="m-emoji ng-star-inserted" title="ROSE">🌹</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK SUN WITH RAYS">☀</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FLEXED BICEPS">💪</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH LOOK OF TRIUMPH">😤</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SKULL">💀</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH COLD SWEAT">😓</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE LEFT POINTING BACKHAND INDEX">👈</span><span tabindex="0" class="m-emoji ng-star-inserted" title="YELLOW HEART">💛</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES">😆</span><span tabindex="0" class="m-emoji ng-star-inserted" title="NEW MOON WITH FACE">🌚</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HEAVY CHECK MARK">✔</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CAMERA">📷</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING CAT FACE WITH HEART-SHAPED EYES">😻</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WAVING HAND SIGN">👋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH MEDICAL MASK">😷</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PERSEVERING FACE">😣</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GREEN HEART">💚</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GRINNING FACE">😀</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BEATING HEART">💓</span><span tabindex="0" class="m-emoji ng-star-inserted" title="KISSING FACE WITH CLOSED EYES">😚</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CROWN">👑</span><span tabindex="0" class="m-emoji ng-star-inserted" title="DISAPPOINTED BUT RELIEVED FACE">😥</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK RIGHT-POINTING TRIANGLE">▶</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH STUCK-OUT TONGUE">😛</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HEADPHONE">🎧</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CONFOUNDED FACE">😖</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE HEAVY CHECK MARK">✅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SMILING FACE WITH HALO">😇</span><span tabindex="0" class="m-emoji ng-star-inserted" title="ANGRY FACE">😠</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PISTOL">🔫</span><span tabindex="0" class="m-emoji ng-star-inserted" title="HAPPY PERSON RAISING ONE HAND">🙋</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GLOWING STAR">🌟</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GRIMACING FACE">😬</span><span tabindex="0" class="m-emoji ng-star-inserted" title="THUMBS DOWN SIGN">👎</span><span tabindex="0" class="m-emoji ng-star-inserted" title="BLACK RIGHTWARDS ARROW">➡</span><span tabindex="0" class="m-emoji ng-star-inserted" title="DANCER">💃</span><span tabindex="0" class="m-emoji ng-star-inserted" title="MUSICAL NOTE">🎵</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITHOUT MOUTH">😶</span><span tabindex="0" class="m-emoji ng-star-inserted" title="RAISED FIST">✊</span><span tabindex="0" class="m-emoji ng-star-inserted" title="DIZZY SYMBOL">💫</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH NO GOOD GESTURE">🙅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="COLLISION SYMBOL">💥</span><span tabindex="0" class="m-emoji ng-star-inserted" title="WHITE DOWN POINTING BACKHAND INDEX">👇</span><span tabindex="0" class="m-emoji ng-star-inserted" title="LARGE RED CIRCLE">🔴</span><span tabindex="0" class="m-emoji ng-star-inserted" title="COPYRIGHT SIGN">©</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PILE OF POO">💩</span><span tabindex="0" class="m-emoji ng-star-inserted" title="THOUGHT BALLOON">💭</span><span tabindex="0" class="m-emoji ng-star-inserted" title="GEM STONE">💎</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SLICE OF PIZZA">🍕</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH OK GESTURE">🙆</span><span tabindex="0" class="m-emoji ng-star-inserted" title="FACE WITH OPEN MOUTH AND COLD SWEAT">😰</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PENGUIN">🐧</span><span tabindex="0" class="m-emoji ng-star-inserted" title="TONGUE">👅</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SUN WITH FACE">🌞</span><span tabindex="0" class="m-emoji ng-star-inserted" title="PEDESTRIAN">🚶</span><span tabindex="0" class="m-emoji ng-star-inserted" title="CAT FACE WITH TEARS OF JOY">😹</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SPLASHING SWEAT SYMBOL">💦</span><span tabindex="0" class="m-emoji ng-star-inserted" title="SLEEPING SYMBOL">💤</span><span tabindex="0" class="m-emoji ng-star-inserted" title="LEAF FLUTTERING IN WIND">🍃</span><span tabindex="0" class="m-emoji ng-star-inserted" title="AIRPLANE">✈</span></div></div>
                                 </div>
                              </>
                              : (item.blocked_chat_by == this.loginData.id) ?
                                 <>
                                    <div className="m-messenger--conversation-messages-notice mdl-color-text--blue-grey-300 ng-star-inserted" style={{ textAlign: "center" }}><span>You have blocked this chat</span></div>
                                 </>
                                 :
                                 <>
                                    <div className="m-messenger--conversation-messages-notice mdl-color-text--blue-grey-300 ng-star-inserted" style={{ textAlign: "center" }}><span>This chat is no longer available</span></div>
                                 </>
                           }


                        </div>
                     </div>
                  

                  </div>
               )) : ''}



            <div className="m-messenger--userlist m-messenger--dockpane">
               <div className="m-messenger--dockpane-tab" id="message-head">
                  <div className="m-messenger--dockpane-tab-title"><i className="material-icons fa fa-comment"></i><span>Messenger</span></div>
                  <div className="m-messenger--dockpane-tab-actions">
                     {/* <i className="material-icons fa fa-cog">  </i> */}
                  </div>
               </div>
               <div className="m-messenger--dockpane-container" id="message_user_list" style={{ display: "none" }}>
                  {/* <div className="m-messenger--dockpane-tab-ribbon mdl-color-text--blue-grey-300" hidden="">
         <div className="m-messenger--dockpane-tab-icon" hidden="">
            <i className="material-icons mdl-color-text--blue-grey-100" title="Logout of chat">exit_to_app</i>Logout
         </div>
         <div className="m-messenger--dockpane-tab-icon mdl-color-text--blue-grey-300">
            <i className="material-icons mdl-color-text--blue-grey-100" title="Change your encryption password">vpn_key</i>Re-key
         </div>
      </div> */}

                  <div minds-messenger-scroll="" className="m-messenger--userlist-conversations">
                     {(this.state.users_list.length > 0) ?
                        this.state.users_list.map(item => (
                           <div className="m-messenger--userlist-conversations-item " onClick={this.select_user.bind(this, item)}><img className="mdl-shadow--2dp" src={item.avatar} /><span className="m-conversation-label">{item.full_name}</span><span className="m-conversation-icons"><span className="m-conversation-new mdl-color--green" hidden=""></span><span className="m-conversation-online mdl-color--blue"></span></span></div>
                        )) :
                        <p className="center">Search user</p>
                     }


                     <div style={{ width: '100%', textAlign: 'center' }} hidden="">
                        <div className="mdl-spinner mdl-js-spinner is-active is-upgraded" style={{ margin: '16px auto' }} data-upgraded=",MaterialSpinner">
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
                  <div className="m-messenger--userlist-search"><i className="material-icons fa fa-search"></i><input type="text" placeholder="Search" id="user_search" onChange={this.user_search1.bind(this, 1)} /></div>
               </div>

            </div>
         </>
      )
   }

}
