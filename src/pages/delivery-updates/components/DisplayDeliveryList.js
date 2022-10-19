import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/user.context';
import '../DisplayUpdatePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DisplayDeliveryList() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const [updateList, setUpdateList] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			axios
				.get(
					`https://ahride.herokuapp.com/getDeliveryUpdates/user/${user._profile.data.email}`
				)
				.then((response) => {
					setUpdateList(response.data);
				});
		}, 500);
		return () => clearInterval(interval);
	}, [user._profile.data.email]);

	const toUpdateStatus = (_id, email, pending) => {
		navigate('/update-status', { state: { _id, email, pending } });
	};

	return (
		<>
			{updateList.map((lists, index) => (
				<div className='center-layout' key={index}>
					<div
						className='row-details'
						onClick={() => {
							toUpdateStatus(lists._id, lists.rider_email, 'inprogress');
						}}>
						<div className='column-details'>
							<h3>{lists.receiver_name}</h3>
						</div>
						<div className='column-details'>
							<h3>{lists.from}</h3>
						</div>
						<div className='column-details2'>
							<h3>---</h3>
						</div>
						<div className='column-details'>
							<h3>{lists.to}</h3>
						</div>
						{!lists.sPicking && !lists.sPicked && !lists.sOTW && (
							<div className='column-details'>
								<h3>In Progress</h3>
							</div>
						)}
						{lists.sPicking && !lists.sPicked && !lists.sOTW && (
							<div className='column-details'>
								<h3>Picking Up Item</h3>
							</div>
						)}
						{lists.sPicking && lists.sPicked && !lists.sOTW && (
							<div className='column-details'>
								<h3>Picked Up Item</h3>
							</div>
						)}
						{lists.sPicking && lists.sPicked && lists.sOTW && (
							<div className='column-details'>
								<h3>Item On The Way</h3>
							</div>
						)}
					</div>
				</div>
			))}
		</>
	);
}

export default DisplayDeliveryList;
