import { useContext } from 'react';
import { ConversationContext, IConversationContext } from '../context';

export const useConvoContext = () => {
	return useContext<IConversationContext>(ConversationContext);
};
