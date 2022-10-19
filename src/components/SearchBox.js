import React, { useEffect, useState } from 'react';
import {
	OutlinedInput,
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@mui/material';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';
// const params = {
// 	q: '',
// 	format: 'json',
// 	addressdetails: 'addressdetails',
// };

function SearchBox(props) {
	const { selectPosition, setSelectPosition } = props;
	const [searchText, setSearchText] = useState('');
	const [listPlace, setListPlace] = useState([]);

	useEffect(() => {
		if (selectPosition?.display_name) {
			setSearchText(selectPosition?.display_name);
		}
	}, [selectPosition]);
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: 'flex' }}>
				<div style={{ flex: 1, paddingLeft: '1rem' }}>
					<OutlinedInput
						style={{
							width: '710px',
							height: '60px',
							background: '#ffffff',
							border: '2px solid #000000',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
							borderRadius: '10px',
						}}
						value={searchText}
						onChange={(event) => {
							setSearchText(event.target.value);
							const params = {
								q: searchText + ' cebu',
								format: 'json',
								addressdetails: 1,
								polygon_geojson: 0,
							};
							const queryString = new URLSearchParams(params).toString();
							const requestOptions = {
								method: 'GET',
								redirect: 'follow',
							};
							fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
								.then((response) => response.text())
								.then((result) => {
									console.log(JSON.parse(result));
									setListPlace(JSON.parse(result));
								})
								.catch((err) => console.log('err: ', err));
						}}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						padding: '0px 1rem',
					}}>
					<Button
						variant='contained'
						sx={{ backgroundColor: '#F7BC50' }}
						onClick={() => {
							//Search
							const params = {
								q: searchText + ' cebu',
								format: 'json',
								addressdetails: 1,
								polygon_geojson: 0,
							};
							const queryString = new URLSearchParams(params).toString();
							const requestOptions = {
								method: 'GET',
								redirect: 'follow',
							};
							fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
								.then((response) => response.text())
								.then((result) => {
									console.log(JSON.parse(result));
									setListPlace(JSON.parse(result));
								})
								.catch((err) => console.log('err: ', err));
						}}>
						Search
					</Button>
				</div>
			</div>
			<div>
				<List
					component='nav'
					aria-label='main mailbox folders'
					style={{ maxWidth: '710px' }}>
					{listPlace.map((item) => {
						return (
							<div key={item?.place_id}>
								<ListItem
									button
									onClick={() => {
										setSelectPosition(item);
									}}>
									<ListItemIcon>
										<img
											src='../marker.png'
											alt='Marker'
											style={{ width: '28px', height: '38px' }}
										/>
									</ListItemIcon>
									<ListItemText primary={item?.display_name} />
								</ListItem>
								<Divider />
							</div>
						);
					})}
				</List>
			</div>
		</div>
	);
}

export default SearchBox;
