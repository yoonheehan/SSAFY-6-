import React, {useState} from 'react';

function CommentWrite() {
    const [commentContent, setCommentContent] = useState("");

    const [viewContent, setViewContent] = useState([]);


    const getcomment = e => {
        const{ name, value } = e.target;
        setCommentContent({
            ...commentContent,
            [name]:value
        })
        console.log(commentContent)
}
    return (
        <>
            <input 
            type="text"
            placeholder='댓글 달기...'
            onChange={getcomment}
            name='comment'
            />
            <button onClick={() => {
                setViewContent(viewContent.concat({...commentContent}))
            }}>입력</button>
        </>
  )
}

export default CommentWrite