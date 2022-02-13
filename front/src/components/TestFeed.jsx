import React,{useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'


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

export default function TestFeed() {
    const [boardId, setBoardId] = useState('')
    const [boardData, setBoardData] = useState('')
    const [commentData, setCommentData] = useState('')
    const [commentContent, setCommentContent] = useState("");
    const loginedId = JSON.parse(sessionStorage.getItem('loginedUser')).userId


    useEffect(() => {
        axios({
          method: 'get',
          url: `http://localhost:8080/board/72`,
          // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
        })
          .then(response => {
            console.log(response.data);
            setBoardId(response.data.idboard);
            console.log(response.data.vote_contents.split(' '))
            setBoardData(response.data.vote_contents.split(' '))
            console.log(response.data.vote_contents.split(' '))
          })
          .catch(error => {
            console.log('feed requset fail : ' + error);
          })
          .finally(() => {
            console.log('feed request end');
          });
        },[])


        

    const loadcomment = () =>{
    axios({
      method: 'get',
      url: `http://localhost:8080/comment/2`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
    })
      .then(response => {
        console.log('response : ' , response.data);
        setCommentData(response.data)
      })

    }

    
    function getcomment(event) {
        const commentContent = event.target.value
        setCommentContent(event.target.value)

    }
    console.log(loginedId, boardId)
    
    function handleSubmit(event) {
        // axios({
        //     method: 'put',
        //     url: `http://localhost:8080/board/${boardId}/comment/update`,
        //     data: {
        //         content : commentContent,
        //         board_idboard : boardId,
        //         idComment : 18,
        //         user_id: loginedId,
                
        //     }
        //   })
        //     .then(response => {
        //       console.log('수정완료');
        //     })
        axios({
            method: 'post',
            url: `http://localhost:8080/comment/save`,
            data: {
                content : commentContent,
                board_idboard : boardId,
                user_id : loginedId,
            }
          })
            .then(response => {
              console.log('작성완료');
            })
        setCommentContent('')
        event.preventDefault()
    }
    console.log(commentContent)

    const deletecomment = () => {
        axios({
            method: 'delete',
            url: `http://localhost:8080/comment/delete/18`,
          })
            .then(response => {
              console.log('삭제완료');
            })
    }

    

    return (
        <div style={{marginTop:'70px'}}>
            <div>test</div>
            <button onClick={() => loadcomment()}>댓글불러오기</button>
            <div>
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
              <button onClick={deletecomment}>삭제하기</button>
        </div>
  )
}
