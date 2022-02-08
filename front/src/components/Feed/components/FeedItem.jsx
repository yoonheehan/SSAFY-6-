import React, {Profiler, useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom'
import "./FeedItem.css"
import FeedEditModal from './FeedEditModal'; 
import ImgSlide from '../../ImgSlide/ImgSlide';
import CommentWrite from '../comments/CommentWrite';

const FeedBox = styled.div`
  border: 3px solid #d3d3d3;
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
`

const ContentImgBox = styled.div`
  width: 100%;
  text-align: end;
  margin : 10px 0 10px 0;
`;

const ContentBox = styled.div`
  
`;

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

`

const FeedMenu = styled.div`
  margin-left: auto;
  margin-right: 10px;
`

const HashCommentBox = styled.div`
  margin: 25px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
`

const HashTagBox = styled.div`
`
const HashTag = styled.div`
  background-color: yellow;
  border-radius: 30%;
`

const Comments = styled.div`
  color: grey;
`

export default function FeedItem({feed, onRemove}) {
    const history = useHistory();
    const myId = 1
    const [selected, setSelected] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [commentModalOpen, setCommentModalOpen] = useState(false)

    const ref = useRef(null)

    const [feedItem, setFeedItem] = useState(feed)

    const EditFeed = (content) => {
      feedItem.feedcontent = content;
      setFeedItem(feedItem)
    }

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selected && ref.current && !ref.current.contains(event.target)) {
          setSelected(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
  
      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [selected])

    const handleCommentClick = (event) => {
      setCommentModalOpen(!commentModalOpen)
      console.log(commentModalOpen)
    }

    const handleEditClick = (event) => {
      setModalIsOpen(!modalIsOpen)
    }

    function onRenderCallback(
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions
      ) {
        console.log(`actualDuration(${id}:${actualDuration})`)
      }

  return (
      <Profiler id='profileItem' onRender={onRenderCallback} >
        <FeedBox>
          <ProfileBox>
          <ProfileImg src='/images/baseprofile.jpg' alt='프사' onClick={() => history.push('/profile')}/>
              <div>
                <ProfileName onClick={() => history.push('/profile')}>{feed.profilename}</ProfileName>
                <WriteTime>{feed.writetime}분 전</WriteTime>
              </div>
              {myId === feed.feedUserId ? 
                <FeedMenu>
                  <div style={{marginLeft:'auto'}} ref={ref} style={{ cursor: "pointer" }} onClick={() => setSelected(!selected)}>
                    <i className="bi bi-three-dots-vertical"></i>
                    <div className={selected ? "feed_drop active" : "feed_drop" }>
                      <div onClick={handleEditClick}>글수정</div>
                      <div onClick={() => onRemove(feed.id)}>글삭제</div>
                    </div>
                  </div>
                  </FeedMenu>
                : null
                }
          </ProfileBox>
          <ContentBox>
              <Content onClick={() => history.push(`/feed/${feed.id}`)}>{feed.feedcontent}</Content>
              <ContentImgBox>
                <ImgSlide imgUrl={feed.feedimg}/>
                {/* <ContentImg src={feed.feedimg} alt='글 사진' /> */}
              </ContentImgBox>
          </ContentBox>
          <HashCommentBox>
            <HashTagBox>
              <HashTag>gd</HashTag>
            </HashTagBox>
            <Comments onClick={handleCommentClick}>22개</Comments>
          </HashCommentBox>
        </FeedBox>
        {modalIsOpen && <FeedEditModal 
        onClose={handleEditClick} 
        feed={feed} 
        EditFeed={EditFeed}
        />}
        {commentModalOpen && <CommentWrite 
        onClose={handleCommentClick} 
        feed={feed} 
        EditFeed={EditFeed}
        />}
        </ Profiler>
  )
}
