import React, {Profiler, useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom'
import "./FeedItem.css"

const FeedBox = styled.div`
  border: 3px solid #d3d3d3;
  margin: 5px;
  margin-top: 20px;
`;

const ProfileBox = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 5px;
  align-items: center;
`;

const ProfileName = styled.div`
  margin-left: 5px;
  text-align: left;
  font-weight: bold;
`;

const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 70%;
`;

const WriteTime = styled.div`
    font-size: 12px;
    margin: auto 5px 0 auto;
`

const ContentImgBox = styled.div`
  width: 100%;
  text-align: end;
`;

const ContentBox = styled.div``;

const ContentImg = styled.img`
  width: inherit;
`;

const Content = styled.div`
    text-align: left;
    margin: 0 10px 10px 10px; 
`

const FeedMenu = styled.div`
  margin-left: auto;
  margin-right: 10px;
`


export default function FeedItem({feedimg, feedcontent, profileimg, profilename, writetime, feedUserId}) {
    const history = useHistory();
    const myId = 1
    const [selected, setSelected] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selected && ref.current && !ref.current.contains(event.target)) {
          setSelected(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
  
      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [selected])

    function onRenderCallback(
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions
      ) {
        console.log(`actualDuration(${id}:${actualDuration})`)
      }

  return (
      <Profiler id='profileItem' onRender={onRenderCallback} >
        <FeedBox>
            <ProfileBox>
            <ProfileImg src='/images/baseprofile.jpg' alt='프사' onClick={() => history.push('/profile')}/>
                <div>
                  <ProfileName onClick={() => history.push('/profile')}>{profilename}</ProfileName>
                  <WriteTime>{writetime}분 전</WriteTime>
                </div>
                {myId === feedUserId ? 
                  <FeedMenu>
                    <div style={{marginLeft:'auto'}} ref={ref} style={{ cursor: "pointer" }} onClick={() => setSelected(!selected)}>
                      <i className="bi bi-three-dots-vertical"></i>
                      <div className={selected ? "feed_drop active" : "feed_drop" }>
                        <div>글수정</div>
                        <div>글삭제</div>
                      </div>
                    </div>
                    </FeedMenu>
                  : null
                  }
            </ProfileBox>
            <hr />
            <ContentBox onClick={() => history.push('/feed/:id')}>
                <ContentImgBox>
                    <ContentImg src={feedimg} alt='글 사진' />
                </ContentImgBox>
                <hr />
                <Content>{feedcontent}</Content>
            </ContentBox>
        </FeedBox>
        </ Profiler>
  )
}
