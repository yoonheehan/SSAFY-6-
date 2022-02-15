import React, { useCallback, useState, useEffect } from 'react';
import CommentItem from './CommentItem';

export default function Comments({ commentList, onRemove, clickLike }) {
  const handleClick = useCallback(() => {}, []);

  return (
    <div>
      {commentList.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onRemove={onRemove}
          onClick={handleClick}
          clickLike={clickLike}
        />
      ))}
    </div>
  );
}
