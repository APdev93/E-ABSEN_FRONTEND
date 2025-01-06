import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import Home from "../components/Menu/Home";
import Siswa from "../components/Menu/Siswa";
import Absen from "../components/Menu/Absen";
import HasilAbsen from "../components/Menu/HasilAbsen";
import Jurusan from "../components/Menu/Jurusan";
import Sidebar from "../components/Sidebar/Sidebar";

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
			case "absen_result":
				return <HasilAbsen />;
			case "jurusan":
				return <Jurusan />;
			default:
				return <Home />;
		}
	};

	return (
		<div className="ctnr" style={{ display: "flex", height: "100vh" }}>
			<div
				className="s-bg"
				style={{
					backgroundImage: "url('/skolah.jpg')",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					height: "100vh",
				}}
			>
				<Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
			</div>

			<div
				className="content"
				style={{
					width: "100%",
					height: "100vh",
					overflow: "auto",
					flexGrow: 1,
				}}
				id="content"
			>
				{renderContent()}
			</div>
		</div>
	);
};

export default Dashboard;