import React from 'react';
import styled from 'styled-components';
import Progressbar from './Progressbar'

const Base = styled.div`
  width: 90%;
  margin:0 5% 0 5%;
  
`

const Profile = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
`

const ProfileThumnail = styled.img`
  height: 45px;
  width:45px;
  border: 3px black;
  border-radius: 70%;
  margin-right: 5px;

`

const ProfileName = styled.h5`
  margin:0;
  font-size: 18px;
`

const WriteTime = styled.span`
  font-size: 13px;
`

const ContentContainer = styled.div`

`

const Content = styled.p`
  text-align: left;
`

const ContentImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const VersusWrapped = styled.div`
  background-color: rgba(100,100,100,0.4);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 15px;
  margin-bottom: 10px;
`

const VersusImg = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px;
`

const VersusLeft = styled.b`
  font-size: 30px;
`

const VersusRight = styled.b`
  font-size: 30px;
`


function ContentDetail(props) {
    return (
        <Base>
            <Profile>
                <ProfileThumnail src="../../../img/tmpProfile.jpg" alt="프로필사진"/>
                <div>
                    <ProfileName>{props.name}</ProfileName>
                    <WriteTime>13분 전</WriteTime>
                </div>
            </Profile>
            <ContentContainer>
                <Content>{props.content}</Content>
                <br />
                <ContentImg src="../../../img/1.jpg" alt="게시글이미지"/>
            </ContentContainer>
            <VersusWrapped>
                <VersusLeft>치킨</VersusLeft>
                <VersusImg src="../../../img/VsImg.png" />
                <VersusRight>피자</VersusRight>
            </VersusWrapped>
            <Progressbar 
            bgcolor="red" 
            bgcolor2="blue" 
            progress="30" 
            height={30}
            versus1='콜라' 
            versus2='피자' />
        </Base>
    )
}
export default ContentDetail