import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FeedItem from '../Feed/components/FeedItem';

const TestDetail = () => {
  const jwtToken = JSON.parse(sessionStorage.getItem('loginedUser')).jwtToken;
  const ID = useParams();
  const [feed, setFeed] = useState();

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://i6c103.p.ssafy.io/api/board/detail/${ID.idboard}`,
      headers: {
        Authorization : 'Bearer ' + jwtToken,
      },
    })
      .then(res => {
        res.data.board_image = JSON.parse(res.data.board_image);
        res.data.hashArr = JSON.parse(res.data.hashArr);
        res.data.vote_contents = JSON.parse(res.data.vote_contents);
        setFeed(res.data);
      })
      .catch(error => {})
      .finally(() => {});
  }, []);

  const onRemove = () => {
    axios({
      method: 'delete',
      url: `http://i6c103.p.ssafy.io/api/board/delete/${ID.idboard}`,
      headers: {
        Authorization : 'Bearer ' + jwtToken,
      }
    })
      .then(res => {
        // setFeedData(feeds.filter(feed => feed.idboard !== id));
      })
      .catch(err => {});
  };

  return (
    <>
      <div style={{ marginTop: '80px' }}>
        {feed && <FeedItem feed={feed} onRemove={onRemove} />}
      </div>
      {/* <div style={{ marginTop: "100px" }}>{feed.idboard}</div> */}
    </>
  );
};

export default TestDetail;
