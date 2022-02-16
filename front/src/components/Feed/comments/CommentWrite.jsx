import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Comments from './Comments';
import axios from 'axios';
import './CommentItem.module.css';

const CommentForm = styled.form`
  width: 90%;
  margin: 5%;
  bottom: 0;
  position: fixed;
`;

const CommentInput = styled.input`
  width: 88%;
  border: none;
  border-bottom: 1px solid rgb(190, 190, 190);
`;

const SubmitBtn = styled.input`
  width: 10%;
  border: none;
  border-bottom: 1px solid rgb(190, 190, 190);
  background-color: white;
`;

function CommentWrite({ onClose, feed, commentsubmit, cntComment }) {
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState('');
  const myId = JSON.parse(sessionStorage.getItem('loginedUser')).userId;
  const [countComment, setCountComment] = useState()
  const jwtToken = JSON.parse(sessionStorage.getItem('loginedUser')).jwtToken;
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await axios({
          method: 'get',
          url: `http://i6c103.p.ssafy.io/api/comment/${feed.idboard}`,
          headers: {
            Authorization : 'Bearer ' + jwtToken,
          }
      })
      setComments(result.data);
      
    }
    fetchData();
  }, [count]);

  setTimeout(() => {
    async function fetchData() {
      const result = await axios({
          method: 'get',
          url: `http://i6c103.p.ssafy.io/api/comment/${feed.idboard}`,
          headers: {
            Authorization : 'Bearer ' + jwtToken,
          }
      })
      setComments(result.data);
    }
    fetchData();
  }, 1000);

  function getcomment(event) {
    const commentContent = event.target.value;
    setCommentContent(event.target.value);
  }

  function handleSubmit(event) {
    axios({
      method: 'post',
      url: `http://i6c103.p.ssafy.io/api/comment/save`,
      data: {
        content: commentContent,
        board_idboard: feed.idboard,
        user_id: myId,
      },
    headers: {
    Authorization : 'Bearer ' + jwtToken,
    }
    }).then(response => {});
      axios({
        method: 'get',
        url: `http://i6c103.p.ssafy.io/api/board/detail/${feed.idboard}`,
        headers: {
          Authorization : 'Bearer ' + jwtToken,
        }
      })
        .then(res => {
          setCountComment(res.data.commentNum + 1)
        })
        .catch(err => {});
    setCount(count + 1);
    setCommentContent('');
    event.preventDefault();
  }

  const onRemove = id => {
    setComments(comments.filter(comment => comment.idcomment !== id));
    axios({
      method: 'delete',
      url: `http://i6c103.p.ssafy.io/api/comment/delete/${id}`,
      params: {
        boardId: feed.idboard,
      },
      headers: {
        Authorization : 'Bearer ' + jwtToken,
      }
    }).then(response => {
      axios({
        method: 'get',
        url: `http://i6c103.p.ssafy.io/api/board/detail/${feed.idboard}`,
        headers: {
          Authorization : 'Bearer ' + jwtToken,
        }
      })
        .then(res => {
          setCountComment(res.data.commentNum)
        })
        .catch(err => {});
    });
  };

  return (
    <>
      <div>
        <div onClick={cntComment(countComment)} className="mt-2 mb-4" style={{ textAlign: 'right' }}>
          <i
            onClick={onClose}
            className="m-2 h4 bi bi-x-lg"
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
        <div className="comment_box">
          {comments ? (
            <Comments commentList={comments} onRemove={onRemove} />
          ) : (
            <div>로딩중입니다.</div>
          )}
        </div>
        <CommentForm onSubmit={handleSubmit}>
          <CommentInput
            type="text"
            placeholder="댓글 달기..."
            onChange={getcomment}
            name="comment"
            value={commentContent}
          />
          <SubmitBtn
            type="submit"
            value="작성"
            onClick={() => setCount(count + 1)}
          />
        </CommentForm>
      </div>
    </>
  );
}

export default CommentWrite;
