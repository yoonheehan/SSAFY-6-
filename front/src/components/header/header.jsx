import React from 'react';
import styles from './header.module.css';

const Header = props => (
  <header className={styles.header} style={{backgroundColor:'white'}}>
    <img className={styles.logo} src="images/logo.png" alt="logo" />
  </header>
);

export default Header;
