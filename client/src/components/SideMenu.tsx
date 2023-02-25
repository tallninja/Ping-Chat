import { BrandLogo } from './BrandLogo';
import { ConvoList } from './ConvoList';
import { UserCard } from './UserCard';

export const SideMenu = () => {
	return (
		<div className='flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0'>
			<BrandLogo />
			<UserCard />
			<div className='flex flex-col mt-8'>
				<div className='flex flex-row items-center justify-between text-xs'>
					<span className='font-bold'>Conversations</span>
				</div>
				<ConvoList />
			</div>
		</div>
	);
};
