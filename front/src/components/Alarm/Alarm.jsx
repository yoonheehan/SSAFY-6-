import { React } from 'react';
import './Alarm.css';
import { useSelector, useDispatch } from 'react-redux';

const Alarm = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.length <= 0) {
    return (
      <>
        <h1 style={{ marginTop: '20px' }}>
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
          <div key={id} className="card my-2" style={{zIndex:-1}}>
            <div className="card-body" style={{zIndex:-1}}>
              <div className="d-flex align-items-center flex-row">
                <div>
                  <img src={img} alt="Avatar" className="avatar"></img>
                </div>
                <div className="px-1">{userName}</div>
                <div className="ms-auto">
                  <button
                    onClick={() => {
                      dispatch({ type: 'delete', id });
                    }}
                    type="button"
                    className="btn-close"
                  ></button>
                </div>
              </div>
              <div align="left">{content}</div>
            </div>
          </div>
        ))}
      </div>
      
    </>
  );
};

export default Alarm;
