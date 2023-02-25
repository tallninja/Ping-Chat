import { useEffect, useState } from 'react';
import { Convo } from './Convo';
import { useApi } from '../hooks/useApi';
import { useAuthContext } from '../hooks';
import { useConvoContext } from '../hooks/useConvoContext';

export const ConvoList = () => {
	const [conversations, setConversations] = useState<any[]>([]);
	const api = useApi();
	const { auth } = useAuthContext();
	const { conversation } = useConvoContext();

	useEffect(() => {
		const fetchUserConversations = async () => {
			try {
				const res = await api.get(`/conversations/${auth._id}`);
				setConversations(res.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserConversations();
		return;
	}, [conversation]);

	return (
		<>
			{conversations.length ? (
				<div className='flex flex-col space-y-1 mt-4 -mx-2 h-64 overflow-y-auto'>
					{conversations.map((conversation, idx) => (
						<Convo
							key={idx}
							_id={conversation._id}
							participants={conversation.participants}
						/>
					))}
				</div>
			) : (
				<div className='flex items-center justify-center'>No Conversations</div>
			)}
		</>
	);
};
