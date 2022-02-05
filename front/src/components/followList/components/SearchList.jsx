import React, {useState} from 'react';
import styled from 'styled-components';
import FriendItem from './FriendItem';

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
                    <FriendItem 
                        follow={follow}
                    />
                )}
            </FriendList>
        </SearchForm>
        </>
    );
}
