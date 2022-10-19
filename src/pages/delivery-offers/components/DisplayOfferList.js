import React, { useState, useEffect } from 'react';
import '../../delivery-updates/DisplayUpdatePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DisplayOfferList() {
	const navigate = useNavigate();
	const [offerList, setOfferList] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			axios
				.get(`https://ahride.herokuapp.com/getBookDelivery`)
				.then((response) => {
					setOfferList(response.data);
				});
		}, 500);
		return () => clearInterval(interval);
	}, []);

	const toUpdateStatus = (_id, email) => {
		navigate('/rider/deliveryInfo', { state: { _id, email } });
	};

	return (
		<>
			{offerList.map((lists, index) => (
				<div className='center-layout' key={index}>
					<div
						className='row-details'
						onClick={() => {
							toUpdateStatus(lists._id, lists.name);
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
						<div className='column-details'>
							<h3>{lists.receiver_cont}</h3>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default DisplayOfferList;
