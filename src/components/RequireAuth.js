import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
	const { auth, setAuth } = useAuth();
	const location = useLocation();

	// Cek apakah auth kosong, jika iya ambil dari localStorage
	if (!auth?.user) {
		const savedAuth = sessionStorage.getItem("_A");
		if (savedAuth) {
			setAuth(JSON.parse(savedAuth));
		}
	}

	return auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;