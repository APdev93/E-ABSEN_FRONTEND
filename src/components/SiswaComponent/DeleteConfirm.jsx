import React from "react";
import MyModal from "../MyModal";

const DeleteConfirm = ({ onHide, student }) => {
	const handleConfirm = () => {
		alert("Berhasil di hapus");
	};
	return (
		<MyModal onHide={onHide}>
			<div>
				<p>Apakah anda ingin menghapus {student.full_name}?</p>
				<button
					onClick={handleConfirm}
					style={{ marginLeft: "auto" }}
					className="btn btn-danger">
					Ya, Hapus
				</button>
			</div>
		</MyModal>
	);
};

export default DeleteConfirm;
