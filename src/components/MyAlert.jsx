import Alert from "react-bootstrap/Alert";

function MyAlert({ variant, text }) {
	return (
		<Alert key={variant} variant={variant}>
			{text}
		</Alert>
	);
}

export default MyAlert;
