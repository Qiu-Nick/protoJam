import { useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./Header";

const App: React.FC = () => {
	const [headerState] = useState(null);

	return (
		<>
			<div>
				<Header />
				{}
			</div>
		</>
	);
};

export default App;
