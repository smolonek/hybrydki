import React, { Component } from 'react';
import './App.css';
import SignIn from './SignIn/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp/SignUp';
import { NavLink, Switch, Route, Link } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import Home from './Home/Home';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import AuthService from './services/auth.service';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Login from './components/login.component';
import Register from './components/register.component';
import Home2 from './components/home.component';
import Profile from './components/profile.component';
import BoardUser from './components/board-user.component';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BoardModerator from './components/board-moderator.component';
import BoardAdmin from './components/board-admin.component';
import ButtonAppBar from './NavBar/NavBar';
import ButtonAppBarLogout from './NavBarLogout/NavBarLogout';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './Home/Home.module.css';
import grey from '@material-ui/core/colors';
//wyglad wyszukiwarki\
//pozycja wyszukiwarki
//walidacja pol w formularzu
//api
//naprawienie pol przy edycji jakiejs ksiazki bo sie te okienka nie robia wieksze i sie napisy zlewaja
// const App = () => (
// 	const darkTheme = createMuiTheme({
// 		palette : {
// 			type : 'dark'
// 		}
// 	});
// 	<div className="app">
// 		<ThemeProvider theme={darkTheme}>
// 		<Navigation />
// 		<Main /></ThemeProvider>
// 	</div>
// );
class App extends Component {
	constructor(props) {
		super(props);
		//this.logOut - this.logOut.bind(this);
		this.state = {
			showModeratorBoard : false,
			showAdminBoard     : false,
			currentUser        : undefined
		};
	}
	componentDidMount() {
		const user = AuthService.getCurrentUser();

		if (user) {
			this.setState({
				currentUser        : AuthService.getCurrentUser(),
				showModeratorBoard : user.roles.includes('ROLE_MODERATOR'),
				showAdminBoard     : user.roles.includes('ROLE_ADMIN')
			});
		}
	}
	logOut() {
		AuthService.logout();
	}
	render() {
		const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

		const darkTheme = createMuiTheme({
			palette : {
				main : {
					secondary : '#424242'
				},
				type : 'dark'
			}
		});
		const user = AuthService.getCurrentUser;

		return (
			<div className="app">
				<ThemeProvider theme={darkTheme}>
					{/* {currentUser ? <ButtonAppBarLogout /> : <ButtonAppBar />} */}
					<Router basename="/">
						{/* <Navbar bg="dark" expand="lg">
						<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<Nav.Link href="#home">Home</Nav.Link>
								<Nav.Link href="#link">Link</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar> */}
						<div>
							<nav className="navbar navbar-expand navbar-dark bg-dark" style={{ padding: '.1em 1rem' }}>
								<a href="/home" className="navbar-brand">
									Programowanie Hybrydowe
								</a>
								<Link to="/hybrydki/Login">Login</Link>
								<div className="navbar-nav mr-auto">
									<li className="nav-item">
										<a href="/" className="nav-link">
											Home
										</a>
									</li>

									{showModeratorBoard && (
										<li className="nav-item">
											<NavLink to={'/mod'} className="nav-link">
												Moderator Board
											</NavLink>
										</li>
									)}

									{showAdminBoard && (
										<li className="nav-item">
											<a href="/admin" className="nav-link">
												Admin board
											</a>
										</li>
									)}
								</div>

								{currentUser ? (
									<div className="navbar-nav ml-auto">
										<li className="nav-item">
											<Button
												href="/profile"
												className={styles.loginButton}
												style={{ margin: 10 }}
												id="loginButton"
												color="default"
											>
												{currentUser.username}
											</Button>
										</li>
										<li className="nav-item">
											<Button
												href="/Login"
												className={styles.loginButton}
												style={{ margin: 10 }}
												id="loginButton"
												variant="outlined"
												onClick={this.logOut}
											>
												Log out
											</Button>
										</li>
									</div>
								) : (
									<div className="navbar-nav ml-auto">
										<li className="nav-item">
											<Button
												href="/hybrydki/Login"
												className={styles.loginButton}
												style={{ margin: 10 }}
												id="loginButton"
												variant="contained"
											>
												Login
											</Button>
										</li>

										<li className="nav-item">
											<Button
												href="/Register"
												className={styles.loginButton}
												style={{ margin: 10 }}
												id="loginButton"
												variant="contained"
											>
												Register
											</Button>
										</li>
									</div>
								)}
							</nav>

							{/* <div className="container mt-3" id="test">
							<Switch>
								<Route exact path={[ '/', '/home' ]} component={Home2} />
								<Route exact path="/Login" component={Login} />
								<Route exact path="/Register" component={Register} />
								<Route exact path="/profile" component={Profile} />
								<Route path="/user" component={BoardUser} />
								<Route path="/mod" component={BoardModerator} />
								<Route path="/admin" component={BoardAdmin} />
							</Switch>
						</div> */}
						</div>
					</Router>
					<Main />
				</ThemeProvider>
			</div>
		);
	}
}
export default App;

const Navigation = () => (
	<div>
		{/* <AppBar position="sticky">
			<Toolbar>
				<Typography variant="h6" className={styles.title}>
					News
				</Typography>
				<Button className={styles.loginButton} variant="h1" color="inherit">
					Login
				</Button>
			</Toolbar>
		</AppBar> */}
		{/* <nav>
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/about">About</NavLink>
				</li>
				<li>
					<NavLink to="/contact">Contact</NavLink>
				</li>
				<li>
					<NavLink to="/SignIn">Sign in</NavLink>
				</li>
			</ul>
		</nav> */}
	</div>
);

const Main = () => (
	<Switch>
		<Route path="/Register" component={Register} />
		<Route path="/hybrydki/Login" component={Login} />
		<Route path="/SignIn" component={SignIn} />
		<Route path="/profile" component={Profile} />
		<Route path="/admin" component={BoardAdmin} />
		<Route path="/" component={Home} />
	</Switch>
);
