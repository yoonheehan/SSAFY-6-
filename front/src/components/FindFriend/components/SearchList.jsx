import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FriendItem from './FriendItem';
import axios from 'axios';

const SearchForm = styled.form`
  width: 90%;
  margin: 0 5% 0 5%;
`;
const SearchDiv = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  padding-bottom: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
  border: rgb(89, 80, 255) solid 2px;
  border-radius: 10px;
`;

const FriendList = styled.div``;
const FindForm = styled.form`
  width: 90%;
  margin: 5%;
`;

const FindInput = styled.input`
  width: 88%;
  border: none;
  background-color:transparent;
  outline: none;
`;

const SubmitBtn = styled.input`
  width: 20%;
  border: none;
  background-color: transparent;
  font-weight: bold;
  color: white;
`;

export default function SearchList(props) {
  const [findName, setFindName] = useState('');
  const [friendList, setFriendList] = useState([]);
  console.log(findName);

  function getFriend(event) {
    setFindName(event.target.value);
  }
  function findFriendList(event) {
    axios({
      method: 'get',
      url: `http://i6c103.p.ssafy.io/api/user/find/${findName}`,
    }).then(response => {
      console.log('검색완료');
      console.log(response.data);
      setFriendList(response.data);
    });

    event.preventDefault();
  }
  console.log(friendList);

  return (
    <>
      <SearchForm onSubmit={findFriendList}>
        <SearchDiv>
          <FindInput
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={getFriend}
            name="comment"
            value={findName}
          />
          <SubmitBtn type="submit" value="" />
          <i style={{ position: "absolute", right: "5%", top: "5px", color: "rgb(89, 80, 255)" }} className="bi bi-search"></i>
        </SearchDiv>
        <FriendList>
          {!friendList || friendList.length === 0 ? (
            <div>일치하는 친구가 없습니다.</div>
          ) : (
            friendList &&
            friendList.map((follow, index) => (
              <FriendItem key={index} follow={follow} />
            ))
          )}
        </FriendList>
      </SearchForm>
    </>
  );
}
