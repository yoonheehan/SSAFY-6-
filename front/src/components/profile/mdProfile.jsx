import React, { useState } from 'react';
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
  return (
    <>
      <div className={styles.div1}>
        <div className={styles.div2}>
          <AiOutlineArrowLeft />
        </div>
        <div className={styles.div3}>
          <h4 className={styles.h4}>프로필 수정</h4>
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.body}>
          <div className={styles.data}>
            <BsPersonCircle className={styles.icon} />
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
