import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Comments from './Comments'
import { createPortal } from 'react-dom';

const Modal = styled.div`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
    background-color: white;
    z-index: 1000;
`

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
    {id: 1, profilename: '홍길동', writetime: 3, content: '치킨좋아 사주세여 치킨좋아 사주세여치킨좋아 사주세여치킨좋아 사주세여치킨좋아 사주세여', commentUserId:1, likes:2, clickedLike: false },
    {id: 2, profilename: '홍길동', writetime: 5, content: 'ㄹㅇㅋㅋ',commentUserId:2 ,likes:1, clickedLike: true},
    {id: 3, profilename: '홍길동', writetime: 2, content: 'ㄹㅇㅋㅋ', commentUserId:3 ,likes:5, clickedLike: false},
]

const Portal = props => {
    return createPortal(props.children, document.getElementById('Modal'));
  };



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
            <Portal>
                <Modal>
                    <div onClick={onClose}>back</div>
                    <div>
                        <Comments 
                        commentList={comments} 
                        onRemove={onRemove} 
                        clickLike={clickLike}
                        />
                    </div>
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
                </Modal>
            </Portal>
        </>
  )
}

export default CommentWrite