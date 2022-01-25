import React from 'react';
import FeedItem from './FeedItem';

export default function Feeds({feedList}) {
    // const handleClick = (props) => {
    //     return <Link to={`/feed/${props}`}></Link>
    // }


  return (
    <div>
        {feedList.map(feed =>
            <FeedItem
                key={feed.id}
                feedimg={feed.feedimg}
                feedcontent={feed.feedcontent}
                profileimg={feed.profileimg}
                profilename={feed.profilename}
                writetime={feed.writetime}
                // onClick={handleClick}
                />
            )}
    </div>
  )
}
