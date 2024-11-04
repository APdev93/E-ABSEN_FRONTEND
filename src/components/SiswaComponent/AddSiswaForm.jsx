import React, { useState } from "react";
import MyModal from "../MyModal";
import MyAlert from "../MyAlert";
import Loader from "../Loader";
import axios from "axios";

const AddSiswaForm = ({ onHide }) => {
	const [nisn, setnisn] = useState("");
	const [fullName, setFullName] = useState("");
	const [kelas, setKelas] = useState("");
	const [nomerWali, setNomerWali] = useState("");
	const [errors, setErrors] = useState({
		nisn: "",
		fullName: "",
		kelas: "",
		parentNumber: "",
	});
	const [alert, setAlert] = useState({ variant: "", text: "" });
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = () => {
		let valid = true;
		let errors = { nisn: "", fullName: "", kelas: "", parentNumber: "" };

		if (nisn.trim() === "") {
			errors.nisn = "nisn tidak boleh kosong";
			valid = false;
		}
		if (fullName.trim() === "") {
			errors.fullName = "Nama tidak boleh kosong";
			valid = false;
		}
		if (kelas.trim() === "") {
			errors.kelas = "Kelas tidak boleh kosong";
			valid = false;
		}
		if (nomerWali.trim() === "") {
			errors.parentNumber = "Nomer tidak boleh kosong";
			valid = false;
		}

		setErrors(errors);
		return valid;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true); // tampilkan loading saat proses dimulai

		try {
			const token = sessionStorage.getItem("token");
			const response = await axios.post(
				"https://e-absen.apbiz.xyz/api/siswa/add",
				{
					nisn: nisn,
					full_name: fullName,
					class_name: kelas,
					parent_number: nomerWali,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);

			let data = response.data;
			if (data.status_code === 201) {
				setIsLoading(false);
				setAlert({ variant: "success", text: data.message });
				setnisn("");
				setFullName("");
				setKelas("");
				setNomerWali("");
				setErrors({ nisn: "", fullName: "", kelas: "", parentNumber: "" });
			} else {
				setIsLoading(false);
				setAlert({ variant: "danger", text: data.message });
			}
		} catch (error) {
			setIsLoading(false);
			setAlert({ variant: "danger", text: "Error: " + error.message });
			console.error("Error:", error);
		}
	};

	return (
		<MyModal title="Tambahkan Siswa" onHide={onHide}>
			<div className="w-100 mt-0">
				<h3>Masukan data siswa di form ini</h3>
				{alert.text && <MyAlert variant={alert.variant} text={alert.text} />}
				{isLoading ? ( // tampilkan Loader jika isLoading true
					<Loader />
				) : (
					<form onSubmit={handleSubmit}>
						<div className="form-group mb-2 input-group-md">
							<label htmlFor="nisn">nisn</label>
							<input
								type="text"
								className="form-control"
								id="nisn"
								placeholder="5208xxxxxxxxxx"
								value={nisn}
								required
								onChange={e => {
									setnisn(e.target.value);
									validateForm();
								}}
							/>
							{errors.nisn && <small className="text-danger">{errors.nisn}</small>}
						</div>
						<div className="form-group mb-2 input-group-md">
							<label htmlFor="fullName">Nama Lengkap</label>
							<input
								type="text"
								className="form-control w-100"
								id="fullName"
								placeholder="ARDIAN PERMANA"
								value={fullName}
								required
								onChange={e => {
									setFullName(e.target.value);
									validateForm();
								}}
							/>
							{errors.fullName && (
								<small className="text-danger">{errors.fullName}</small>
							)}
						</div>
						<div className="form-group mb-2 input-group-md">
							<label htmlFor="kelas">Kelas</label>
							<input
								type="text"
								className="form-control w-100"
								id="kelas"
								placeholder="XII"
								value={kelas}
								onChange={e => {
									setKelas(e.target.value);
									validateForm();
								}}
							/>
							{errors.kelas && <small className="text-danger">{errors.kelas}</small>}
						</div>
						<div className="form-group mb-2 input-group-md">
							<label htmlFor="nomerWali">Nomer wali</label>
							<input
								type="text"
								className="form-control w-100"
								id="nomerWali"
								placeholder="6287xxxxxx"
								value={nomerWali}
								required
								onChange={e => {
									setNomerWali(e.target.value);
									validateForm();
								}}
							/>
							{errors.parentNumber && (
								<small className="text-danger">{errors.parentNumber}</small>
							)}
						</div>
						<button
							type="submit"
							className="btn mt-4 btn-success btn-block btn-md w-100">
							tambah siswa
						</button>
					</form>
				)}
			</div>
		</MyModal>
	);
};

export default AddSiswaForm;
