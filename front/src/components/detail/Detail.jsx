import React from 'react';
import ContentDetail from './components/ContentDetail';
import CommentWrite from './components/CommentWrite'
import { useHistory } from 'react-router-dom';


export default function Detail() {
  const history = useHistory();
  if (localStorage.getItem('loginedUser') === null) {
    history.push('/')
  }
  return (
      <>
        <ContentDetail
          name='허영민'
          content='머가 맛있을까요 추천해주세요 #치킨#피자'
          selectType={1}
          imgUrl={'/images/i.jpg', '/images/2.png'}
        />
        <CommentWrite />
      </>
  )
}
