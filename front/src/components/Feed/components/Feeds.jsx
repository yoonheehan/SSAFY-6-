import React, {useState} from 'react';
import FeedItem from './FeedItem';
import {useHistory} from 'react-router-dom'

export default function Feeds({feedList, onRemove}) {
  const [feeds, setFeeds] = useState(feedList)


  return (
    <div>
        {feedList.map((feed, index) =>
            <FeedItem
              key={index}
              feed={feed}
              onRemove={onRemove}
            />
            )}
    </div>
  )
}
