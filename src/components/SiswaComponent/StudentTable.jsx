import React, { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";

const StudentTable = ({ students, onDetailClick, onDeleteClick }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10; 


	const totalPages = Math.ceil(students.length / itemsPerPage);


	const currentData = students.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);


	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div style={{ overflowX: "auto" }}>
			<Table striped bordered hover style={{ width: "100%" }}>
				<thead>
					<tr>
						<th>No</th>
						<th>NISN</th>
						<th>Nama</th>
						<th>Kelas</th>
						<th>Nomer Ortu</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{currentData.length > 0 ? (
						currentData.map((student, index) => (
							<tr key={index}>
								<td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
								<td>{student.nisn}</td>
								<td>{student.full_name}</td>
								<td>{student.class}</td>
								<td>{student.parent_number}</td>
								<td className="d-flex gap-1">
									<Button variant="danger" onClick={() => onDeleteClick(student)}>
										Hapus
									</Button>
									<Button variant="success">Edit</Button>
									<Button
										variant="primary"
										onClick={() => onDetailClick(student)}
									>
										Detail
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="6" className="text-center">
								Tidak ada data siswa
							</td>
						</tr>
					)}
				</tbody>
			</Table>

			{/* Pagination */}
			<Pagination className="justify-content-center">
				<Pagination.First
					onClick={() => handlePageChange(1)}
					disabled={currentPage === 1}
				/>
				<Pagination.Prev
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				/>
				{Array.from({ length: totalPages }, (_, i) => (
					<Pagination.Item
						key={i}
						active={i + 1 === currentPage}
						onClick={() => handlePageChange(i + 1)}
					>
						{i + 1}
					</Pagination.Item>
				))}
				<Pagination.Next
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				/>
				<Pagination.Last
					onClick={() => handlePageChange(totalPages)}
					disabled={currentPage === totalPages}
				/>
			</Pagination>
		</div>
	);
};

export default StudentTable;
