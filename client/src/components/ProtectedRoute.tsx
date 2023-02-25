import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks';

export const ProtectedRoute = () => {
	const location = useLocation();
	const { auth } = useAuthContext();

	return (
		<>
			{auth?._id ? (
				<Outlet />
			) : (
				<Navigate to='/login' state={{ from: location }} replace />
			)}
		</>
	);
};
