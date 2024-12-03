import type React from "react";
import Maps from "../component/map/maps";
import "leaflet/dist/leaflet.css";
import ProgressBar from "../component/progressBar/ProgressBar";

const Browser: React.FC = () => {
	return (
		<div>
			<Maps />
			<ProgressBar />
		</div>
	);
};

export default Browser;
