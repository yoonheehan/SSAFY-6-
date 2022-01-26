import React, {useState, useEffect, useCallback} from 'react';
import Feeds from './components/Feeds'



const FeedList = [
    {profilename: '홍길동', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/' },
    {profilename: '홍길동', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/' },
    {profilename: '홍길동', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/' },
]

const NewFeedList = [
    {profilename: '123', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/' },
    {profilename: '456', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/' },
    {profilename: '789', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/' },
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
            <Feeds feedList={feeds} />
        </div>
    )
}
