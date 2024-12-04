import type React from "react";
import { useState } from "react";
import Maps from "../component/map/maps";
import "leaflet/dist/leaflet.css";
import ProgressBar from "../component/progressBar/ProgressBar";
import NavBar from "../component/NavBar";

const Browser: React.FC = () => {
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	return (
		<div>
			<NavBar setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
			<Maps activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
			<ProgressBar />
		</div>
	);
};

export default Browser;
