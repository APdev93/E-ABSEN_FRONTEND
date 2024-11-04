import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MyAlert from "./MyAlert";
import Loader from "./Loader";
import "../config.js"

const LoginForm = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ username: "", password: "" });
	const [alert, setAlert] = useState({ variant: "", text: "" });
	const [loading, setLoading] = useState(false);

	const validateForm = () => {
		let valid = true;
		let errors = { username: "", password: "" };

		if (username.trim() === "") {
			errors.username = "Username tidak boleh kosong";
			valid = false;
		} else if (username.length < 5) {
			errors.username = "Username minimal 5 karakter";
			valid = false;
		}

		if (password.trim() === "") {
			errors.password = "Password tidak boleh kosong";
			valid = false;
		} else if (password.length < 6) {
			errors.password = "Password minimal 6 karakter";
			valid = false;
		}

		setErrors(errors);
		return valid;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (!validateForm()) return;

		setLoading(true);
		try {
			let response = await axios.post(`${global.backend}/auth/login`, {
				username,
				password,
			});
			let data = response.data;

			if (data.status_code === 200) {
				login(data.data.token);
				setLoading(false);
				setAlert({ variant: "success", text: "Berhasil login!" });
				setTimeout(() => {
					navigate("/dashboard");
				}, 2000);
			} else {
				setAlert({ variant: "danger", text: data.message });
			}
		} catch (error) {
			setAlert({
				variant: "danger",
				text: "Login gagal. Periksa koneksi atau coba lagi.",
			});
		} finally {
			setLoading(false);
		}
	};

	// Auto-hide alert after 3 seconds
	useEffect(() => {
		if (alert.text) {
			const timer = setTimeout(() => setAlert({ variant: "", text: "" }), 3000);
			return () => clearTimeout(timer);
		}
	}, [alert.text]);

	return (
		<div
			className="w-100 mr-0 ml-0 container d-flex align-items-center justify-content-center"
			style={{ margin: "0 !important", minHeight: "100vh", overflow: "hidden" }}>
			<div
				className="card p-4 shadow-sm"
				style={{ width: "100%", maxWidth: "430px", minHeight: "500px" }}>
				<h1 className="text-left mb-5 mt-4 fs-1">Login</h1>
				{alert.text && <MyAlert variant={alert.variant} text={alert.text} />}
				{loading && <Loader />}
				<form onSubmit={handleSubmit}>
					<div className="form-group mb-4 input-group-lg">
						<label className="fs-5" htmlFor="username">
							Username
						</label>
						<input
							type="text"
							className="form-control fs-5"
							id="username"
							placeholder="Masukan username"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
						{errors.username && (
							<small className="text-danger">{errors.username}</small>
						)}
					</div>
					<div className="form-group mb-5 input-group-lg">
						<label className="fs-5" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							className="form-control fs-5"
							id="password"
							placeholder="Masukan password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						{errors.password && (
							<small className="text-danger">{errors.password}</small>
						)}
					</div>
					<button
						type="submit"
						className="btn btn-success btn-block btn-lg w-100"
						disabled={loading}>
						{loading ? "Loading..." : "Login"}
					</button>
				</form>
				<p className="text-center mt-4">Tidak memiliki akun? Minta ke admin</p>
			</div>
		</div>
	);
};

export default LoginForm;
