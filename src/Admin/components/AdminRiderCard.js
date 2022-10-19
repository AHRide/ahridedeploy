import React, { useState, useEffect } from 'react';
import style from '../AdminRider.module.css';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import '../../pages/delivery-offers/DisplayOfferPage.css';

export default function AdminRiderCard() {
	const navigate = useNavigate();
	const [updateList, setUpdateList] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			axios
				.get(`https://ahride.herokuapp.com/getDeliveryHistory`)
				.then((response) => {
					setUpdateList(response.data);
				});
		}, 500);
		return () => clearInterval(interval);
	}, []);

	const toInfoStatus = (_id, rider_email) => {
		navigate('/admin/rider/report/information', {
			state: { _id, rider_email },
		});
	};

	return (
		<>
			{updateList
				.slice(0)
				.reverse()
				.map((lists, index) => (
					<div key={index}>
						{(lists.rating === 1 ||
							lists.rating === 2 ||
							lists.rating === 3) && (
							<div
								className={style.RiderButton}
								onClick={() => {
									toInfoStatus(lists._id, lists.rider_email);
								}}>
								<div className='column-details'>
									<h3>{lists.client_email}</h3>
								</div>
								<div className='column-details1'>
									<h3>{lists.from}</h3>
								</div>
								<div className='column-details4'>
									<h3>---</h3>
								</div>
								<div className='column-details3'>
									<h3>{lists.to}</h3>
								</div>
								<div className={style.stars}>
									<Rating
										name='read-only'
										value={lists.rating}
										readOnly
										size='large'
									/>
								</div>
							</div>
						)}
					</div>
				))}
		</>
	);
}
