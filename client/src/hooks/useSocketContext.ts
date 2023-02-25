import { Socket } from 'socket.io-client';
import { useContext } from 'react';
import { SocketContext } from '../context';

export const useSocketContext = () => {
	return useContext<Socket | null>(SocketContext);
};
