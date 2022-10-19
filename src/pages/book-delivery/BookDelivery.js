import React, { useState, useContext } from 'react';
import Axios from 'axios';
import './BookDelivery.css';
import { UserContext } from '../../contexts/user.context';
import NavBarClient from '../../components/NavBarClient';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { useNavigate } from 'react-router-dom';

import {
	Box,
	IconButton,
	Checkbox,
	FormControlLabel,
	TextField,
	Input,
	Button,
} from '@mui/material';
import { orange } from '@mui/material/colors';

import {
	useJsApiLoader,
	GoogleMap,
	MarkerF,
	DirectionsRenderer,
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
	getDetails,
} from 'use-places-autocomplete';

import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

const center = { lat: 10.315699, lng: 123.885437 };
const containerStyle = {
	width: '100%',
	height: '100%',
};

function BookDelivery() {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyBjVHt2JjYCpHVzZOGfYjxdJVPLzkoB8jc',
		libraries: ['places'],
	});

	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const [map, setMap] = useState(/** @type google.maps.Map */ (null));
	const [selectedFrom, setSelectedFrom] = useState(null);
	const [selectedTo, setSelectedTo] = useState(null);
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [receiver_name, setReceiver] = useState('');
	const [receiver_cont, setContact] = useState('');
	const [note, setNote] = useState('');

	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [distance, setDistance] = useState('');
	const [duration, setDuration] = useState('');

	const removeUnit = distance.replace('km', '');
	const payment = parseFloat(removeUnit) * 1000 * 0.03;

	if (!isLoaded) {
		return <div> loading...</div>;
	}

	async function calculateRoute() {
		if (from === '' || to === '') {
			return;
		}
		// eslint-disable-next-line no-undef
		const directionsService = new google.maps.DirectionsService();
		const results = await directionsService.route({
			origin: from,
			destination: to,
			// eslint-disable-next-line no-undef
			travelMode: google.maps.TravelMode.DRIVING,
		});

		setDirectionsResponse(results);
		setDistance(results.routes[0].legs[0].distance.text);
		setDuration(results.routes[0].legs[0].duration.text);
	}

	function clearRoute() {
		map.panTo(center);
		map.setZoom(13);
		setDirectionsResponse(null);
		setDistance('');
		setDuration('');
		setFrom('');
		setTo('');
		setSelectedFrom(null);
		setSelectedTo(null);
	}

	const bookDelivery = () => {
		Axios.post('https://ahride.herokuapp.com/bookDelivery', {
			client_email: user._profile.data.email,
			from,
			to,
			receiver_name,
			receiver_cont,
			note,
			payment,
			duration,
		});
		alert(`Successfully Booked a Delivery!`);
		navigate('/delivery-updates');
	};

	return (
		<div>
			<NavBarClient />

			<Box
				sx={{ width: '100vw', height: '100vh' }}
				style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: '1.5rem',
					}}>
					<IconButton
						className='back'
						size='large'
						onClick={() => navigate('/client/homepage')}>
						<ArrowBackIcon sx={{ color: orange[300] }} fontSize='inherit' />
					</IconButton>
					<div className='bookBox'>Book Delivery</div>
					<div style={{ width: '3rem' }}></div>
				</div>
				<div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							padding: '1.5rem',
						}}>
						<div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-evenly',
								}}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-evenly',
									}}>
									<h1 className='textField1'>From:</h1>
									<PlacesAutoCompleteFrom
										setSelectedFrom={setSelectedFrom}
										setFrom={setFrom}
									/>
								</div>
								<div style={{ alignSelf: 'center', padding: '0.8rem' }}>
									<ArrowDownward sx={{ color: orange[300] }} fontSize='large' />
								</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-evenly',
									}}>
									<h1 className='textField1'>To:</h1>
									<PlacesAutoCompleteTo
										setSelectedTo={setSelectedTo}
										setTo={setTo}
									/>
								</div>
							</div>
							<div style={{ padding: '1rem' }}>
								{/* <FormControlLabel
									control={<Checkbox defaultChecked size='large' />}
									label='Are you the receiver?'
								/> */}
							</div>
							<div className='border-box'>
								<div className='box-pad'>
									<h2 className='text2'>Receiver Name: </h2>
									<Input
										id='input-textfield'
										variant='standard'
										sx={{
											width: '23rem',
											height: '2.5rem',
											background: '#ffffff',
											border: '1px solid #000000',
											borderRadius: '5px',
										}}
										name='receiver_name'
										onChange={(event) => {
											setReceiver(event.target.value);
										}}
									/>
								</div>
								<div className='box-pad'>
									<h2 className='text2'>Contact Number: </h2>
									<Input
										type='number'
										id='input-textfield'
										sx={{
											width: '23rem',
											height: '2.5rem',
											background: '#ffffff',
											border: '1px solid #000000',
											borderRadius: '5px',
										}}
										name='receiver_cont'
										onChange={(event) => {
											setContact(event.target.value);
										}}
									/>
								</div>
							</div>
							<h1>Note</h1>
							<div className='border-box'>
								<TextField
									sx={{ background: '#FFFFFF' }}
									fullWidth
									id='outlined-multiline-static'
									placeholder='Do you have special request? or want to input specific locations?'
									multiline
									rows={4}
									name='note'
									onChange={(event) => {
										setNote(event.target.value);
									}}
								/>
							</div>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div
								style={{
									width: '35rem',
									height: '35rem',
									border: '5px solid #f7bc50',
									borderRadius: '5px',
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
								}}>
								<GoogleMap
									zoom={13}
									center={center}
									mapContainerStyle={containerStyle}
									mapContainerClassName='map-containers'
									options={{
										zoomControl: true,
										streetViewControl: false,
										mapTypeControl: false,
										fullscreenControl: false,
									}}
									onLoad={(map) => setMap(map)}>
									{directionsResponse && (
										<DirectionsRenderer directions={directionsResponse} />
									)}
									{selectedFrom && (
										<MarkerF
											position={selectedFrom}
											onPositionChanged={() => {
												map.panTo(selectedFrom);
												map.setZoom(14);
											}}
										/>
									)}
									{selectedTo && (
										<MarkerF
											position={selectedTo}
											onPositionChanged={() => {
												map.panTo(selectedTo);
												map.setZoom(14);
											}}
										/>
									)}
								</GoogleMap>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-evenly',
									alignContent: 'center',
									padding: '2rem',
								}}>
								<Button
									onClick={calculateRoute}
									sx={{
										width: '2rem',
										height: '2rem',

										background: '#F7BC50',
										boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
										borderRadius: '15px',
										color: 'black',
										fontSize: 'small',
									}}>
									Save
								</Button>
								<p>Distance: {distance} </p>
								<p>Est. Time: {duration} </p>
								<p>To Pay:Php {payment} </p>
								<Button
									onClick={clearRoute}
									sx={{
										width: '3em',
										height: '2em',
									}}>
									Clear
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div style={{ alignSelf: 'center' }}>
					<Button
						onClick={bookDelivery}
						sx={{
							width: '15.5rem',
							height: '4rem',
							marginBottom: '10%',
							background: '#F7BC50',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
							borderRadius: '15px',
							color: 'black',
							fontSize: '25px',
						}}>
						Book
					</Button>
				</div>
			</Box>
		</div>
	);
}

const PlacesAutoCompleteFrom = ({ setSelectedFrom, setFrom }) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();
	const [index, setIndex] = useState(0);
	const handleSelect = async (address) => {
		setValue(address, false);

		clearSuggestions();

		const results = await getGeocode({ address });
		const parameter = {
			placeId: results[index].place_id,

			fields: ['name'],
		};
		getDetails(parameter).then((details) => {
			setFrom(details.name);
		});
		const { lat, lng } = await getLatLng(results[index]);
		setSelectedFrom({ lat, lng });
	};

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				className='combobox-input'
			/>
			<ComboboxPopover>
				<ComboboxList>
					{status === 'OK' &&
						data.map(({ place_id, description, index }) => (
							<ComboboxOption
								key={place_id}
								value={description}
								index={index}
								onClick={() => setIndex(index)}
							/>
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
};

const PlacesAutoCompleteTo = ({ setSelectedTo, setTo }) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();

	const [index, setIndex] = useState(0);
	const handleSelect = async (address) => {
		setValue(address, false);

		clearSuggestions();

		const results = await getGeocode({ address });
		const parameter = {
			placeId: results[index].place_id,

			fields: ['name'],
		};
		getDetails(parameter).then((details) => {
			setTo(details.name);
		});
		const { lat, lng } = await getLatLng(results[index]);
		setSelectedTo({ lat, lng });
	};

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				style={{
					width: '44rem',
					height: '3.rem',
				}}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				className='combobox-input'
			/>
			<ComboboxPopover>
				<ComboboxList>
					{status === 'OK' &&
						data.map(({ place_id, description, index }) => (
							<ComboboxOption
								key={place_id}
								value={description}
								index={index}
								onClick={() => setIndex(index)}
							/>
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
};

export default BookDelivery;
