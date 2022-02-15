import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
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
import ReactTooltip from 'react-tooltip';

const Profile = props => {
  const history = useHistory();

  const [followCheck, setFollowCheck] = useState(false);
  const imgRef = useRef(null);

  if (sessionStorage.getItem('loginedUser') === null) {
    history.push('/');
  }
  let { id } = useParams();
  const loginedId = JSON.parse(sessionStorage.getItem('loginedUser')).userId;

  console.log('profile : ', id, 'loginedId : ', loginedId);

  const [userData, setUserData] = useState({
    info: {
      point: 0,
      nickname: 'tmp',
    },
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/user/${id}`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
    })
      .then(response => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch(error => {
        console.log('profile requset fail : ' + error);
      })
      .finally(() => {
        console.log('profile request end');
      });

    axios({
      method: 'get',
      url: `http://localhost:8080/follow/check/${id}`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
      params: { loginedId: loginedId },
    })
      .then(response => {
        console.log(response.data);
        setFollowCheck(response.data);
      })
      .catch(error => {
        console.log('profile requset fail : ' + error);
      })
      .finally(() => {
        console.log('profile request end');
      });
  }, []);

  const doFollow = () => {
    axios({
      method: 'post',
      url: `http://localhost:8080/follow`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
      data: { loginedId: loginedId, followId: id },
    })
      .then(response => {
        console.log(response.data);
        setFollowCheck(true);
      })
      .catch(error => {
        console.log('follow requset fail : ' + error);
      })
      .finally(() => {
        console.log('follow request end');
      });
  };

  const unFollow = () => {
    axios({
      method: 'delete',
      url: `http://localhost:8080/follow`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
      params: { loginedId: loginedId, followId: id },
    })
      .then(response => {
        console.log(response.data);
        setFollowCheck(false);
      })
      .catch(error => {
        console.log('follow requset fail : ' + error);
      })
      .finally(() => {
        console.log('follow request end');
      });
  };

  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_S3, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  console.log(userData);
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
      <h1 style={{ marginTop: '100px' }}>
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
                onError={() => {
                  return (imgRef.current.src =
                    'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png%27');
                }}
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <div>{userData.info.nickname}</div>
            </div>
          </div>
          <div className={styles.box2}>
            {(() => {
              if (Number(id) === loginedId)
                return (
                  <Button
                    className={styles.button}
                    variant="outline-secondary"
                    onClick={() => {
                      history.push(`/user/${id}/mdProfile`);
                    }}
                  >
                    프로필 수정
                  </Button>
                );
              else if (Number(id) !== loginedId && followCheck === false)
                return (
                  <Button
                    className={styles.button}
                    variant="outline-secondary"
                    onClick={doFollow}
                  >
                    팔로우 맺기
                  </Button>
                );
              else if (Number(id) !== loginedId && followCheck == true)
                return (
                  <Button
                    className={styles.button}
                    variant="outline-secondary"
                    onClick={unFollow}
                  >
                    팔로우 끊기
                  </Button>
                );
            })()}
          </div>
          <div className={styles.box3}>
            <div>
              <div className={styles.title1}>
                해줘지수
                <span data-tip data-for="tooltip">
                  <AiOutlineInfoCircle className={styles.info} />
                </span>
                <ReactTooltip
                  id="tooltip"
                  effect="solid"
                  place="bottom"
                  type="dark"
                >
                  <div>
                    <p>
                      해줘지수는 피드, 댓글, 투표 등을 종합해서 만든 지표입니다.
                    </p>
                    <div>
                      <div>
                        <span>뉴비 :</span>{' '}
                        <AiFillStar style={{ color: 'green' }} />
                      </div>
                      <div>
                        <span>실버 :</span>{' '}
                        <AiFillStar style={{ color: 'silver' }} />
                      </div>
                      <div>
                        <span>골드 : </span>{' '}
                        <AiFillStar style={{ color: 'gold' }} />
                      </div>
                      <div>
                        <span>해줘열 :</span>{' '}
                        <AiFillStar style={{ color: 'red' }} />
                      </div>
                      <div>
                        <span>해줘신 :</span>{' '}
                        <AiFillStar style={{ color: 'purple' }} />
                      </div>
                    </div>
                  </div>
                </ReactTooltip>
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
                  history.push(`/board/user/${id}/postList`);
                }}
              >
                글 작성 목록
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  history.push(`/user/${id}/followlist`);
                }}
              >
                팔로우 목록
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  history.push(`/user/${id}/followerlist`);
                }}
              >
                팔로워 목록
              </Button>
              {Number(id) === loginedId ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    history.push(`/user/${id}/withdraw`);
                  }}
                >
                  회원탈퇴
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
