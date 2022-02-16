import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const FriendProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 20px 0;
`;

const ProfileImg = styled.img`
  height: 40px;
  width: 40px;
  border: 3px black;
  border-radius: 70%;
  margin-right: 5px;
  margin-left: 10px;
`;

const ProfileName = styled.p`
  font-size: 20px;
  margin: auto 0 auto 20px;
`;
const FriendMenu = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;

export default function FriendItem({ follow }) {
  const history = useHistory();

  function clickProfile(ID) {
    window.location.replace(`/user/${ID}/profile`);
  }

  const profileImg = 'https://haejwoing.s3.ap-northeast-2.amazonaws.com/' + follow.image + '.jpg'

  return (
    <FriendProfile onClick={() => clickProfile(follow.id)}>
      {follow.image === '' ? (
        <ProfileImg src="/images/baseprofile.jpg" alt="기본이미지" />
      ) : (
        <ProfileImg src={profileImg} alt="" />
      )}
      <ProfileName>{follow.nickname}</ProfileName>
    </FriendProfile>
  );
}
