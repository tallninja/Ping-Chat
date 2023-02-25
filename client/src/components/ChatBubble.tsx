import { FC, useEffect, useRef } from 'react';
import { useAuthContext } from '../hooks';

interface ChatBubbleProps {
	text: string;
	sender: string;
	participant: any;
}

export const ChatBubble: FC<ChatBubbleProps> = ({
	text,
	sender,
	participant,
}) => {
	const { auth } = useAuthContext();
	const scrollRef = useRef<HTMLDivElement>(null);
	const userIsSender: boolean = auth._id === sender;

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (
		<div
			className={`${
				userIsSender ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8'
			} p-3 rounded-lg`}
			ref={scrollRef}
		>
			<div
				className={`flex items-center ${
					userIsSender ? 'flex-row-reverse' : 'flex-row'
				}`}
			>
				<div className='flex items-center justify-center h-10 w-10 rounded-full border overflow-hidden flex-shrink-0'>
					<img
						src={userIsSender ? auth.avatar : participant.avatar}
						alt='img'
						className='h-full w-full'
					/>
				</div>
				<div
					className={`relative ${userIsSender ? 'mr-3' : 'ml-3'} text-sm ${
						userIsSender && 'bg-indigo-200'
					} py-2 px-4 shadow rounded-xl`}
				>
					<div>{text}</div>
				</div>
			</div>
		</div>
	);
};
