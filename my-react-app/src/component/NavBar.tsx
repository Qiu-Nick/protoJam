import "./NavBar.css";

export default function NavBar() {
	return (
		<nav>
			<ul>
				<label htmlFor="Bunker">
					<li className="btn">Bunker</li>
				</label>
				<label htmlFor="Eau">
					<li className="btn">Eau</li>
				</label>
				<label htmlFor="Electricite">
					<li className="btn">Electricité</li>
				</label>
			</ul>
		</nav>
	);
}
