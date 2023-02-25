import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { useApi } from '../hooks/useApi';

export const UserCard = () => {
	const { auth } = useAuthContext();
	const navigate = useNavigate();
	const api = useApi();

	const logout = async () => {
		try {
			await api.get('/auth/logout');
			navigate('/login');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-2 px-2 rounded-lg'>
			<div className='h-20 w-20 rounded-full border overflow-hidden'>
				<img src={auth.avatar} alt='Avatar' className='h-full w-full' />
			</div>
			<div className='text-sm font-semibold mt-2'>{`${auth.firstName} ${auth.lastName}`}</div>
			<div className='text-xs text-gray-500'>Anonymous</div>
			<div className='flex flex-row items-center mt-3'>
				<div className='flex flex-col justify-center h-4 w-8 bg-green-400 rounded-full'>
					<div className='h-3 w-3 bg-white rounded-full self-end mr-1'></div>
				</div>
				<div className='leading-none ml-1 text-xs'>Active</div>
			</div>
			<button
				className='flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0 w-full mt-3'
				onClick={logout}
			>
				<span>Logout</span>
			</button>
		</div>
	);
};
