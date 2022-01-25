import React from 'react';
import FollowListHeader from './components/FollowListHeader'
import SearchList from './components/SearchList';
import styles from './FollowList.module.css'

function FollowList() {
  return (
    <>
      {/* <FollowListHeader /> */}
      <h1 align="left" className={styles.center} ><b>친구 목록</b></h1>
      <SearchList />
    </>
  )
}
export default FollowList;