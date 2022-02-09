import React from 'react';
import SearchList from './components/SearchList';
import styles from './FollowList.module.css'
import { useHistory } from 'react-router-dom';

const followerList = [
  {profileImg:'', name:'정정채'},
  {profileImg:'', name:'채성원'},
  {profileImg:'', name:'허영민'},
]

function FollowerList() {
  const history = useHistory();
  if (localStorage.getItem('loginedUser') === null) {
    history.push('/')
  }
  return (
    <>
      {/* <FollowListHeader /> */}
      <h1 align="left" className={styles.center} ><b>팔로워 목록</b></h1>
      <SearchList friendList={followerList}/>
    </>
  )
}
export default FollowerList;