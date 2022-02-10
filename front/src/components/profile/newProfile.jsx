import React, { useRef, useState } from 'react';
import AWS from 'aws-sdk';
import styles from './newProfile.module.css';
import { BsPersonCircle } from 'react-icons/bs';
import {
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  ToggleButton,
} from 'react-bootstrap';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const _ = require('lodash');

const NewProfile = props => {
  const histroy = useHistory();
  const [nickName, setNickName] = useState('');
  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: '남자', value: '1' },
    { name: '여자', value: '2' },
  ];
  const [startDate, setStartDate] = useState(new Date());

  const years = _.range(1990, getYear(new Date()) + 1, 1);
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const inputRef = useRef();
  const [img, setImg] = useState('');
  const imgRef = useRef(null);
  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_S3, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });
  const handleFileInput = e => {
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

  function getNickName(event) {
    const commentContent = event.target.value;
    setNickName(event.target.value);
  }

  function submitData() {
    console.log(img, radioValue, nickName, startDate.toLocaleDateString());
    console.log(props.location.props.useremail);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_LOCALURL}user`,
      data: {
        image: img,
        gender: radioValue,
        nickname: nickName,
        birth: startDate.toLocaleDateString(),
        email: props.location.props.useremail,
      },
    })
      .then(response => {
        console.log(response.data);
        const loginUser = { userId: response.data.id };
        window.localStorage.setItem('loginedUser', JSON.stringify(loginUser));
        window.location.replace("/feed")
      })
      .catch(error => {
        console.log('signup requset fail : ' + error);
      })
      .finally(() => {
        console.log('signup request end');
      });
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.body}>
          <h1 className={styles.h1}>추가정보</h1>
          <div className={styles.profileBody}>
            <div className={styles.profileUpload}>
              <input
                type="file"
                id="upload"
                style={{ display: 'none' }}
                onChange={handleFileInput}
              />
              <label
                htmlFor="upload"
                style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              >
                <img
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                  ref={imgRef}
                  src={
                    'https://haejwoing.s3.ap-northeast-2.amazonaws.com/' +
                    img +
                    '.jpg'
                  }
                  alt=""
                  onError={() => {
                    return (imgRef.current.src =
                      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png');
                  }}
                />
              </label>
            </div>
          </div>
          <div className={styles.data}>
            <InputGroup className={styles.inputGroup}>
              <FormControl
                onChange={getNickName}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="3팀 화이팅(닉네임)"
              />
            </InputGroup>
            <ButtonGroup className={styles.buttonGroup}>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={e => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <ReactDatePicker
              className={styles.datePicker}
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {'<'}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {'>'}
                  </button>
                </div>
              )}
              selected={startDate}
              onChange={date => setStartDate(date)}
              withPortal
              locale={ko}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
      </section>
      <Button
        onClick={submitData}
        className={styles.button}
        variant="secondary"
      >
        완료
      </Button>
    </>
  );
};

export default NewProfile;
