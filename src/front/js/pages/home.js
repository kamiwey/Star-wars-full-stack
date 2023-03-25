import React, { useContext } from "react";
import "../../styles/home.css";
import Characters from "./Internal/Characters";
import Planets from "./Internal/Planets";
import Vehicles from "./Internal/Vehicles";

export const Home = () => (
	<div className="container-fluid mt-5">
		<h1 className="text ms-5 mb-3">Characters</h1>
		<div className="mx-auto" style={{ width: "90%"}}>
			<Characters />
		</div>
		<h1 className="text ms-5 mb-3 mt-4">Planets</h1>
		<div className="mx-auto" style={{ width: "90%"}}>
			<Planets />
		</div>
		<h1 className="text ms-5 mb-3 mt-4">Vehicles</h1>
		<div className="mx-auto" style={{ width: "90%"}}>
			<Vehicles />
		</div>
		
	</div>
);
