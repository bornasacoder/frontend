import React from 'react';
// import logo from './logo.svg';
import './assets/jquery.emojiarea.css'
// import './assets/stylesheet.css'
import './assets/fontello.css'
import './App.css';
// import './assets/css/bootstrap.css';
import './assets/css/font-awesome.min.css';
import './assets/plugins/owl/owl.carousel.css'
import './assets/plugins/owl/owl.theme.css'
import './assets/plugins/owl/owl.transitions.css'
import './assets/plugins/aos-master/aos.css'
import './assets/css/responsive.css'
import './assets/css/main.min.css'
import './assets/css/style.css'
import './assets/css/style1.css'
import './assets/css/canvas.css'
import './assets/themify-icons.css'
import './assets/css/color.css'

// import '~video-react/dist/video-react.css'; // import css

import Home from './components/Home';
import Header from './directives/header'
import Footer from './directives/footer'
import Dashboard from './components/Dashboard'
import InnerHeader from './directives/innerHeader'
import InnerSidebar from './directives/innerSidebar'
import RightSidebar from './directives/rightSidebar'
import Fixedsidebarright from './directives/Fixedsidebarright'
import Timeline from './components/Timeline'
import Wallet from './components/Wallet'
import Creategroup from './components/Creategroup'
import Forgetpassword from './components/Forgetpassword'
import Resetpassword from './components/Resetpassword'
import Groupdetail from './components/Groupdetail'
import AnalyticsTraffic from './components/Analytics'
import DiscoveryGroups from './components/Discoverygroup'
import Setting from './components/Setting'
import Messaging from './components/messaging'
import Twofa from './components/Twofa'
import Headerhome from './directives/headerhome'
import Overview from './components/Overview'
import Createproject from './components/CreateProject'
import Allprojects from './components/Allproject'
import Profilesetup from './components/Profilesetup'
import Pro from './components/Pro'
import Plus from './components/Plus'
import Allprojectshome from './components/Allprojecthome'
import MyGroups from './components/myGroups'
import MyProjects from './components/Myprojects'
import DiscoveryProjects from './components/DiscoverProject'
import AllNotifications from './components/Allnotification'
import Home1 from './components/Home1'
import BuyEther from './components/BuyEth'
import MyVotes from './components/vote'
import voteAdd from './components/voteAdd'
import votingDetail from './components/Votingdetail'


import { HashRouter, Route, Switch } from 'react-router-dom'
// "homepage": "https://www.freedomcells.net/",
// "proxy": "https://www.freedomcells.net/",

function App() {
  return (

    <HashRouter>
      <div>
        <Switch>
        {/* <Route path="/" exact component={Home} /> */}
          
          <Route path="/" exact component={Home} />
          <Route path="/Login=:id" component={Home1} />
          <Route path="/header" component={Header} />
          <Route path="/footer" component={Footer} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/innerHeader" component={InnerHeader} />
          <Route path="/innerSidebar" component={InnerSidebar} />
          <Route path="/rightSidebar" component={RightSidebar} />
          <Route path="/timeLine/:id/:post_id" component={Timeline} />
          <Route path="/timeLine/:id" component={Timeline} />
          <Route path="/creategroup" component={Creategroup} />
          <Route path="/fixedsidebarright" component={Fixedsidebarright} />
          <Route path="/wallet" component={Wallet} />
          <Route path="/analyticstraffic" component={AnalyticsTraffic} />
          <Route path="/discoverygroups" component={DiscoveryGroups} />
          <Route path="/forgetpassword" component={Forgetpassword} />
          <Route path="/setting" component={Setting} />
          <Route path="/messaging" component={Messaging} />
          <Route path="/twofa" component={Twofa} />
          <Route path="/resetpassword/:code" component={Resetpassword} />
          <Route path="/groupdetail/:group_id" component={Groupdetail} />
          <Route path="/Headerhome" component={Headerhome} />
          <Route path="/overview" component={Overview} />
          <Route path="/createproject" component={Createproject} />
          <Route path="/allprojects" component={Allprojects} />
          <Route path="/profilesetup" component={Profilesetup} />
          <Route path="/pro" component={Pro} />
          <Route path="/plus" component={Plus} />
          <Route path="/allprojectslist" component={Allprojectshome} />
          <Route path="/MyGroup" component={MyGroups} />
          <Route path="/MyProject" component={MyProjects} />
          <Route path="/DiscoveryProject" component={DiscoveryProjects} />
          <Route path="/AllNotification" component={AllNotifications} />
          <Route path="/BuyEth" component={BuyEther} />
          <Route path="/MyVotes" component={MyVotes} />
          <Route path="/voteAdd" component={voteAdd} />
          <Route path="/votingDetail/:voting_id" component={votingDetail} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
