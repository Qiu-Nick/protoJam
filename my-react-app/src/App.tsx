import { useState } from "react";
import "./App.css";
import sites from "./data/Site";
import ProgressBar from "./component/progressBar/ProgressBar";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="progress-bars">
				{sites.map((site) => (
					<div key={site.ID}>
						<ProgressBar
							label="Densité de Population"
							percentage={Number.parseInt(site.densité)}
						/>
						<ProgressBar
							label="Ressources"
							percentage={Number.parseInt(site.ressources)}
						/>
						<ProgressBar
							label="Danger Alentour"
							percentage={Number.parseInt(site.danger_alentour)}
						/>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
