import React, {useState} from 'react';
import styled from 'styled-components';

const SearchForm = styled.form`
    width: 90%;
    margin:0 5% 0 5%;
`
const SearchDiv = styled.div`
    background-color: rgba(100,100,100,0.4);
    width: 100%;
    padding-bottom: 4px;
    margin-bottom: 10px;
    margin-top: 10px;
`

const SearchBox = styled.input`
    width: 90%;
    border: none;
    border-bottom: 2px solid black;
    height: 40px;
    background-color: rgba(100,100,100,0);
`

const FriendList = styled.div``

const FriendProfile = styled.div`
    display: flex;
    align-items: center;
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
    margin-left: 20px;
`

export default function SearchList() {

    const [friendName, setFriendName] = useState("");

    function getFriend (event) {
        const friendName = event.target.value
        setFriendName(event.target.value)
        console.log(friendName)
    }

    return (
        <>
        <SearchForm>
            <SearchDiv>
                <SearchBox 
                placeholder='친구이름을 입력해주세요...'
                onChange={getFriend}
                />
            </SearchDiv>
            <FriendList>
                <FriendProfile>
                    <ProfileImg src="img/baseprofile.jpg" alt="프로필사진" />
                    <ProfileName>이름</ProfileName>
                </FriendProfile>
            </FriendList>
        </SearchForm>
        </>
    );
}
