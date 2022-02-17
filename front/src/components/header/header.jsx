import React from 'react';
import styles from './header.module.css';

const Header = props => (
  <header className={styles.header} style={{backgroundColor:'white'}}>
    <div className={styles.logoWord}>
      <img className={styles.logo} src="images/login1.png" alt="logo" />
    </div>
    <div className={styles.logoboymargin}>
      <img className={styles.logoboy} src="images/뚜잇이.jpg" alt="logo" />
    </div>
  </header>
);

export default Header;
