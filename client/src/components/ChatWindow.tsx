import { useEffect, useRef, useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { MessagePrompt } from './MessagePrompt';
import { useConvoContext } from '../hooks/useConvoContext';
import { useApi } from '../hooks/useApi';
import { useAuthContext } from '../hooks';
import { useSocketContext } from '../hooks/useSocketContext';

interface Message {
	_id: string;
	conversation: string;
	sender: string;
	text: string;
	createdAt: string;
}

export const ChatWindow = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [arrMessage, setArrMessage] = useState<any>(null);
	const [participant, setParticipant] = useState<any>({});
	const scrollRef = useRef<HTMLDivElement>(null);
	const { auth } = useAuthContext();
	const { conversation } = useConvoContext();
	const socket = useSocketContext();
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

	useEffect(() => {
		// console.log(socket);
		socket?.on('getMessage', (data) => {
			console.log(data);
			setArrMessage({
				sender: data.senderId,
				text: data.text,
			});
		});
	}, [socket]);

	useEffect(() => {
		arrMessage &&
			conversation.participants.includes(arrMessage.sender) &&
			setMessages((prev) => [...prev, arrMessage]);
	}, [arrMessage, conversation]);

	return (
		<div className='flex flex-col flex-auto h-full p-6'>
			<div className='flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4'>
				<div className='flex flex-col h-full overflow-x-auto mb-4'>
					<div className='flex flex-col h-full'>
						{conversation?._id ? (
							<>
								{messages.length ? (
									<div className='grid grid-cols-12 gap-y-2'>
										{messages.map((message, idx) => {
											return (
												<ChatBubble
													key={idx}
													text={message.text}
													sender={message.sender}
													participant={participant}
												/>
											);
										})}
									</div>
								) : (
									<div className='w-full h-full flex items-center justify-center'>
										<span className='text-2xl text-gray-500'>
											{`Start chatting with ${participant.firstName} ${participant.lastName}`}
										</span>
									</div>
								)}
							</>
						) : (
							<div className='w-full h-full flex items-center justify-center'>
								<span className='text-2xl text-gray-500'>
									Open a conversation to start chatting
								</span>
							</div>
						)}
					</div>
				</div>
				{conversation?._id ? (
					<MessagePrompt messages={messages} setMessages={setMessages} />
				) : null}
			</div>
		</div>
	);
};
