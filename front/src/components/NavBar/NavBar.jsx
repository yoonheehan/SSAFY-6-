import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css';
// import Alarm from "../Alarm/Alarm.jsx"
import { AiOutlineArrowLeft } from 'react-icons/ai';
import styles from './NavBar.module.css';

const NavBar = () => {
  const history = useHistory();
  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <div className={styles.div2}>
              <AiOutlineArrowLeft
                onClick={() => {
                  history.goBack();
                }}
              />
            </div>
            <img
              style={{ cursor: 'pointer' }}
              width="100px"
              height="auto"
              src="/images/logo(2).png"
              alt="logo"
              onClick={() => {
                history.push('/feed');
              }}
            />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
        <div className="collapse " id="navbarToggleExternalContent">
          <div className="bg-light p-2">
            <i
              style={{ cursor: 'pointer' }}
              className="h1 px-4 bi bi-house-door-fill"
              onClick={() => {
                history.push('/feed');
              }}
            ></i>
            <i
              style={{ cursor: 'pointer' }}
              className="h1 px-4 bi bi-people-fill"
              onClick={() => {
                history.push('/user/1/followlist');
              }}
            ></i>
            <i
              style={{ cursor: 'pointer' }}
              className="h1 px-4 bi bi-person-fill"
              onClick={() => {
                history.push('/profile');
              }}
            ></i>
            <Link to="/alarm">
              <i className="link h1 px-4 bi bi-bell-fill"></i>
            </Link>
            <i
              style={{ cursor: 'pointer' }}
              className="bi px-4 bi-pencil-square"
              onClick={() => {
                history.push('/post');
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
