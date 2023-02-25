import { FC, ReactNode, createContext, useState } from 'react';

export interface Conversation {
	_id: string;
	participants: string[];
}

export interface IConversationContext {
	conversation: Conversation;
	setConversation: React.Dispatch<React.SetStateAction<Conversation | any>>;
}

export const ConversationContext = createContext<IConversationContext | any>(
	{}
);

interface ConversationProviderProps {
	children: ReactNode;
}

export const ConversationProvider: FC<ConversationProviderProps> = ({
	children,
}) => {
	const [conversation, setConversation] = useState<Conversation | any>({});

	return (
		<ConversationContext.Provider value={{ conversation, setConversation }}>
			{children}
		</ConversationContext.Provider>
	);
};
