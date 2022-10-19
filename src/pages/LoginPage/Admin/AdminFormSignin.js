import React from 'react';
// import validate from "./validateInfo";
// import useForm from "./useForm";
import './AdminForm.css';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/user.context';
import ArrowForwardIcon from '@mui/icons-material/ArrowRightAlt';
import { TextField } from '@mui/material';
import axios from 'axios';

const AdminFormSignin = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [adminList, setAdminList] = useState([]);

	useEffect(() => {
		// Sending HTTP GET request
		axios.get(`https://ahride.herokuapp.com/getUserAdmin/`).then((response) => {
			const adminEmails = response.data.map((res) => res.email);
			setAdminList(adminEmails);
		});
	}, []);

	const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const onFormInputChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const redirectNow = () => {
		const redirectTo = location.search.replace('?redirectTo=', '');
		navigate(redirectTo ? redirectTo : '/admin/homepage');
	};

	const loadUser = async () => {
		if (!user) {
			const fetchedUser = await fetchUser();
			if (fetchedUser) {
				console.log(form.email);
				if (!adminList.includes(form.email)) {
					alert(`${form.email} is not an Admin.`);
					return;
				}
				// Redirecting them once fetched.
				redirectNow();
			}
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	const onSubmit = async (event) => {
		try {
			const user = await emailPasswordLogin(form.email, form.password);
			if (user) {
				console.log(form.email);
				if (!adminList.includes(form.email)) {
					alert(`${form.email} is not an Admin`);
					return;
				}
				redirectNow();
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className='admin-sign-in-form-content-right'>
			<div className='admin-sign-in-form'>
				<h1>Sign In</h1>
				<p className='admin-sign-in-form-welcome'>
					Welcome Admin! Please sign in to your account to continue.
				</p>
				<div className='admin-sign-in-form-inputs'>
					<label className='admin-sign-in-form-label'>Username</label>
					<TextField
						name='email'
						type='name'
						label='Email'
						variant='outlined'
						fullWidth
						value={form.email}
						onChange={onFormInputChange}
					/>
				</div>
				<div className='admin-sign-in-form-inputs'>
					<label className='admin-sign-in-form-label'>Password</label>
					<TextField
						label='Password'
						type='password'
						variant='outlined'
						name='password'
						fullWidth
						value={form.password}
						onChange={onFormInputChange}
					/>
				</div>
				<ArrowForwardIcon
					sx={{ fontSize: 120 }}
					className='admin-button_SignIn'
					onClick={onSubmit}></ArrowForwardIcon>
			</div>
		</div>
	);
};

export default AdminFormSignin;
