
import { useState, useEffect } from "react";

function DigitalClock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const formatTime = time => {
		const hours = String(time.getHours()).padStart(2, "0");
		const minutes = String(time.getMinutes()).padStart(2, "0");
		const seconds = String(time.getSeconds()).padStart(2, "0");
		return `${hours}:${minutes}:${seconds}`;
	};

	return (
		<div style={{ fontSize: "2em", fontFamily: "monospace", padding: "10px" }}>
			{formatTime(time)}
		</div>
	);
}

const Home = () => {
	return (
		<div className="mt-3 gap-3 home-ctr flex-column d-flex">
			<DigitalClock />
		</div>
	);
};

export default Home;
