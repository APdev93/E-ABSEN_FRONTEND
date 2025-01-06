import axios from "axios";
import "../config.js";

export const getAllJurusan = async () => {
	try {
		const token = sessionStorage.getItem("_GA");
		let response = await axios.get(global.backend + "/api/jurusan", {
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

export const addJurusan = async (datas) => {
	try {
		const token = sessionStorage.getItem("_GA");
		let response = await axios.post(
			global.backend + "/api/jurusan/add",
			{ jurusan: datas },
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

export const deleteJurusan = async (datas)=>{
    try {
		const token = sessionStorage.getItem("_GA");
		let response = await axios.post(
			global.backend + "/api/jurusan/delete",
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
}