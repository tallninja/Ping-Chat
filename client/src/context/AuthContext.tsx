import { FC, ReactNode, createContext, useState } from 'react';

export const AuthContext = createContext<{
	auth: any;
	setAuth: React.Dispatch<React.SetStateAction<{}>> | null;
}>({ auth: {}, setAuth: null });

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [auth, setAuth] = useState({});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
