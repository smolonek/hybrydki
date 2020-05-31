import React, { Component } from 'react';
import Book from '../Book/Book';
import SignIn from '../SignIn/SignIn';
import styles from './Home.module.css';
import TextField from '@material-ui/core/TextField';
import { NavLink, Switch, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import UserService from '../services/user.service';
import FilterResults from 'react-filter-search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Login from '../components/login.component';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import SimpleReactValidator from 'simple-react-validator';
import $ from 'jquery';
import Select from '@material-ui/core/Select';
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors';
import authService from '../services/auth.service';
import authHeader from '../services/auth-header';
import userService from '../services/user.service';
//wyglad wyszukiwarki\
//pozycja wyszukiwarki
//walidacja pol w formularzu
//api
//naprawienie pol przy edycji jakiejs ksiazki bo sie te okienka nie robia wieksze i sie napisy zlewaja
class Home extends Component {
	constructor(props) {
		super(props);
		this.validator = new SimpleReactValidator();
		this.state = {
			books            : [],
			authors          : [],
			authorsAPI       : [],
			showBooks        : false,
			updateButtonShow : false,
			index            : null,
			searchTerm       : '',
			value            : '',
			data             : [],
			sort             : ''
		};
	}
	state = {
		books            : [],
		authors          : [],
		showBooks        : true,
		updateButtonShow : false,
		index            : null,
		searchTerm       : '',
		value            : '',
		data             : [],
		sort             : '',
		title            : '',
		author           : '',
		publisher        : '',
		year             : '',
		price            : '',
		formErrors       : {
			title     : '',
			author    : '',
			publisher : '',
			year      : '',
			price     : ''
		},
		titleValid       : false,
		authorValid      : false,
		publisherValid   : false,
		yearValid        : false,
		priceValid       : false,
		formValid        : false,
		intervalId       : 0
	};

	componentDidMount() {
		// console.log(UserService.getBookById(1));
		// const book = {
		// 	book   : {
		// 		title           : 'test książki z forntu',
		// 		publicationYear : 2137
		// 	},
		// 	idList : [ 1, 2 ]
		// };
		// UserService.addNewBook(book).then(
		// 	(response) => {
		// 		console.log(response);
		// 	},
		// 	(error) => {
		// 		console.log(error.toString());
		// 	}
		// );
		if (authService.getCurrentUser()) {
			UserService.getPublicContent().then(
				(response) => {
					this.setState(
						{
							books : response.data
						},
						function() {
							console.log('Pomyślnie pobrano książki');
						}
					);
					console.log(response.data);
				},
				(error) => {
					this.setState(
						{
							books : (error.response && error.response.data) || error.message || error.toString()
						},
						function() {
							console.log('nie udalo sie pobrac ksiazek');
						}
					);
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

			// UserService.getAllAuthors().then(
			// 	(response) => {
			// 		this.setState({
			// 			authorsAPI : response.data
			// 		});
			// 		console.log(response.data);
			// 	},
			// 	(error) => {
			// 		this.setState({
			// 			authorsAPI : (error.response && error.response.data) || error.message || error.toString()
			// 		});
			// 	}
			// );
		}
		// fetch('http://localhost:3001/authors').then((response) => response.json()).then(
		// 	(json) => {
		// 		this.setState({ authors: json });
		// 		console.log(this.state.authors);
		// 	},
		// 	(error) => {
		// 		console.log('nie udalo sie pobrac danych z api' + error);
		// 	}
		// );
		// fetch('http://localhost:3001/books').then((response) => response.json()).then(
		// 	(json) => {
		// 		this.setState({ books: json });
		// 		console.log(this.state.books);
		// 	},
		// 	(error) => {
		// 		console.log('nie udalo sie pobrac danych z api' + error);
		// 	}
		// );
	}
	$() {
		$.fn.inputFilter = function(inputFilter) {
			return this.on('input keydown keyup mousedown mouseup select contextmenu drop', function() {
				if (inputFilter(this.value)) {
					this.oldValue = this.value;
					this.oldSelectionStart = this.selectionStart;
					this.oldSelectionEnd = this.selectionEnd;
				}
				else if (this.hasOwnProperty('oldValue')) {
					this.value = this.oldValue;
					this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
				}
			});
		};
	}
	$() {
		$('#title').keypress(function(e) {
			var txt = String.fromCharCode(e.which);
			console.log(txt + ' : ' + e.which);
			if (!txt.match(/[A-Za-z]/)) {
				return false;
			}
		});
	}
	// $('#name').inputFilter(function(value) {
	// 	return /^[a-z\u00c0-\u024f]*$/i.test(value);
	// });
	// $('#price, #count').inputFilter(function(value) {
	// 	return /^\d*[.]?\d*$/.test(value);
	// });
	handleChangeFilter = (event) => {
		const { value } = event.target;
		this.setState({ value });
	};
	borrowBookHandler = (id) => {
		userService.putBorrowBook(id).then(
			(response) => {
				console.log(response);
				alert('Pomyślnie wypożyczono książkę');
			},
			(error) => {
				//&& error.response.data) || error.message || error.toString()
				console.log(error.response.data.message);
				alert(error.response.data.message);
			}
		);
	};
	returnBookHandler = (id) => {
		userService.putReturnBook(id).then(
			(response) => {
				console.log(response);
				alert('Pomyślnie oddano książkę');
			},
			(error) => {
				//&& error.response.data) || error.message || error.toString()
				console.log(error.response.data.message);
				alert(error.response.data.message);
			}
		);
	};
	deleteArticleHandler = (index) => {
		// const articles = this.state.articles.slice();
		const books = [ ...this.state.books ];
		userService.deleteBook(books[index].id).then(
			(response) => {
				console.log(response);
				alert('Pomyślnie usunięto książkę ');
			},
			(error) => {
				alert(error.response.data.message);
			}
		);
		books.splice(index, 1);
		this.setState({ books: books });
	};
	updateBookHandler = (bookIndex) => {
		//window.scrollTo(0, 0);
		this.scrollToTop();
		const updateButtonVisible = this.state.updateButtonShow;
		this.setState({ updateButtonShow: true });
		const books = this.state.books;
		this.setState({ index: bookIndex });
		document.getElementById('title').value = books[bookIndex].title;
		document.getElementById('author').value = books[bookIndex].author;
		document.getElementById('publisher').value = books[bookIndex].publisher;
		document.getElementById('year').value = books[bookIndex].year;
		document.getElementById('price').value = books[bookIndex].price;
	};

	addBookToState = () => {
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
		// const test = {
		// 	title     : title,
		// 	authors   : {
		// 		firstName : bka,
		// 		lastName  : last
		// 	},
		// 	publisher : publisher
		// };
		const books = [ ...this.state.books ];
		books.push(book);
		this.setState({ books: books });

		document.getElementById('title').value = '';
		document.getElementById('publisher').value = '';
		$('#select-multiple-native').val([]);
		UserService.addNewBook(book).then(
			(response) => {
				console.log(response);
			},
			(error) => {
				console.log(error.toString());
			}
		);
		// axios.post('http://localhost:3001/books', book).then((response) => {
		// 	console.log(response);
		// });
		// if (!this.checkIfAuthorExists(book.author)) {
		// 	const author = {
		// 		id   : id,
		// 		name : book.author
		// 	};
		// 	const authors = [ ...this.state.authors ];
		// 	authors.push(author);
		// 	this.setState({ authors: authors });
		// 	axios.post('http://localhost:3001/authors', author).then((response) => {
		// 		console.log(response);
		// 	});
		// }
		// else {
		// 	console.log('Nie dodano autora ponieważ juz taki istnieje');
		// }
	};
	scrollStep() {
		if (window.pageYOffset === 0) {
			clearInterval(this.state.intervalId);
		}
		window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
	}

	scrollToTop() {
		let intervalId = setInterval(this.scrollStep.bind(this), '0');
		this.setState({ intervalId: intervalId });
	}
	checkIfAuthorExists = (authorName) => {
		const authors = this.state.authors;
		for (let i = 0; i < authors.length; i++) {
			if (authors[i].name === authorName) return true;
		}
		return false;
	};
	updateBookToState = () => {
		const index = this.state.index;
		const books = [ ...this.state.books ];
		const title = document.getElementById('title').value;
		const author = document.getElementById('author').value;
		const publisher = document.getElementById('publisher').value;
		const year = document.getElementById('year').value;
		const price = document.getElementById('price').value;
		const book = {
			id        : books[index].id,
			title     : title,
			author    : author,
			publisher : publisher,
			year      : year,
			price     : price
		};
		books.splice(index, 1, book);
		this.setState({ books: books });
		axios.put('http://localhost:3001/books/' + books[index].id, book).then((response) => {
			console.log(response);
		});
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('publisher').value = '';
		document.getElementById('year').value = '';
		document.getElementById('price').value = '';
		this.setState({
			updateButtonShow : false
		});
	};
	toggleBooksHandler = () => {
		const doesShow = this.state.showBooks;
		this.setState({ showBooks: !doesShow });
	};
	compareTitles(a, b) {
		const titleA = a.title.toUpperCase();
		const titleB = b.title.toUpperCase();
		let comparison = 0;
		if (titleA > titleB) {
			comparison = 1;
		}
		else if (titleA < titleB) {
			comparison = -1;
		}
		return comparison;
	}
	comparePricesAscending(a, b) {
		const priceA = Number(a.price);
		const priceB = Number(b.price);
		let comparison = 0;
		if (priceA > priceB) {
			comparison = 1;
		}
		else if (priceA < priceB) {
			comparison = -1;
		}
		return comparison;
	}

	comparePricesDescending(a, b) {
		const priceA = Number(a.price);
		const priceB = Number(b.price);
		let comparison = 0;
		if (priceA > priceB) {
			comparison = 1;
		}
		else if (priceA < priceB) {
			comparison = -1;
		}
		return comparison * -1;
	}
	compareAuthors(a, b) {
		const authorA = a.author.toUpperCase();
		const authorB = b.author.toUpperCase();
		let comparison = 0;
		if (authorA > authorB) {
			comparison = 1;
		}
		else if (authorA < authorB) {
			comparison = -1;
		}
		return comparison;
	}
	setSort = (value) => {
		this.setState({ sort: value });
		const originalBooks = [ ...this.state.books ];
		let books = this.state.books;
		if (this.state.value === 0) {
			this.setState({ books: originalBooks });
		}
		else if (value === 1) {
			books.sort(this.comparePricesAscending);
			this.setState({ books: books });
			console.log(this.state.sort);
		}
		else if (value === 2) {
			books.sort(this.comparePricesDescending);
			this.setState({ books: books });
		}
		else if (value === 3) {
			books.sort(this.compareTitles);
			this.setState({ books: books });
		}
		else if (value === 4) {
			books.sort(this.compareAuthors);
			this.setState({ books: books });
		}
	};
	handleChange = (event) => {
		this.setSort(event.target.value);
	};
	getAuthorName = (bookIndex) => {
		// console.log(this.state.authors);
		// const authors = this.state.authors.splice();
		// console.log(authors);
		// const author = authors.find((x) => x.id === author_id);
		// return author.name;
		const book = this.state.books[bookIndex];
		const author_id = Number(book.author_id);
		const authors = this.state.authors;
		for (let i = 0; i < authors.length; i++) {
			if (authors[i].id === author_id) return authors[i].name;
		}
		//const author = authors.find((x) => x.id === author_id);
		return 'author.name';
	};
	getAuthorNameById = (authorId) => {
		const authors = this.state.authors;
		for (let i = 0; i < authors.length; i++) {
			if (authors[i].id === authorId) {
				return authors[i].name;
			}
		}
		return null;
	};
	findObjectByKey(array, key, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				return array[i];
			}
		}
		return null;
	}
	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
	}
	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let emailValid = this.state.emailValid;
		let passwordValid = this.state.passwordValid;
		let titleValid = this.state.titleValid;
		const formValid = this.state.formValid;

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid ? '' : ' is invalid';
				break;
			case 'password':
				passwordValid = value.length >= 6;
				fieldValidationErrors.password = passwordValid ? '' : ' is too short';
				break;
			case 'title':
				if (titleValid > 2) {
					this.setState({ formValid: true });
				}
			default:
				break;
		}
		this.setState(
			{
				formErrors    : fieldValidationErrors,
				emailValid    : emailValid,
				passwordValid : passwordValid
			},
			this.validateForm
		);
	}
	checkselect() {
		let e = document.getElementById('select-multiple-native');
		let bla = e.options[e.selectedIndex].value;
		let values = $('#select-multiple-native').val();
		console.log(values);
	}
	validateForm() {
		this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
	}
	render() {
		const darkTheme = createMuiTheme({
			palette : {
				primary : {
					main : '#c6c6c6'
				},
				type    : 'dark'
			}
		});
		const { data, value } = this.state;
		let books = null;
		//let buttonStyles = [ styles.toggleButton ];
		const searchResult = (
			<FilterResults
				value={value}
				data={this.state.books}
				renderResults={(results) => (
					<div>
						{results.map((el, index) => {
							let i;
							let authors = el.authors[0].firstName + ' ' + el.authors[0].lastName;
							for (i = 1; i < el.authors.length; i++) {
								authors += ', ' + el.authors[i].firstName + ' ' + el.authors[i].lastName;
							}
							i = 1;
							return (
								<div>
									<Book
										title={el.title}
										author={authors}
										deleteClick={() => this.deleteArticleHandler(index)}
										updateClick={() => this.updateBookHandler(index)}
										borrowClick={() => this.borrowBookHandler(el.id)}
										returnClick={() => this.returnBookHandler(el.id)}
										key={el.id}
										authorsLen={el.authors.length}
										publisher={el.publicationYear}
									/>
								</div>
							);
						})}
					</div>
				)}
			/>
		);
		let authors = this.state.authors;
		if (authors.length > 0) {
			//console.log(authors[0]);
		}
		books = this.state.books.map((book, index) => {
			const authorName = JSON.parse(JSON.stringify(this.state.authors));
			const authorIndex = authorName.findIndex((x) => x.id === book.author_id);
			let i;
			let authors = book.authors[0].firstName + ' ' + book.authors[0].lastName;
			for (i = 1; i < book.authors.length; i++) {
				authors += ', ' + book.authors[i].firstName + ' ' + book.authors[i].lastName;
			}
			i = 1;
			return (
				<Book
					title={book.title}
					author={authors}
					deleteClick={() => this.deleteArticleHandler(index)}
					updateClick={() => this.updateBookHandler(index)}
					borrowClick={() => this.borrowBookHandler(book.id)}
					returnClick={() => this.returnBookHandler(book.id)}
					key={book.id}
					user={book.user}
					publisher={book.publicationYear}
					year={book.year}
					authorsLen={book.authors.length}
					price={book.price}
				/>
			);
		});
		if (this.state.updateButtonShow) {
		}
		const articleStyles = [];
		if (this.state.books.length === 1) {
			articleStyles.push('OneArticle');
		}

		if (this.state.books.length >= 4) {
			articleStyles.push('GreenArticles');
		}
		else {
			articleStyles.push('OrangeArticles');
		}
		const theme2 = createMuiTheme({
			palette : {
				primary : green
			}
		});
		const addButton = (
			<ThemeProvider theme={theme2}>
				<Button
					className={styles.addbtn}
					id="addButton"
					onClick={this.addBookToState}
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
				>
					Dodaj książkę
				</Button>
			</ThemeProvider>
		);
		const updateButton = (
			<Button
				style={{ margin: 10 }}
				id="addButton"
				onClick={this.updateBookToState}
				variant="contained"
				color="primary"
			>
				Aktualizuj książkę
			</Button>
		);
		const theme = createMuiTheme();
		return (
			<div className={styles.App}>
				<ThemeProvider theme={darkTheme}>
					<div className={styles.mainCol}>
						<div className={styles.sort}>
							<FormControl className={styles.left} variant="standard">
								<InputLabel id="demo-simple-select-filled-label">Sortuj</InputLabel>
								<Select
									labelId="demo-simple-select-filled-label"
									id="demo-simple-select-filled"
									value={this.state.sort}
									onChange={this.handleChange}
									style={({ width: 14 + 'em' }, { minWidth: 200 + 'px' })}
								>
									<MenuItem value={0}>
										<em>brak</em>
									</MenuItem>
									<MenuItem value={1}>Cena: od najniższej</MenuItem>
									<MenuItem value={2}>Cena: od najwyższej</MenuItem>
									<MenuItem value={3}>Tytuł: od A do Z</MenuItem>
									<MenuItem value={4}>Autor: od A do Z</MenuItem>
								</Select>
							</FormControl>
							<TextField
								value={value}
								className={styles.right}
								label="Filtruj"
								onChange={this.handleChangeFilter}
								InputProps={{
									startAdornment : (
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									)
								}}
							/>
						</div>

						<div>{this.state.value ? searchResult : books}</div>
					</div>
				</ThemeProvider>
			</div>
		);
	}
}

export default Home;
