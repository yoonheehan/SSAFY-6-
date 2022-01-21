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
}

export default App;
