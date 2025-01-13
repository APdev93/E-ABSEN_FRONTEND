import MyModal from "../MyModal";
import { useState } from "react";
import Button from "react-bootstrap/Button";

import MyAlert from "../MyAlert";
import { addJurusan } from "../../api/";
const AddJurusanForm = ({ getJurusanData,onHide }) => {
	const [jurusan, setJurusan] = useState("");
	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState({
		jurusan: ""
	});

	const [alert, setAlert] = useState({ variant: "", text: "" });
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

			if (validateForm()) {
		try {
				let data = await addJurusan(jurusan);

				if (data) {
					setAlert({ variant: "success", text: data.message });
					setJurusan("");
					getJurusanData()
				} else {
					setAlert({ variant: "danger", text: data.message });
				}
		} catch (e) {
			setAlert({ variant: "danger", text: "Internal server error" });
		}
			}
		setLoading(false);
	};

	const validateForm = () => {
		let valid = true;
		let errors = {
			jurusan: ""
		};

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
						<label htmlFor="kelas">Jurusan</label>
						<input
							type="text"
							className="form-control"
							id="kelas"
							placeholder="XII"
							value={jurusan}
							required
							onChange={(e) => setJurusan(e.target.value)}
						/>
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

export default AddJurusanForm;
