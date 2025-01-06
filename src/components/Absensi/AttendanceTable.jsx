import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import moment from "moment";
import "../../config.js";

const AttendanceTable = () => {
	const [attendances, setAttendances] = useState([]);
	const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10); // Set jumlah data per halaman

	const handleDateChange = (event) => setDate(event.target.value);

	const fetchAttendances = async () => {
		try {
			const response = await axios.get(`${global.backend}/absen/absensi/${date}`);
			setAttendances(response.data);
		} catch (error) {
			setAttendances([]);
			console.error("Error fetching attendance data", error);
		}
	};

	useEffect(() => {
		fetchAttendances();
	}, [date]);

	// Fungsi untuk mendapatkan data yang ditampilkan pada halaman saat ini
	const currentData = attendances.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const getTime = (iso) => {
		if (!iso) return "-";

		const date = new Date(iso);
		const hours = String(date.getUTCHours()).padStart(2, "0");
		const minutes = String(date.getUTCMinutes()).padStart(2, "0");

		return `${hours}:${minutes}`;
	};

	// Fungsi untuk mengubah halaman
	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

	// Menghitung jumlah halaman
	const totalPages = Math.ceil(attendances.length / itemsPerPage);

	return (
		<div className="container">
			<h2 className="my-4">Hasil Absensi</h2>
			<Form inline className="mb-3">
				<Form.Group>
					<Form.Label>Pilih Tanggal: </Form.Label>
					<Form.Control
						type="date"
						value={date}
						onChange={handleDateChange}
						className="ml-2"
					/>
				</Form.Group>
				<Button onClick={fetchAttendances} className="ml-3 mt-3">
					Tampilkan
				</Button>
			</Form>

			{/* Tabel hasil absensi dengan overflow scroll */}
			<div style={{ overflowX: "auto" }}>
				<Table striped bordered hover style={{ width: "100%" }}>
					<thead>
						<tr>
							<th>No</th>
							<th>Nama</th>
							<th>Kelas</th>
							<th>Waktu Absen</th>
							<th>Waktu Pulang</th>
							<th>Status Kehadiran</th>
							<th>Status Pulang</th>
						</tr>
					</thead>
					<tbody>
						{currentData.length > 0 ? (
							currentData.map((item, index) => (
								<tr key={index}>
									<td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
									<td>{item.nama}</td>
									<td>{item.kelas}</td>
									<td>{item.waktu_absen ? getTime(item.waktu_absen) : "-"}</td>
									<td>{item.waktu_pulang ? getTime(item.waktu_pulang) : "-"}</td>
									<td>{item.status}</td>
									<td>{item.status_pulang || "-"}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="7" className="text-center">
									Tidak ada data absensi untuk tanggal ini
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>

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

export default AttendanceTable;
