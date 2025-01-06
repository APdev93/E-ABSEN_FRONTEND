import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => {
		const savedAuth = sessionStorage.getItem("_A");
		return savedAuth ? JSON.parse(savedAuth) : {};
	});

	// Simpan auth ke localStorage setiap kali auth berubah
	useEffect(() => {
		sessionStorage.setItem("_A", JSON.stringify(auth));
		sessionStorage.setItem("_GA", auth._t);
	}, [auth]);

	// fungsi logout

	const logout = () => {
		sessionStorage.removeItem("_A");
		sessionStorage.setItem("_GA", "");
		setAuth({});
	};

	// Validasi expired token
	useEffect(() => {
		if (auth?._t) {
			const tokenPayload = JSON.parse(atob(auth._t.split(".")[1]));
			if (tokenPayload.exp * 1000 < Date.now()) {
				sessionStorage.removeItem("_A");
				setAuth({});
			}
		}
	}, [auth]);

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
