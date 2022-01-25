import './App.css';
import Detail from './components/detail/Detail';
import FollowList from './components/followList/FollowList'
import { BrowserRouter, Route, Switch, Link  } from 'react-router-dom'

import Footer from './components/footer/footer';
import Header from './components/header/header';
import Login from './components/login/login';
import NewProfile from './components/profile/newProfile';
import MdProfile from './components/profile/mdProfile';
import Profile from './components/profile/profile';
import NavBar from "./components/NavBar/NavBar.jsx"
import Withdraw from "./components/Withdraw/Withdraw.jsx";
import Alarm from "./components/Alarm/Alarm.jsx"

function App() {
  return (
      <div className="App">
        <NavBar/>
        <Header />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/mdProfile" component={MdProfile} />
              <Route exact path="/newProfile" component={NewProfile} />
              <Route exact path="/user/:id/followList" component={FollowList} />
              <Route exact path="/feed/:id/" component={Detail} />
              <Route exact path="/alarm" component={Alarm} />
              <Route exact path="/withdraw" component={Withdraw} />
            </Switch>
          </BrowserRouter>
        <Footer />
      </div>
    );
  }
export default App;