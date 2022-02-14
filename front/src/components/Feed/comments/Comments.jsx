import React, {useCallback, useState, useEffect} from 'react';
import CommentItem from './CommentItem'

export default function Comments({commentList, onRemove, clickLike}) {
  const handleClick = useCallback(() => {
      console.log('눌림')
    }, [])
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical : false,
  };

  return (
      <div >
        {commentList.map((comment, index) => 
        <CommentItem 
            key={index}
            comment={comment}
            onRemove={onRemove}
            onClick={handleClick}
            clickLike={clickLike}
        />)}
      </div>
  )
}
