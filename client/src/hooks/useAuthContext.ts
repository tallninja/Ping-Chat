import { useContext } from 'react';
import { AuthContext } from '../context';

export const useAuthContext = () => {
	return useContext<{
		auth: any;
		setAuth: React.Dispatch<React.SetStateAction<{}>> | null;
	}>(AuthContext);
};
