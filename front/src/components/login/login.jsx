import React from 'react';
import styles from './login.module.css';

const Login = props => (
  <>
    <section className={styles.section}>
      <div>
        <h1>로그인</h1>
        <ul>
          <li>
            <button>Google</button>
          </li>
          <li>
            <button>카카오</button>
          </li>
          <li>
            <button>네이버</button>
          </li>
        </ul>
      </div>
    </section>
  </>
);

export default Login;
