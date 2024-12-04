import { useState } from "react";
import "./NavBar.css";

export default function NavBar({ setActiveFilter }) {
	const [activeButton, setActiveButton] = useState<string | null>(null);

	const handleButtonClick = (type: string) => {
		if (activeButton === type) {
			setActiveButton(null);
			setActiveFilter(null);
		} else {
			setActiveButton(type);
			setActiveFilter(type);
		}
	};

	return (
		<nav>
			<ul>
				<li>
					<button
						type="button"
						className={`btn ${activeButton === "Bunker" ? "active" : ""}`}
						id="Bunker"
						onClick={() => handleButtonClick("Bunker")}
					>
						Bunker
					</button>
				</li>
				<li>
					<button
						type="button"
						className={`btn ${activeButton === "Eau" ? "active" : ""}`}
						id="Eau"
						onClick={() => handleButtonClick("Eau")}
					>
						Eau
					</button>
				</li>
				<li>
					<button
						type="button"
						className={`btn ${activeButton === "Electricité" ? "active" : ""}`}
						id="Electricite"
						onClick={() => handleButtonClick("Electricité")}
					>
						Electricité
					</button>
				</li>
			</ul>
		</nav>
	);
}
