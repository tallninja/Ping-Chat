import { ChangeEvent, FC, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useConvoContext } from '../hooks/useConvoContext';
import { useAuthContext } from '../hooks';
import { useSocketContext } from '../hooks/useSocketContext';

interface MessagePromptProps {
	messages: any[];
	setMessages: Function;
}

export const MessagePrompt: FC<MessagePromptProps> = ({
	messages,
	setMessages,
}) => {
	const [message, setMessage] = useState('');
	const api = useApi();
	const { conversation } = useConvoContext();
	const socket = useSocketContext();
	const { auth } = useAuthContext();

	const receiver = conversation?.participants?.find((par) => par !== auth._id);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		// socket?.emit('typing', { senderId: auth._id, receiverId: receiver });
		setMessage(e.target.value);
	};

	const sendMessage = async () => {
		socket?.emit('sendMessage', {
			senderId: auth._id,
			receiverId: receiver,
			text: message,
		});

		try {
			const res = await api.post('/messages', {
				conversation: conversation._id,
				text: message,
			});
			setMessage('');
			setMessages([...messages, res.data]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'>
			<div>
				<button className='flex items-center justify-center text-gray-400 hover:text-gray-600'>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
						></path>
					</svg>
				</button>
			</div>
			<div className='flex-grow ml-4'>
				<div className='relative w-full'>
					<input
						type='text'
						className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10'
						value={message}
						onChange={onChange}
						onKeyDown={(e) => {
							if (e.key === 'Enter') sendMessage();
						}}
					/>
					<button className='absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600'>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							></path>
						</svg>
					</button>
				</div>
			</div>
			<div className='ml-4'>
				<button
					className='flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0'
					onClick={sendMessage}
				>
					<span>Send</span>
					<span className='ml-2'>
						<svg
							className='w-4 h-4 transform rotate-45 -mt-px'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
							></path>
						</svg>
					</span>
				</button>
			</div>
		</div>
	);
};
