import React from 'react';
import { Badge, Button, Card, Figure, ListGroup } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import styles from './postList.module.css';
import { MdHowToVote } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';

const PostItem = ({ post }) => {
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
      >
        <div className={styles.figure}>
          <img
            className={styles.img}
            src={
              'https://haejwoing.s3.ap-northeast-2.amazonaws.com/' +
              post.board_image +
              '.jpg'
            }
            alt=""
          />
        </div>
        <div className="ms-3 me-auto">
          <div className={styles.title}>
            <span style={{ marginRight: '5px' }}>
              [<span>{type}</span>]
            </span>
            {post.content}
          </div>
          <div style={{ textAlign: 'left' }}>
            <MdHowToVote />
            <span style={{ marginRight: '10px' }}>{post.vote_users}</span>
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
