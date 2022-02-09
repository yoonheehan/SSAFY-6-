import React, {useState, useEffect, useCallback} from 'react';
import Feeds from './components/Feeds'
import { useHistory } from 'react-router-dom';


const FeedList = [
    {id: 1, profilename: '허영민', profileimg:'/' , writetime: 3, feedcontent: 'ㅋㅋ치킨 피자 골라주세연', feedimg:['/images/1.jpg','/images/2.png'], feedUserId:1 },
    {id: 2, profilename: '정정채', profileimg:'/' , writetime: 5, feedcontent: '오늘 머하지...? 추천좀...', feedimg:['/images/2.png'], feedUserId:2 },
    {id: 453, profilename: '채성원', profileimg:'/' , writetime: 10, feedcontent: 'ㄹㅇㅋㅋ', feedimg:['/'], feedUserId:3 },
]

const NewFeedList = [
    {id: 25, profilename: '123', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:['/'], feedUserId:1 },
    {id: 23, profilename: '456', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:['/'], feedUserId:1 },
    {id: 27, profilename: '789', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:['/'], feedUserId:5 },
]

export default function Feed() {
    const history = useHistory();
    if (localStorage.getItem('loginedUser') === null) {
        history.push('/')
    }
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


    const onRemove = (id) => {
        setFeeds(feeds.filter(feed => feed.id !== id));
    
      };

    
    return (
        <div>
            <div style={{marginTop:'75px'}}></div>
            <Feeds feedList={feeds} onRemove={onRemove}/>
        </div>
    )
}
