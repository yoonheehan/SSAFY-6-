import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"
// import Alarm from "../Alarm/Alarm.jsx"

const NavBar = () => {
	return (
		<>
			<div>
				<nav className="navbar navbar-light bg-light">
					<div className="container-fluid">
						<img width="100px" height="auto" src="images/logo(2).png" alt="logo" />
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						
					</div>
				</nav>
				<div className="collapse " id="navbarToggleExternalContent">
					<div className="bg-light p-2">
						<i className="h1 px-4 bi bi-house-door-fill"></i>
						<i className="h1 px-4 bi bi-people-fill"></i>
						<i className="h1 px-4 bi bi-person-fill"></i>
						<Link to="/alarm"><i className="link h1 px-4 bi bi-bell-fill"></i></Link>
						<i data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" className="h1 px-4 bi bi-x-lg"></i>
					</div>
				</div>
			</div>
		</>
	)
}

export default NavBar