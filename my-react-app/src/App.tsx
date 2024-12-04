
import "./App.css";
import NavBar from "./component/NavBar";

function App() {
	return (
		<>
			<NavBar />
		</>

import type React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Browser from "./page/browser";

const App: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Routes>
			<Route
				path="/"
				element={
					<div>
						<button type="button" onClick={() => navigate("/browser")}>
							Go to Browser
						</button>
					</div>
				}
			/>
			<Route path="/browser" element={<Browser />} />
		</Routes>

	);
};

export default App;
