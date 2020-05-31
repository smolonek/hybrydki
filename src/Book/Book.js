import React from 'react';
import './Book.css';
import styles from './Book.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import BookIcon from '@material-ui/icons/Book';
import DeleteIcon from '@material-ui/icons/Delete';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles({
	card   : {
		minWidth : 275
	},
	bullet : {
		display   : 'inline-block',
		margin    : '0 2px',
		transform : 'scale(0.8)'
	},
	title  : {
		fontSize : 14
	},
	pos    : {
		marginBottom : 12
	}
});

const Book = (props) => {
	const classes = useStyles();
	const theme = createMuiTheme({
		palette : {
			primary : green
		}
	});
	let dispAuthor = '';
	console.log(props.authorsLen);
	if (props.authorsLen > 1) {
		dispAuthor = 'Autorzy: ';
	}
	else {
		dispAuthor = 'Autor: ';
	}
	const user = JSON.parse(localStorage.getItem('user'));
	let borrowReturn = '';
	//if(user.id === props.)
	return (
		<div className={styles.article}>
			{/* <h2> {props.title} </h2>Autor: {props.author}
			<br />
			Rok wydania: {props.year}
			<br />
			Wydawnictwo: {props.publisher}
			<br />
			Cena: {props.price}
			<br />
			<button onClick={props.updateClick}>Edytuj książkę</button>
			<button onClick={props.deleteClick}>Usuń książkę</button>
			<br />
			<br /> */}
			<Card className={classes.card} variant="outlined">
				<CardContent>
					<Typography variant="h5" component="h2">
						{props.title}
					</Typography>
					<Typography className={classes.pos} color="textSecondary">
						{dispAuthor} {props.author}
					</Typography>
					<Typography variant="body2" component="p">
						Rok wydania: {props.publisher}
					</Typography>
				</CardContent>
				<CardActions>
					<div style={{ width: '-webkit-fill-available' }}>
						<Button
							variant="outlined"
							color="default"
							style={{ marginLeft: '0.8em', marginRight: '0.8em' }}
							startIcon={<DeleteIcon />}
							size="small"
							onClick={props.deleteClick}
						>
							Usuń książkę
						</Button>
						<Button
							variant="outlined"
							color="default"
							style={{ marginLeft: '0.8em', marginRight: '0.8em' }}
							startIcon={<BookIcon />}
							size="small"
							onClick={props.borrowClick}
						>
							Wypożycz książkę
						</Button>
						<Button
							variant="outlined"
							color="default"
							style={{ marginLeft: '0.8em', marginRight: '0.8em' }}
							startIcon={<MenuBookIcon />}
							size="small"
							onClick={props.returnClick}
						>
							Zwróć książkę
						</Button>
					</div>
				</CardActions>
			</Card>
		</div>
	);
};

export default Book;
