import "./QrCodeScanner.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

const QrCodeScanner = props => {
	const config = {
		disableFlip: true,
		rememberLastUsedCamera: false,
		fps: props.fps,
		qrbox: props.qrbox,
		aspectRatio: props.aspectRatio,
	};
	useEffect(() => {
		// when component mounts

		const verbose = props.verbose === true;
		// Suceess callback is required.
		if (!props.qrCodeSuccessCallback) {
			console.error("qrCodeSuccessCallback is required callback.");
		}
		const html5QrcodeScanner = new Html5QrcodeScanner(
			qrcodeRegionId,
			config,
			verbose,
		);
		html5QrcodeScanner.render(
			props.qrCodeSuccessCallback,
			props.qrCodeErrorCallback,
		);

		// cleanup function when component will unmount
		return () => {
			html5QrcodeScanner.clear().catch(error => {
				console.error("Failed to clear html5QrcodeScanner. ", error);
			});
		};
	}, []);

	return <div id={qrcodeRegionId} />;
};

export default QrCodeScanner;
