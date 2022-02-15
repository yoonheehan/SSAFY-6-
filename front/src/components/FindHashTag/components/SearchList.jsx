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
  background-color: rgba(100, 100, 100, 0.4);
  width: 100%;
  padding-bottom: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const HashTagList = styled.div``;

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

const SearchList = props => {
  const [findData, setFindData] = useState('');
  const [dataList, setDataList] = useState([]);

  const getData = e => {
    setFindData(e.target.value);
  };

  const findHashTagList = e => {
    axios
      .get(`http://localhost:8080/board/hashtagsearch/${findData}`)
      .then(res => {
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
        </SearchDiv>
        <HashTagList>
          {!dataList || dataList.length === 0 ? (
            <div>일치하는 글이 없어요</div>
          ) : (
            dataList &&
            dataList.map((item, index) => (
              <HashTagItem key={index} item={item} />
            ))
          )}
        </HashTagList>
      </SearchForm>
    </>
  );
};

export default SearchList;
