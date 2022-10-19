import React, { useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete';

import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

const containerStyle = {
	width: '100%',
	height: '100%',
};

export default function GoogleMapComp(props) {
	const center = useMemo(() => ({ lat: 10.315699, lng: 123.885437 }), []);
	const { selectedFrom } = props;

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyBjVHt2JjYCpHVzZOGfYjxdJVPLzkoB8jc',
		libraries: ['places'],
	});

	if (!isLoaded) return <div>loading....</div>;
	return (
		<>
			<GoogleMap
				zoom={15}
				center={center}
				mapContainerStyle={containerStyle}
				mapContainerClassName='map-containers'
				options={{
					zoomControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
				}}>
				<MarkerF position={selectedFrom} />
			</GoogleMap>
		</>
	);
}

function Map(props) {
	const center = useMemo(() => ({ lat: 10.315699, lng: 123.885437 }), []);
	const { selectedFrom, setSelectedFrom, selectedTo, setSelectedTo } = props;
	return (
		<>
			{/* <div className='places-container'>
				<PlacesAutoComplete setSelected={setSelected} />
			</div> */}
			<GoogleMap
				zoom={15}
				center={center}
				mapContainerStyle={containerStyle}
				mapContainerClassName='map-containers'
				options={{
					zoomControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
				}}>
				{selectedFrom && <MarkerF position={selectedFrom} />}
				{setSelectedTo && <MarkerF position={selectedTo} />}
			</GoogleMap>
		</>
	);
}

const PlacesAutoComplete = ({ setSelected }) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();

	const handleSelect = async (address) => {
		setValue(address, false);
		clearSuggestions();

		const results = await getGeocode({ address });
		const { lat, lng } = await getLatLng(results[0]);
		setSelected({ lat, lng });
	};

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				className='combobox=input'
			/>
			<ComboboxPopover>
				<ComboboxList>
					{status === 'OK' &&
						data.map(({ place_id, description }) => (
							<ComboboxOption key={place_id} value={description} />
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
};
