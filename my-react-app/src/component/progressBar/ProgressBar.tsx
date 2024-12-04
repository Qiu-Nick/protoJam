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

const ProgressBar: React.FC<{ activeSiteId: string | null }> = ({ activeSiteId }) => {
	const [sites, setSites] = useState<Site[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	// Fonction pour récupérer les données

	// Appeler l'API au chargement du composant
	useEffect(() => {
		const fetchSites = async () => {
			try {
				const response = await fetch(
					"https://proto-jam-api.vercel.app/items",
					{},
				);
				console.log(response);

				if (!response.ok) {
					throw new Error("Réponse du serveur incorrecte");
				}
				const data = await response.json();
				setSites(data.sites || []);
			} catch (error) {
				console.error("Erreur lors du fetch:", error);
				alert(
					"Impossible de récupérer les sites. Veuillez réessayer plus tard.",
				);
			} finally {
				setLoading(false);
			}
		};
		fetchSites();
	}, []);

	const selectedSite = sites.find((site) => site.id === activeSiteId);

	return (
		<>
			{loading && <p>Chargement des données...</p>}
			{selectedSite && (
				<div key={selectedSite.id} style={{ marginBottom: "20px" }}>
					<h2>
						{selectedSite.nom} ({selectedSite.type})
					</h2>
					<div
						className="w3-light-grey w3-round-xlarge"
						style={{ marginBottom: "5px" }}
					>
						<div
							id="progress_bar"
							className="w3-container w3-blue w3-round-xlarge"
							style={{ width: `${Number.parseInt(selectedSite.densité)}%` }}
						>
							Densité: {selectedSite.densité}%
						</div>
					</div>
					<div
						className="w3-light-grey w3-round-xlarge"
						style={{ marginBottom: "5px" }}
					>
						<div
							id="progress_bar"
							className="w3-container w3-green w3-round-xlarge"
							style={{ width: `${Number.parseInt(selectedSite.ressources)}%` }}
						>
							Ressources: {selectedSite.ressources}%
						</div>
					</div>
					<div className="w3-light-grey w3-round-xlarge">
						<div
							id="progress_bar"
							className="w3-container w3-red w3-round-xlarge"
							style={{ width: `${Number.parseInt(selectedSite.danger_alentour)}%` }}
						>
							Danger Alentour: {selectedSite.danger_alentour}%
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProgressBar;
