import React, {useState} from 'react';
import styled from 'styled-components';

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

function CommentWrite() {

    const [commentContent, setCommentContent] = useState("");


    function getcomment(event) {
        const commentContent = event.target.value
        setCommentContent(event.target.value)
        console.log(commentContent)
    }
    
    function handleSubmit(event) {
        alert(`작성한 댓글 comment는 ${commentContent} 입니다.`)
        event.preventDefault()
    }

    return (
        <>
            <CommentForm onSubmit={handleSubmit}>
                <CommentBox 
                type="text"
                placeholder='댓글 달기...'
                onChange={getcomment}
                name='comment'
                />
                <SubmitBtn type='submit' value="작성" />
            </CommentForm>
        </>
  )
}

export default CommentWrite