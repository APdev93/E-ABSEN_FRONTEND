import React from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* Public routes */}
				<Route index element={<LoginForm />} /> {/* Default route */}
				<Route path="login" element={<LoginForm />} />
				{/* Protected routes */}
				<Route element={<RequireAuth />}>
					<Route path="dashboard" element={<Dashboard />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
