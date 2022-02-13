import React, {useState} from 'react';
import SearchList from './components/SearchList';
import styles from './FollowList.module.css'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import {useParams} from "react-router-dom";
import { useEffect } from 'react';


function FindFriend() {
  const history = useHistory();
  if (sessionStorage.getItem('loginedUser') === null) {
    history.push('/')
  }
  let params = useParams();
  console.log('word: ' ,params.word)
  
  const [followerData, setFollowerData] = useState([])


  return (
    <>
      {/* <FollowListHeader /> */}
      <h1 align="left" className={styles.center} ><b>친구 찾기</b></h1>
      <SearchList friendList={followerData}/>
    </>
  )
}
export default FindFriend;