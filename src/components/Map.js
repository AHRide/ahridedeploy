import { useEffect, useState } from 'react';
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

const icon = L.icon({
	iconUrl: '../marker.png',
	iconSize: [28, 38],
});

const iconMe = L.icon({
	iconUrl: '../youAreHere.png',
	iconSize: [40, 60],
});

const position = [10.315699, 123.885437];

function ResetCenterView(props) {
	const { selectPosition } = props;
	const map = useMap();

	useEffect(() => {
		if (selectPosition) {
			map.setView(
				L.latLng(selectPosition?.lat, selectPosition?.lon),
				map.getZoom(),
				{
					animate: true,
				}
			);
		}
	}, [selectPosition]);
	return null;
}

function ResetCenterViewTo(props) {
	const { selectPositionTo } = props;
	const map = useMap();

	useEffect(() => {
		if (selectPositionTo) {
			map.setView(
				L.latLng(selectPositionTo?.lat, selectPositionTo?.lon),
				map.getZoom(),
				{
					animate: true,
				}
			);
		}
	}, [selectPositionTo]);
	return null;
}

function LocationMarker() {
	const [position, setPosition] = useState(null);
	const map = useMapEvents({
		click() {
			map.locate();
		},
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});

	return position === null ? null : (
		<Marker position={position} icon={iconMe}>
			<Popup>You are here</Popup>
		</Marker>
	);
}

function Map(props) {
	const { selectPosition, selectPositionTo } = props;

	const locationSelection = [selectPosition?.lat, selectPosition?.lon];
	const locationName = selectPosition?.display_name;

	const locationSelectionTo = [selectPositionTo?.lat, selectPositionTo?.lon];
	const locationNameTo = selectPositionTo?.display_name;

	return (
		<MapContainer
			center={position}
			zoom={13}
			style={{ width: '100%', height: '100%' }}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{selectPosition && (
				<Marker
					position={locationSelection}
					icon={icon}
					eventHandlers={{
						click: () => {
							console.log('marker clicked');
						},
					}}>
					<Popup>{locationName}</Popup>
				</Marker>
			)}
			{selectPositionTo && (
				<Marker
					position={locationSelectionTo}
					icon={icon}
					eventHandlers={{
						click: () => {
							console.log('marker clicked');
						},
					}}>
					<Popup>{locationNameTo}</Popup>
				</Marker>
			)}
			<ResetCenterView selectPosition={selectPosition} />
			<ResetCenterViewTo selectPositionTo={selectPositionTo} />
			<LocationMarker />
		</MapContainer>
	);
}

export default Map;
