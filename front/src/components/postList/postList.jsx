import axios from 'axios';
import styles from './postList.module.css';
import React, { useEffect, useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import PostItem from './postItem';

const PostList = props => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [voteBedge, setVoteBedge] = useState(true);
  const [exDateBedge, setExDateBedge] = useState(true);
  const [commentBedge, setCommentBedge] = useState(true);
  const [redDateBedge, setRegDateBedge] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('loginedUser') === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    axios.get(`http://i6c103.p.ssafy.io/api/board/user/${id}`).then(res => {
      const temp = [];
      res.data.forEach(value => {
        temp.push(value);
      });
      setData(temp);
    });
  }, []);

  return (
    <>
      <h1 style={{ marginTop: '90px' }}>
        <b>글 작성 목록</b>
      </h1>
      <div className={styles.search}>
        {voteBedge ? (
          <Badge
            style={{ cursor: 'pointer', marginRight: '10px', fontSize: '15px' }}
            pill
            bg="secondary"
            onClick={() => {
              let newVote = [...data];
              newVote.sort((a, b) => b.voteNum - a.voteNum);
              setData(newVote);
              setVoteBedge(false);
            }}
          >
            #투표
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
              axios.get(`http://i6c103.p.ssafy.io/api/board/user/${id}`).then(res => {
                const temp = [];
                res.data.forEach(value => {
                  temp.push(value);
                });
                setData(temp);
              });
              setVoteBedge(true);
            }}
          >
            #투표
          </Badge>
        )}
        {commentBedge ? (
          <Badge
            style={{ cursor: 'pointer', marginRight: '10px', fontSize: '15px' }}
            pill
            bg="secondary"
            onClick={() => {
              let newComment = [...data];
              newComment.sort((a, b) => b.commentNum - a.commentNum);
              setData(newComment);
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
              axios.get(`http://i6c103.p.ssafy.io/api/board/user/${id}`).then(res => {
                const temp = [];
                res.data.forEach(value => {
                  temp.push(value);
                });
                setData(temp);
              });
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
              let newRegDate = [...data];
              newRegDate.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
              );
              setData(newRegDate);
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
              axios.get(`http://i6c103.p.ssafy.io/api/board/user/${id}`).then(res => {
                const temp = [];
                res.data.forEach(value => {
                  temp.push(value);
                });
                setData(temp);
              });
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
              let newExDate = [...data];
              newExDate.sort(
                (a, b) => new Date(b.due_date) - new Date(a.due_date)
              );
              setData(newExDate);
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
              axios.get(`http://i6c103.p.ssafy.io/api/board/user/${id}`).then(res => {
                const temp = [];
                res.data.forEach(value => {
                  temp.push(value);
                });
                setData(temp);
              });
              setExDateBedge(true);
            }}
          >
            #마감일
          </Badge>
        )}
      </div>
      <div className={styles.body}>
        <ListGroup as="ol" numbered>
          {data.map((item, index) => {
            return <PostItem key={index} post={data[index]} />;
          })}
        </ListGroup>
      </div>
    </>
  );
};

export default PostList;
