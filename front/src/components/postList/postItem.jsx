import React from 'react';
import { Badge, Button, Card, Figure, ListGroup } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import styles from './postList.module.css';
import { MdHowToVote } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { HiPencil } from 'react-icons/hi';
import { FcOvertime } from 'react-icons/fc';

const PostItem = ({ post }) => {
  const history = useHistory();
  const createDate = new Intl.DateTimeFormat('ko-KR').format(
    post.created_at * 1000
  );
  const dueDate = new Intl.DateTimeFormat('ko-KR').format(post.due_date * 1000);
  const [type, setType] = useState('투표');

  useEffect(() => {
    if (post.type === 1) {
      setType('투표');
    } else if (post.type === 2) {
      setType('대결');
    } else {
      setType('찬반');
    }
  }, []);

  return (
    <>
      <ListGroup.Item
        style={{ cursor: 'pointer', padding: "0.5rem 0.4rem 0.5rem 0.6rem" }}
        className="d-flex justify-content-between align-items-start"
        onClick={() => {
          history.push(`/testDetail/${post.idboard}`);
        }}
      >
        <div className={styles.figure}>
          {JSON.parse(post.board_image) == '' ? (
            <img
              className={styles.img}
              src="https://haejwoing.s3.ap-northeast-2.amazonaws.com/%EB%9A%9C%EC%9E%87.jpg.jpg"
              alt=""
            />
          ) : (
            <img
              className={styles.img}
              src={JSON.parse(post.board_image)[0]}
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
                width: '200px',
                display: 'inline-block',
                textAlign: 'left',
              }}
            >
              {post.content}
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
            <span style={{ marginRight: '10px' }}>{post.voteNum}</span>
            <FaRegComment style={{ marginRight: '5px', fontSize: '20px' }} />
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
          <div style={{ fontSize: "11px" }}><HiPencil/>{createDate}</div>
          <div style={{ fontSize: "11px" }}><FcOvertime/>{dueDate}</div>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default PostItem;
