import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FeedItem from '../Feed/components/FeedItem';

const TestDetail = () => {
  const ID = useParams();
  const [feed, setFeed] = useState();

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/board/detail/${ID.idboard}`,
    })
      .then(res => {
        res.data.board_image = JSON.parse(res.data.board_image);
        res.data.hashArr = JSON.parse(res.data.hashArr);
        res.data.vote_contents = JSON.parse(res.data.vote_contents);
        setFeed(res.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        console.log(feed);
      });
  }, []);

  const onRemove = () => {
    axios({
      method: 'delete',
      url: `http://localhost:8080/board/delete/${ID.idboard}`,
    })
      .then(res => {
        // setFeedData(feeds.filter(feed => feed.idboard !== id));
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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
