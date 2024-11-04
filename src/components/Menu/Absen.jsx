import ScanV1 from "../Absensi/ScanV1";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../Absensi/QrCodeScanner.css";
import MyAlert from "../MyAlert";

const Absen = () => {
	const [result, setResult] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [absenType, setAbsenType] = useState("");

	const formatDateToMySQL = date => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		const seconds = String(date.getSeconds()).padStart(2, "0");
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	};

	const uploadData = async data => {
		const waktuSekarang = new Date();
		waktuSekarang.setHours(waktuSekarang.getHours()); // Menyesuaikan ke WITA (UTC+8)
		const waktuFormatted = formatDateToMySQL(waktuSekarang); // Memformat waktu sebagai "YYYY-MM-DD HH:mm:ss"

		let url, body;
		if (absenType === "masuk") {
			url = "https://e-absen.apbiz.xyz/absen/masuk";
			body = {
				...data,
				waktu_absen: waktuFormatted, // Format waktu dikirim dalam "YYYY-MM-DD HH:mm:ss"
			};
		} else if (absenType === "pulang") {
			url = "https://e-absen.apbiz.xyz/absen/pulang";
			body = {
				nisn: data.nisn,
				waktu_pulang: waktuFormatted,
			};
		} else {
			console.error("AbsenType tidak valid");
			return;
		}

		try {
			const response = await axios.post(url, body);
			console.log("Response from server:", response.data);
			Swal.fire({
				icon: "success",
				title: response.data.status,
				text: response.data.message,
			});
		} catch (error) {
			console.error("Error during POST request", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Gagal mengunggah data absensi!",
			});
		}
	};

	const onSuccess = async text => {
		if (isProcessing) return;

		const student = JSON.parse(text);
		setIsProcessing(true);
		setResult(student);

		const body = {
			nisn: student.nisn,
			nama: student.full_name,
			kelas: student.kelas,
		};

		try {
			Swal.fire({
				icon: "success",
				title: body.nama,
				text: `Absensi ${absenType} berhasil!`,
				timer: 3000,
				timerProgressBar: true,
				confirmButtonText: "Konfirmasi",
				willClose: () => {
					uploadData(body);
				},
			});

			setTimeout(() => {
				setResult("");
				setIsProcessing(false);
			}, 5000);
		} catch (error) {
			console.error("Error during POST request", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Gagal Melakukan absensi!",
			});
			setIsProcessing(false);
		}
	};

	const onError = error => {
		console.log("No QR code detected!");
	};

	return (
		<div className="mt-5">
			{absenType === "" ? (
				<div className="w-100 d-flex flex-center flex-column gap-3">
					<h3>Pilih tipe absen</h3>
					<div className="w-100 d-flex flex-center flex-row gap-5">
						<button
							style={{ width: "300px", height: "300px" }}
							className="btn btn-success"
							onClick={() => setAbsenType("masuk")}>
							Masuk
						</button>
						<button
							style={{ width: "300px", height: "300px" }}
							className="btn btn-danger"
							onClick={() => setAbsenType("pulang")}>
							Pulang
						</button>
					</div>
				</div>
			) : (
				<div>
					<div className="d-flex flex-row flex-center">
						<button className="btn mb-3 btn-primary" onClick={() => setAbsenType("")}>
							Kembali
						</button>
		</div>
					<MyAlert
						variant={absenType === "masuk" ? "success" : "danger"}
						text={absenType === "masuk" ? "Absensi Masuk" : "Absensi Pulang"}
					/>
					<ScanV1 onScanSuccess={onSuccess} onScanError={onError} />
				</div>
			)}
		</div>
	);
};

export default Absen;
