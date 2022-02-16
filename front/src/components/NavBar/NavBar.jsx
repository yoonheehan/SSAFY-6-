import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './NavBar.css';
// import Alarm from "../Alarm/Alarm.jsx"
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdPersonSearch } from 'react-icons/md';

const NavBar = () => {
  let userId = -1;
  if (sessionStorage.hasOwnProperty('loginedUser') === true) {
    userId = JSON.parse(sessionStorage.getItem('loginedUser')).userId;
  }

  const ref = useRef(null);

  const history = useHistory();

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (clicked && ref.current && !ref.current.contains(event.target)) {
        setClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clicked]);

  return (
    <>
      <nav className="Nav" ref={ref}>
        <div className="NavbarItems">
          <div className="navbar-arrow">
            <AiOutlineArrowLeft
              size="30px"
              style={{ color: 'white' }}
              onClick={() => {
                history.goBack();
                setClicked(false);
              }}
            />
          </div>
          <img
            style={{ cursor: 'pointer' }}
            width="100px"
            height="auto"
            src="/images/white_logo.png"
            alt="logo"
            onClick={() => {
              history.push('/feed');
              setClicked(false);
            }}
          />
          <div className="" onClick={handleClick}>
            <i
              style={{ color: 'white' }}
              className="h1 bi bi-list navbar-hamburger"
            ></i>
          </div>
        </div>
        <div className={clicked ? 'nav-menu active' : 'nav-menu'}>
          <i
            style={{ cursor: 'pointer', color: '#fff' }}
            className="h1 px-3 bi bi-person-fill"
            onClick={() => {
              window.location.replace(`/user/${userId}/profile`);
              setClicked(false);
            }}
          ></i>
          <div>
            <MdPersonSearch
              size="33px"
              style={{ color: 'white', margin: '0 17px 8px 17px' }}
              onClick={() => {
                history.push('/user/find');
                setClicked(false);
              }}
            />
          </div>
          <i
            style={{ cursor: 'pointer', color: '#fff' }}
            className="h1 px-3 bi bi-house-door-fill"
            onClick={() => {
              history.push('/feed');
              setClicked(false);
            }}
          ></i>
          <i
            style={{ cursor: 'pointer', color: '#fff' }}
            className="link h1 px-3 bi bi-search"
            onClick={() => {
              history.push('/board/hashtagsearch');
              setClicked(false);
            }}
          ></i>
          <i
            style={{ cursor: 'pointer', color: '#fff' }}
            className="link h1 px-3 bi bi-box-arrow-in-right"
            onClick={() => {
              sessionStorage.clear('loginedUser');
              history.push('/');
              setClicked(false);
            }}
          ></i>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
