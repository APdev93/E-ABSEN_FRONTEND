import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import AddKelasForm from "../SiswaComponent/AddKelasForm";
import AddJurusanForm from "../SiswaComponent/AddJurusanForm";

import { getAllJurusan, deleteJurusan } from "../../api/";

const Jurusan = () => {
	const [kelasModalShow, setKelasModalShow] = useState(false);
	const [jurusanModalShow, setJurusanModalShow] = useState(false);

	const [allJurusan, setAllJurusan] = useState([]);

	const kelasModalOpen = () => {
		setKelasModalShow(true);
	};

	const kelasModalClose = () => {
		setKelasModalShow(false);
	};

	const jurusanModalOpen = () => {
		setJurusanModalShow(true);
	};

	const jurusanModalClose = () => {
		setJurusanModalShow(false);
	};

	const getJurusanData = useCallback(async () => {
		let data = await getAllJurusan();

		if (data) {
			setAllJurusan(data.data);
			console.table(data.data);
		} else {
			setAllJurusan([]);
		}
	}, []);

	const deleteJrsn = async (id) => {
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
					let data = await deleteJurusan(id);
					if (data) {
						Swal.fire({
							title: "Dihapus!",
							text: data.message,
							icon: "success"
						});
						getJurusanData();
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
				text: "Internal Server Error"
			});
		}
	};

	useEffect(() => {
		getJurusanData();
	}, [getJurusanData]);

	return (
		<div className="mt-3 d-flex flex-column gap-3 p-2">
			<h3>Kelas & Jurusan</h3>

			<div className="table-container" style={{ overflowX: "auto" }}>
				<div className="d-flex flex-row gap-3 mb-3">
					<Button
						variant="success"
						onClick={() => {
							kelasModalOpen();
						}}
					>
						Tambah Kelas
					</Button>
				</div>
				<Table striped bordered hover style={{ width: "100%" }}>
					<thead>
						<tr>
							<th>No</th>
							<th>Kelas</th>
							<th>Jurusan</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr key="1">
							<td>no</td>
							<td>XII</td>
							<td>Ipa</td>
							<td className="d-flex gap-1">
								<Button variant="danger">Hapus</Button>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>

			<div className="table-container" style={{ overflowX: "auto" }}>
				<div className="d-flex flex-row gap-3 mb-3">
					<Button
						variant="success"
						onClick={() => {
							jurusanModalOpen();
						}}
					>
						Tambah Jurusan
					</Button>
				</div>
				<Table striped bordered hover style={{ width: "100%" }}>
					<thead>
						<tr>
							<th>No</th>
							<th>Jurusan</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{allJurusan.map((data, index) => {
							return (
								<tr key={index}>
									<td>{index}</td>
									<td>{data.jurusan}</td>
									<td className="d-flex gap-1">
										<Button
											onClick={() => deleteJrsn(data.id)}
											variant="danger"
										>
											Hapus
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			{kelasModalShow && <AddKelasForm onHide={kelasModalClose} />}
			{jurusanModalShow && (
				<AddJurusanForm getJurusanData={getJurusanData} onHide={jurusanModalClose} />
			)}
		</div>
	);
};

export default Jurusan;
