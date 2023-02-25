import {
	BrandLogo,
	ChatWindow,
	ConvoList,
	SideMenu,
	UserCard,
	UsersList,
} from '../components';

export const Home = () => {
	return (
		<div className='flex h-screen antialiased text-gray-800'>
			<div className='flex flex-row h-full w-full overflow-x-hidden'>
				<SideMenu />
				<ChatWindow />
				<UsersList />
			</div>
		</div>
	);
};
