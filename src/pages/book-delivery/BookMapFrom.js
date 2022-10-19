import { Button } from '@mui/material';
import React, { useState } from 'react';
import Map from '../../components/Map';
import SearchBox from '../../components/SearchBox';
import { useNavigate, useParams } from 'react-router-dom';

function BookMapFrom() {
	const [selectPosition, setSelectPosition] = useState(null);
	const navigate = useNavigate();
	const state = useParams();

	const fromBookDelivery = (selectFromPosition) => {
		navigate('/client/book', { state: { selectFromPosition } });
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
				<div style={{ width: '60vw', height: '100%' }}>
					<Map selectPosition={selectPosition} />
				</div>
				<div style={{ width: '40vw' }}>
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
						fromBookDelivery(selectPosition);
					}}>
					From
				</Button>
			</div>
		</>
	);
}

export default BookMapFrom;
