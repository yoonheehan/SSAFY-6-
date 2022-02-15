import React, { useState } from 'react';
import styles from './FindHashTag.module.css';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SearchList from './components/SearchList';

const FindHashTag = props => {
  const params = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);

  console.log('word: ', params.word);

  useEffect(() => {
    if (sessionStorage.getItem('loginedUser') === null) {
      history.push('/');
    }
  }, []);

  return (
    <>
      <h1 align="left" className={styles.center}>
        <b>태그 검색</b>
      </h1>
      <SearchList HashTagList={data} />
    </>
  );
};

export default FindHashTag;
