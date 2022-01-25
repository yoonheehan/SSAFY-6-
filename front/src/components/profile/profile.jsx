import React from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import {
  AiOutlineArrowLeft,
  AiOutlineMenu,
  AiOutlineInfoCircle,
  AiFillStar,
} from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import styles from './profile.module.css';

const Profile = props => {
  const now = 60;

  const progressInstance = (
    <ProgressBar className={styles.progress} now={now} label={`${now}%`} />
  );
  return (
    <>
      <div className={styles.div1}>
        <div className={styles.div2}>
          <AiOutlineArrowLeft />
        </div>
        <div className={styles.div3}>
          <h4 className={styles.h4}>프로필</h4>
        </div>
        <div className={styles.div4}>
          <AiOutlineMenu />
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.body}>
          <div className={styles.box1}>
            <BsPersonCircle className={styles.avatar} />
            <div>
              <div className={styles.nickName}>3팀 화이팅(닉네임)</div>
            </div>
          </div>
          <div className={styles.box2}>
            <Button className={styles.button} variant="outline-secondary">
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
              <Button variant="secondary" size="md">
                글 작성 목록
              </Button>
              <Button variant="secondary" size="md">
                친구관리
              </Button>
              <Button variant="secondary" size="md">
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
