import { useContext, useEffect, useRef, useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { MessagePrompt } from './MessagePrompt';
import { useConvoContext } from '../hooks/useConvoContext';
import { useApi } from '../hooks/useApi';
import { useAuthContext } from '../hooks';

interface Message {
	_id: string;
	conversation: string;
	sender: string;
	text: string;
	createdAt: string;
}

export const ChatWindow = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [participant, setParticipant] = useState({});
	const scrollRef = useRef<HTMLDivElement>(null);
	const { auth } = useAuthContext();
	const { conversation, setConversation } = useConvoContext();
	const api = useApi();

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const res = await api.get(`/messages/${conversation._id}`);
				setMessages(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		const fetchParticipant = async () => {
			try {
				const userId = conversation.participants.find(
					(par) => par !== auth._id
				);
				const res = await api.get(`/users/${userId}`);
				setParticipant(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		if (conversation._id) {
			fetchParticipant();
			fetchMessages();
		}
		return;
	}, [conversation]);

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className='flex flex-col flex-auto h-full p-6'>
			<div className='flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4'>
				<div className='flex flex-col h-full overflow-x-auto mb-4'>
					<div className='flex flex-col h-full'>
						{conversation?._id ? (
							<div className='grid grid-cols-12 gap-y-2'>
								{messages.length
									? messages.map((message, idx) => {
											return (
												<ChatBubble
													key={idx}
													text={message.text}
													sender={message.sender}
													participant={participant}
												/>
											);
									  })
									: null}
								{/* <div ref={scrollRef}></div> */}
							</div>
						) : (
							<div className='w-full h-full flex items-center justify-center'>
								<span className='text-2xl text-gray-500'>
									Open a conversation to start chatting
								</span>
							</div>
						)}
					</div>
				</div>
				<MessagePrompt messages={messages} setMessages={setMessages} />
			</div>
		</div>
	);
};
