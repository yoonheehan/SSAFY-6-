import React, {Profiler, useState, useRef, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import "./CommentItem.module.css"

const CommentWrapped = styled.div`
  width: 100%;
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
  margin-right: 8px;
  font-size: 15px;
  font-weight: bold;
` 

const WriteTime = styled.div`
  font-size: 12px;
`

const CommentContent = styled.div`
  text-align: left;
  background-color: #dedee7;
  border-radius: 6px;
  padding: 7px
`

const CommentMenu = styled.div`
  margin-left: auto;
  margin-right: 10px;
`

const CommentLike = styled.div`
  
`

const EditForm = styled.form`
    display: flex;
`

const EditBox = styled.input`
    width: 100%;
    border: none;
    border-bottom: 2px solid black;
`

const EditBtn = styled.input`
    border-bottom: 1px solid black;
    background-color: white;
`

function CommentItem({comment, onRemove, clickLike}) {
    const myId = 1;

    const [openEdit, setOpenEdit] = useState(false);

    const [selected, setSelected] = useState(false);

    const [editValue, setEditValue] = useState(comment.content)

    const [tempValue, setTempValue] = useState(editValue)

    const onChange = useCallback((e) => {
      setTempValue(e.target.value)
      // setEditValue(e.target.value);
    }, [])
    
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

    function editButton(event) {
      setOpenEdit(true)
      event.preventDefault()
    }

    function handleSubmit(event) {
      setEditValue(tempValue)
      setOpenEdit(false)
      event.preventDefault()
    }

    function handleCancel(event) {
      setTempValue(editValue)
      setOpenEdit(false)
    }

    return (
      <>
        <div className='container mb-4'>
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
                <div style={{marginLeft:'auto', cursor: "pointer"}} ref={ref} onClick={() => setSelected(!selected)}>
                  <i className="bi bi-three-dots-vertical"></i>
                  <div className={selected ? "feed_drop active" : "feed_drop" }>
                    <div onClick={editButton}>댓글수정</div>
                    <div onClick={() => onRemove(comment.id)}>댓글삭제</div>
                  </div>
                </div>
              </CommentMenu> : null
            }
          </CommentWrapped>
            {!openEdit ?
              <div style={{ display: "flex", justifyContent: "start"}}>
                <div className='comment_box'>
                  <CommentContent>{editValue}</CommentContent>
                </div>
              </div> : 
              <div>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                  <div className="text-end text-secondary" style={{ cursor: "pointer" }} onClick={handleCancel}>취소</div>
                  <textarea
                    type="text"
                    value={tempValue}
                    onChange={onChange}
                    style={{ width: "100%", height:"100px" }}
                  />
                  <div>
                    <EditBtn type='submit' value="수정"></EditBtn>
                  </div>
                </form>
              </div>
            }
        </div>
        
        
      </>
    )
}
export default CommentItem