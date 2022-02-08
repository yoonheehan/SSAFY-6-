import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './app.jsx';
import { Provider } from 'react-redux'
import { createStore } from 'redux'


const initialState = {
  loginedData: {
    isLogined: false,
    loginedId : -1,
  },
	alarmData: [
    { id: 0,
      img: 'images/img_avatar.png', 
      userName: '정정채',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare pharetra magna, sed ullamcorper magna finibus quis.'
    },
    { id: 1,
      img: 'images/img_avatar2.png', 
      userName: '정하나',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare pharetra magna, sed ullamcorper magna finibus quis.'
    },
    { id: 2,
      img: 'images/img_avatar.png', 
      userName: '정두울',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare pharetra magna, sed ullamcorper magna finibus quis.'
    },
  ] 
}

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT"


function reducers(state=initialState, action){
  switch (action.type) {
    case 'delete':
      state.alarmData = state.alarmData.filter((alarm) => alarm.id !== action.id)   

      return state
    case LOGIN:
      state.loginedData.isLogined = !state.loginedData.isLogined
      state.loginedData.loginedId = action.id
      return state
  }
  return state
}

let store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  
, document.getElementById('root')
);
