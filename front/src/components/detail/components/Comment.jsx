import React from 'react';
import styled from 'styled-components';

const CommentWrapped = styled.div`
  width: 90%;
  margin:0 5% 0 5%;
  display: flex;
`

const ProfileThumnail = styled.img`
  height: 35px;
  width: 35px;
  border: 3px black;
  border-radius: 70%;
`

const CommentDiv = styled.div`
  margin-left: 5px;
`

const ProfileName = styled.b`
  margin-right: 20px;
  font-size: 15px;
` 

const WriteTime = styled.span`
  font-size: 12px;
`

const CommentContent = styled.p`
  margin: 0;
  text-align: left;
`

function Comment() {
    return (
        <>
          <CommentWrapped>
            <ProfileThumnail src="/images/tmpprofile2.jpg" alt="프로필사진" />
                <CommentDiv>
                    <ProfileName>김아무개</ProfileName>
                    <WriteTime>3분전</WriteTime>
                    <CommentContent>ㄹㅇㅋㅋ</CommentContent>
                </CommentDiv>
          </CommentWrapped>
        </>
    )
}
export default Comment