import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import HashTagItem from './HashTagItem';

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
const HashTagList = styled.div``;

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

const SearchList = props => {
  const [findData, setFindData] = useState('');
  const [dataList, setDataList] = useState([]);
  const jwtToken = JSON.parse(sessionStorage.getItem('loginedUser')).jwtToken;
  const getData = e => {
    setFindData(e.target.value);
  };

  const findHashTagList = e => {
    axios({
      method: 'get',
      url: `http://i6c103.p.ssafy.io/api/board/hashtagsearch/${findData}`,
      headers: {
        Authorization : 'Bearer ' + jwtToken,
      }
    }).then(res => {
        setDataList(res.data);
      });
    e.preventDefault();
  };

  return (
    <>
      <SearchForm onSubmit={findHashTagList}>
        <SearchDiv>
          <FindInput
            type="text"
            placeholder="해시태그를 입력해주세요."
            onChange={getData}
            name="comment"
            value={findData}
          />
          <SubmitBtn type="submit" value="찾기" />
          <i style={{ position: "absolute", right: "5%", top: "5px", color: "rgb(89, 80, 255)" }} className="bi bi-search"></i>
        </SearchDiv>
        <HashTagList>
          {!dataList || dataList.length === 0 ? (
            <div>일치하는 글이 없어요</div>
          ) : (
            dataList &&
            dataList.map((item, index) => (
              item !== null && <HashTagItem key={index} item={item} />
            ))
          )}
        </HashTagList>
      </SearchForm>
    </>
  );
};

export default SearchList;
