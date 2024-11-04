// Module
import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

// Code
const ScanV1 = ({ onScanSuccess, onScanError }) => {
	const qrCodeRegionId = "qr-code-region";
	const html5QrCodeRef = useRef(null);
	const [isScanning, setIsScanning] = useState(false);
	const [lastScannedText, setLastScannedText] = useState("");
	const [lastScanTime, setLastScanTime] = useState(0);
	const debounceTime = 3000; // Set debounce time to 2 seconds
	const pauseDuration = 3000; // Set pause duration to 3 seconds
	const beep = new Audio(process.env.PUBLIC_URL + "/bep.mp3");

	useEffect(() => {
		html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);
		return () => {
			if (isScanning) stopQrScanner(); // Hentikan pemindai saat komponen dibongkar
		};
	}, []);
	function startQrScanner() {
		if (!isScanning) {
			const config = { fps: 1, qrbox: { width: 250, height: 250 } };

			html5QrCodeRef.current
				.start(
					{ facingMode: "environment" },
					config,
					decodedText => {
						const now = Date.now();

						if (
							decodedText !== lastScannedText ||
							now - lastScanTime > debounceTime
						) {
							beep.play();
							onScanSuccess(decodedText);
							setLastScannedText(decodedText); // Simpan teks terakhir
							setLastScanTime(now);
							// Pause scanning selama 3 detik, kemudian lanjutkan
							stopQrScanner(() => {
								setTimeout(() => {
									startQrScanner(); // Lanjutkan scan setelah 3 detik
								}, pauseDuration);
							});
						}
					},
					error => {
						if (onScanError) onScanError(error);
					},
				)
				.then(() => {
					setIsScanning(true);
				})
				.catch(console.error);
		}
	}

	function stopQrScanner(callback) {
		if (isScanning && html5QrCodeRef.current) {
			html5QrCodeRef.current
				.stop()
				.then(() => {
					setIsScanning(false);
					if (callback) callback(); // Memastikan callback dijalankan setelah berhenti
				})
				.catch(error => {
					console.error("Error saat berhenti scanning:", error);
				});
		}
	}

	return (
		<div>
			<div className="mb-3">
				{!isScanning ? (
					<button onClick={startQrScanner} className="w-100 btn btn-primary">
						Mulai Scan
					</button>
				) : (
					<button onClick={() => stopQrScanner()} className="w-100 btn btn-danger">
						Berhenti Scan
					</button>
				)}
			</div>
			<div
				className="qr-scanner"
				id={qrCodeRegionId}
				style={{ borderRadius: "20px", width: "100%" }}
			/>
		</div>
	);
};

export default ScanV1;
