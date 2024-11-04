import React from "react";
import { Nav } from "react-bootstrap";

const NavBar = ({ children }) => {
	return (
		<Nav className="navbar flex-row fixed-top border-bottom p-3 justify-content-evenly color-dark">
			{children}
		</Nav>
	);
};

export default NavBar;
