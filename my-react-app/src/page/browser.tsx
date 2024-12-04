import type React from "react";
import { useState } from "react";
import Maps from "../component/map/maps";
import "leaflet/dist/leaflet.css";
import ProgressBar from "../component/progressBar/ProgressBar";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

const Browser: React.FC = () => {
	const [activeFilter, setActiveFilter] = useState<string | null>(null);
	const [activeSiteId, setActiveSiteId] = useState<string | null>(null);

	return (
		<div>
			<NavBar setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
			<Maps
				activeFilter={activeFilter}
				setActiveSiteId={setActiveSiteId}
				activeSiteId={activeSiteId}
			/>
			<ProgressBar activeSiteId={activeSiteId} />
		</div>
	);
};

export default Browser;
