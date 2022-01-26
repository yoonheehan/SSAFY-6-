import React from 'react';
import { Badge, Button, Card, Figure, ListGroup } from 'react-bootstrap';
import styles from './postList.module.css';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

const PostList = props => {
  return (
    <>
      <h1 style={{ marginTop: '20px' }}>
        <b>글 작성 목록</b>
      </h1>
      <div className={styles.search}>
        <Badge
          style={{ cursor: 'pointer', marginRight: '10px' }}
          pill
          bg="secondary"
        >
          #댓글수
        </Badge>
        <Badge
          style={{ cursor: 'pointer', marginRight: '10px' }}
          pill
          bg="secondary"
        >
          #좋아요
        </Badge>
        <Badge
          style={{ cursor: 'pointer', marginRight: '10px' }}
          pill
          bg="secondary"
        >
          #작성일
        </Badge>
        <Badge
          style={{ cursor: 'pointer', marginRight: '10px' }}
          pill
          bg="secondary"
        >
          #마감일
        </Badge>
      </div>
      <div className={styles.body}>
        <ListGroup as="ol" numbered>
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            className="d-flex justify-content-between align-items-start"
          >
            <div className={styles.figure}>
              <img className={styles.img} src="/images/1.jpg" alt="" />
            </div>
            <div className="ms-3 me-auto">
              <div className={styles.title}>치킨 VS 피자 골라주세요!!!</div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ marginRight: '10px' }}>
                  <FaRegComment /> <span>26</span>
                </span>
                <span>
                  <FcLike /> <span>9</span>
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
              <div>작성일 : 2022-01-26</div>
              <div>마감일 : 2022-01-27</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            className="d-flex justify-content-between align-items-start"
          >
            <div className={styles.figure}>
              <img className={styles.img} src="/images/해줘잉.png" alt="" />
            </div>
            <div className="ms-3 me-auto">
              <div className={styles.title}>해줘잉 이미지 골라주세요</div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ marginRight: '10px' }}>
                  <FaRegComment /> <span>15</span>
                </span>
                <span>
                  <FcLike /> <span>7</span>
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
              <div>작성일 : 2022-01-26</div>
              <div>마감일 : 2022-01-27</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            className="d-flex justify-content-between align-items-start"
          >
            <div className={styles.figure}>
              <img className={styles.img} src="/images/1.jpg" alt="" />
            </div>
            <div className="ms-3 me-auto">
              <div className={styles.title}>치킨 VS 피자 골라주세요!!!</div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ marginRight: '10px' }}>
                  <FaRegComment /> <span>26</span>
                </span>
                <span>
                  <FcLike /> <span>9</span>
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
              <div>작성일 : 2022-01-26</div>
              <div>마감일 : 2022-01-27</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            className="d-flex justify-content-between align-items-start"
          >
            <div className={styles.figure}>
              <img className={styles.img} src="/images/해줘잉.png" alt="" />
            </div>
            <div className="ms-3 me-auto">
              <div className={styles.title}>해줘잉 이미지 골라주세요</div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ marginRight: '10px' }}>
                  <FaRegComment /> <span>15</span>
                </span>
                <span>
                  <FcLike /> <span>7</span>
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
              <div>작성일 : 2022-01-26</div>
              <div>마감일 : 2022-01-27</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            className="d-flex justify-content-between align-items-start"
          >
            <div className={styles.figure}>
              <img className={styles.img} src="/images/1.jpg" alt="" />
            </div>
            <div className="ms-3 me-auto">
              <div className={styles.title}>치킨 VS 피자 골라주세요!!!</div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ marginRight: '10px' }}>
                  <FaRegComment /> <span>26</span>
                </span>
                <span>
                  <FcLike /> <span>9</span>
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
              <div>작성일 : 2022-01-26</div>
              <div>마감일 : 2022-01-27</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            className="d-flex justify-content-between align-items-start"
          >
            <div className={styles.figure}>
              <img className={styles.img} src="/images/해줘잉.png" alt="" />
            </div>
            <div className="ms-3 me-auto">
              <div className={styles.title}>해줘잉 이미지 골라주세요</div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ marginRight: '10px' }}>
                  <FaRegComment /> <span>15</span>
                </span>
                <span>
                  <FcLike /> <span>7</span>
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
              <div>작성일 : 2022-01-26</div>
              <div>마감일 : 2022-01-27</div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default PostList;
