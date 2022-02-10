import React, {useState} from 'react';
import SearchList from './components/SearchList';
import styles from './FollowList.module.css'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import {useParams} from "react-router-dom";
import { useEffect } from 'react';

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
  let { id } = useParams();
  console.log(id)
  
  const [followerData, setFollowerData] = useState([])

  useEffect(() => {

    axios({
      method: 'get',
      url: `http://localhost:8080/follower/${id}`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
    })
      .then(response => {
        console.log(response)
        setFollowerData(response.data)
      })
      .catch(error => {
        console.log('profile requset fail : ' + error);
      })
      .finally(() => {
        console.log('profile request end');
      });
  })
  console.log(followerData)



  return (
    <>
      {/* <FollowListHeader /> */}
      <h1 align="left" className={styles.center} ><b>팔로워 목록</b></h1>
      <SearchList friendList={followerList}/>
    </>
  )
}
export default FollowerList;