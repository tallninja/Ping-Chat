import { io, Socket } from 'socket.io-client';
import {
	FC,
	ReactNode,
	createContext,
	useEffect,
	useRef,
	useState,
} from 'react';

export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const flag = useRef(false);

	const WS_HOST = import.meta.env.VITE_WS_HOST || 'localhost';
	const WS_PORT = import.meta.env.VITE_WS_PORT || 5005;

	useEffect(() => {
		if (flag.current)
			setSocket(
				io(`ws://${WS_HOST}:${WS_PORT}`, { transports: ['websocket'] })
			);
		return () => {
			flag.current = true;
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
