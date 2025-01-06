import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div
			className={`sidebar ${sidebarOpen ? "" : "closed"}`}
			id="sidebar"
			style={{
				backgroundImage: `linear-gradient(rgba(28,61,38,0.884), rgba(28,61,38,0.884)), url('/skolah.jpg')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				height: "100vh",
				flexShrink: 0,
				backdropFilter: "blur(10px)",
				WebkitBackdropFilter: "blur(10px)"
			}}
		>
			<div className="logo">
				<img src="/logo.png" width="50" alt="logo" />
				<div className={sidebarOpen ? "d-flex flex-column flex-center" : "d-none"}>
					<p className="title">SAMANTEK</p>
					<p className="subtitle">SISTEM ABSENSI MA NW TEKO</p>
				</div>
				<button
					className="menu-btn"
					id="menu-btn"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					<i className="fa-solid fa-bars"></i>
				</button>
			</div>
			<ul>
				<li
					className={activeMenu === "home" ? "active" : ""}
					onClick={() => setActiveMenu("home")}
				>
					<i className="fa-solid fa-gauge"></i> {sidebarOpen && <span>Home</span>}
				</li>
				<li
					className={activeMenu === "siswa" ? "active" : ""}
					onClick={() => setActiveMenu("siswa")}
				>
					<i className="fa-solid fa-user"></i> {sidebarOpen && <span>Siswa</span>}
				</li>
				<li
					className={activeMenu === "absen" ? "active" : ""}
					onClick={() => setActiveMenu("absen")}
				>
					<i className="fa-solid fa-expand"></i>
					{sidebarOpen && <span>Absen</span>}
				</li>
				<li
					className={activeMenu === "absen_result" ? "active" : ""}
					onClick={() => setActiveMenu("absen_result")}
				>
					<i className="fa-solid fa-list-check"></i>
					{sidebarOpen && <span>Hasil Absen</span>}
				</li>
				<li
					className={activeMenu === "jurusan" ? "active" : ""}
					onClick={() => setActiveMenu("jurusan")}
				>
					<i className="fa-solid fa-graduation-cap"></i>
					{sidebarOpen && <span>Jurusan</span>}
				</li>
				<li className="bottom logout" onClick={handleLogout}>
					<i className="fa-solid fa-power-off"></i>
					{sidebarOpen && <span>Logout</span>}
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
