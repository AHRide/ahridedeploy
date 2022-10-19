import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/user.context';
import '../HistoryPageCards.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DisplayRiderHistory() {
	const navigate = useNavigate();
	const [offerList, setOfferList] = useState([]);
	const { user } = useContext(UserContext);

	useEffect(() => {
		axios
			.get(
				`https://ahride.herokuapp.com/getDeliveryHistory/rider/${user._profile.data.email}`
			)
			.then((response) => {
				setOfferList(response.data);
			});
	}, [user._profile.data.email]);

	const toUpdateStatus = (_id) => {
		navigate('/rider/RiderHistoryInfo', { state: { _id } });
	};
	console.log(user._profile.data.email);

	return (
		<>
			{offerList.map((lists, index) => (
				<div className='history-center-layout' key={index}>
					<div
						className='history-row-details'
						onClick={() => {
							toUpdateStatus(lists._id);
						}}>
						<div className='history-column-details'>
							<h3>{lists.receiver_name}</h3>
						</div>
						<div className='history-column-details'>
							<h3>{lists.from}</h3>
						</div>
						<div className='history-column-details2'>
							<h3>---</h3>
						</div>
						<div className='history-column-details'>
							<h3>{lists.to}</h3>
						</div>
						{lists.status === 'Completed' && (
							<div className='history-completed_rider'>
								<h3>{lists.status}</h3>
							</div>
						)}
						{lists.status === 'Cancelled' && (
							<div className='history-cancelled_rider'>
								<h3>{lists.status}</h3>
							</div>
						)}
					</div>
				</div>
			))}
		</>
	);
}

export default DisplayRiderHistory;
