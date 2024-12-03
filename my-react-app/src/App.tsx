import { useState } from "react";
import "./App.css";
import ProgressBar from "./component/progressBar/ProgressBar";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="progress-bars">
				<ProgressBar label="Densité de Population" percentage={70} />
				<ProgressBar label="Ressources" percentage={50} />
				<ProgressBar label="Danger Alentour" percentage={30} />
			</div>
		</>
	);
}

export default App;
