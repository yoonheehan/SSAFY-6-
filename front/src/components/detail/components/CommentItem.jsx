import React from 'react';
import styled from 'styled-components';

const CommentWrapped = styled.div`
  width: 90%;
  margin:0 5% 0 5%;
  display: flex;
  margin-bottom: 5px;
`

const ProfileThumnail = styled.img`
  height: 35px;
  width: 35px;
  border: 3px black;
  border-radius: 70%;
  margin-right: 5px;
  margin-top: 5px;
`

const CommentDiv = styled.div`
  margin-left: 5px;
  width: 85%;
`

const ProfileName = styled.div`
  margin-right: 20px;
  font-size: 15px;
  font-weight: bold;
` 

const WriteTime = styled.div`
  font-size: 12px;
`

const CommentContent = styled.div`
  text-align: left;
  white-space: pre-line;
  width: 90%;
  margin:0 5% 0 5%;
  margin-bottom: 5px;
`


function CommentItem({profilename, writetime, content}) {


    return (
        <>
          <CommentWrapped>
            <ProfileThumnail src="/images/tmpprofile2.jpg" alt="프로필사진" />
                <CommentDiv>
                  <div style={{textAlign:'start'}}>
                    <ProfileName>{profilename}</ProfileName>
                    <WriteTime>{writetime}분 전</WriteTime>
                  </div>
                </CommentDiv>
          </CommentWrapped>
            <CommentContent>{content}</CommentContent>
        </>
    )
}
export default CommentItem