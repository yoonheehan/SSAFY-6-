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

const MdProfile = props => {
  const inputRef = useRef();
  const [img, setImg] = useState('');
  const imgRef = useRef(null);
  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:e812a597-ca5d-4e15-bb00-dbf788e31f86', // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });
  const handleFileInput = e => {
    // input 태그를 통해 선택한 파일 객체
    const file = e.target.files[0];
    console.log(file);
    setImg(file.name);

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
            <input
              type="file"
              id="upload"
              className={styles.image_upload}
              onChange={handleFileInput}
            />
            <label htmlFor="upload" className={styles.image_upload_wrapper}>
              <div style={{ border: '1px solid black' }}>
                <img
                  style={{ width: '100%', height: '100%' }}
                  ref={imgRef}
                  src={
                    'https://haejwoing.s3.ap-northeast-2.amazonaws.com/' +
                    img +
                    '.jpg'
                  }
                  alt="ㅇ"
                  onError={() => {
                    return (imgRef.current.src =
                      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png');
                  }}
                />
              </div>
            </label>
            <InputGroup className={styles.inputGroup}>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="3팀 화이팅(닉네임)"
              />
            </InputGroup>
          </div>
        </div>
      </section>
      <Button className={styles.button} variant="secondary">
        완료
      </Button>
    </>
  );
};

export default MdProfile;
