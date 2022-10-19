import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Test() {
	const [listOfUsers, setListOfUsers] = useState([]);
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [username, setUsername] = useState('');

	useEffect(() => {
		Axios.get('http://localhost:3001/getUsers').then((response) => {
			setListOfUsers(response.data);
		});
	}, []);

	const createUser = () => {
		Axios.post('http://localhost:3001/createUser', {
			name,
			age,
			username,
		}).then((response) => {
			setListOfUsers([...listOfUsers, { name, age, username }]);
		});
	};

	return (
		<div>
			<div className='userDisplay'>
				{listOfUsers.map((user) => {
					return (
						<div>
							<h1> Name: {user.name}</h1>
							<h1> Age: {user.age}</h1>
							<h1> Username: {user.username}</h1>
						</div>
					);
				})}
			</div>
			<div>
				<input
					type='text'
					placeholder='Name...'
					onChange={(event) => {
						setName(event.target.value);
					}}
				/>
				<input
					type='number'
					placeholder='Age...'
					onChange={(event) => {
						setAge(event.target.value);
					}}
				/>
				<input
					type='text'
					placeholder='Username...'
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<button onClick={createUser}>createUser</button>
			</div>
		</div>
	);
}

export default Test;
