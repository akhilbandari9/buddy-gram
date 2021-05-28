import { useContext } from 'react'
import { Link, Route } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'
import * as ROUTES from '../constants/routes'
import { HomeIcon, LogoutIcon } from '@heroicons/react/outline'
const Header = () => {
	const { user } = useContext(UserContext)
	const { firebase } = useContext(FirebaseContext)
	return (
		<header className='h-16 bg-white border-b border-gray-primary mb-8'>
			<div className='container mx-auto max-w-screen-lg h-full'>
				<div className='flex justify-between h-full'>
					<div className='text-gray-700 text-center flex items-center cursor-pointer'>
						<h1 className='flex justify-center w-full'>
							<Link to={ROUTES.DASHBOARD} aria-label='Instagram Label'>
								<img
									src='/images/logo.png'
									alt='instagram'
									className='mt-2 w-1/2'
								/>
							</Link>
						</h1>
					</div>
					<div className='text-gray-base text-center flex items-center'>
						{user ? (
							<>
								<Link to={ROUTES.DASHBOARD} aria-label='Dashboard'>
									<HomeIcon className='w-8 mr-6 text-black-light cursor-pointer' />
								</Link>
								<button
									type='button'
									title='Signout'
									onClick={() => firebase.auth().signOut()}
									onKeyDown={(e) => {
										if (e.key === 'Enter') firebase.auth().signOut()
									}}
								>
									<LogoutIcon className='w-8 mr-6 text-black-light cursor-pointer' />
								</button>
								<div className='flex items-center cursor-pointer'>
									<Link to={`/p/${user.displayName}`}>
										<img
											src={`/images/avatars/karl.jpg`}
											className='rounded-full h-8 w-8'
											alt={`${user.displayName} profile`}
										/>
									</Link>
								</div>
							</>
						) : (
							<>
								<Link to={ROUTES.LOGIN}>
									<button
										type='button'
										className='bg-blue-medium font-bold text-sm rounded text-white
									w-20 h-8'
									>
										Log In
									</button>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
