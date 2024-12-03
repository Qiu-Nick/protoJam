const Header: React.FC = () => {
	const date = "31/12/2599";
	const messageBienvenue = "Bienvenue à tous les êtres Humains";
	const meteo = "Brumeux ☁️ -29°C ressenti -35° 🥶";
	const qualiteAir: string =
		"La respirabilité est de 1,2 sur l'échelle de ARES (ATMOSPHERIC RESPIRABILITY & ENDVIRONMENTAL SAFETY)";

	return (
		<header>
			<div className="carre">
				<h1>{messageBienvenue}</h1>
				<p>Date : {date}</p>
				<p>Météo : {meteo}</p>
				<p>Qualité de l'air : {qualiteAir}</p>
			</div>
		</header>
	);
};

export default Header;
