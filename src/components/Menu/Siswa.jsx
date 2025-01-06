import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import StudentDetail from "../SiswaComponent/StudentDetail";
import StudentTable from "../SiswaComponent/StudentTable";
//import DeleteConfirm from "../SiswaComponent/DeleteConfirm";
import Button from "react-bootstrap/Button";
import AddSiswaForm from "../SiswaComponent/AddSiswaForm";

import "../../config.js";

const Siswa = () => {
	const [students, setStudents] = useState([]);
	const [filter, setFilter] = useState("All");
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [modalShow, setModalShow] = useState(false);
	const [siswaModal, setSiswaModal] = useState(false);
	//const [delConfirm, setDelConfirm] = useState(false);
	const token = sessionStorage.getItem("_GA");

	const fetchStudents = async () => {
		try {
			const response = await axios.get(`${global.backend}/api/siswa`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			setStudents(response.data.data);
		} catch (error) {
			console.error("Error fetching students data:", error);
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	const filteredStudents = students.filter((student) => {
		if (filter === "All") return true;
		return student.class === filter;
	});

	const handleDetailClick = (student) => {
		setSelectedStudent(student);
		setModalShow(true);
	};

	const closeModal = () => {
		setSelectedStudent(null);
		setModalShow(false);
	};

	const handleSiswaModal = () => {
		setSiswaModal(true);
	};

	const closeSiswaModal = () => {
		setSiswaModal(false);
	};

	const handleDeleteSiswa = async (student) => {
		try {
			Swal.fire({
				title: "Apakah anda yakin?",
				text: "Anda tidak dapat mengembalikannya!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#007ff8",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, hapus!"
			}).then(async (result) => {
				if (result.isConfirmed) {
					const response = await axios.post(
						`${global.backend}/api/siswa/delete`,
						{ sid: student.id },
						{
							headers: { Authorization: `Bearer ${token}` }
						}
					);
					let data = response.data;

					if (data.status_code === 200) {
						Swal.fire({
							title: "Dihapus!",
							text: data.message,
							icon: "success"
						});
						fetchStudents();
					} else {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: data.message
						});
					}
				}
			});
		} catch (e) {
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Terjadi kesalahan"
			});
		}
		// setDelConfirm(true);
	};

	/*
	const closeDelete = () => {
		setSelectedStudent(null);
		setDelConfirm(false);
	};
*/
	return (
		<div className="mt-3 d-flex flex-column gap-3 p-2">
			<div className="d-flex mb-1 flex-column gap-1">
				<Button variant="success" onClick={() => handleSiswaModal()}>
					Tambah Siswa
				</Button>
				<div className="d-flex flex-row gap-1">Filter</div>
				<div className="d-flex flex-row flex-wrap gap-1">
					<Button onClick={() => setFilter("X IPS")}>Kelas X IPS</Button>
					<Button onClick={() => setFilter("X IPA")}>Kelas X IPA</Button>
					<Button onClick={() => setFilter("XI IPA 1")}>Kelas XI IPA 1</Button>
					<Button onClick={() => setFilter("XI IPA 2")}>Kelas XI IPA 2</Button>
					<Button onClick={() => setFilter("XII")}>Kelas XII</Button>
					<Button onClick={() => setFilter("All")}>Semua</Button>
				</div>
			</div>
			<div className="card shadow-sm p-1">
				<StudentTable
					students={filteredStudents}
					onDetailClick={handleDetailClick}
					onDeleteClick={handleDeleteSiswa}
				/>
			</div>
			{/*
			{delConfirm && (
				<DeleteConfirm student={selectedStudent} onHide={closeDelete} />
			)}
*/}
			{siswaModal && <AddSiswaForm onHide={closeSiswaModal} />}

			{modalShow && <StudentDetail student={selectedStudent} onHide={closeModal} />}
		</div>
	);
};

export default Siswa;
