import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const FriendProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 20px 0;
`;

const ProfileImg = styled.img`
  height: 45px;
  width: 45px;
  border: 3px black;
  border-radius: 70%;
  margin-right: 5px;
  margin-left: 10px;
`;

const ProfileName = styled.p`
  font-size: 25px;
  margin: auto 0 auto 20px;
`;
const FriendMenu = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;

export default function FriendItem({ follow }) {
  const history = useHistory();
  console.log(follow.id);
  console.log(JSON.parse(sessionStorage.getItem('loginedUser')).userId);

  function clickProfile(ID) {
    window.location.replace(`/user/${ID}/profile`);
  }

  return (
    <FriendProfile onClick={() => clickProfile(follow.id)}>
      {follow.profileImg === '' ? (
        <ProfileImg src="/images/img_avatar.png" alt="기본이미지" />
      ) : (
        <ProfileImg src={follow.image} alt={follow.image} />
      )}
      <ProfileName>{follow.nickname}</ProfileName>
    </FriendProfile>
  );
}
