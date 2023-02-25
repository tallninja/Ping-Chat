import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.sass';
import { AuthProvider, ConversationProvider } from './context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<ConversationProvider>
				<App />
			</ConversationProvider>
		</AuthProvider>
	</React.StrictMode>
);
