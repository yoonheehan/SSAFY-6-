import React, { useRef, useState } from 'react';
import AWS from 'aws-sdk';
import {
  Button,
  ButtonGroup,
  FormControl,
  InputGroup,
  ToggleButton,
} from 'react-bootstrap';
import styles from './mdProfile.module.css';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const MdProfile = props => {
  const history = useHistory();
  const inputRef = useRef();
  const [img, setImg] = useState('');
  const imgRef = useRef(null);
  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_S3, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });
  const [userData, setUserData] = useState({
    info: {
      image: '',
      nickname: '',
    },
  });
  const handleFileInput = e => {
    // input 태그를 통해 선택한 파일 객체
    const file = e.target.files[0];
    console.log('파일');
    console.log(file);
    setUserData(pre => ({
      ...pre,
      info: {
        ...pre.nickname,
        image: file.name,
      },
    }));

    // S3 SDK에 내장된 업로드 함수
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'haejwoing', // 업로드할 대상 버킷명
        Key: file.name + '.jpg', // 업로드할 파일명 (* 확장자를 추가해야 합니다!)
        Body: file, // 업로드할 파일 객체
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        alert('이미지 업로드에 성공했습니다.');
      },
      function (err) {
        return alert('오류가 발생했습니다: ', err.message);
      }
    );
  };
  const { id } = useParams();

  if (localStorage.getItem('loginedUser') === null) {
    history.push('/');
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/user/${id}`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
    })
      .then(res => {
        console.log(res);
        setUserData(res.data);
      })
      .catch(err => {
        console.log('에러났어요');
      })
      .finally(() => {
        console.log('profile request end');
      });
  }, []);

  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_S3, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const onChangeNickName = e => {
    setUserData(pre => ({
      ...pre,
      info: {
        image: userData.info.image,
        nickname: e.target.value,
      },
    }));
  };

  const checkData = () => {
    console.log('보내지는 데이터');
    console.log(userData);
    axios
      .get(`http://localhost:8080/user/check/${userData.info.nickname}`)
      .then(res => {
        console.log(res);
        if (res.data === false) {
          alert('사용가능한 닉네임입니다.');
        } else {
          alert('중복된 닉네임입니다.');
        }
      });
  };

  const submitData = () => {
    console.log('데이터를 보내자');
    axios
      .put(`http://localhost:8080/user/${id}`, {
        image: userData.info.image,
        nickname: userData.info.nickname,
      })
      .then(res => {
        console.log('메메롤로');
        console.log(res);
        history.goBack();
      })
      .catch(err => {
        console.log('에러났어요');
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.div1}>
        <div className={styles.div3}>
          <h1 className={styles.h4}>
            <b>프로필 수정</b>
          </h1>
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.body}>
          <div className={styles.data}>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginBottom: '20px',
                }}
              >
                <input
                  type="file"
                  id="upload"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
                <label
                  style={{
                    marginBottom: '50px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                  htmlFor="upload"
                >
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                    }}
                    ref={imgRef}
                    src={
                      'https://haejwoing.s3.ap-northeast-2.amazonaws.com/' +
                      userData.info.image +
                      '.jpg'
                    }
                    alt="ㅇ"
                    onError={() => {
                      return (imgRef.current.src =
                        'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png');
                    }}
                  />
                </label>
              </div>
            </div>
            <InputGroup className={styles.inputGroup}>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={userData.info.nickname}
                onChange={onChangeNickName}
              />
              <Button variant="secondary" onClick={checkData}>
                중복확인
              </Button>
            </InputGroup>
          </div>
        </div>
      </section>
      <Button
        className={styles.button}
        variant="secondary"
        onClick={submitData}
      >
        완료
      </Button>
    </>
  );
};

export default MdProfile;
