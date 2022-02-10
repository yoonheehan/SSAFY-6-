import axios from 'axios';
<<<<<<< Updated upstream
import React, {useState, useEffect} from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> Stashed changes
import { Button, ProgressBar } from 'react-bootstrap';
import AWS from 'aws-sdk';
import {
  AiOutlineArrowLeft,
  AiOutlineMenu,
  AiOutlineInfoCircle,
  AiFillStar,
} from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import { useParams } from 'react-router-dom';

const Profile = props => {
  const history = useHistory();
  if (localStorage.getItem('loginedUser') === null) {
    history.push('/');
  }
  let { id } = useParams();
<<<<<<< Updated upstream
  
  const [userData, setUserData] = useState({info: {
    point : 0,
    nickname: 'tmp',
  }})
=======

  const [userData, setUserData] = useState({
    info: {
      point: 0,
      nickname: 'tmp',
    },
  });
>>>>>>> Stashed changes

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/user/${id}`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
    })
      .then(response => {
<<<<<<< Updated upstream
        console.log(response.data)
        setUserData(response.data)
=======
        console.log(response.data);
        setUserData(response.data);
>>>>>>> Stashed changes
      })
      .catch(error => {
        console.log('profile requset fail : ' + error);
      })
      .finally(() => {
        console.log('profile request end');
      });
<<<<<<< Updated upstream

  },[])


  console.log(userData)
=======
  }, []);

  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_S3, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  console.log(userData);
>>>>>>> Stashed changes
  const now = 60;
  const progressInstance = (
    <ProgressBar
      className={styles.progress}
      now={userData.info.point}
      label={`${userData.info.point}%`}
    />
  );
  return (
    <>
      <h1 style={{ marginTop: '20px' }}>
        <b>프로필</b>
      </h1>
      <section className={styles.section}>
        <div className={styles.body}>
          <div className={styles.box1}>
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                margin: 'auto',
                border: '1px solid black',
              }}
            >
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                }}
                src={
                  'https://haejwoing.s3.ap-northeast-2.amazonaws.com/' +
                  userData.info.image +
                  '.jpg'
                }
                alt=""
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <div>{userData.info.nickname}</div>
            </div>
          </div>
          <div className={styles.box2}>
            <Button
              className={styles.button}
              variant="outline-secondary"
              onClick={() => {
                history.push(`/user/${id}/mdProfile`);
              }}
            >
              프로필 수정
            </Button>
          </div>
          <div className={styles.box3}>
            <div>
              <div className={styles.title1}>
                해줘지수
                <AiOutlineInfoCircle className={styles.info} />
              </div>
            </div>
            <div>
              <div className={styles.grade}>
                <AiFillStar className={styles.start} />
                <div>골드</div>
              </div>
              {progressInstance}
            </div>
          </div>
          <div className={styles.box4}>
            <div className="d-grid gap-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  history.push('/postList');
                }}
              >
                글 작성 목록
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  history.push(`/user/${id}/followList`);
                }}
              >
                팔로우 목록
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  history.push(`/user/${id}/followerList`);
                }}
              >
                팔로워 목록
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  history.push(`/withdraw`);
                }}
              >
                회원탈퇴
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
