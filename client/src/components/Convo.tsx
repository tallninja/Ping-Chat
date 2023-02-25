import { FC, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuthContext } from '../hooks';
import { useConvoContext } from '../hooks/useConvoContext';

interface ConvoProps {
	_id: string;
	participants: string[];
}

export const Convo: FC<ConvoProps> = ({ _id, participants }) => {
	const [user, setUser] = useState<any>({});
	const api = useApi();
	const { auth } = useAuthContext();
	const { setConversation } = useConvoContext();

	useEffect(() => {
		const participant = participants.find((par) => par !== auth._id);
		const fetchUser = async () => {
			try {
				const res = await api.get(`/users/${participant}`);
				setUser(res.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUser();
		return;
	}, []);

	return (
		<button
			className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2`}
			onClick={() => setConversation!({ _id, participants })}
		>
			<div className='h-8 w-8 rounded-full border overflow-hidden'>
				<img src={user.avatar} alt='img' className='h-full w-full' />
			</div>
			<div className='ml-2 text-sm font-semibold'>{`${user.firstName} ${user.lastName}`}</div>
			{/* {user.messageCount ? (
						<div className='flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none'>
							{conversation.messageCount}
						</div>
					) : null} */}
		</button>
	);
};
