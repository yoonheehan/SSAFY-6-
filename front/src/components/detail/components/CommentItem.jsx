import React, {Profiler, useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import "./CommentItem.module.css"

const CommentWrapped = styled.div`
  width: 90%;
  margin:0 5% 0 5%;
  display: flex;
  margin-bottom: 5px;
`

const ProfileThumnail = styled.img`
  height: 35px;
  width: 35px;
  border: 3px black;
  border-radius: 70%;
  margin-right: 5px;
  margin-top: 5px;
`

const CommentDiv = styled.div`
  margin-left: 5px;
`

const ProfileName = styled.div`
  margin-right: 20px;
  font-size: 15px;
  font-weight: bold;
` 

const WriteTime = styled.div`
  font-size: 12px;
`

const CommentContent = styled.div`
  text-align: left;
  white-space: pre-line;
  width: 90%;
  margin:0 5% 0 5%;
  margin-bottom: 5px;
  word-break: break-all;
`

const CommentMenu = styled.div`
  margin-left: auto;
  margin-right: 10px;
`
const CommentLike = styled.div`
  
`

function CommentItem({comment, onRemove, clickLike}) {
    const myId = 1;

    // const [commentItem, setCommentItem] = useState(comment)

    // const clickLike = (e) => {
    //   if (commentItem.clickedLike === true) {
    //     commentItem.clickedLike = false
    //     commentItem.likes -= 1
    //   } else {
    //     commentItem.clickedLike = true
    //     commentItem.likes += 1
    //   }
    //   setCommentItem(commentItem)
    //   console.log(commentItem)
    // }

    const [selected, setSelected] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selected && ref.current && !ref.current.contains(event.target)) {
          setSelected(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
  
      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [selected])

    return (
        <>
          <CommentWrapped>
            <ProfileThumnail src="/images/tmpprofile2.jpg" alt="프로필사진" />
                <CommentDiv>
                  <div style={{textAlign:'start'}}>
                    <ProfileName>
                      {comment.profilename}
                      <WriteTime>{comment.writetime}분 전</WriteTime>
                      </ProfileName>
                  </div>
                </CommentDiv>
                <CommentLike onClick={() => clickLike(comment.id)}>
                  {comment.clickedLike ? 
                  <div><i style={{color:'red'}} class="bi bi-heart-fill"></i> {comment.likes}</div>
                    : <div><i style={{color:'red'}} class="bi bi-heart"></i> {comment.likes}</div>
                }
                </CommentLike>
                  {myId === comment.commentUserId ? 
                    <CommentMenu>
                      <div style={{marginLeft:'auto'}} ref={ref} style={{ cursor: "pointer" }} onClick={() => setSelected(!selected)}>
                        <i className="bi bi-three-dots-vertical"></i>
                        <div className={selected ? "feed_drop active" : "feed_drop" }>
                          <div>댓글수정</div>
                          <div onClick={() => onRemove(comment.id)}>댓글삭제</div>
                        </div>
                      </div></CommentMenu> : null}
          </CommentWrapped>
            <CommentContent>{comment.content}</CommentContent>
        </>
    )
}
export default CommentItem