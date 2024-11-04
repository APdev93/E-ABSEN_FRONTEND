import React, { createContext, useState, useEffect } from "react";

// Membuat konteks
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		setIsAuthenticated(!!token);
	}, []);

	const login = token => {
		sessionStorage.setItem("token", token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		sessionStorage.removeItem("token");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};


export { AuthContext, AuthProvider };
