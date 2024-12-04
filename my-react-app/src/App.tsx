import "./App.css";

import type React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Browser from "./page/browser";
import Header from "./component/Header";
import Footer from "./component/Footer";

const App: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="App">
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
							<Footer />
						</div>
					}
				/>
				<Route path="/browser" element={<Browser />} />
			</Routes>
		</div>
	);
};

export default App;
