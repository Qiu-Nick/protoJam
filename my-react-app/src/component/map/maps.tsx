import { useEffect, useRef } from "react";
import "./maps.css";

// Improved type declarations without npm types
declare global {
	interface Window {
		L: {
			map: (el: HTMLElement) => LeafletMap;
			tileLayer: (url: string, options: TileLayerOptions) => TileLayer;
			marker: (coords: [number, number]) => Marker;
		};
	}
}

// Define Leaflet types
interface LeafletMap {
	setView: (coords: [number, number], zoom: number) => LeafletMap;
	remove: () => void;
}

interface TileLayer {
	addTo: (map: LeafletMap) => void;
}

interface TileLayerOptions {
	maxZoom: number;
	attribution: string;
}

interface Marker {
	addTo: (map: LeafletMap) => Marker;
	bindPopup: (content: string) => Marker;
}

function getRandomCoords(
	center: [number, number],
	radius: number,
): [number, number] {
	const y0 = center[0];
	const x0 = center[1];
	const rd = radius / 111300; // about 111300 meters in one degree

	const u = Math.random();
	const v = Math.random();

	const w = rd * Math.sqrt(u);
	const t = 2 * Math.PI * v;
	const x = w * Math.cos(t);
	const y = w * Math.sin(t);

	const newLat = y + y0;
	const newLon = x + x0;

	return [newLat, newLon];
}

function Maps({ activeFilter }) {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const mapInstance = useRef<LeafletMap | null>(null);

	// Constants
	const ZOOM_LEVEL = 13;
	const TILE_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const MAP_ATTRIBUTION =
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	const locations = [
		{ name: "Goutte", coords: [21.011523, -11.103842], type: "Eau" },
		{ name: "Source", coords: [21.002124, -11.09058], type: "Eau" },
		{ name: "Puits", coords: [21.031523, -11.123842], type: "Eau" },
		{ name: "Bunker Alpha", coords: [21.038498, -11.084229], type: "Bunker" },
		{ name: "Bunker Bravo", coords: [20.989784, -11.121737], type: "Bunker" },
		{ name: "Bunker Charlie", coords: [21.015505, -11.054188], type: "Bunker" },
		{ name: "Bunker Delta", coords: [21.021915, -11.090924], type: "Bunker" },
		{
			name: "Station Électrique 1",
			coords: [20.999159, -11.058394],
			type: "Electricité",
		},
		{
			name: "Station Électrique 2",
			coords: [21.021514, -11.10088],
			type: "Electricité",
		},
	];

	useEffect(() => {
		const L = window.L;

		if (!L || !mapRef.current || mapInstance.current) return;

		try {
			const initialCoords = locations[0].coords;
			mapInstance.current = L.map(mapRef.current).setView(
				initialCoords,
				ZOOM_LEVEL,
			);

			L.tileLayer(TILE_LAYER_URL, {
				maxZoom: ZOOM_LEVEL,
				attribution: MAP_ATTRIBUTION,
			}).addTo(mapInstance.current);

			locations
				.filter((location) => !activeFilter || location.type === activeFilter)
				.forEach((location) => {
					L.marker(location.coords)
						.addTo(mapInstance.current)
						.bindPopup(location.name);
				});
		} catch (error) {
			console.error("Erreur d'initialisation de la carte:", error);
		}

		return () => {
			if (mapInstance.current) {
				mapInstance.current.remove();
				mapInstance.current = null;
			}
		};
	}, [activeFilter]);

	return (
		<div className="map_container">
			<div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }} />
		</div>
	);
}

export default Maps;
