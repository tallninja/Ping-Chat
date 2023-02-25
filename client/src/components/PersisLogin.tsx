import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuthContext } from '../hooks';
import { Outlet } from 'react-router-dom';

export const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { auth, setAuth } = useAuthContext();
	const api = useApi();

	useEffect(() => {
		let isMounted = true;
		const checkProfile = async () => {
			try {
				const res = await api.get('/auth/profile');
				setAuth!(res.data);
			} catch (error) {
				console.error(error);
			} finally {
				isMounted && setIsLoading(false);
			}
		};
		!auth._id ? checkProfile() : setIsLoading(false);
		return;
	}, [api]);

	return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};
