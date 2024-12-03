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

function Maps() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<LeafletMap | null>(null);

  // Constants
  const STRASBOURG_COORDS: [number, number] = [
    48.582366922989564, 7.751033141729111,
  ];
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
        .bindPopup("Strasbourg");
    } catch (error) {
      console.error("Erreur d'initialisation de la carte:", error);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="map_container">
      <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }} />
    </div>
  );
}

export default Maps;
