import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './app.jsx';
import { Provider } from 'react-redux'
import { createStore } from 'redux'


const initState = {
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


function reducer(state=initState.alarmData, action){
  if (action.type === "delete") {
    state = state.filter((alarm) => alarm.id !== action.id)   
    return state
  } else {
    return state
  }
}

let store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  
, document.getElementById('root')
);
