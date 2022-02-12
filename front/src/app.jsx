import './App.css';
import Detail from './components/detail/Detail';
import FollowList from './components/followList/FollowList';
import FollowerList from './components/followList/FollowerList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/login/login';
import NewProfile from './components/profile/newProfile';
import MdProfile from './components/profile/mdProfile';
import Profile from './components/profile/profile';
import NavBar from './components/NavBar/NavBar.jsx';
import Withdraw from './components/Withdraw/Withdraw.jsx';
import Alarm from './components/Alarm/Alarm.jsx';
import Feed from './components/Feed/Feed';
import PostList from './components/postList/postList';
import Post from './components/Post/Post.jsx';
import { useEffect, useState } from 'react';

import FeedTest from './components/TestFeed'

function App() {
  const [isLogin, setIsLogin] = useState(sessionStorage.hasOwnProperty('loginedUser'));

  useEffect(() => {
    if (sessionStorage.hasOwnProperty('loginedUser') === false) {
      setIsLogin(false);
    }
  });

  const loginCallback = login => {
    setIsLogin(login);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {isLogin ? <NavBar /> : null}
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Login
                {...props}
                setIsLogin={setIsLogin}
                loginCallback={loginCallback}
              />
            )}
          />
          <Route exact path="/feed" isLogin={isLogin} component={Feed} />
          <Route exact path="/user/:id/profile" component={Profile} />
          <Route exact path="/NewProfile" component={NewProfile} />
          <Route exact path="/user/:id/mdProfile" component={MdProfile} />
          <Route exact path="/user/:id/followList" component={FollowList} />
          <Route exact path="/user/:id/followerList" component={FollowerList} />
          <Route exact path="/feed/:id/" component={Detail} />
          <Route exact path="/alarm" component={Alarm} />
          <Route exact path="/user/:id/withdraw" component={Withdraw} />
          <Route exact path="/board/user/:id/postList" component={PostList} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/feedtest" component={FeedTest} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
