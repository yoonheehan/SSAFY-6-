import React, { useEffect, useState } from 'react';
import SearchList from './components/SearchList';
import styles from './FollowList.module.css';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FollowList() {
  const [followData, setFollowData] = useState([]);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const jwtToken = JSON.parse(sessionStorage.getItem('loginedUser')).jwtToken;
  const history = useHistory();
  if (sessionStorage.getItem('loginedUser') === null) {
    history.push('/');
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          method: 'get',
          url: `http://localhost:8080/follow/${id}`,
          headers: {
            Authorization : 'Bearer ' + jwtToken,
          }
        })
        setFollowData(response.data);
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
        <b>팔로우 목록</b>
      </h1>
      <SearchList friendList={followData} />
    </>
  );
}
export default FollowList;
