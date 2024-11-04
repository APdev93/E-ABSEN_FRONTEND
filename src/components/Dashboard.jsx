import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Col } from "react-bootstrap";
import "../css/dashboard.css";
import Home from "../components/Menu/Home";
import Siswa from "../components/Menu/Siswa";
import Absen from "../components/Menu/Absen";
import NavBar from "../components/Navbar/NavBar";
import Button from "../components/Navbar/Button";

const Dashboard = () => {
	const [activeMenu, setActiveMenu] = useState("home");

	const renderContent = () => {
		switch (activeMenu) {
			case "home":
				return <Home />;
			case "siswa":
				return <Siswa />;
			case "absen":
				return <Absen />;
			default:
				return <Home />;
		}
	};

	const { logout } = useContext(AuthContext);

	return (
		<Container className="p-0 m-0" fluid>
			<Col md={3} lg={2} className="bg-light shadow-sm h-10 w-100">
				<NavBar>
					<Button label="Utama" onClick={() => setActiveMenu("home")} />
					<Button label="Siswa" onClick={() => setActiveMenu("siswa")} />
					<Button label="Absen" onClick={() => setActiveMenu("absen")} />
					<Button label="Logout" onClick={logout} variant="color-dark btn-danger" />
				</NavBar>
			</Col>

			<Col
				md={9}
				lg={10}
				
				className="w-100 dashboard-content p-2 mt-5">
				{renderContent()}
			</Col>
		</Container>
	);
};

export default Dashboard;
