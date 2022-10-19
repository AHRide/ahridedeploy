import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from '../../Admin/AdminRider.module.css';

function DisplayRiderReport() {
	const navigate = useNavigate();
	const [updateList, setUpdateList] = useState([]);
	const { user } = useContext(UserContext);
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

	const toUpdateStatus = (_id) => {
		navigate('/admin/rider/report/information', { state: { _id } });
	};

	return (
		<>
			{updateList.map((lists, index) => (
				<div className={style.column3} key={index}>
					{/* {lists.rating !== 0 || lists.rating === true && ( */}
					<button className={style.RiderButton1} type='submit'>
						<h1 className={style.clientName}>{lists.client_email}</h1>
						<h1 className={style.frombutton}>{lists.from}</h1>
						<h1 className={style.tobutton}>{lists.to}</h1>
						<h1 className={style.ratingbutton}>{lists.rating}</h1>
					</button>
					{/* )} */}
				</div>
			))}
		</>
	);
}

export default DisplayRiderReport;
