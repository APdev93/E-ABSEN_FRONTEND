import React from "react";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";

const StudentTable = ({ students, onDetailClick, onDeleteClick }) => (
	<div className="table-container" style={{ overflowX: "auto" }}>
		<Table striped bordered hover style={{ width: "100%" }}>
			<thead>
				<tr>
					<th>NISN</th>
					<th>Nama</th>
					<th>Kelas</th>
					<th>Nomer Ortu</th>
					<th>Aksi</th>
				</tr>
			</thead>
			<tbody>
				{students.map((student, index) => (
					<tr key={index}>
						<td>{student.nisn}</td>
						<td>{student.full_name}</td>
						<td>{student.class}</td>
						<td>{student.parent_number}</td>
						<td className="d-flex gap-1">
							<Button variant="danger" onClick={() => onDeleteClick(student)}>
								Hapus
							</Button>
							<Button variant="success">Edit</Button>
							<Button variant="primary" onClick={() => onDetailClick(student)}>
								Detail
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	</div>
);

export default StudentTable;
