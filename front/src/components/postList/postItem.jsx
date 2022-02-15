import React from 'react';
import { Badge, Button, Card, Figure, ListGroup } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import styles from './postList.module.css';
import { MdHowToVote } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const PostItem = ({ post }) => {
  const history = useHistory();
  const createDate = new Intl.DateTimeFormat('ko-KR').format(
    post.created_at * 1000
  );
  const dueDate = new Intl.DateTimeFormat('ko-KR').format(post.due_date * 1000);
  const [type, setType] = useState('투표');

  useEffect(() => {
    if (post.type === 1) {
      console.log(post.type);
      setType('투표');
    } else if (post.type === 2) {
      console.log('type 2');
      setType('OX');
    } else {
      console.log('type 3');
      setType('VS');
    }
  }, []);

  return (
    <>
      <ListGroup.Item
        style={{ cursor: 'pointer' }}
        className="d-flex justify-content-between align-items-start"
        onClick={() => {
          history.push(`/testDetail/${post.idboard}`);
        }}
      >
        <div className={styles.figure}>
          <img
            className={styles.img}
            src={JSON.parse(post.board_image)}
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
              {post.content}
            </span>
          </div>

          <div style={{ textAlign: 'left' }}>
            <MdHowToVote />
            <span style={{ marginRight: '10px' }}>{post.voteNum}</span>
            <FaRegComment />
            <span style={{ marginRight: '10px' }}>{post.commentNum}</span>
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

export default PostItem;
