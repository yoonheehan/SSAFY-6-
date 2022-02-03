import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Figure, ListGroup } from 'react-bootstrap';
import styles from './postList.module.css';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import Data from './data.js';
import PostItem from './postItem';

const NewPostList = [
  {
    id: 5,
    title: '제목3 테스트입니다.',
    comments: 0,
    like: 0,
    regDate: '2022-01-26',
    exDate: '2022-01-27',
  },
  {
    id: 6,
    title: '제목3 테스트입니다.',
    comments: 0,
    like: 0,
    regDate: '2022-01-26',
    exDate: '2022-01-27',
  },
  {
    id: 7,
    title: '제목3 테스트입니다.',
    comments: 0,
    like: 0,
    regDate: '2022-01-26',
    exDate: '2022-01-27',
  },
];

const PostList = props => {
  let [post, setPost] = useState([...Data]);
  let [commentBedge, setCommentBedge] = useState(true);
  let [redDateBedge, setRegDateBedge] = useState(true);
  let [exDateBedge, setExDateBedge] = useState(true);

  const scrollEvent = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // 데이터받고 피드추가
      // fetchdata() => newfeed

      setPost(prevPost => [...prevPost, ...NewPostList]);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
  }, [scrollEvent]);

  return (
    <>
      <h1 style={{ marginTop: '90px' }}>
        <b>글 작성 목록</b>
      </h1>
      <div className={styles.search}>
        {commentBedge ? (
          <Badge
            style={{ cursor: 'pointer', marginRight: '10px', fontSize: '15px' }}
            pill
            bg="secondary"
            onClick={() => {
              let newComment = [...post];
              newComment.sort((a, b) => b.comments - a.comments);
              setPost(newComment);
              setCommentBedge(false);
            }}
          >
            #댓글
          </Badge>
        ) : (
          <Badge
            style={{
              cursor: 'pointer',
              marginRight: '10px',
              fontSize: '15px',
            }}
            pill
            bg="dark"
            onClick={() => {
              console.log('새로운 데이터');
              setCommentBedge(true);
            }}
          >
            #댓글
          </Badge>
        )}
        {redDateBedge ? (
          <Badge
            style={{ cursor: 'pointer', marginRight: '10px', fontSize: '15px' }}
            pill
            bg="secondary"
            onClick={() => {
              let newRegDate = [...post];
              newRegDate.sort(
                (a, b) => new Date(b.regDate) - new Date(a.regDate)
              );
              setPost(newRegDate);
              setRegDateBedge(false);
            }}
          >
            #작성일
          </Badge>
        ) : (
          <Badge
            style={{
              cursor: 'pointer',
              marginRight: '10px',
              fontSize: '15px',
            }}
            pill
            bg="dark"
            onClick={() => {
              console.log('새로운 데이터');
              setRegDateBedge(true);
            }}
          >
            #작성일
          </Badge>
        )}
        {exDateBedge ? (
          <Badge
            style={{ cursor: 'pointer', marginRight: '10px', fontSize: '15px' }}
            pill
            bg="secondary"
            onClick={() => {
              let newExDate = [...post];
              newExDate.sort((a, b) => new Date(b.exDate) - new Date(a.exDate));
              setPost(newExDate);
              setExDateBedge(false);
            }}
          >
            #마감일
          </Badge>
        ) : (
          <Badge
            style={{
              cursor: 'pointer',
              marginRight: '10px',
              fontSize: '15px',
            }}
            pill
            bg="dark"
            onClick={() => {
              console.log('새로운 데이터');
              setExDateBedge(true);
            }}
          >
            #마감일
          </Badge>
        )}
      </div>
      <div className={styles.body}>
        <ListGroup as="ol" numbered>
          {post.map((data, index) => {
            return <PostItem key={data.id} post={post[index]} />;
          })}
        </ListGroup>
      </div>
    </>
  );
};

export default PostList;
