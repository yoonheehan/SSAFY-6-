import React from 'react';
import SearchList from './components/SearchList';
import styles from './FollowList.module.css'

function FollowerList() {
  return (
    <>
      {/* <FollowListHeader /> */}
      <h1 align="left" className={styles.center} ><b>팔로워 목록</b></h1>
      <SearchList />
    </>
  )
}
export default FollowerList;