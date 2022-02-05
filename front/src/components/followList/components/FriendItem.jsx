import React, { useState, useRef, useEffect} from 'react';
import styled from 'styled-components';

const FriendProfile = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0 20px 0;
`

const ProfileImg = styled.img`
    height: 45px;
    width:45px;
    border: 3px black;
    border-radius: 70%;
    margin-right: 5px;
    margin-left: 10px;
`

const ProfileName = styled.p`
    font-size: 25px;
    margin: auto 0 auto 20px;
`
const FriendMenu = styled.div`
    margin-left: auto;
    margin-right: 10px;
`




export default function FriendItem({follow}) {

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
  
  const onFollow = true

  return (
    <FriendProfile>
        {follow.profileImg === '' ? 
        <ProfileImg src='/images/img_avatar.png' alt='기본이미지' /> : <ProfileImg src={follow.profileImg} alt={follow.profileImg} />}
        <ProfileName>{follow.name}</ProfileName>
        <FriendMenu>
          <div style={{marginLeft:'auto'}} ref={ref} style={{ cursor: "pointer" }} onClick={() => setSelected(!selected)}>
            <i className="bi bi-three-dots-vertical"></i>
            <div className={selected ? "feed_drop active" : "feed_drop" } style={{width:'100px'}}>
              {onFollow ?
                <div style={{}}>팔로워끊기</div> 
                :
                <div style={{}}>팔로워맺기</div>}
            </div>
          </div>
        </FriendMenu>
    </FriendProfile>
  )
}

