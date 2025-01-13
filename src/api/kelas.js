import axios from "axios";
import "../config.js";

export const getAllKelas = async () => {
	try {
		const token = sessionStorage.getItem("_GA");
		let response = await axios.get(global.backend + "/api/kelas", {
			headers: { Authorization: `Bearer ${token}` }
		});

		let data = response.data;

		if (response.data.status_code === 200) {
			return data;
		} else {
			return null;
		}
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const addKelas = async (kelas, jurusan) => {
	try {
		const token = sessionStorage.getItem("_GA");
		let response = await axios.post(
			global.backend + "/api/kelas/add",
			{ kelas, jurusan },
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);

		let data = response.data;

		if (response.data.status_code === 200) {
			return data;
		} else {
			return null;
		}
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const deleteKelas = async (datas) => {
	try {
		const token = sessionStorage.getItem("_GA");
		let response = await axios.post(
			global.backend + "/api/kelas/delete",
			{ id: datas },
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);

		let data = response.data;

		if (response.data.status_code === 200) {
			return data;
		} else {
			return null;
		}
	} catch (e) {
		console.log(e);
		return false;
	}
};
