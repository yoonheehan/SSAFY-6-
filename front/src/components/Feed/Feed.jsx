import React, { useState, useEffect, useCallback, useRef } from 'react';
import Feeds from './components/Feeds';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const imgList = [
  'https://haejwoing.s3.ap-northeast-2.amazonaws.com/0001.png',
  'https://haejwoing.s3.ap-northeast-2.amazonaws.com/0002.png',
  'https://haejwoing.s3.ap-northeast-2.amazonaws.com/0003.png',
];

export default function Feed() {
  const history = useHistory();
  if (sessionStorage.getItem('loginedUser') === null) {
    history.push('/');
  }

  const [feeds, setFeeds] = useState(null);
  const [feedData, setFeedData] = useState(null);
  const loginedId = JSON.parse(sessionStorage.getItem('loginedUser')).userId;
  const [pageInfo, setPageInfo] = useState('');

  const page = useRef(1);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://i6c103.p.ssafy.io/api/board/${loginedId}`,
    })
      .then(response => {
        const res = response.data;

        for (let i = 0; i < res.length; i++) {
          res[i].board_image = JSON.parse(res[i].board_image);
          res[i].hashArr = JSON.parse(res[i].hashArr);
          res[i].vote_contents = JSON.parse(res[i].vote_contents);
          // res[i].vote_users = JSON.parse(res[i].vote_users)
        }
        if (res.length < 4) {
          setFeeds(res);
        } else {
          setFeeds(res.slice(0, 4));
        }
        setFeedData(res);
        setPageInfo([res.length, parseInt(res.length / 4), res.length % 4]);
      })
      .catch(error => {})
      .finally(() => {});
  }, []);

  const scrollEvent = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      page.current < pageInfo[1] &&
      scrollTop + clientHeight >= scrollHeight
    ) {
      const NewFeedList = feedData.slice(
        page.current * 4,
        page.current * 4 + 4
      );
      page.current += 1;
      setFeeds(prevFeed => [...prevFeed, ...NewFeedList]);
    } else if (
      page.current === pageInfo[1] &&
      scrollTop + clientHeight >= scrollHeight
    ) {
      const NewFeedList = feedData.slice(
        page.current * 4,
        page.current * 4 + pageInfo[2] + 1
      );
      page.current += 1;
      setFeeds(prevFeed => [...prevFeed, ...NewFeedList]);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
  }, [scrollEvent]);

  const onRemove = id => {
    axios({
      method: 'delete',
      url: `http://i6c103.p.ssafy.io/api/board/delete/${id}`,
    })
      .then(res => {
        setFeeds(feeds.filter(feed => feed.idboard !== id));
        window.location.replace('/feed');
      })
      .catch(err => {});
  };

  return (
    <div>
      <div style={{ marginTop: '75px' }}></div>
      <Feeds feedData={feeds} onRemove={onRemove} />
    </div>
  );
}
