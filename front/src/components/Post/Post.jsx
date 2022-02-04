import React, {useState, useRef, useCallback, useEffect} from "react"
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
	const [hashtag, setHashtag] = useState('')
	const [isErrored, setIsErrored] = useState(false)
	const [hashArr, setHashArr] = useState([])
	const [votes, setVote] = useState([{id: 0, value: inputPlus()}])
	const nextId = useRef(1)
	const ref = useRef(null)

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

	const changeHashtag = (event) => {
		return (
			setHashtag(event.target.value)
		)
	} 

	const inputHashtag = (event) => {
		if (event.keyCode === 13 || event.type === 'click') {
			setIsErrored(false)
			if (hashtag.length > 0) {
				if (hashArr.length <= 4) {
					if (hashArr.indexOf(event.target.value) === -1) {
						if (event.target.value.length <= 10) {
							return (
								setHashArr(oldArray => [...oldArray, hashtag]),
								setHashtag('')
							)
						} else {
							setIsErrored(true)
							console.log("최대 길이 10자")
						}
					} else {
						setIsErrored(true)
						console.log("중복됩니다")
					}
				} else {
					setIsErrored(true)
					console.log("최대 개수 5개")
				}
			}
		} 		
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isErrored && ref.current && !ref.current.contains(event.target)) {
				setIsErrored(false)
			}
		}
	
		document.addEventListener("mousedown", handleClickOutside)
	
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isErrored])

	const removeHashtag = (event, value) => {
		const tempArr = hashArr.filter(tag => tag !== value)
		return (
			setHashArr(tempArr)
		)
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
								<input type="file" />
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
				<div className="title mt-4">
					<div>#태그 입력</div>
				</div>
				<div className="hashtag_outer">
					{hashArr.map((value, key) => (
						<div key={key}>
							<div className="hashtag_inner">
								<div>{value}</div>
								<div 
									style={{marginLeft: '5px'}}
									className="hashtag_remove"
									onClick={(event) => removeHashtag(event, value)}
								>
									<i class="bi bi-x-lg"></i>
								</div>
							</div>
							
						</div>
					))}
				</div>
				<div className="input_area">
					<input
						type="text"
						value={hashtag}
						placeholder="해시태그를 입력하세요."
						onChange={changeHashtag}
						onKeyUp={inputHashtag}
						className="hashtag_input"
						autoFocus
					/>
					<button onClick={inputHashtag} className="input_button btn btn-primary btn-sm">+</button>
				</div>
				<div className={isErrored ? "bubble active" : "bubble"} ref={ref}>
					<ul style={{margin: 0}}>
						<li>태그의 길이는 10자 이하로 작성합니다.</li>
						<li>최대 5개의 태그를 입력할 수 있습니다.</li>
					</ul>
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