import React, { useState } from "react";
import MyModal from "../MyModal";

const SiswaEditForm = ({ onHide }) => {
	const [nisn, setNisn] = useState("");
	const [fullName, setFullName] = useState("");
	const [kelas, setKelas] = useState("");
	const [nomerWali, setNomerWali] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<MyModal title="Tambahkan Siswa" onHide={onHide}>
			<div className="w-100 mt-0">
				<h3>Masukan data siswa di form ini</h3>
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
								setNisn(e.target.value);
							}}
						/>
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
							}}
						/>
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
							}}
						/>
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
							}}
						/>
					</div>
					<button
						type="submit"
						className="btn mt-4 btn-success btn-block btn-md w-100">
						tambah siswa
					</button>
				</form>
			</div>
		</MyModal>
	);
};

export default SiswaEditForm;
