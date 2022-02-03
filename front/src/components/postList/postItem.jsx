import React from 'react';
import { Badge, Button, Card, Figure, ListGroup } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import styles from './postList.module.css';

const PostItem = ({ post }) => {
  return (
    <>
      <ListGroup.Item
        style={{ cursor: 'pointer' }}
        className="d-flex justify-content-between align-items-start"
      >
        <div className={styles.figure}>
          <img className={styles.img} src="/images/1.jpg" alt="" />
        </div>
        <div className="ms-3 me-auto">
          <div className={styles.title}>
            {post.title}{' '}
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
          <div>작성일 : {post.regDate}</div>
          <div>마감일 : {post.exDate}</div>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default PostItem;
