import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Comments from './Comments'
import axios from 'axios'
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



function CommentWrite({onClose, feed}) {
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState('')
    
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/comment/${feed.idboard}`,
            // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
          })
            .then(response => {
              console.log('response : ' , response.data);
              setComments(response.data)
            })
    },[])

    function getcomment(event) {
        const commentContent = event.target.value
        setCommentContent(event.target.value)

    }
    
    function handleSubmit(event) {
        console.log(commentContent)
        axios({
            method: 'post',
            url: `http://localhost:8080/comment/save`,
            data: {
                content : commentContent,
                board_idboard : feed.idboard,
                user_id : feed.userId,
            }
          })
            .then(response => {
              console.log('작성완료');
            })

        event.preventDefault()
    }

    const onRemove = (id) => {
        setComments(comments.filter(comment => comment.idcomment !== id));
        axios({
            method: 'delete',
            url: `http://localhost:8080/comment/delete/${id}`,
            params: {
                boardId: feed.idboard,
            }
          })
            .then(response => {
              console.log('삭제완료');
            })
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
                    {comments ? 
                    <Comments 
                    commentList={comments} 
                    onRemove={onRemove} 
                    clickLike={clickLike}
                    />
                    :
                    <div>로딩중입니다.</div>
                }
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