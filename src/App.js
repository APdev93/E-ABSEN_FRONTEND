import React, { useContext } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// Komponen untuk melindungi rute
function ProtectedRoute({ element }) {
	const { isAuthenticated } = useContext(AuthContext);
	return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<LoginForm />} />
					<Route
						path="/dashboard"
						element={<ProtectedRoute element={<Dashboard />} />}
					/>
					<Route path="/" element={<Navigate to="/login" />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
