import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

const ModalContent = styled.div`
  box-sizing: border-box;
  position: fixed;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  border-radius: 10px;
  width: 85%;
  max-width: 480px;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 20px 20px 20px;
  z-index: 1000;
`

const Header = styled.div`
  font-weight: bold;
  font-size: 20px;
`

const EditContent = styled.textarea`
  margin-top: 20px;
  width: 100%;
  height: 15em;
  border: 1px solid #bdcbdd;
  resize: none;
`
const Editbtn = styled.input`
  width: 100%;
  background-color: #4F7DDF;
  border-radius: 5px;
  border: 0.08rem solid #4F71DF;
  font-weight: bold;
  color: #ffffff;
`

// const Portal = props => {
//   return createPortal(props.children, document.getElementById('commentModal'));
// };

const FeedEditModal = ({onClose, content, EditFeed}) => {
  const [value, setValue] = useState(content)

  
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, [])

  function handleSubmit(event) {
    EditFeed(value)
    onClose()

    event.preventDefault()
}


  return (
    <ModalContent>
      <div style={{ textAlign: "right" }}>
        <i onClick={onClose} className="h5 bi bi-x-lg" style={{ cursor: 'pointer' }}></i> 
      </div>
      <div style={{borderBottom:'0.1rem solid #bdcbdd'}}>
        <Header>게시글 수정</Header>
      </div>
      <div></div>
      <form onSubmit={handleSubmit}>
        <EditContent 
          placeholder='내용을 입력해주세요.'
          type='text' 
          value={value} 
          onChange={onChange} />
        <Editbtn type='submit' value="수정"/>
      </form>
    </ModalContent>
  );
}

export default FeedEditModal