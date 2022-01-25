<<<<<<< HEAD
import './App.css';
import Detail from './components/detail/Detail';
import FollowList from './components/followList/FollowList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            
            <Route path="/user/:id/followList" element={<FollowList />} />
            <Route path="/feed/:id/" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
=======
import './app.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Login from './components/login/login';
import NewProfile from './components/profile/newProfile';
import { Link, Route, Switch } from 'react-router-dom';
import MdProfile from './components/profile/mdProfile';
import Profile from './components/profile/profile';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/mdProfile" component={MdProfile} />
        <Route exact path="/newProfile" component={NewProfile} />
      </Switch>
      <Footer />
    </div>
  );
>>>>>>> 445ecf337884d4c6655c332219ce9ec9c227c16f
}

export default App;
