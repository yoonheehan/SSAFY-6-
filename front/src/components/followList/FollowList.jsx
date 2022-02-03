import React from 'react';
import SearchList from './components/SearchList';
import styles from './FollowList.module.css'

const followList = [
  {profileImg:'', name:'정정채'},
  {profileImg:'', name:'채성원'},
  {profileImg:'', name:'허영민'},
]

function FollowList() {
  return (
    <>
      {/* <FollowListHeader /> */}
      <h1 align="left" className={styles.center} ><b>팔로우 목록</b></h1>
      <SearchList friendList={followList}/>
    </>
  )
}
export default FollowList;