import React, { useState, useEffect, useContext } from 'react';
import NavBarAdmin from '../components/NavBarAdmin';
import style from '../Admin/AdminRiderInformation.module.css';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Rating from '@mui/material/Rating';
import BanRider from '../Admin/components/BanRider';
import { useLocation } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

function AdminRiderInformation() {
	const location = useLocation();
	const [updateList, setUpdateList] = useState([]);
	const [riderList, setRiderList] = useState([]);
	useEffect(() => {
		axios
			.get(
				`https://ahride.herokuapp.com/getDeliveryHistory/${location.state._id}/`
			)
			.then((response) => {
				setUpdateList(response.data);
				console.log(response.data);
			});

		axios
			.get(
				`https://ahride.herokuapp.com/getUserRider/${location.state.rider_email}/`
			)
			.then((response) => {
				setRiderList(response.data);
			});
	}, [location.state._id, location.state.rider_email]);

	return (
		<>
			<NavBarAdmin />
			{updateList.map((lists, index) => (
				<div className={style.row} key={index}>
					<div className={style.column1}>
						<Link
							className={style.backbutton}
							style={{ textDecoration: 'none' }}
							to='/admin/rider/report'>
							<ArrowBackIcon fontSize='large' />
						</Link>
						<h1 className={style.title}>Rider's Information</h1>
					</div>
					{riderList.map((rider, index) => (
						<div className={style.column2} key={index}>
							<div className={style.row1}>
								<div className={style.column11}>
									<h1 className={style.name1}>Rider's Email: {rider.email}</h1>
									<h1 className={style.cont}>
										Contact Number: {rider.contact}
									</h1>
								</div>
								<div className={style.column12}>
									<h1 className={style.from1}>From: </h1>
									<div>
										<Container className={style.text1} id='filled-basic'>
											{lists.from}
										</Container>
									</div>
									<ArrowDownwardIcon className={style.arrow} fontSize='large' />
									<h1 className={style.to1}>To:</h1>
									<div className={style.to2}>
										<div>
											<Container className={style.text2} id='filled-basic'>
												{lists.to}
											</Container>
										</div>
									</div>
								</div>
								<div className={style.column13}>
									<h1 className={style.rating}>Rating:</h1>
									{/* <ModalCancelled /> */}
									{/* <ModalDelivery /> */}
									<div className={style.stars}>
										<Rating
											name='read-only'
											value={lists.rating}
											readOnly
											size='large'
										/>
									</div>
									<h1 className={style.note}>Comment from Client: </h1>
									<div className={style.t3}>
										<Container
											className={style.text3}
											id='filled-basic'
											rows={4}>
											{lists.comment}
										</Container>
									</div>
								</div>
							</div>
						</div>
					))}
					<div className={style.column3}>
						<div className={style.button}>
							<BanRider userEmail={lists.rider_email} historyID={lists._id} />
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default AdminRiderInformation;
