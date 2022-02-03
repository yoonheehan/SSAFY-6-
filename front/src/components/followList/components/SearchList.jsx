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

const FriendList = styled.div`
`

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

export default function SearchList(props) {

    const firstFriendList = props.friendList

    const [findName, setFindName] = useState("");
    const [friendList, setFriendList] = useState(firstFriendList)


    function getFriend (event) {
        const findName = event.target.value
        setFindName(event.target.value)
        let result = firstFriendList.filter( data => {
            return data.name.includes(findName)
        })
        setFriendList(result)
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
                {friendList.length === 0 ? <div>일치하는 친구가 없습니다.</div> :
                friendList.map(follow => 
                    <FriendProfile>
                        {follow.profileImg === '' ? 
                        <ProfileImg src='/images/img_avatar.png' alt='기본이미지' /> : <ProfileImg src={follow.profileImg} alt={follow.profileImg} />}
                        <ProfileName>{follow.name}</ProfileName>
                        <FriendMenu>...</FriendMenu>
                    </FriendProfile>
                )}
            </FriendList>
        </SearchForm>
        </>
    );
}
