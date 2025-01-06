import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
               <SSRProvider>
    				<Routes>
    					<Route path="/*" element={<App />} />
    				</Routes>
                </SSRProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
