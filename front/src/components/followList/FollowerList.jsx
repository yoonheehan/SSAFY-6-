import React, { useState } from 'react';
import SearchList from './components/SearchList';
import styles from './FollowList.module.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function FollowerList() {
  const history = useHistory();
  if (sessionStorage.getItem('loginedUser') === null) {
    history.push('/');
  }
  let { id } = useParams();

  const [followerData, setFollowerData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://i6c103.p.ssafy.io/api/follower/${id}`
        );
        setFollowerData(response.data);
      } catch (e) {}
      setLoading(false);
    };
    //async를 사용하는 함수 따로 선언
    fetchData();
  }, []);

  return (
    <>
      {/* <FollowListHeader /> */}
      <h1 align="left" className={styles.center}>
        <b>팔로워 목록</b>
      </h1>
      <SearchList friendList={followerData} />
    </>
  );
}
export default FollowerList;
