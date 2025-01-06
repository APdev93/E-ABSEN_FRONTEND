import React from "react";
import MyModal from "../MyModal";
import Swal from "sweetalert2";

const DeleteConfirm = ({ onHide, student }) => {
	const handleConfirm = () => {
		console.log(student);
		Swal.fire({
			icon: "success",
			title: "",
			text: `Berhasil! menghapus!`,
			timer: 3000,
			timerProgressBar: true,
			confirmButtonText: "Konfirmasi",
			willClose: () => {}
		});
	};
	return (
		<MyModal onHide={onHide}>
			<div>
				<p>Apakah anda ingin menghapus {student.full_name}?</p>
				<button
					onClick={handleConfirm}
					style={{ marginLeft: "auto" }}
					className="btn btn-danger"
				>
					Ya, Hapus
				</button>
			</div>
		</MyModal>
	);
};

export default DeleteConfirm;
