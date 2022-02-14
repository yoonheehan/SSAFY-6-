import React, {useState, useEffect} from 'react';
import FeedItem from './FeedItem';
import {useHistory} from 'react-router-dom'

export default function Feeds({feedData, onRemove}) {
  const [feeds, setFeeds] = useState(feedData)

  useEffect(() => {
    setFeeds(feedData)
  }, [])

  return (
    <div>
        {feedData && feedData.map((feed, index) =>
            <FeedItem
              key={index}
              feed={feed}
              onRemove={onRemove}
            />
            )}
    </div>
  )
}
