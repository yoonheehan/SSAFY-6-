import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const RemoveModal = ({onClose, onRemove, idboard}) => {
    return (
        <ModalContent>
            <button onClick={onClose}>x</button>
            <button onClick={() => {onRemove(idboard)}}>삭제</button>
        </ModalContent>
    )
}

export default RemoveModal