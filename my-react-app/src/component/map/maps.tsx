import { useEffect, useRef, useState } from "react";
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

function Maps() {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const mapInstance = useRef<LeafletMap | null>(null);

	// Constants
	// const STRASBOURG_COORDS: [number, number] = [20.953788, -11.235549];
	const [STRASBOURG_COORDS, setSTRASBOURG_COORDS] = useState<[number, number]>([
		20.953788, -11.235549,
	]);
	navigator.geolocation.getCurrentPosition(
		(position) => {
			setSTRASBOURG_COORDS([
				position.coords.latitude,
				position.coords.longitude,
			]);
		},
		() => {
			console.error("Erreur de récupération des coordonnées GPS");
		},
		{},
	);

	const ZOOM_LEVEL = 13;
	const TILE_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const MAP_ATTRIBUTION =
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	useEffect(() => {
		const L = window.L;

		if (!L || !mapRef.current || mapInstance.current) return;

		try {
			mapInstance.current = L.map(mapRef.current).setView(
				STRASBOURG_COORDS,
				ZOOM_LEVEL,
			);

			L.tileLayer(TILE_LAYER_URL, {
				maxZoom: ZOOM_LEVEL,
				attribution: MAP_ATTRIBUTION,
			}).addTo(mapInstance.current);

			L.marker(STRASBOURG_COORDS)
				.addTo(mapInstance.current)
				.bindPopup("Bunker Bravo");
		} catch (error) {
			console.error("Erreur d'initialisation de la carte:", error);
		}

		return () => {
			if (mapInstance.current) {
				mapInstance.current.remove();
				mapInstance.current = null;
			}
		};
	}, [STRASBOURG_COORDS]);

	return (
		<div className="map_container">
			<div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }} />
		</div>
	);
}

export default Maps;
