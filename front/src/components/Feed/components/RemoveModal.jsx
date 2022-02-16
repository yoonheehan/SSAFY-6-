import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CloseButton = styled.div`
    width: 50px;
    height: 28px;
    background-color: #d15b5b;
    margin: auto;
    color: white;
    border-radius: 10px;
`

const ModalContent = styled.div`
    box-sizing: border-box;
    position: fixed;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    background-color: #ffffff;
    border-radius: 10px;
    width: 85%;
    height: 130px;
    max-width: 480px;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 8px 20px 20px 20px;
    z-index: 1000;
`

const RemoveModal = ({onClose, onRemove, idboard}) => {
    return (
        <ModalContent>
            <i onClick={onClose} className="h4 bi bi-x-lg" style={{ cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }}></i>
            <div style={{ margin: "30px 0 20px 0" }}>선택한 글을 삭제할까요?</div>
            <CloseButton onClick={() => {onRemove(idboard); onClose();}}>삭제</CloseButton>

        </ModalContent>
    )
}

export default RemoveModal