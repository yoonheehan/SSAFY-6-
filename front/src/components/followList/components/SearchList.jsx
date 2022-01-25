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
const firstFollowList = [
    {profileImg:'/2', name:'gd'},
    {profileImg:'/3', name:'gd3'},
    {profileImg:'/4', name:'gd5'},
]

export default function SearchList() {

    const [findName, setFindName] = useState("");
    const [followList, setFollowList] = useState(firstFollowList)

    function getFriend (event) {
        const findName = event.target.value
        setFindName(event.target.value)
        let result = firstFollowList.filter( data => {
            return data.name.includes(findName)
        })
        setFollowList(result)
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
                {followList.length === 0 ? <div>일치하는 친구가 없습니다.</div> :
                followList.map(follow => 
                    <FriendProfile>
                    <ProfileImg src='' alt={follow.profileImg} />
                    <ProfileName>{follow.name}</ProfileName>
                </FriendProfile>
                 )}
            </FriendList>
        </SearchForm>
        </>
    );
}
