import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import NaverLogin from 'react-naver-login';
import Footer from '../footer/footer';
import Header from '../header/header';
import axios from 'axios';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';

const Portal = props => {
  return createPortal(props.children, document.getElementById('loginPortal'));
};

const Login = props => {
  const LOGIN = 'LOGIN';
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  if (sessionStorage.getItem('loginedUser') != null) {
    history.push('/feed');
  }
  const _clickSnsLoginGoogle = res => {
    if (sessionStorage.getItem('loginedUser') === null) {
      axios({
        method: 'post',
        url: `http://localhost:8080/jwt/google`,
        // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
        data: res,
        headers: {
          Authorization : null,
        }
      })
        .then(response => {
          console.log(response)
          if (response.data.check === false) {
            history.push({
              pathname: '/newprofile',
              props: { useremail: response.data.email },
            });
          } else {
            console.log(response.data)
            const loginUser = { userId: response.data.id, jwtToken: response.data.jwtToken };
            window.sessionStorage.setItem(
              'loginedUser',
              JSON.stringify(loginUser)
            );
            window.location.replace('/feed');
          }

          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data;
        })
        .catch(error => {})
        .finally(() => {});
    } else {
      history.push('/feed');
    }
  };
  const _clickSnsLoginKakao = res => {
    if (sessionStorage.getItem('loginedUser') === null) {
      axios({
        method: 'post',
        url: `http://i6c103.p.ssafy.io/api/jwt/kakao`,
        // url: 'http://i6c103.p.ssafy.io/api/jwt/kakao',
        data: res,
        headers: {
          Authorization : null,
        }
      })
        .then(response => {
          if (response.data.check === false) {
            history.push({
              pathname: '/newprofile',
              props: { useremail: response.data.email },
            });
          } else {
            const loginUser = { userId: response.data.id, jwtToken: response.data.jwtToken };
            window.sessionStorage.setItem(
              'loginedUser',
              JSON.stringify(loginUser)
            );
            window.location.replace('/feed');
          }

          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data;
        })
        .catch(error => {})
        .finally(() => {});
    } else {
      history.push('/feed');
    }
  };
  const _clickSnsLoginNaver = res => {
    if (sessionStorage.getItem('loginedUser') === null) {
      axios({
        method: 'post',
        url: `http://localhost:8080/jwt/naver`,
        // url: 'http://i6c103.p.ssafy.io/api/jwt/naver',
        data: res,
        headers: {
          Authorization : null,
        }
      })
        .then(response => {
          if (response.data.check === false) {
            console.log(response.data)
            history.push({
              pathname: '/newprofile',
              props: { useremail: response.data.email },
            });
          } else {
            const loginUser = { userId: response.data.id, jwtToken: response.data.jwtToken };
            window.sessionStorage.setItem(
              'loginedUser',
              JSON.stringify(loginUser)
            );
            window.location.replace('/feed');
          }

          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data;
        })
        .catch(error => {})
        .finally(() => {});
    } else {
      history.push('/feed');
    }
  };

  useEffect(() => {});

  return (
    <>
      <Portal>
        <div style={{ zIndex: 9999, position: 'fixed', width: '100%' }}>
          <Header />
          <section className={styles.section}>
            <div className={styles.login}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE}
                    buttonText="Google 계정으로 로그인"
                    render={renderProps => (
                      <div
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <button className={styles.google}>
                          <FcGoogle className={styles.icon} />
                          Google 로그인
                        </button>
                      </div>
                    )}
                    onSuccess={e => _clickSnsLoginGoogle(e)}
                    cookiePolicy={'single_host_origin'}
                  />
                </li>
                <li className={styles.item}>
                  <NaverLogin
                    clientId={process.env.REACT_APP_NAVER}
                    callbackUrl="http://localhost:3000/"
                    render={renderProps => (
                      <div
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <button className={styles.naver}>
                          <SiNaver className={styles.icon} />
                          Naver 로그인
                        </button>
                      </div>
                    )}
                    onSuccess={e => _clickSnsLoginNaver(e)}
                  />
                </li>
                <li>
                  <KakaoLogin
                    token={process.env.REACT_APP_KAKAO}
                    render={renderProps => (
                      <div
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <button className={styles.kakao}>
                          <RiKakaoTalkFill className={styles.icon} />
                          Kakao 로그인
                        </button>
                      </div>
                    )}
                    onSuccess={e => _clickSnsLoginKakao(e)}
                  />
                </li>
              </ul>
            </div>
          </section>
          {/* <Footer /> */}
        </div>
      </Portal>
    </>
  );
};

export default Login;
