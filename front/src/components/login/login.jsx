import React, { useState } from 'react';
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

const Login = props => {
  const _clickSnsLoginGoogle = res => {
    console.log('구글 로그인:', res);
    URL = 'http://localhost:8080/jwt/google';
    axios({
      method: 'post',
      url: 'http://localhost:8080/jwt/google',
      data: res,
    });
  };
  const _clickSnsLoginKakao = res => {
    console.log('카카오 로그인:', res);
  };
  const _clickSnsLoginNaver = res => {
    console.log('네이버 로그인:', res);
  };

  return (
    <>
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
    </>
  );
};

export default Login;
