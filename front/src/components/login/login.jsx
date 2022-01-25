import React, { useState } from 'react';
import styles from './login.module.css';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import NaverLogin from 'react-naver-login';

const Login = props => {
  const clientId =
    '162813412572-93j68nvs116vi6qongc7re9o85glq28f.apps.googleusercontent.com';
  const onLoginSuccess = res => {
    console.log('구글 로그인:', res);
  };
  const onFailureSuccess = res => {
    console.log('Login Failed:', res);
  };
  const _clickSnsLoginKakao = res => {
    console.log('카카오 로그인:', res);
  };
  const _clickSnsLoginNaver = res => {
    console.log('네이버 로그인:', res);
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.login}>
          <h1 className={styles.h1}>로그인</h1>
          <ul className={styles.list}>
            <li className={styles.item}>
              <GoogleLogin
                className={styles.google}
                clientId={clientId}
                buttonText="Google 계정으로 로그인"
                onSuccess={onLoginSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy="single_host_origin"
              />
            </li>
            <li className={styles.item}>
              <NaverLogin
                clientId="7dJ6XRg_9yMFTdRAvXEE"
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
                token={'b4d91f6b872ed9cc94673ef40c3cd88b'}
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
            <hr className={styles.hr} />
            <span>
              해줘잉이 처음이신가요? <a href="#">회원가입</a>
            </span>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Login;
