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

const VersusO = styled.div`
  font-size: 50px;
  font-weight: bold;
`

const VersusX = styled.div`
  font-size: 50px;
  font-weight: bold;
`

const SelectWrapped = styled.div`
  margin: 10px auto 10px auto;
`
const Select = styled.select``

const SelectBtn = styled.button``

const SelectOption = styled.option``

function ContentDetail(props) {


    return (
        <Base>
            <Profile>
                <ProfileThumnail src="/images/tmpProfile.jpg" alt="프로필사진"/>
                <div>
                    <ProfileName>{props.name}</ProfileName>
                    <WriteTime>13분 전</WriteTime>
                </div>
            </Profile>
            <ContentContainer>
                <Content>{props.content}</Content>
                <br />
                <ContentImg src="/images/1.jpg" alt="게시글이미지"/>
            </ContentContainer>
            
            {props.selectType === 1 &&
              <div>
                <VersusWrapped>
                    <VersusLeft>치킨</VersusLeft>
                    <VersusImg src="/images/VsImg.png" />
                    <VersusRight>피자</VersusRight>
                </VersusWrapped>
                <Progressbar 
                bgcolor="red" 
                bgcolor2="blue" 
                progress="30" 
                height={30}
                versus1='콜라' 
                versus2='피자' />
              </div>
            }

            {props.selectType === 2 &&
              <div>
                <VersusWrapped>
                    <VersusO>O</VersusO>
                    <VersusImg src="/images/VsImg.png" />
                    <VersusX>X</VersusX>
                </VersusWrapped>
              </div>
            }

            {props.selectType === 3 &&
              <div>
                <SelectWrapped>
                  <Select>
                      <SelectOption value="">항목을 선택해주세요.</SelectOption>
                      <SelectOption value='치킨'>치킨</SelectOption>
                      <SelectOption value='피자'>피자</SelectOption>
                      <SelectOption value='짬뽕'>짬뽕</SelectOption>
                  </Select>
                  <SelectBtn>선택하기</SelectBtn>
                  <hr />
                </SelectWrapped>
              </div>
            }


        </Base>
    )
}
export default ContentDetail