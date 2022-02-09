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

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {}, []);

  const loginCallback = login => {
    setIsLogin(login);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Login {...props} loginCallback={loginCallback} />}
          />
          <Route exact path="/feed" isLogin={isLogin} component={Feed} />
          <Route exact path="/user/:id/profile" isLogin={isLogin} component={Profile} />
          <Route exact path="/user/:id/mdProfile" component={MdProfile} />
          <Route exact path="/newProfile" component={NewProfile} />
          <Route exact path="/user/:id/followList" component={FollowList} />
          <Route exact path="/user/:id/followerList" component={FollowerList} />
          <Route exact path="/feed/:id/" component={Detail} />
          <Route exact path="/alarm" component={Alarm} />
          <Route exact path="/withdraw" component={Withdraw} />
          <Route exact path="/postList" component={PostList} />
          <Route exact path="/post" component={Post} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
