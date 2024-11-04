import React from "react";
import MyModal from "../MyModal";
import Button from "react-bootstrap/Button";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";

const StudentDetail = ({ student, onHide }) => {
	if (!student) return null;

	const downloadQRCode = () => {
		const qrCodeElement = document.getElementById("qr-code");
		toPng(qrCodeElement)
			.then(dataUrl => {
				const link = document.createElement("a");
				link.href = dataUrl;
				link.download = `QR_${student.full_name}.png`;
				link.click();
			})
			.catch(error => {
				console.error("Error downloading QR code:", error);
			});
	};

	let qrData = {
		nisn: student.nisn,
		full_name: student.full_name,
		kelas: student.class,
	};

	return (
		<MyModal title="Detail Siswa" onHide={onHide}>
			<div id="qr-code" className="qr-code-container">
				<QRCodeCanvas value={JSON.stringify(qrData, null, 4)} size={128} />
			</div>
			<div className="student-info">
				<p>
					<strong>nisn:</strong> {student.nisn}
				</p>
				<p>
					<strong>Nama Lengkap:</strong> {student.full_name}
				</p>
				<p>
					<strong>Kelas:</strong> {student.class}
				</p>
				<p>
					<strong>Nomer Wali:</strong> {student.parent_number}
				</p>
			</div>
			<div style={{ textAlign: "center", marginTop: "10px" }}>
				<Button variant="success" onClick={downloadQRCode}>
					Download QR Code
				</Button>
			</div>
		</MyModal>
	);
};

export default StudentDetail;
