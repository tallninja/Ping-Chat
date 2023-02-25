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

	useEffect(() => {
		if (flag.current)
			setSocket(io('ws://localhost:5005', { transports: ['websocket'] }));
		return () => {
			flag.current = true;
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
