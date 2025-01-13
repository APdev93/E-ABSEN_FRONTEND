import MyModal from "../MyModal";
import MyAlert from "../MyAlert";
import { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { getAllJurusan, addKelas } from "../../api/";

const AddKelasForm = ({ getKelasData, onHide }) => {
	const [kelas, setKelas] = useState("");
	const [allJurusan, setAllJurusan] = useState([]);
	const [jurusan, setJurusan] = useState("");
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({ text: "", variant: "" });

	const [errors, setErrors] = useState({
		kelas: "",
		jurusan: ""
	});

	const getJurusanData = useCallback(async () => {
		let data = await getAllJurusan();

		if (data) {
			setAllJurusan(data.data);
			console.log("Jurusan: ", allJurusan);
		} else {
			setAllJurusan([]);
		}
	}, []);

	useEffect(() => {
		getJurusanData();
	}, [getJurusanData]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (validateForm()) {
			try {
				let data = await addKelas(kelas, jurusan);

				if (data) {
					setAlert({ variant: "success", text: data.message });
					setKelas("");
					setJurusan("");
					getKelasData();
				} else {
					setAlert({ variant: "danger", text: data.message });
				}
			} catch (e) {
				console.error(e);
				setAlert({ variant: "danger", text: "Internal server error" });
			}
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
			{alert.text && <MyAlert variant={alert.variant} text={alert.text} />}
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
							{allJurusan.length === 0 ? (
								<option value="">Tidak ada jurusan, silahkan tambah.</option>
							) : (
								<>
									<option value="">Pilih Jurusan</option>
									{allJurusan.map((data, index) => (
										<option key={index} value={data.jurusan}>
											{data.jurusan}
										</option>
									))}
								</>
							)}
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
