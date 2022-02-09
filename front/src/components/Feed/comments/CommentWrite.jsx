import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Comments from './Comments'
import "./CommentItem.module.css"


const CommentForm = styled.form`
    width: 90%;
    margin: 5%;
    bottom: 0;
    position: fixed;
`

const CommentInput = styled.input`
    width: 88%;
    border: none;
    border-bottom: 1px solid rgb(190, 190, 190);
`

const SubmitBtn = styled.input`
    width: 10%;
    border: none;
    border-bottom: 1px solid rgb(190, 190, 190);
    background-color: white;
`

const CommentList = [
    {id: 1, profilename: '홍길동', writetime: 3, content: '치킨좋아 사주세여 치킨좋아 사주세여치킨좋아 사주세여치킨좋아 사주세여치킨좋아 사주세여', commentUserId:1, likes:2, clickedLike: false },
    {id: 2, profilename: '홍길동', writetime: 5, content: 'ㄹㅇㅋㅋ',commentUserId:2 ,likes:1, clickedLike: true},
    {id: 3, profilename: '홍길동', writetime: 2, content: 'ㄹㅇㅋㅋ', commentUserId:3 ,likes:5, clickedLike: false},
]

function CommentWrite({onClose}) {

    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState(CommentList)
    
    function getcomment(event) {
        const commentContent = event.target.value
        setCommentContent(event.target.value)

    }
    
    function handleSubmit(event) {
        const lastValue = comments[comments.length - 1].id
        setComments((prevComments) => [
            ...prevComments,
            {profilename: '허영민',id:(lastValue+1), writetime: 3, content:`${commentContent}`, likes:0, clickedLike:false, commentUserId:4}
        ])
        setCommentContent('')
        event.preventDefault()
    }

    const onRemove = (id) => {
        setComments(comments.filter(comment => comment.id !== id));
        
    };

    const clickLike = (id) => {

        if (comments[id-1].clickedLike === false) {
            setComments(
                comments.map(comment =>
                    comment.id === id  && comment.clickedLike === false ? {...comment, clickedLike: !comment.clickedLike, likes: comment.likes + 1} : comment)
            )
        } else {
            setComments(
                comments.map(comment =>
                    comment.id === id  && comment.clickedLike === true ? {...comment,clickedLike: !comment.clickedLike, likes: comment.likes - 1} : comment)
            )
        }
    }

    return (
        <>  
            <div>
                <div className="mt-2 mb-4" style={{ textAlign: "right" }}>
                    <i onClick={onClose} className="m-2 h4 bi bi-x-lg" style={{ cursor: 'pointer' }}></i>          
                </div>
                <div className="comment_box">
                    <Comments 
                    commentList={comments} 
                    onRemove={onRemove} 
                    clickLike={clickLike}
                    />
                </div>
                <CommentForm onSubmit={handleSubmit}>
                    <CommentInput 
                    type="text"
                    placeholder='댓글 달기...'
                    onChange={getcomment}
                    name='comment'
                    value={commentContent}
                    />
                    <SubmitBtn type='submit' value="작성" />
                </CommentForm>
            </div>
        </>
    )
}

export default CommentWrite