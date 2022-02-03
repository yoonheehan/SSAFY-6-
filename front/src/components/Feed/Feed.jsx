import React, {useState, useEffect, useCallback} from 'react';
import Feeds from './components/Feeds'



const FeedList = [
    {profilename: '허영민', profileimg:'/' , writetime: 3, feedcontent: 'ㅋㅋ치킨 피자 골라주세연', feedimg:'/images/1.jpg', feedUserId:1 },
    {profilename: '정정채', profileimg:'/' , writetime: 5, feedcontent: '오늘 머하지...? 추천좀...', feedimg:'/images/2.png', feedUserId:2 },
    {profilename: '채성원', profileimg:'/' , writetime: 10, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/', feedUserId:3 },
]

const NewFeedList = [
    {profilename: '123', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/', feedUserId:1 },
    {profilename: '456', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/', feedUserId:1 },
    {profilename: '789', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/', feedUserId:5 },
]

export default function Feed() {
    const [feeds, setFeeds] = useState(FeedList)

    const scrollEvent = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight -10) {

            // 데이터받고 피드추가
            // fetchdata() => newfeed
            
            setFeeds((prevFeed) => [
            ...prevFeed,
            ...NewFeedList
            ])


        }
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollEvent);
    },[scrollEvent]);

    return (
        <div>
            <div style={{marginTop:'75px'}}></div>
            <Feeds feedList={feeds} />
        </div>
    )
}
