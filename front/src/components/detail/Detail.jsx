import React from 'react';
import ContentDetail from './components/ContentDetail';
import DetailHeader from './components/DeatilHeader'
import Comment from './components/Comment'
import CommentWrite from './components/CommentWrite'

export default function Detail() {
  return (
      <>
        <DetailHeader />
        <ContentDetail />
        <Comment />
        <CommentWrite />
      </>
  )
}
