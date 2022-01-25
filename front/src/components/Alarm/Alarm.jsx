import { React } from 'react'
import './Alarm.css';
import { useSelector, useDispatch } from 'react-redux'

const Alarm = () => {
	
	const state = useSelector( (state) => state )
	const dispatch = useDispatch()

	return (
		<>
			<br></br>
			<h1><b>알림</b></h1>
			<br></br>
			<h5 align="left" className="p-2"><b>새로운 알림</b></h5>
			{state.map(({id, img, userName, content}) => (
				<div key={id} className="card">
					<div className="card-body">
						<div className="d-flex align-items-center flex-row">
							<div>
								<img src={img} alt="Avatar" className="avatar"></img>
							</div>
							<div className="px-1">
								{userName}
							</div>
							<div className='ms-auto'>
								<button onClick={() => { dispatch({type: "delete", id}) }} type="button" className="btn-close"></button>
							</div>
						</div>
						<div align="left">
							{content}
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default Alarm