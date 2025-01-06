import MyModal from "../MyModal";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const AddKelasForm = ({ onHide }) => {
	const [kelas, setKelas] = useState("");
	const [jurusan, setJurusan] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		kelas: "",
		jurusan: ""
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (validateForm()) {
			console.log({ kelas, jurusan });
		}
		setLoading(false);
	};

	const validateForm = () => {
		let valid = true;
		let errors = {
			kelas: "",
			jurusan: ""
		};

		if (kelas.trim() === "") {
			valid = false;
			errors.kelas = "Kelas tidak boleh kosong";
		}

		if (jurusan.trim() === "") {
			valid = false;
			errors.jurusan = "Jurusan tidak boleh kosong";
		}

		setErrors(errors);
		return valid;
	};

	return (
		<MyModal title="Tambah Kelas" onHide={onHide}>
			<h3>Masukan data kelas</h3>
			<div className="w-100">
				<form onSubmit={handleSubmit}>
					<div className="form-group mb-2 input-group-md">
						<label htmlFor="kelas">Kelas</label>
						<input
							type="text"
							className="form-control"
							id="kelas"
							placeholder="XII"
							value={kelas}
							required
							onChange={(e) => setKelas(e.target.value)}
						/>
						{errors.kelas && <small className="text-danger">{errors.kelas}</small>}
					</div>
					<div className="form-group mb-2 input-group-md">
						<label htmlFor="jurusan">Jurusan</label>
						<select
							className="form-control"
							id="jurusan"
							value={jurusan}
							required
							onChange={(e) => setJurusan(e.target.value)}
						>
							<option value="">Pilih Jurusan</option>
							<option value="IPA">IPA</option>
							<option value="IPS">IPS</option>
							<option value="Bahasa">Bahasa</option>
						</select>
						{errors.jurusan && <small className="text-danger">{errors.jurusan}</small>}
					</div>
					<Button
						className="w-100 mt-3"
						type="submit"
						variant="success"
						disabled={loading}
					>
						{loading ? "Memproses..." : "Tambah"}
					</Button>
				</form>
			</div>
		</MyModal>
	);
};

export default AddKelasForm;
