import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Switch, Route } from 'react-router-dom';
import AuthService from '../services/auth.service';

const useStyles = makeStyles((theme) => ({
	root       : {
		flexGrow : 1
	},
	menuButton : {
		marginRight : theme.spacing(2)
	},
	title      : {
		flexGrow : 1
	}
}));

export default function ButtonAppBarLogout() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Programowanie Hybrydowe
					</Typography>
					<Button component={NavLink} to="/" color="inherit">
						Home
					</Button>
					<Button color="inherit">User</Button>
					<Button color="inherit">Profile name</Button>
					<Button component={NavLink} to="/Login" color="inherit">
						Wyloguj
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
