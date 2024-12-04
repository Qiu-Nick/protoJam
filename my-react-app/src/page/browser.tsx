import type React from "react";
import Maps from "../component/map/maps";
import "leaflet/dist/leaflet.css";
import ProgressBar from "../component/progressBar/ProgressBar";
import NavBar from "../component/NavBar";

const Browser: React.FC = () => {
	return (
		<div>
			<NavBar />
			<Maps />
			<ProgressBar />
		</div>
	);
};

export default Browser;
