import { io, Socket } from 'socket.io-client';
import { ChatWindow, SideMenu, UsersList } from '../components';
import { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../hooks';

export const Home = () => {
	const socket = useRef<Socket | null>(null);
	const { auth } = useAuthContext();

	const effectRun = useRef(false);
	useEffect(() => {
		if (effectRun.current) {
			socket.current = io('ws://localhost:5005', {
				transports: ['websocket'],
			});
		}
		return () => {
			effectRun.current = true;
		};
	}, []);

	useEffect(() => {
		socket?.current?.emit('addUser', auth._id);
		socket?.current?.on('getUsers', (users) => {
			console.log(users);
		});
	}, [auth]);

	return (
		<div className='flex h-screen antialiased text-gray-800'>
			<div className='flex flex-row h-full w-full overflow-x-hidden'>
				<SideMenu />
				<ChatWindow socket={socket.current} />
				<UsersList />
			</div>
		</div>
	);
};
