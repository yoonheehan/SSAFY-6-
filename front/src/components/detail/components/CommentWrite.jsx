import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Comments from './Comments'

const CommentForm = styled.form`
    width: 90%;
    margin:0 5% 0 5%;
`

const CommentBox = styled.input`
    width: 88%;
    border: none;
    border-bottom: 2px solid black;
`

const SubmitBtn = styled.input`
    width: 10%;
    border: none;
    border-bottom: 2px solid black;
    background-color: white;
`

const CommentList = [
    {profilename: '홍길동', writetime: 3, content: 'ㄹㅇㅋㅋ' },
]

function CommentWrite() {

    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState(CommentList)

    function getcomment(event) {
        const commentContent = event.target.value
        setCommentContent(event.target.value)
        console.log(commentContent)
    }
    
    function handleSubmit(event) {
        setComments((prevComments) => [
            ...prevComments,
            {profilename: '허영민', writetime: 3, content:`${commentContent}`}
        ])
        setCommentContent('')
        event.preventDefault()
    }

    return (
        <>
            <Comments commentList={comments} />
            <br />
            <CommentForm onSubmit={handleSubmit}>
                <CommentBox 
                type="text"
                placeholder='댓글 달기...'
                onChange={getcomment}
                name='comment'
                value={commentContent}
                />
                <SubmitBtn type='submit' value="작성" />
            </CommentForm>
            <br />
        </>
  )
}

export default CommentWrite