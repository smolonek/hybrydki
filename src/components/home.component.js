import React, { Component } from 'react';

import UserService from '../services/user.service';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content : ''
		};
	}

	componentDidMount() {
		if (localStorage.user) {
			UserService.getPublicContent().then(
				(response) => {
					this.setState({
						content : response.data
					});
					console.log(response.data);
					console.log(this.state.content[1].title);
				},
				(error) => {
					this.setState({
						content : (error.response && error.response.data) || error.message || error.toString()
					});
				}
			);
		}
	}

	render() {
		return (
			<div className="container">
				<header className="jumbotron">
					<h3 />
				</header>
			</div>
		);
	}
}
