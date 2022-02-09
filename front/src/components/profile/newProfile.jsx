import React, { useState } from 'react';
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
  function getNickName(event) {
    const commentContent = event.target.value
    setNickName(event.target.value)

}

function submitData() {
    console.log(radioValue, nickName, startDate.toLocaleDateString())
    console.log(props.location.props.useremail)

    axios({
      method: 'post',
      url: 'http://i6c103.p.ssafy.io/api/user',
      data: {
        gender: radioValue,
        nickname: nickName,
        birth: startDate.toLocaleDateString(),
        email:props.location.props.useremail
      },
    })
      .then(response => {
        console.log(response.data);
        const loginUser = { userId : response.data.id}
        window.localStorage.setItem("loginedUser" , JSON.stringify(loginUser))
        histroy.push('/feed');
      })
      .catch(error => {
        console.log('login requset fail : ' + error);
      })
      .finally(() => {
        console.log('login request end');
      });
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.body}>
          <h1 className={styles.h1}>추가정보</h1>
          <BsPersonCircle className={styles.icon} />
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
      className={styles.button} variant="secondary">
        완료
      </Button>
    </>
  );
};

export default NewProfile;