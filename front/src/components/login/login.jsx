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

  if (localStorage.getItem('loginedUser') != null) {
    history.push('/feed');
  }
  const _clickSnsLoginGoogle = res => {
    console.log(localStorage.getItem('loginedUser'));
    console.log('구글 로그인:', res);
    if (localStorage.getItem('loginedUser') === null) {
      axios({
        method: 'post',
        url: `http://localhost:8080/jwt/google`,
        // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
        data: res,
      })
        .then(response => {
          if (response.data.check === false) {
            history.push({
              pathname: '/newprofile',
              props: { useremail: response.data.email },
            });
          } else {
            console.log(response.data.id);
            const loginUser = { userId: response.data.id };
            window.localStorage.setItem(
              'loginedUser',
              JSON.stringify(loginUser)
            );
            window.location.replace('/feed');
          }

          console.log('response.data.accessToken : ' + response.data.email);
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data;
        })
        .catch(error => {
          console.log('login requset fail : ' + error);
        })
        .finally(() => {
          console.log('login request end');
        });
    } else {
      history.push('/feed');
    }
  };
  const _clickSnsLoginKakao = res => {
    console.log('카카오 로그인:', res);
    if (localStorage.getItem('loginedUser') === null) {
      axios({
        method: 'post',
        url: `http://localhost:8080/jwt/kakao`,
        // url: 'http://i6c103.p.ssafy.io/api/jwt/kakao',
        data: res,
      })
        .then(response => {
          console.log('kakao:', response);
          if (response.data.check === false) {
            history.push({
              pathname: '/newprofile',
              props: { useremail: response.data.email },
            });
          } else {
            console.log(response.data.id);
            const loginUser = { userId: response.data.id };
            window.localStorage.setItem(
              'loginedUser',
              JSON.stringify(loginUser)
            );
            window.location.replace('/feed');
          }

          console.log('response.data.accessToken : ' + response.data.email);
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data;
        })
        .catch(error => {
          console.log('login requset fail : ' + error);
        })
        .finally(() => {
          console.log('login request end');
        });
    } else {
      history.push('/feed');
    }
  };
  const _clickSnsLoginNaver = res => {
    console.log('네이버 로그인:', res);
    if (localStorage.getItem('loginedUser') === null) {
      axios({
        method: 'post',
        url: `http://localhost:8080/jwt/naver`,
        // url: 'http://i6c103.p.ssafy.io/api/jwt/naver',
        data: res,
      })
        .then(response => {
          if (response.data.check === false) {
            history.push({
              pathname: '/newprofile',
              props: { useremail: response.data.email },
            });
          } else {
            console.log(response.data.id);
            const loginUser = { userId: response.data.id };
            window.localStorage.setItem(
              'loginedUser',
              JSON.stringify(loginUser)
            );
            window.location.replace('/feed');
          }

          console.log('response.data.accessToken : ' + response.data.email);
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data;
        })
        .catch(error => {
          console.log('login requset fail : ' + error);
        })
        .finally(() => {
          console.log('login request end');
        });
    } else {
      history.push('/feed');
    }
  };

  useEffect(() => {
    console.log('Login Render...');
  });

  return (
    <>
      <Portal>
        <div style={{ zIndex: 9999, position: 'fixed', width: '100%' }}>
          <Header />
          <section className={styles.section}>
            <div className={styles.login}>
              <h1 className={styles.h1}>로그인</h1>
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
                          Google 계정으로 로그인
                        </button>
                      </div>
                    )}
                    onSuccess={e => _clickSnsLoginGoogle(e)}
                    onFailure={console.log}
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
                          Naver 계정으로 로그인
                        </button>
                      </div>
                    )}
                    onSuccess={e => _clickSnsLoginNaver(e)}
                    onFailure={result => console.error(result)}
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
                          Kakao 계정으로 로그인
                        </button>
                      </div>
                    )}
                    onSuccess={e => _clickSnsLoginKakao(e)}
                    onFail={console.error}
                    onLogout={console.info}
                  />
                </li>
              </ul>
            </div>
          </section>
          <Footer />
        </div>
      </Portal>
    </>
  );
};

export default Login;
