import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FriendItem from './FriendItem';
import axios from 'axios';

const SearchForm = styled.form`
  width: 90%;
  margin: 0 5% 0 5%;
`;
const SearchDiv = styled.div`
  background-color: rgba(100, 100, 100, 0.4);
  width: 100%;
  padding-bottom: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const FriendList = styled.div``;
const FindForm = styled.form`
  width: 90%;
  margin: 5%;
`;

const FindInput = styled.input`
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
      url: `http://localhost:8080/user/find/${findName}`,
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
          <SubmitBtn type="submit" value="찾기" />
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
