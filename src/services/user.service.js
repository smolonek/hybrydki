import axios from 'axios';
import authHeader from './auth-header';

const API_URL_BOOK = 'http://localhost:8080/api/book/';
const API_URL_AUTHOR = 'http://localhost:8080/api/author/';
const API_URL_USER = 'http://localhost:8080/api/user/';

class UserService {
	deleteBook(id) {
		return axios.delete(API_URL_BOOK + 'delete/' + id, { headers: authHeader() });
	}
	putBorrowBook(id) {
		return axios.put(API_URL_BOOK + 'borrow/' + id, '', { headers: authHeader() });
	}
	putReturnBook(id) {
		return axios.put(API_URL_BOOK + 'return/' + id, '', { headers: authHeader() });
	}
	getPublicContent() {
		return axios.get(API_URL_BOOK + 'get/all', { headers: authHeader() });
	}
	getAllBooks() {
		const user = JSON.parse(localStorage.getItem('user'));
		var request = new XMLHttpRequest();
		request.open('GET', API_URL_BOOK + 'get/all', false);
		request.setRequestHeader('Authorization', 'Bearer ' + user.accessToken);
		request.send(null);
		if (request.status === 200) {
			console.log(JSON.parse(request.response));
			return JSON.parse(request.response);
		}
		else {
			console.log('xmlhttprequest nie zadzialalo :??0');
			return [];
		}
	}
	getBookById(id) {
		return axios.get(API_URL_BOOK + 'get/' + id, { headers: authHeader() });
	}
	addNewBook(book) {
		return axios.post(API_URL_BOOK + 'add', book, {
			headers : authHeader()
		});
	}
	addNewAuthor(author) {
		return axios.post(API_URL_AUTHOR + 'add', author, {
			headers : authHeader()
		});
	}
	getAllUsers() {
		return axios.get(API_URL_USER + 'get/all', { headers: authHeader() });
	}
	deleteUser(id) {
		return axios.delete(API_URL_USER + 'delete/' + id, { headers: authHeader() });
	}
	deleteAuthor(id) {
		return axios.delete(API_URL_AUTHOR + 'delete/' + id, { headers: authHeader() });
	}
	// async getAllAuthors() {
	// 	const authors = await axios.get(API_URL_AUTHOR + 'get/all', { headers: authHeader() });
	// 	console.log(authors.data);
	// 	return authors.data;
	// }
	getAllAuthors() {
		const user = JSON.parse(localStorage.getItem('user'));
		var request = new XMLHttpRequest();
		request.open('GET', API_URL_AUTHOR + 'get/all', false);
		request.setRequestHeader('Authorization', 'Bearer ' + user.accessToken);
		request.send(null);
		if (request.status === 200) {
			console.log(JSON.parse(request.response));
			return JSON.parse(request.response);
		}
		else {
			console.log('xmlhttprequest nie zadzialalo :??0');
			return [];
		}
	}
	getUserBoard() {
		return axios.get('http://localhost:8080/api/user/get/all', { headers: authHeader() });
	}

	getModeratorBoard() {
		return axios.get(API_URL_BOOK + 'mod', { headers: authHeader() });
	}

	getAdminBoard() {
		return axios.get(API_URL_BOOK + 'admin', { headers: authHeader() });
	}
	/*
	d̶o̶d̶a̶n̶i̶e̶ a̶u̶t̶o̶r̶a̶
	usuniecie autora

	d̶o̶d̶a̶n̶i̶e̶ n̶o̶w̶e̶j̶ k̶s̶i̶ą̶ż̶k̶i̶
	u̶s̶u̶n̶i̶ę̶c̶i̶e̶ i̶s̶t̶n̶i̶e̶j̶ą̶c̶e̶j̶ k̶s̶i̶ą̶ż̶k̶i̶
	w̶y̶p̶o̶ż̶y̶c̶z̶e̶n̶i̶e̶ k̶s̶i̶ą̶ż̶k̶i̶
	z̶w̶r̶ó̶c̶e̶n̶i̶e̶ k̶s̶i̶ą̶ż̶k̶i̶
	
	d̶o̶d̶a̶n̶i̶e̶ u̶z̶y̶t̶k̶o̶w̶n̶i̶k̶a̶
	u̶s̶u̶n̶i̶ę̶c̶i̶e̶ u̶ż̶y̶t̶k̶o̶w̶n̶i̶k̶a̶
	w̶y̶s̶z̶u̶k̶i̶w̶a̶n̶i̶e̶ u̶z̶y̶t̶k̶o̶w̶n̶i̶k̶a̶
	*/
}

export default new UserService();
