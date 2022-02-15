import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa';
import { MdHowToVote } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import FeedItem from '../../Feed/components/FeedItem';
import styles from './HashTagItem.module.css';

const HashTagItem = ({ item }) => {
  const history = useHistory();
  const createDate = new Intl.DateTimeFormat('ko-KR').format(
    item.created_at * 1000
  );
  const dueDate = new Intl.DateTimeFormat('ko-KR').format(item.due_date * 1000);
  const [type, setType] = useState('투표');
  useEffect(() => {
    console.log('item');
    console.log(item);
  }, []);

  return (
    <>
      <ListGroup.Item
        style={{ cursor: 'pointer' }}
        className="d-flex justify-content-between align-items-start"
        onClick={() => {
          history.push(`/testDetail/${item.idboard}`);
        }}
      >
        <div style={{ width: '60px', height: '60px' }}>
          <img
            style={{ width: '100%', height: '100%' }}
            src={JSON.parse(item.board_image)}
            alt=""
          />
        </div>
        <div className="ms-3 me-auto">
          <div>
            <span style={{ marginRight: '5px', fontWeight: 'bold' }}>
              [{type}]
            </span>
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '200px',
                display: 'inline-block',
                textAlign: 'left',
              }}
            >
              {item.content}
            </span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <MdHowToVote />
            <span style={{ marginRight: '10px' }}>{item.voteNum}</span>
            <FaRegComment />
            <span style={{ marginRight: '10px' }}>{item.commentNum}</span>
          </div>
        </div>

        <div
          style={{
            textAlign: 'left',
            marginTop: '6px',
            fontSize: '15px',
          }}
        >
          <div>작성일 : {createDate}</div>
          <div>마감일 : {dueDate}</div>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default HashTagItem;
