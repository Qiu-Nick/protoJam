import type React from "react";
import { useEffect, useState } from "react";
import "./ProgressBar.css";

interface Site {
	id: string;
	nom: string;
	type: string;
	densité: string;
	ressources: string;
	danger_alentour: string;
}

const ProgressBar: React.FC = () => {
	const [sites, setSites] = useState<Site[]>([]);
	const [loading, setLoading] = useState(true);

	// Fonction pour récupérer les données
	const fetchSites = async () => {
		try {
			const response = await fetch("https://proto-jam-api.vercel.app/items");
			const data = await response.json();
			console.log("API response:", data);
			setSites(data.sites || []);
		} catch (error) {
			console.error("Erreur lors du fetch:", error);
			alert("Impossible de récupérer les sites. Veuillez réessayer plus tard.");
		} finally {
			setLoading(false);
		}
	};

	// Appeler l'API au chargement du composant
	useEffect(() => {
		fetchSites();
	}, []);

	return (
		<>
			{loading && <p>Chargement des données...</p>}
			{sites.map((site) => (
				<div key={site.id} style={{ marginBottom: "20px" }}>
					<h2>
						{site.nom} ({site.type})
					</h2>
					<div
						className="w3-light-grey w3-round-xlarge"
						style={{ marginBottom: "5px" }}
					>
						<div
							id="progress_bar"
							className="w3-container w3-blue w3-round-xlarge"
							style={{ width: `${Number.parseInt(site.densité)}%` }}
						>
							Densité: {site.densité}%
						</div>
					</div>
					<div
						className="w3-light-grey w3-round-xlarge"
						style={{ marginBottom: "5px" }}
					>
						<div
							id="progress_bar"
							className="w3-container w3-green w3-round-xlarge"
							style={{ width: `${Number.parseInt(site.ressources)}%` }}
						>
							Ressources: {site.ressources}%
						</div>
					</div>
					<div className="w3-light-grey w3-round-xlarge">
						<div
							id="progress_bar"
							className="w3-container w3-red w3-round-xlarge"
							style={{ width: `${Number.parseInt(site.danger_alentour)}%` }}
						>
							Danger Alentour: {site.danger_alentour}%
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default ProgressBar;