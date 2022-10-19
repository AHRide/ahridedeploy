import React from 'react';
import NavBarClient from '../../components/NavBarClient';
import './DisplayUpdatePage.css';
import DisplayDeliveryList from './components/DisplayDeliveryList';
import DisplayPendingList from './components/DiplayPendingList';

const DisplayUpdatePage = () => {
	return (
		<>
			<NavBarClient />
			<div className='main-container'>
				<h1 className='page-title'>In Progress</h1>

				<div className='row2'>
					<div className='column4'>
						<h2>Receiver</h2>
					</div>
					<div className='column5'>
						<h2>Location</h2>
					</div>
					<div className='column6'>
						<h2>Status</h2>
					</div>
				</div>

				<div className='row2'>
					<div className='column2'>
						<h4>From</h4>
					</div>
					<div className='column1'>
						<h4>----------&gt;</h4>
					</div>
					<div className='column3'>
						<h4>To</h4>
					</div>
				</div>
				<div>
					<DisplayDeliveryList />
				</div>
				<h1 className='page-title'>Pending</h1>

				<div className='row2'>
					<div className='column4'>
						<h2>Receiver</h2>
					</div>
					<div className='column5'>
						<h2>Location</h2>
					</div>
					<div className='column6'>
						<h2>Status</h2>
					</div>
				</div>

				<div className='row2'>
					<div className='column2'>
						<h4>From</h4>
					</div>
					<div className='column1'>
						<h4>----------&gt;</h4>
					</div>
					<div className='column3'>
						<h4>To</h4>
					</div>
				</div>
				<div>
					<DisplayPendingList />
				</div>
			</div>
		</>
	);
};

export default DisplayUpdatePage;
