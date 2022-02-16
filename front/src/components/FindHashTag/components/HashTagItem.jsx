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
  useEffect(() => {}, []);

  useEffect(() => {
    if (item.type === 1) {
      setType('투표');
    } else if (item.type === 2) {
      setType('대결');
    } else {
      setType('찬반');
    }
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
          {JSON.parse(item.board_image) == '' ? (
            <img
              style={{ width: '100%', height: '100%' }}
              src="https://haejwoing.s3.ap-northeast-2.amazonaws.com/%EC%A0%9C%EB%AA%A9+%EC%97%86%EC%9D%8C.png"
              alt=""
            />
          ) : (
            <img
              style={{ width: '100%', height: '100%' }}
              src={JSON.parse(item.board_image)}
              alt=""
            />
          )}
        </div>
        <div className="ms-3 me-auto">
          <div>
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '150px',
                display: 'inline-block',
                textAlign: 'left',
              }}
            >
              {item.content}
            </span>
          </div>
          <div style={{ textAlign: 'left' }}>
            {type === '투표' ? (
              <span
                style={{
                  background: '#1b59cc',
                  marginRight: '10px',
                  color: '#ffffff',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  padding: '3px 7px',
                  fontSize: '0.8rem',
                }}
              >
                {type}
              </span>
            ) : type === '대결' ? (
              <span
                style={{
                  background: '#6913b9',
                  marginRight: '10px',
                  color: '#ffffff',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  padding: '3px 7px',
                  fontSize: '0.8rem',
                }}
              >
                {type}
              </span>
            ) : (
              <span
                style={{
                  background: '#bb18a0',
                  marginRight: '10px',
                  color: '#ffffff',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  padding: '3px 7px',
                  fontSize: '0.8rem',
                }}
              >
                {type}
              </span>
            )}
            <MdHowToVote style={{ marginRight: '5px', fontSize: '20px' }} />
            <span style={{ marginRight: '10px' }}>{item.voteNum}</span>
            <FaRegComment style={{ marginRight: '5px', fontSize: '20px' }} />
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
