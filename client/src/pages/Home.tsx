import { ChatWindow, SideMenu, UsersList } from '../components';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks';
import { useSocketContext } from '../hooks/useSocketContext';

export const Home = () => {
	const { auth } = useAuthContext();
	const socket = useSocketContext();

	useEffect(() => {
		socket?.emit('addUser', auth._id);
		socket?.on('getUsers', (users) => {
			return;
		});
	}, [auth, socket]);

	return (
		<div className='flex h-screen antialiased text-gray-800'>
			<div className='flex flex-row h-full w-full overflow-x-hidden'>
				<SideMenu />
				<ChatWindow />
				<UsersList />
			</div>
		</div>
	);
};
