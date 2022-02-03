import React, {useState, useRef, useCallback} from "react"
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import "./Post.css"


const Post = () => {
	// 
	const state = useSelector(state => state);
	const userData = state[0]
	//

	const inputPlus = () => {
		return (
			<input type="text" size="30" placeholder="투표항목을 입력하세요"></input>
		)
	}
	// {id: 1, value: inputPlus()}
	const [selected, setSelected] = useState(false)
	const [keySelected, setKeySelected] = useState(null)
	const [votes, setVote] = useState([{id: 0, value: inputPlus()}])
	const nextId = useRef(1)

	const addEvent = useCallback(
		(event) => {
			const vote = { id: nextId.current, value: inputPlus() }
			setVote(votes.concat(vote))
			nextId.current += 1
			event.preventDefault()
		},
		[votes]
		
	)

	const removeEvent = (event, props) => {
		setVote(votes.filter(item => item.id !== props.id))
		event.preventDefault()
	}

	return (
		<>
			<div className="container" style={{zIndex: '-100'}} >
				<div className="mb-5">
					<h1 style={{ marginTop: '20px' }}>
						<b>글작성</b>
					</h1>
				</div>
				<div className="mb-3 d-flex flex-row align-items-center">
					<div>
						<img src={userData.img} alt="Avatar" className="avatar"></img>
					</div>
					<div className="m-1">
						{userData.userName}
					</div>
				</div>
				<div>
					<div className="my_accordion">
						<div className={selected ? "title active" : "title"} onClick={() => setSelected(!selected)}>
							<div>공개범위</div>
							<div className={selected ? "chevron active" : "chevron"}><i className="h4 bi bi-chevron-down"></i></div>
						</div>
						<div className={selected ? 'content show' : 'content'}>
							<div className='content__radio'>
								<input
									type="radio"
									id="reveal_all"
									name="reveal_bounds"
									value="reveal_all"
								/>
								<label style={{marginLeft: "5px"}} for="reveal_all">전체공개</label>
							</div>
							<div className="content__radio">
								<input
									type="radio"
									id="reveal_friend"
									name="reveal_bounds"
									value="reveal_friend"
								/>
								<label style={{marginLeft: "5px"}} for="reveal_friend">친구공개</label>
							</div>
						</div>
					</div>
					<div className="mt-4">
						<div className="my_accordion"> 
							<div className={keySelected === '1' ? "title active" : "title"} onClick={() => setKeySelected("1")}>
								<div>투표</div>
								<div className={keySelected === '1' ? "chevron active" : "chevron"}><i className="h4 bi bi-chevron-down"></i></div>
							</div>
							<div className={keySelected === '1' ? "vote_content show" : "vote_content"}>
								<form action="">
									<textarea className="textarea" name="" id="" cols="40" rows="5" placeholder="내용을 입력하세요"></textarea>
									<div className="d-flex flex-row">
										<div className="mx-2">
											<button type="button" className="btn btn-primary btn-sm" onClick={(event) => addEvent(event)}>
												<i className="bi bi-plus-lg"></i>
											</button>
										</div>
										<div>
											{votes.map((props) => (
												<div className="mb-2" key={props.id}>
													{props.value}
													<button type="button" className="m-1 btn btn-sm btn-danger" onClick={(event) => {removeEvent(event, props)}}>
														<i className="bi bi-x-lg"></i>
													</button>
												</div>
											))}
										</div>	
									</div>
								</form>
							</div>
						</div>
						<div className="my_accordion">
							<div className={keySelected === '2' ? "title active" : "title"} onClick={() => setKeySelected("2")}>
								<div>OX</div>
								<div className={keySelected === '2' ? "chevron active" : "chevron"}><i className="h4 bi bi-chevron-down"></i></div>
							</div>
							<div className={keySelected === '2' ? "ox_content show" : "ox_content"}>
								test
							</div>
						</div>
						<div className="my_accordion">
							<div className={keySelected === '3' ? "title active" : "title"} onClick={() => setKeySelected("3")}>
								<div>VS</div>
								<div className={keySelected === '3' ? "chevron active" : "chevron"}><i className="h4 bi bi-chevron-down"></i></div>
							</div>
							<div className={keySelected === '3' ? "vs_content show" : "vs_content"}>
								test
							</div>
						</div>
					</div>				
				</div>
				<div className="mt-4" align="right">
					<form action="">
						<Button variant="primary">작성</Button>
					</form>
				</div>
			</div>
		</>
		
		
		

	)
}

export default Post