import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './NavBar.css';
// import Alarm from "../Alarm/Alarm.jsx"
import { AiOutlineArrowLeft } from 'react-icons/ai';

const NavBar = () => {
  
  let userId = -1
  if (sessionStorage.hasOwnProperty('loginedUser') === true) {
    userId = JSON.parse(sessionStorage.getItem('loginedUser')).userId
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
              style={{ color: "white" }}
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
            <i style={{ color: "white" }} className="h1 bi bi-list navbar-hamburger"></i>
            {/* <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i> */}
          </div>
        </div>
        <div className={clicked ? 'nav-menu active' : 'nav-menu'}>
          <i
            style={{ cursor: 'pointer', color: "#fff" }}
            className="h1 px-4 bi bi-house-door-fill"
            onClick={() => {
              history.push('/feed');
              setClicked(false);
            }}
          ></i>
          {/* <i
            style={{ cursor: 'pointer', color: "#fff" }}
            className="h1 px-4 bi bi-people-fill"
            onClick={() => {
              window.location.replace(`/user/${userId}/followlist`);
              setClicked(false);
            }}
          ></i> */}
          <i
            style={{ cursor: 'pointer', color: "#fff" }}
            className="h1 px-4 bi bi-person-fill"
            onClick={() => {
              window.location.replace(`/user/${userId}/profile`);
              setClicked(false);
            }}
          ></i>

          <i
            style={{ cursor: 'pointer', color: "#fff" }}
            className="link h1 px-4 bi bi-pencil-fill"
            onClick={() => {
              history.push('/post');
              setClicked(false);
            }}
          ></i>
          <i
            style={{ cursor: 'pointer', color: "#fff" }}
            className="link h1 px-4 bi bi-box-arrow-in-right"
            onClick={() => {
              sessionStorage.clear('loginedUser')
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
