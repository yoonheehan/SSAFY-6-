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

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <Footer />
    </div>
  );
>>>>>>> 445ecf337884d4c6655c332219ce9ec9c227c16f
}

export default App;
