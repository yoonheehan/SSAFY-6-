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
`

const CommentDiv = styled.div`
  margin-left: 5px;
  width: 85%;
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


function CommentItem({profilename, writetime, content}) {


    return (
        <>
          <CommentWrapped>
            <ProfileThumnail src="../../../img/tmpprofile2.jpg" alt="프로필사진" />
                <CommentDiv>
                  <div style={{textAlign:'start'}}>
                    <ProfileName>{profilename}</ProfileName>
                  </div>
                  <div>
                    <CommentContent>{content}</CommentContent>
                  </div>
                </CommentDiv>
                    <WriteTime>{writetime}분 전</WriteTime>
          </CommentWrapped>
        </>
    )
}
export default CommentItem