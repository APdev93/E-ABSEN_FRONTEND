import { Modal } from "react-bootstrap";

const MyModal = props => {
	return (
		<Modal
			show={true}
			onHide={props.onHide}
			size="sm"
			centered
			className="student-modal">
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex flex-column align-items-center student-card">
				{props.children}
			</Modal.Body>
		</Modal>
	);
};

export default MyModal;

