import React, { Component } from 'react';
import styles from './admin.module.css';
import UserService from '../services/user.service';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FilterResults from 'react-filter-search';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors/green';
import $ from 'jquery';
export default class BoardAdmin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authorsAPI   : [],
			content      : 'asd',
			succses      : false,
			firstTime    : true,
			users        : [],
			search       : [],
			valueUsers   : [],
			valueAuthors : []
		};
	}

	componentDidMount() {
		UserService.getAllUsers().then(
			(response) => {
				this.setState(
					{
						users  : response.data,
						search : response.data
					},
					function() {
						console.log(this.state.users);
					}
				);
			},
			(error) => {
				console.log(error.toString());
			}
		);
		const authors = UserService.getAllAuthors();
		this.setState(
			{
				authorsAPI : authors
			},
			function() {
				console.log(this.state.authorsAPI);
			}
		);
	}
	addBook = () => {
		const title = document.getElementById('title').value;
		const authors = $('#select-multiple-native').val();
		const publisher = document.getElementById('publisher').value;
		const book = {
			book   : {
				title           : title,
				publicationYear : publisher
			},
			idList : authors
		};
		document.getElementById('title').value = '';
		document.getElementById('publisher').value = '';
		$('#select-multiple-native').val([]);
		UserService.addNewBook(book).then(
			(response) => {
				console.log(response);
				alert('Pomyślnie dodano książkę😎');
			},
			(error) => {
				console.log(error.toString());
				alert('Dodawanie książki nie powiodło się😢');
			}
		);
	};
	addAuthor = () => {
		const firstName = document.getElementById('firstName').value;
		const lastName = document.getElementById('lastName').value;
		const author = {
			firstName : firstName,
			lastName  : lastName
		};
		UserService.addNewAuthor(author).then(
			(response) => {
				this.setState({
					succses   : true,
					firstTime : false
				});
				this.displaySuccess();
			},
			(error) => {
				console.log(error.toString());
				this.setState({
					success   : false,
					firstTime : false
				});
			}
		);
	};
	displayMessage() {
		if (this.state.succses == true && this.state.firstTime == false) {
			return (
				<div id="success" className={styles.success}>
					Dodano autora
				</div>
			);
		}
		else if (this.state.succses == false && !this.state.firstTime == false) {
			return (
				<div id="failed" className={styles.failed}>
					Nie udało się dodać autora
				</div>
			);
		}
		else {
			return <div />;
		}
	}
	displaySuccess = () => {
		document.getElementById('success').style.display = 'block';
		setTimeout(() => {
			document.getElementById('firstName').value = '';
			document.getElementById('lastName').value = '';
			document.getElementById('success').style.display = 'none';
		}, 2000);
		window.location.reload();
	};
	displayFailed() {
		document.getElementById('failed').style.display = 'block';
		setTimeout(() => {
			document.getElementById('firstName').value = '';
			document.getElementById('lastName').value = '';
			document.getElementById('failed').style.display = 'none';
		}, 2000);
	}
	emptydiv() {
		return <div />;
	}
	deleteUser() {
		const user = JSON.parse(localStorage.getItem('user'));
		var selectedId = $('#exampleFormControlSelect2').val();
		if (selectedId === user.id.toString()) {
			alert('Nie możesz usunąc samego siebie');
		}
		else {
			UserService.deleteUser(selectedId);
			$("#exampleFormControlSelect2 option[value='" + selectedId + "']").remove();
			alert('Pomyślnie usunięto użytkownika');
		}
	}
	deleteAuthor() {
		var selectedId = $('#exampleFormControlSelect').val();
		console.log(selectedId);
		UserService.deleteAuthor(selectedId).then(
			(response) => {
				console.log(response.data);
				$("#exampleFormControlSelect option[value='" + selectedId + "']").remove();
				alert('Pomyślnie usunięto autora');
			},
			(error) => {
				console.log(error.response.data);
				alert(
					'Nie udało się usunąć autora. Sprawdź czy dany autor nie jest przypisany do jakiejś książki - jeśli jest najpierw usuń tą książkę'
				);
			}
		);
	}
	handleChangeFilter = (event) => {
		const { value } = event.target;
		this.setState({ value });
	};
	render() {
		const succesMessage = (
			<div id="success" className={styles.success}>
				Dodano autora
			</div>
		);
		const failedMessage = (
			<div id="failed" className={styles.failed}>
				Nie udało się dodać autora
			</div>
		);
		const theme2 = createMuiTheme({
			palette : {
				primary : green
			}
		});
		const addButton = (
			<button onClick={this.addBook} type="button" /*href="/admin" */ className="btn btn-primary">
				Dodaj
			</button>
		);
		const { value } = this.state;
		let usersList = null;
		let authorsList = null;
		const searchResult = (
			<FilterResults
				value={value}
				data={this.state.users}
				renderResults={(results) =>
					results.map((el, index) => {
						return (
							<option style={{ marginBottom: '0.3em' }} key={el.id} value={el.id}>
								ID: {el.id} Login: {el.username} Email: {el.email}
							</option>
						);
					})}
			/>
		);
		usersList = this.state.users.map((user) => (
			<option style={{ marginBottom: '0.3em' }} key={user.id} value={user.id}>
				ID: {user.id} Login: {user.username} Email: {user.email}
			</option>
		));
		authorsList = this.state.authorsAPI.map((author) => (
			<option style={{ marginBottom: '0.3em' }} key={author.id} value={author.id}>
				{author.firstName} {author.lastName}
			</option>
		));
		return (
			// <div className="container">
			// 	<header className="jumbotron">
			// 		<h3>{this.state.content}</h3>
			// 	</header>
			// </div>
			<div className={styles.maindiv}>
				<div className={styles.container}>
					<h2>Dodaj nową książkę</h2>
					<form autoComplete="off">
						<div className="form-group">
							<label htmlFor="title">Tytuł</label>
							<input
								required
								type="text"
								placeholder="Przykładowy tytuł"
								className="form-control"
								id="title"
							/>
							{/* <TextField
											value={this.state.title}
											required
											style={{ marginBottom: 8 }}
											id="title"
											label="Tytuł"
											name="title"
											InputLabelProps={{ shrink: true }}
										/> */}
						</div>
						<div className="form-group">
							<label htmlFor="publisher">Rok wydania</label>
							<input required type="text" placeholder="2137" className="form-control" id="publisher" />
							{/* <TextField
											value={this.state.publisher}
											required
											style={{ marginBottom: 8 }}
											id="publisher"
											label="Rok wydania"
											name="publisher"
											InputLabelProps={{ shrink: true }}
										/> */}
						</div>
						<div>
							<div className="form-group">
								<label htmlFor="select-multiple-native">Autor/autorzy</label>
								<select multiple size="7" className="form-control" id="select-multiple-native">
									{this.state.authorsAPI.map((name) => (
										<option style={{ marginBottom: '0.3em' }} key={name.id} value={name.id}>
											{name.firstName} {name.lastName}
										</option>
									))}
								</select>
							</div>
						</div>
					</form>
					{addButton}
					<br />
					{/* <button className={buttonStyles.join(' ')} onClick={this.toggleArticlesHandler}>
						Dodaj książkę
					</button> */}
					{/* <div className={articleStyles.join(' ')}>{books}</div> */}
				</div>
				<div className={styles.container}>
					<h2>Dodaj nowego autora</h2>
					<form>
						<div className="form-group">
							<label htmlFor="firstName">Imię</label>
							<input required type="text" placeholder="Jan" className="form-control" id="firstName" />
						</div>
						<div className="form-group">
							<label htmlFor="lastName">Nazwisko</label>
							<input required type="text" placeholder="Kowalski" className="form-control" id="lastName" />
						</div>
						<div>
							<button
								onClick={this.addAuthor}
								type="button"
								/*href="/admin" */ className="btn btn-primary"
							>
								Dodaj
							</button>
							<div id="success" style={{ display: 'none' }} className={styles.success}>
								Dodano autora
							</div>
							<div id="failed" style={{ display: 'none' }} className={styles.failed}>
								Nie udało się dodać autora
							</div>
						</div>
					</form>
				</div>
				<div className={styles.container}>
					<h2>Lista autorów</h2>
					<div className="input-group mb-3">
						<div className="input-group-prepend" />
					</div>
					<div className="form-group">
						<select size="7" className="form-control" id="exampleFormControlSelect">
							{/* {this.state.users.map((user) => (
								<option style={{ marginBottom: '0.3em' }} key={user.id} value={user.id}>
									ID: {user.id} Login: {user.username} Email: {user.email}
								</option>
							))} */}
							{authorsList}
						</select>
						<button
							onClick={this.deleteAuthor}
							type="button"
							style={{ width: '-webkit-fill-available', marginTop: '1em' }}
							className="btn btn-danger"
						>
							Usuń wybranego autora
						</button>
					</div>
				</div>
				<div className={styles.container}>
					<h2>Lista użytkowników</h2>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								<svg
									className="bi bi-search"
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
									/>
									<path
										fillRule="evenodd"
										d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
									/>
								</svg>
							</span>
						</div>
						<input
							type="text"
							value={value}
							className="form-control"
							placeholder="Wpisz email lub login"
							aria-label="Username"
							aria-describedby="basic-addon1"
							onChange={this.handleChangeFilter}
						/>
					</div>
					<div className="form-group">
						<select size="7" className="form-control" id="exampleFormControlSelect2">
							{/* {this.state.users.map((user) => (
								<option style={{ marginBottom: '0.3em' }} key={user.id} value={user.id}>
									ID: {user.id} Login: {user.username} Email: {user.email}
								</option>
							))} */}
							{this.state.value ? searchResult : usersList}
						</select>
						<button
							onClick={this.deleteUser}
							type="button"
							style={{ width: '-webkit-fill-available', marginTop: '1em' }}
							className="btn btn-danger"
						>
							Usuń wybranego użytkownika
						</button>
					</div>
				</div>
			</div>
		);
	}
}
