import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import './FeedItem.css';
import FeedEditModal from './FeedEditModal';
import ImgSlide from '../../ImgSlide/ImgSlide';
import CommentWrite from '../comments/CommentWrite';
import DetailContent from './DetailContent';
import RemoveModal from './RemoveModal';
import axios from 'axios'
import { FaRegComment } from 'react-icons/fa';
import { MdHowToVote } from 'react-icons/md';


const FeedBox = styled.div`
  border: 1px solid #bdcbdd;
  margin: 5px;
  margin-top: 20px;
`;

const ProfileBox = styled.div`
  display: flex;
  padding: 5px 5px 5px 5px;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
`;

const ProfileName = styled.div`
  margin-left: 5px;
  text-align: left;
  font-weight: bold;
`;

const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 70%;
`;

const WriteTime = styled.div`
  font-size: 12px;
  margin: auto 5px 0 auto;
`;

const ContentImgBox = styled.div`
  width: 100%;
  text-align: end;
  margin: 10px 0 10px 0;
`;

const ContentBox = styled.div``;

const ContentImg = styled.img`
  width: inherit;
`;

const Content = styled.div`
  text-align: left;
  padding: 5px 5px 5px 5px;
  text-align: left;
  white-space: pre-line;
  width: 90%;
  margin-bottom: 5px;
  word-break: break-all;
`;

const FeedMenu = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;

const HashCommentBox = styled.div`
  margin: 25px 10px 10px 10px;
`;

const HashTagBox = styled.div`
  display: flex;
`;
const HashTag = styled.div`
  margin-top: 5px;
  background: #ffb73b;
  border-radius: 56px;
  padding: 5px 9px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 0.9rem;
  line-height: 20px;
  margin-right: 5px;
`;

const Comments = styled.div`
  color: grey;
  display: flex;
  justify-content: end;
`;

const userName = [
  {id: 1, user_name: '정정채'},
  {id: 2, user_name: '채성원'},
  {id: 3, user_name: '허영민'},
]

export default function FeedItem({key, feed, onRemove}) {
    const history = useHistory();
    const myId = JSON.parse(sessionStorage.getItem('loginedUser')).userId
    const [selected, setSelected] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [commentModalOpen, setCommentModalOpen] = useState(false)
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [userData ,setUserData] = useState(null);
    const [firstNickName, setFirstNickName] = useState(null);
    const [voteUsers, setVoteUsers] = useState(null);
    const [voteCompleted, setVoteCompleted] = useState(false);
    const [countAll, setCountAll] = useState(null)
    const [removeModal, setRemoveModal] = useState(false)
    const [expiredVote, setExpiredVote] = useState()

    const ref = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)

    const [feedItem, setFeedItem] = useState(feed)
    
    const EditFeed = (content) => {
      // feedItem.feedcontent = content;
      feedItem.content = content
      setFeedItem(feedItem)
    }
    useEffect(() => {
      const ID = feed.userId
      
      if (Date.now() - feed.due_date * 1000 > 0) {
        setExpiredVote(true)
      } else {
        setExpiredVote(false)
      }

      const tempArray = []
      for (let i = 0; i < feed.vote_contents.length; i ++) {
        tempArray.push([])
      }
      axios({
        method: 'get',
        url: `http://i6c103.p.ssafy.io/api/user/${ID}`,
        // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
      }).then(response => {
        setFirstNickName(response.data.info.nickname)
      }
      )
      .catch(err => {
        console.log('에러났어요');
      })
      .finally(() => {
        console.log('profile request end');
      });

    axios({
      method: 'get',
      url: `http://i6c103.p.ssafy.io/api/board/getvoteusers/${feed.idboard}`,
    })
      .then(res => {


        if (res.data.userid.includes(myId)) {
          setVoteCompleted(true);
        }

        if (res.data.userid[0] === 0 && res.data.idx.length === 1) {
          setCountAll(0);
          setVoteUsers(tempArray);
        } else {
          for (let i = 0; i < res.data.idx.length; i++) {
            tempArray[res.data.idx[i]].push(res.data.userid[i]);
          }
          setCountAll(res.data.idx.length);
          setVoteUsers(tempArray);
        }
      })
      .catch(err => {
        console.log(err);
      });

    const handleClickOutside = event => {
      if (selected && ref.current && !ref.current.contains(event.target)) {
        setSelected(false);
      }
      if (modalIsOpen && ref2.current && !ref2.current.contains(event.target)) {
        setModalIsOpen(false);
      }

      if (removeModal && ref3.current && !ref3.current.contains(event.target)) {
        setRemoveModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selected, modalIsOpen]);

  const handleCommentClick = event => {
    setCommentModalOpen(!commentModalOpen);
    console.log(commentModalOpen);
  };

  const handleRemoveClick = event => {
    setRemoveModal(!removeModal);
  };

  const handleEditClick = event => {
    setModalIsOpen(!modalIsOpen);
  };

  const DetailModal = () => {
    setDetailModalOpen(!detailModalOpen);
  };

  const typeButton = type => {
    if (type === 1) {
      return (
        <div className="type_button" style={{ background: '#1b59cc' }}>
          투표
        </div>
      );
    } else if (type === 2) {
      return (
        <div className="type_button" style={{ background: '#6913b9' }}>
          대결
        </div>
      );
    } else if (type === 3) {
      return (
        <div className="type_button" style={{ background: '#bb18a0' }}>
          찬반
        </div>
      );
    }
  };

  const handleVoteContent = () => {
    setVoteCompleted(true);
  };

  const voteAllCount = (countAll) => {
    setCountAll(countAll)
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
      <FeedBox>
        <ProfileBox>
          <ProfileImg
            src={
              userData && userData.info.image.length > 0
                ? 'https://haejwoing.s3.ap-northeast-2.amazonaws.com/' +
                  userData.info.image
                : '/images/baseprofile.jpg'
            }
            alt="프사"
            onClick={() => history.push(`/user/${feed.userId}/profile`)}
          />
          <div>
            <ProfileName onClick={() => history.push(`/user/${feed.userId}/profile`)}>
              {firstNickName}
            </ProfileName>
            <WriteTime>{formatRelativeDate(feed.created_at * 1000)}</WriteTime>
          </div>
          {myId === feed.userId ? (
            <FeedMenu>
              <div
                style={{ marginLeft: 'auto', cursor: 'pointer' }}
                ref={ref}
                onClick={() => setSelected(!selected)}
              >
                <i className="bi bi-three-dots-vertical"></i>
                <div className={selected ? 'feed_drop active' : 'feed_drop'}>
                  <div onClick={handleEditClick}>글수정</div>
                  {/* <div onClick={() => onRemove(feed.id)}>글삭제</div> */}
                  <div onClick={() => setRemoveModal(true)}>글삭제</div>
                </div>
              </div>
            </FeedMenu>
          ) : null}
        </ProfileBox>
        <ContentBox>
          {/* <Content onClick={() => history.push(`/feed/${feed.id}`)}>{feed.feedcontent}</Content> */}
          <Content>
            {typeButton(feed.type)}
            {feed.content}
          </Content>
          {
            feed.due_date * 1000 - Date.now() < 0 && 
            <div style={{ color: "grey", fontWeight: "bold", fontSize: "1.2rem"}}>만료된 글입니다.</div>
          }

          {voteCompleted || feed.due_date * 1000 - Date.now() < 0 ? 
            <div>
              <i style={{ color: 'green', fontSize: "3rem" }} class="bi bi-check2-circle"></i>
              <div onClick={DetailModal} className="feed_button1">결과보기</div>
            </div>
           :
            <div>
              <div className="feed_button2" onClick={DetailModal}>참여하기</div>
            </div>
            
          }

          {/* <button onClick={DetailModal}>참여하기</button> */}
          <ContentImgBox>
            <ImgSlide imgUrl={feed.board_image} />
          </ContentImgBox>
        </ContentBox>
        <HashCommentBox>
          <div>
            <HashTagBox>
              {feed.hashArr &&
                feed.hashArr.map((hashTag, index) =>
                  <div key={index}>
                    <HashTag>{hashTag}</HashTag>
                  </div>
                )}
              </HashTagBox>
            </div>
            <div style={{ color: "grey" }}>
              <Comments>
                <div style={{ marginRight: "12px" }}><MdHowToVote/>{countAll}</div>
                <div onClick={handleCommentClick}><FaRegComment/>{feed.commentNum}</div>
              </Comments>
            </div>
          </HashCommentBox>
        </FeedBox>
        <div ref={ref2} className={modalIsOpen ? 'edit_drop active' : 'edit_drop'}>
          <FeedEditModal
            onClose={handleEditClick} 
            content={feed.content} 
            radio={feed.view_range}
            EditFeed={EditFeed}
            idboard={feed.idboard}
          />
      </div>

        <div className={detailModalOpen ? "detail_modal active" : "detail_modal"}>
          { voteUsers &&
            <DetailContent
              feed={feed}
              votes={voteUsers}
              onClose={DetailModal}
              completed={voteCompleted}
              amend={handleVoteContent}
              count={voteAllCount}
              expired={expiredVote}
            />
          }
        </div>

        <div className={commentModalOpen ? "comments_modal active" : "comments_modal"}>
          <CommentWrite
            onClose={handleCommentClick}
            feed={feed} 
          />
      </div>

      <div
        className={
          commentModalOpen ? 'comments_modal active' : 'comments_modal'
        }
      >
        <CommentWrite onClose={handleCommentClick} feed={feed} />
      </div>

      <div
        ref={ref3}
        className={removeModal ? 'edit_drop active' : 'edit_drop'}
      >
        <RemoveModal
          onClose={handleRemoveClick}
          onRemove={onRemove}
          idboard={feed.idboard}
        />
      </div>
    </>
  );
}
