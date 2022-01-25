import React, {useState} from 'react';
import Feeds from './components/Feeds'



const FeedList = [
    {profilename: '홍길동', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/' },
    {profilename: '홍길동', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/' },
    {profilename: '홍길동', profileimg:'/' , writetime: 3, feedcontent: 'ㄹㅇㅋㅋ', feedimg:'/' },
]

export default function Feed() {
    const [feeds, setFeeds] = useState(FeedList)

  return (
      <div>
          <Feeds feedList={feeds} />
      </div>
  )
}
