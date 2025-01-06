import ScanV1 from "../Absensi/ScanV1";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../Absensi/QrCodeScanner.css";
import MyAlert from "../MyAlert";
import "../../config.js";

const Absen = () => {
	const [result, setResult] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [absenType, setAbsenType] = useState("");

	const formatDateToMySQL = (date) => {
		if (!date || isNaN(date.getTime())) {
			console.error("Invalid date provided to formatDateToMySQL:", date);
			return null;
		}

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		const seconds = String(date.getSeconds()).padStart(2, "0");

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	};

	const getTimeInTimeZone = (timeZone) => {
		const date = new Date();
		const utcOffset = date.getTimezoneOffset() * 60000; // UTC offset in milliseconds
		const localTime = new Date(date.getTime() + utcOffset); // Local time without timezone
		const timezoneOffsetInHours = 8; // GMT+8 for Asia/Makassar
		localTime.setHours(localTime.getHours() + timezoneOffsetInHours);
		return localTime; // Return the adjusted time
	};

	const uploadData = async (data) => {
		const waktuSekarang = getTimeInTimeZone("Asia/Makassar");
		const waktuFormatted = formatDateToMySQL(waktuSekarang);

		let url, body;
		if (absenType === "masuk") {
			url = `${global.backend}/absen/masuk`;
			body = {
				...data,
				waktu_absen: waktuFormatted
			};
		} else if (absenType === "pulang") {
			url = `${global.backend}/absen/pulang`;
			body = {
				nisn: data.nisn,
				waktu_pulang: waktuFormatted
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
				text: response.data.message
			});
		} catch (error) {
			console.error("Error during POST request", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Gagal mengunggah data absensi!"
			});
		}
	};

	const onSuccess = async (text) => {
		if (isProcessing) return;

		const student = JSON.parse(text);
		setIsProcessing(true);
		setResult(student);

		const body = {
			nisn: student.nisn,
			nama: student.full_name,
			kelas: student.kelas
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
				}
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
				text: "Gagal Melakukan absensi!"
			});
			setIsProcessing(false);
		}
	};

	const onError = (error) => {
		console.log("No QR code detected!");
	};

	return (
		<div className="container mt-5">
			<h3>Absensi Siswa</h3>
			{absenType === "" ? (
				<div className="d-flex w-100 flex-center flex-column gap-3">
					<h5>Pilih tipe absen</h5>
					<div className="w-100 d-flex flex-center flex-row gap-5">
						<button
							style={{ width: "150px", height: "250px" }}
							className="btn btn-success"
							onClick={() => setAbsenType("masuk")}
						>
							Masuk
						</button>
						<button
							style={{ width: "150px", height: "250px" }}
							className="btn btn-danger"
							onClick={() => setAbsenType("pulang")}
						>
							Pulang
						</button>
					</div>
				</div>
			) : (
				<div className="d-flex flex-column gap-2 p-1 mb-3">
				
					<div className="scanner">
						<div className="d-flex flex-row flex-center">
							<button
								className="btn mb-3 btn-primary"
								onClick={() => setAbsenType("")}
							>
								Kembali
							</button>
						</div>
						<MyAlert
							variant={absenType === "masuk" ? "success" : "danger"}
							text={absenType === "masuk" ? "Absensi Masuk" : "Absensi Pulang"}
						/>
						<ScanV1 onScanSuccess={onSuccess} onScanError={onError} />
					</div>

					<div className="card shadow-sm p-3">
						<p>Tips</p>
						<ul>
							<li>Tunjukan QRcode sampai terlihat jelas di kamera</li>
							<li>Posisikan QRcode tidak terlalu jauh maupun terlalu dekat</li>
						</ul>
					</div>


				</div>
			)}
		</div>
	);
};

export default Absen;
