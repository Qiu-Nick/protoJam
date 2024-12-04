import "./App.css";

import type React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Browser from "./page/browser";
import Header from "./component/Header";

const App: React.FC = () => {
	const navigate = useNavigate();

	return (

		<Routes>
			<Route
				path="/"
				element={
					<div className="fond">
						<Header />
						<button
							type="button"
							onClick={() => navigate("/browser")}
							className="bouton"
						>
							Safe Zones
						</button>
					</div>
				}
			/>
			<Route path="/browser" element={<Browser />} />
		</Routes>

		<div className="App">
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
		</div>
	);
};

export default App;
