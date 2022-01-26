import React, {useState, useRef, useCallback} from "react"
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Accordion, Form, Button} from "react-bootstrap";
import styled from 'styled-components';
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
			<div className="container">
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
					<Accordion defaultActiveKey="0" flush className="mb-5">
						<Accordion.Item eventKey="0">
							<Accordion.Header>공개범위</Accordion.Header>
							<Accordion.Body>
								<div key="inline-radio" className="mb-3">
									<div className="mb-3" align="left">
										<Form.Check
											inline
											label=""
											name="group1"
											type="radio"
											id="inline-radio-1"
										/>
										전체공개
									</div>
									<div align="left">
										<Form.Check
											inline
											label=""
											name="group1"
											type="radio"
											id="inline-radio-2"
										/>
										친구공개
									</div>
								</div>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>

					<Accordion defaultActiveKey="0" flush>
						<Accordion.Item eventKey="0" className="mt-5">
							<Accordion.Header>투표</Accordion.Header>
							<Accordion.Body>
								<div>
									<form action="">
										<textarea className="textarea" name="" id="" cols="40" rows="5" placeholder="내용을 입력하세요"></textarea>
										<div className="d-flex flex-row">
											<div className="mx-2">
												<button type="button" className="btn btn-primary btn-sm" onClick={(event) => addEvent(event)}>
													<i class="bi bi-plus-lg"></i>
												</button>
											</div>
											<div>
												{votes.map((props) => (
													<div className="mb-2" key={props.id}>
														{props.value}
														<button type="button" className="m-1 btn btn-sm btn-danger" onClick={(event) => {removeEvent(event, props)}}>
															<i class="bi bi-x-lg"></i>
														</button>
													</div>
												))}
											</div>	
										</div>
									</form>
								</div>
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>OX</Accordion.Header>
							<Accordion.Body>
								<div>
									선택 1
								</div>
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="2">
							<Accordion.Header>VS</Accordion.Header>
							<Accordion.Body>
								<div>
									선택 1
								</div>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
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