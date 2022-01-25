import React from 'react';
import styled from 'styled-components';


const FeedBox = styled.div`
  border: 3px solid #d3d3d3;
  margin: 5px;
`

const ProfileBox = styled.div`
    display: flex;
`

const ProfileName = styled.b`

    text-align: left;
`

const ProfileImg = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 70%;
`

const WriteTime = styled.div`
    font-size: 12px;
    margin: auto 0 0 auto;
`

const ContentImgBox = styled.div`
    width: 0.9rem;

`

const ContentBox = styled.div`
`

const ContentImg = styled.img`
    object-fit: contain;
`

const Content = styled.div`
`

export default function FeedItem({feedimg, feedcontent, profileimg, profilename, writetime}) {
  return (
      <FeedBox>
          <ProfileBox>
            <ProfileImg src='/images/baseprofile.jpg' alt='프사'/>
            <ProfileName>{profilename}</ProfileName>
            <WriteTime>{writetime}분 전</WriteTime>
          </ProfileBox>
          <hr />
          <ContentBox>
            <ContentImgBox>
                <ContentImg src='/images/1.jpg' alt='글 사진' />
            </ContentImgBox>
            <Content>{feedcontent}</Content>
          </ContentBox>
      </FeedBox>
  )
}
