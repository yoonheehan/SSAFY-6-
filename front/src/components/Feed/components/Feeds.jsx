import React from 'react';
import FeedItem from './FeedItem';
import {useHistory} from 'react-router-dom'

export default function Feeds({feedList}) {

  return (
    <div>
        {feedList.map((feed, index) =>
            <FeedItem
              key={index}
              feedimg={feed.feedimg}
              feedcontent={feed.feedcontent}
              profileimg={feed.profileimg}
              profilename={feed.profilename}
              writetime={feed.writetime}
              feedUserId={feed.feedUserId}
            />
            )}
    </div>
  )
}
