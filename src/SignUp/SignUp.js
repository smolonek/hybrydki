import React from 'react';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { NavLink, Switch, Route } from 'react-router-dom';
import styles from './SignUp.module.css';
import { green } from '@material-ui/core/colors';
import Visibility from '@material-ui/icons/Visibility';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Input, ThemeProvider, createMuiTheme, Button, InputAdornment, IconButton } from '@material-ui/core';

const SignUp = (props) => {
	const theme = createMuiTheme({
		palette : {
			primary : {
				main : '#c6c6c6'
			},
			type    : 'dark'
		}
	});
	const [ values, setValues ] = React.useState({
		password     : '',
		showPassword : false
	});
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<div>
			<Card className={styles.loginForm}>
				<ThemeProvider theme={theme}>
					<form>
						<div className={styles.backbtn}>
							<IconButton
								component={NavLink}
								to="/"
								startIcon={<ArrowBackIcon />}
								variant="contained"
								className={styles.backbtn}
							>
								<ArrowBackIcon />
							</IconButton>
						</div>
						<Typography variant="h3" component="h1" className={styles.logtext}>
							Zarejestruj się
						</Typography>
						<Typography variant="p" />
						<div className={styles.formgroup2}>
							<FormControl className={styles.formcontrol} variant="filled">
								<InputLabel className={styles.label} htmlFor="email">
									Email
								</InputLabel>
								<Input startAdornment={<EmailIcon />} className={styles.input} id="email" />
							</FormControl>
						</div>
						<div className={styles.formgroup}>
							<FormControl className={styles.formcontrol} variant="filled">
								<InputLabel htmlFor="login">Login</InputLabel>
								<Input startAdornment={<AccountCircleIcon />} className={styles.input} id="login" />
							</FormControl>
						</div>
						<div className={styles.formgroup}>
							<FormControl className={styles.formcontrol} variant="filled">
								<InputLabel htmlFor="password">Hasło</InputLabel>
								<Input
									className={styles.input}
									id="password"
									startAdornment={<LockIcon />}
									type={values.showPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{values.showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</div>
						<div>
							<FormControl className={styles.formcontrol} variant="filled">
								<Button variant="contained">Zarejestruj</Button>
							</FormControl>
						</div>
					</form>
				</ThemeProvider>
			</Card>
			<div />
		</div>
	);
};

export default SignUp;
