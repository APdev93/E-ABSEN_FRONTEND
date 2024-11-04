import React from "react";

const Button = ({ label, onClick, variant = "nav-btn" }) => {
	return (
		<button className={`btn ${variant}`} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
