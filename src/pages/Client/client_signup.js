import React from 'react';
import './client_signup.css';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import Axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

const genders = [
	{
		value: 'Male',
		label: 'Male',
	},
	{
		value: 'Female',
		label: 'Female',
	},
	{
		value: 'Others',
		label: 'Others',
	},
];

function ClientSignUp() {
	const [gender, setGender] = React.useState('Male');

	const handleChange = (event) => {
		setGender(event.target.value);
	};

	const navigate = useNavigate();
	const location = useLocation();

	const [name, setName] = useState('');
	const [birthdate, setBirth] = useState('');
	const [contact, setContact] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const createUser = () => {
		Axios.post('https://ahride.herokuapp.com/createUser', {
			name,
			gender,
			birthdate,
			contact,
			email,
			password,
		});
	};

	// As explained in the Login page.
	const { emailPasswordSignup } = useContext(UserContext);
	const [form, setForm] = useState({
		name: '',
		gender: '',
		birthdate: '',
		contact: '',
		email: '',
		password: '',
	});

	// As explained in the Login page.
	const onFormInputChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	// As explained in the Login page.
	const redirectNow = () => {
		const redirectTo = location.search.replace('?redirectTo=', '');
		navigate(redirectTo ? redirectTo : '/client/homepage');
	};

	const onSubmit = async () => {
		try {
			const user = await emailPasswordSignup(form.email, form.password);
			if (user) {
				createUser();
				redirectNow();
			}
		} catch (error) {
			alert(error);
		}
	};
	return (
		<Row className='bodyPage_SignUp'>
			<Col sm={8} className='Client_signUp_ColumnLeft'>
				<FirstPageIcon
					sx={{ fontSize: 40 }}
					className='Back_button_Home_SignUp'
					onClick={() => {
						navigate('/');
					}}
					type='submit'></FirstPageIcon>
				<div className='ClientSignUpMain'>
					<p className='text_SignUp'>Sign Up</p>
					<p className='text_TagLine_SignUp'>
						Creating an account only take a minute or so and you will become
						part of us! Great exchange, right?
					</p>
					<Container className='Client_SignUpTextField'>
						<p className='text_Labels_SignUp'>Name</p>
						<TextField
							name='name'
							type='name'
							label='Name'
							variant='outlined'
							fullWidth
							value={form.name}
							onInput={onFormInputChange}
							onChange={(event) => {
								setName(event.target.value);
							}}></TextField>
					</Container>
					<Container className='Client_SignUpTextField'>
						<Row>
							<Col>
								<p className='text_Labels_SignUp'>Gender</p>
								<TextField
									select
									variant='outlined'
									fullWidth
									label='Select'
									value={gender}
									onInput={onFormInputChange}
									onChange={handleChange}>
									{genders.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Col>
							<Col>
								<p className='text_Labels_SignUp'>Birthdate</p>
								<TextField
									name='birthdate'
									type='date'
									variant='outlined'
									fullWidth
									value={form.birthdate}
									onInput={onFormInputChange}
									onChange={(event) => {
										setBirth(event.target.value);
									}}></TextField>
							</Col>
						</Row>
					</Container>
					<Container className='Client_SignUpTextField'>
						<p className='text_Labels_SignUp'>Contact Number</p>
						<TextField
							name='contact'
							type='number'
							label='Contact No.'
							variant='outlined'
							fullWidth
							value={form.contact}
							onInput={onFormInputChange}
							onChange={(event) => {
								setContact(event.target.value);
							}}></TextField>
					</Container>
					<Container className='Client_SignUpTextField'>
						<p className='text_Labels_SignUp'>Email Address</p>
						<TextField
							name='email'
							type='email'
							label='Email'
							variant='outlined'
							fullWidth
							value={form.email}
							onInput={onFormInputChange}
							onChange={(event) => {
								setEmail(event.target.value);
							}}></TextField>
					</Container>
					<Container className='Client_SignUpTextField'>
						<p className='text_Labels_SignUp'>Password</p>
						<TextField
							label='Password'
							type='password'
							variant='outlined'
							name='password'
							fullWidth
							value={form.password}
							onInput={onFormInputChange}
							onChange={(event) => {
								setPassword(event.target.value);
							}}></TextField>
					</Container>
					<Container className='Client_SignUpTextField'>
						<button
							className='button_SignUp_SignUp'
							type='submit'
							onClick={onSubmit}>
							Sign Up
						</button>
					</Container>
				</div>
			</Col>
			<Col sm={4} className='Client_SignUp_columnR_SignUp2'>
				<Container className='Client_SignUpRightPane'>
					<p className='text_LabelR_SignUp'>Already have an account?</p>
					<center>
						<button
							onClick={() => {
								navigate('/client/signin');
							}}
							className='button_LogIn_SignUp'
							type='submit'>
							Log In
						</button>
					</center>
				</Container>
			</Col>
		</Row>
	);
}

export default ClientSignUp;
