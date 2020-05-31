import React, { Component } from 'react';
import AuthService from '../services/auth.service';

export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser : AuthService.getCurrentUser()
		};
	}

	render() {
		const { currentUser } = this.state;

		return (
			<div className="container">
				<header className="jumbotron">
					<h3>
						<strong>{currentUser.username}</strong> Profile
					</h3>
				</header>
				<p style={{ color: 'aliceblue' }}>
					<strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
					{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
				</p>
				<p style={{ color: 'aliceblue' }}>
					<strong>Id:</strong> {currentUser.id}
				</p>
				<p style={{ color: 'aliceblue' }}>
					<strong>Email:</strong> {currentUser.email}
				</p>
				<p style={{ color: 'aliceblue' }}>
					<strong>Authorities:</strong>
					<ul>{currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}</ul>
				</p>
			</div>
		);
	}
}
