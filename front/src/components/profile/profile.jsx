import axios from 'axios';
import React, {useState} from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import {
  AiOutlineArrowLeft,
  AiOutlineMenu,
  AiOutlineInfoCircle,
  AiFillStar,
} from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import {useParams} from "react-router-dom";

const Profile = props => {
  if (localStorage.getItem('loginedUser') === null) {
    history.push('/')
  }
  let { id } = useParams();
  
  const [userData, setUserData] = useState(null)
  const userId = JSON.parse(localStorage.getItem('loginedUser')).userId
  if (userData === null) {
    console.log(id)
    axios({
      method: 'get',
      url: `http://localhost:8080/user/${id}`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
    })
      .then(response => {
        console.log(id)
        console.log(response)
        setUserData(response.data)
      })
      .catch(error => {
        console.log('profile requset fail : ' + error);
      })
      .finally(() => {
        console.log('profile request end');
      });
  }
  console.log(userData)
  const now = 60;
  const progressInstance = (
    <ProgressBar className={styles.progress} now={userData.info.point} label={`${userData.info.point}%`} />
  );
  const history = useHistory();
  return (
    <>
      <h1 style={{ marginTop: '20px' }}>
        <b>프로필</b>
      </h1>
      <section className={styles.section}>
        <div className={styles.body}>
          <div className={styles.box1}>
            <BsPersonCircle className={styles.avatar} />
            <div>
              <div className={styles.nickName}>{userData.info.nickname}</div>
            </div>
          </div>
          <div className={styles.box2}>
            <Button
              className={styles.button}
              variant="outline-secondary"
              onClick={() => {
                history.push('/mdProfile');
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
                  history.push('/user/1/followlist');
                }}
              >
                친구 목록
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  history.push('/withdraw');
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
