import React, {
  Profiler,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import styled from 'styled-components';
import './CommentItem.module.css';
import axios from 'axios';

const CommentWrapped = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 5px;
`;

const ProfileThumnail = styled.img`
  height: 35px;
  width: 35px;
  border: 3px black;
  border-radius: 70%;
  margin-right: 5px;
  margin-top: 5px;
`;

const CommentDiv = styled.div`
  margin-left: 5px;
`;

const ProfileName = styled.div`
  margin-right: 8px;
  font-size: 15px;
  font-weight: bold;
`;

const WriteTime = styled.div`
  font-size: 12px;
`;

const CommentContent = styled.div`
  text-align: left;
  background-color: #dedee7;
  border-radius: 6px;
  padding: 7px;
`;

const CommentMenu = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;

const CommentLike = styled.div``;

const EditForm = styled.form`
  display: flex;
`;

const EditBox = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid black;
`;

const EditBtn = styled.input`
  border-bottom: 1px solid black;
  background-color: white;
`;

function CommentItem({ comment, onRemove }) {
  const myId = JSON.parse(sessionStorage.getItem('loginedUser')).userId;

  const [openEdit, setOpenEdit] = useState(false);

  const [selected, setSelected] = useState(false);

  const [editValue, setEditValue] = useState(comment.content);

  const [tempValue, setTempValue] = useState(editValue);

  const [likeUsers, setLikeUsers] = useState(
    comment.likeUserList.slice(1, comment.likeUserList.length - 1).split(',')
  );
  const [likeClick, setLikeClick] = useState(false);
  const [likeNum, setLikeNum] = useState('');

  const onChange = useCallback(e => {
    setTempValue(e.target.value);
    // setEditValue(e.target.value);
  }, []);

  const ref = useRef(null);
  useEffect(() => {
    if (comment.likeUserList === '' || comment.likeUserList === '[]') {
      setLikeNum(0);
    } else {
      setLikeUsers(
        comment.likeUserList
          .slice(1, comment.likeUserList.length - 1)
          .split(',')
      );
      if (likeUsers.includes(String(myId))) {
        setLikeClick(true);
        setLikeNum(likeUsers.length);
      } else {
        setLikeClick(false);
        setLikeNum(likeUsers.length);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (selected && ref.current && !ref.current.contains(event.target)) {
        setSelected(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selected]);

  function editButton(event) {
    setOpenEdit(true);
    event.preventDefault();
  }

  function handleSubmit(event) {
    setEditValue(tempValue);
    axios({
      method: 'put',
      url: `http://i6c103.p.ssafy.io/api/comment/update`,
      data: {
        content: tempValue,
        board_idboard: comment.board_idboard,
        idComment: comment.idcomment,
        user_id: myId,
      },
    }).then(response => {});
    setOpenEdit(false);
    event.preventDefault();
  }

  function handleCancel(event) {
    setTempValue(editValue);
    setOpenEdit(false);
  }
  const clickLike = data => {
    if (data.likeClick === false) {
      setLikeClick(true);
      setLikeNum(data.likeNum + 1);
    } else {
      setLikeClick(false);
      setLikeNum(data.likeNum - 1);
    }
  };

  function like() {
    axios({
      method: 'post',
      url: `http://i6c103.p.ssafy.io/api/comment/like`,
      data: {
        comment_idcomment: comment.idcomment,
        user_id: myId,
      },
    }).then(response => {});
  }

  const formatRelativeDate = date => {
    const TEN_SECOND = 10 * 1000;
    const A_MINUTE = 60 * 1000;
    const A_HOUR = 60 * A_MINUTE;
    const A_DAY = 24 * A_HOUR;

    const diff = Date.now() - date;

    if (diff < TEN_SECOND) return `방금 전`;
    if (diff < A_MINUTE) return `${Math.floor(diff / 1000)}초 전`;
    if (diff < A_HOUR) return `${Math.floor(diff / 1000 / 60)}분 전`;
    if (diff < A_DAY) return `${Math.floor(diff / 1000 / 60 / 60)}시간 전`;
    return new Intl.DateTimeFormat('ko-KR').format(date);
  };

  return (
    <>
      <div className="container mb-4">
        <CommentWrapped>
          <ProfileThumnail src="/images/baseprofile.jpg" alt="프로필사진" />
          <CommentDiv>
            <div style={{ textAlign: 'start' }}>
              <ProfileName>
                {comment.nickname}
                <WriteTime>
                  {formatRelativeDate(Date.parse(comment.created_at))}
                </WriteTime>
              </ProfileName>
            </div>
          </CommentDiv>
          <CommentLike onClick={() => clickLike({ likeClick, likeNum })}>
            {likeClick ? (
              <div onClick={like}>
                <i style={{ color: 'red' }} class="bi bi-heart-fill"></i>{' '}
                {likeNum}
              </div>
            ) : (
              <div onClick={like}>
                <i style={{ color: 'red' }} class="bi bi-heart"></i> {likeNum}
              </div>
            )}
          </CommentLike>
          {myId === comment.user_id ? (
            <CommentMenu>
              <div
                style={{ marginLeft: 'auto', cursor: 'pointer' }}
                ref={ref}
                onClick={() => setSelected(!selected)}
              >
                <i className="bi bi-three-dots-vertical"></i>
                <div className={selected ? 'feed_drop active' : 'feed_drop'}>
                  <div onClick={editButton}>수정</div>
                  <div onClick={() => onRemove(comment.idcomment)}>삭제</div>
                </div>
              </div>
            </CommentMenu>
          ) : null}
        </CommentWrapped>
        {!openEdit ? (
          <div style={{ display: 'flex', justifyContent: 'start' }}>
            <div className="comment_box">
              <CommentContent>{editValue}</CommentContent>
            </div>
          </div>
        ) : (
          <div>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div
                className="text-end text-secondary"
                style={{ cursor: 'pointer' }}
                onClick={handleCancel}
              >
                취소
              </div>
              <textarea
                type="text"
                value={tempValue}
                onChange={onChange}
                style={{ width: '100%', height: '100px' }}
              />
              <div>
                <EditBtn type="submit" value="수정"></EditBtn>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
export default CommentItem;
