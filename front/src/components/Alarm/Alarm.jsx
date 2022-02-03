import { React } from 'react';
import './Alarm.css';
import { useSelector, useDispatch } from 'react-redux';

const Alarm = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.length <= 0) {
    return (
      <>
        <h1 style={{marginTop: 100}}>
          <b>알림</b>
        </h1>
        <br></br>
        <h5 align="left" className="p-2">
          <b>새로운 알림</b>
        </h5>
        <div>새로운 알림이 없습니다.</div>
      </>
    );
  }

  return (
    <>
      <div >
        <h1 style={{marginTop: 100}}>
          <b>알림</b>
        </h1>
        <br></br>
        <h5 align="left" className="p-2">
          <b>새로운 알림</b>
        </h5>

        {state.map(({ id, img, userName, content }) => (
          <>
            <div key={id}>
              <div className='box'>
                <div className='box_top'>
                  <div className='box_top'>
                    <div>
                      <img src={img} alt="Avatar" className="avatar"></img>
                    </div>
                    <div className="px-1">{userName}</div>
                  </div>
                  <div className="ms-auto">
                    <i className="h4 bi bi-x-lg"
                    onClick={() => {
                      dispatch({ type: 'delete', id });
                    }} style={{ cursor: 'pointer' }}></i>
                  </div>
                </div>
                <div className='box_content'>
                  {content}
                </div>
              </div>
            </div>
          </>
          
        ))}
      </div>
      
    </>
  );
};

export default Alarm;
