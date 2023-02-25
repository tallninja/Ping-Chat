import { FormEvent, useRef } from 'react';
import { useApi } from '../hooks/useApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';

export const Signup = () => {
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();
	const api = useApi();

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await api.post('/auth/signup', {
				firstName: firstNameRef.current?.value,
				lastName: lastNameRef.current?.value,
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
			});
			navigate('/login');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='w-screen h-screen bg-[#f0f2f5] flex items-center justify-center'>
			<div className='flex w-[70%] h-[70%]'>
				<div className='flex flex-1 flex-col justify-center'>
					<div className='flex items-center'>
						<div className='flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-[50px] w-[50px] mr-4'>
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
									d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
								></path>
							</svg>
						</div>
						<h3 className='text-[50px] font-[800] text-[#1775ee] mb-[10px]'>
							PingChat
						</h3>
					</div>
					<span className='text-[20px]'>
						Connect and share your experience with strangers
					</span>
				</div>
				<div className='flex flex-1 flex-col justify-center'>
					<form
						className='h-[450px] p-[20px] bg-white rounded-[10px] flex flex-col justify-between shadow-md'
						onSubmit={onSubmit}
					>
						<input
							className='h-[50px] rounded-[10px] border-[1px] border-solid border-gray-100 text-[18px] pl-[20px] focus:outline-none'
							type='text'
							placeholder='First Name'
							required
							ref={firstNameRef}
						/>
						<input
							className='h-[50px] rounded-[10px] border-[1px] border-solid border-gray-100 text-[18px] pl-[20px] focus:outline-none'
							type='text'
							placeholder='Last Name'
							required
							ref={lastNameRef}
						/>
						<input
							className='h-[50px] rounded-[10px] border-[1px] border-solid border-gray-100 text-[18px] pl-[20px] focus:outline-none'
							type='email'
							placeholder='Email'
							required
							ref={emailRef}
						/>
						<input
							className='h-[50px] rounded-[10px] border-[1px] border-solid border-gray-100 text-[18px] pl-[20px] focus:outline-none'
							type='password'
							placeholder='Password'
							required
							minLength={6}
							ref={passwordRef}
						/>
						<button className='h-[50px] rounded-[10px] border-none bg-[#1775ee] text-white text-[20px] font-[500] cursor-pointer focus:outline-none disabled:cursor-not-allowed'>
							Register
						</button>
						<button
							className='w-[60%] self-center h-[50px] rounded-[10px] border-none bg-[#42b72a] text-white text-[20px] font-[500] cursor-pointer'
							onClick={() => navigate('/login')}
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
