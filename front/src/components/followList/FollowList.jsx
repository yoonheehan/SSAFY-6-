import React from 'react';
import SearchList from './components/SearchList';
import styles from './FollowList.module.css'
import { useHistory } from 'react-router-dom';

const followList = [
  {profileImg:'', name:'정정채'},
  {profileImg:'', name:'채성원'},
  {profileImg:'', name:'허영민'},
]

function FollowList() {
  const history = useHistory();
  if (localStorage.getItem('loginedUser') === null) {
    history.push('/')
  }
  return (
    <>
      {/* <FollowListHeader /> */}
      <h1 align="left" className={styles.center} ><b>팔로우 목록</b></h1>
      <SearchList friendList={followList}/>
    </>
  )
}
export default FollowList;