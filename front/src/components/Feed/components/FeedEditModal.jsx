import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 30%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 30px;
`

const EditContent = styled.textarea`
  margin-top: 20px;
  width: 95%;
  height: 15em;
  border: 1px solid gray;
  resize: none;
`
const Editbtn = styled.input`
`

const Portal = props => {
  return createPortal(props.children, document.getElementById('commentModal'));
};

const FeedEditModal = ({onClose, feed, EditFeed}) => {
  const [value, setValue] = useState(feed.feedcontent)


  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, [])

  function handleSubmit(event) {
    EditFeed(value)
    onClose()

    event.preventDefault()
}


  return (
      <Portal>
          <Background>
            <ModalContent>
              <div style={{borderBottom:'3px solid grey'}}>
                <Header>게시글 수정</Header>
              </div>
              <form onSubmit={handleSubmit}>
                <EditContent 
                  placeholder='내용을 입력해주세요.'
                  type='text' 
                  value={value} 
                  onChange={onChange} />
                <Editbtn type='submit' value="수정"/>
              </form>
            </ModalContent>
          </Background>
      </Portal>
  );
}

export default FeedEditModal