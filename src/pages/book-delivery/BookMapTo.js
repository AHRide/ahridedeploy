import { Button } from '@mui/material';
import React, { useState } from 'react';
import Map from '../../components/Map';
import SearchBox from '../../components/SearchBox';
import { useNavigate } from 'react-router-dom';

function BookMapTo() {
	const [selectPosition, setSelectPosition] = useState(null);
	const navigate = useNavigate();

	const toBookDelivery = (selectToPosition) => {
		navigate('/client/book', { state: { selectToPosition } });
	};

	console.log(selectPosition);

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '100vw',
					height: '100vh',
				}}>
				<div style={{ width: '50%', height: '100%' }}>
					<Map selectPosition={selectPosition} />
				</div>
				<div style={{ width: '50%' }}>
					<SearchBox
						selectPosition={selectPosition}
						setSelectPosition={setSelectPosition}
					/>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '1rem',
				}}>
				<Button
					variant='contained'
					size='small'
					sx={{ backgroundColor: '#F7BC50' }}
					onClick={() => {
						toBookDelivery(selectPosition);
					}}>
					To
				</Button>
			</div>
		</>
	);
}

export default BookMapTo;
