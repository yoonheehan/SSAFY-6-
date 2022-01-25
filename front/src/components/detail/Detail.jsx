import React from 'react';
import ContentDetail from './components/ContentDetail';
import DetailHeader from './components/DeatilHeader'
import Comments from './components/Comments'
import CommentWrite from './components/CommentWrite'



export default function Detail() {
  return (
      <>
        <DetailHeader />
        <ContentDetail
          name='허영민'
          content='머가 맛있을까요 추천해주세요 #치킨#피자'
        />
        <CommentWrite />
      </>
  )
}
