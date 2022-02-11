import React from 'react';
import { Badge, Button, Card, Figure, ListGroup } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import styles from './postList.module.css';

const PostItem = ({ post }) => {
  const createDate = new Intl.DateTimeFormat('ko-KR').format(post.created_at);
  const dueDate = new Intl.DateTimeFormat('ko-KR').format(post.due_date);
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
            {post.content}
            <span style={{ marginRight: '10px' }}>
              <FaRegComment /> <span>{post.comments}</span>
            </span>
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
