import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuthContext } from '../hooks';
import { useConvoContext } from '../hooks/useConvoContext';

export const UsersList = () => {
	const [users, setUsers] = useState<any[]>([]);
	const api = useApi();
	const { auth } = useAuthContext();
	const { setConversation } = useConvoContext();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await api.get('/users');
				setUsers(res.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUsers();
		return;
	}, []);

	const startConversation = async (userId: string) => {
		try {
			const res = await api.post('/conversations', {
				participants: [auth._id, userId],
			});
			setConversation(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex flex-col py-8 pr-2 w-52 bg-white flex-shrink-0'>
			<div className='flex flex-col'>
				<div className='flex flex-row items-center justify-between text-xs'>
					<span className='font-bold text-lg text-indigo-500'>Users</span>
				</div>
			</div>
			<div className='flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto'>
				{users.length
					? users.map((user, idx) => (
							<button
								key={idx}
								className='flex flex-row items-center hover:bg-gray-100 rounded-xl p-2'
								onClick={() => startConversation(user._id)}
							>
								<div className='h-8 w-8 rounded-full border overflow-hidden'>
									<img src={user.avatar} alt='img' className='h-full w-full' />
								</div>
								<div className='ml-2 text-sm font-semibold'>{`${user.firstName} ${user.lastName}`}</div>
							</button>
					  ))
					: 'No Users'}
			</div>
		</div>
	);
};
