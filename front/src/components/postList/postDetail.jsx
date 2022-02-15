import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CommentWrite from '../Feed/comments/CommentWrite';
import DetailContent from '../Feed/components/DetailContent';
import FeedEditModal from '../Feed/components/FeedEditModal';
import ImgSlide from '../ImgSlide/ImgSlide';
import { useHistory, useParams } from 'react-router-dom';
import RemoveModal from '../Feed/components/RemoveModal';

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
`;

const PostDetail = props => {
  const history = useHistory();
  const userId = JSON.parse(sessionStorage.getItem('loginedUser')).userId;
  const [selected, setSelected] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [firstNickName, setFirstNickName] = useState(null);
  const [voteUsers, setVoteUsers] = useState(null);
  const [voteCompleted, setVoteCompleted] = useState(false);
  const [countAll, setCountAll] = useState(null);
  const [removeModal, setRemoveModal] = useState(false);
  const [feed, setFeed] = useState(null);
  const { idboard } = useParams();
  const [feedItem, setFeedItem] = useState(feed);

  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {
    axios.get(`http://i6c103.p.ssafy.io/api/board`).then(res => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].idboard == idboard) {
          setFeed(res.data[i]);
        }
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`http://i6c103.p.ssafy.io/api/user/${userId}`).then(res => {});
  });

  return (
    <>
      <FeedBox>
        <ProfileBox>
          <ProfileImg src={userData && userData.info.info.length > 0} />
        </ProfileBox>
      </FeedBox>
    </>
  );
};
export default PostDetail;
