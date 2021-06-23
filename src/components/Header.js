import { useContext } from 'react'
import { Link } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'
import * as ROUTES from '../constants/routes'
import { HomeIcon, LogoutIcon, PlusCircleIcon } from '@heroicons/react/outline'
import useModal from '../hooks/useModal'
import Modal from './modal/Modal'
import AddPost from './AddPost'
const Header = () => {
	const { user } = useContext(UserContext)
	const { firebase } = useContext(FirebaseContext)
	const { isOpen, setIsOpen } = useModal()

	return (
		<header className='h-12 md:h-16 bg-white border-b border-gray-primary mb-3 md:mb-8 mx-2'>
			<div className='container mx-auto max-w-screen-lg h-full'>
				<div className='flex h-full w-full'>
					<div className='text-gray-700 text-center flex items-center cursor-pointer mx-auto md:mx-0'>
						<h1 className='flex justify-center'>
							<Link to={ROUTES.DASHBOARD} aria-label='Fuse Label'>
								<img
									src='/images/logo.png'
									alt='fuse'
									className='mt-2 h-12 md:h-14'
								/>
							</Link>
						</h1>
					</div>
					<div className='text-gray-base text-center fixed bottom-0 right-0 md:static z-50 opacity-100 bg-white w-full md:w-96 py-2 ml-auto'>
						{user ? (
							<nav className='flex w-full md:w-96 justify-around items-center bg-white'>
								<Link to={ROUTES.DASHBOARD} aria-label='Dashboard'>
									<HomeIcon className='w-6 md:w-8 mr-6 text-black-light cursor-pointer' />
								</Link>
								<div className='mr-4'>
									<button
										onClick={() => setIsOpen(true)}
										className='flex border border-gray-base rounded py-1 px-2 items-center justify-center'
									>
										<PlusCircleIcon className='w-6 md:w-8 mr-2 text-black-light cursor-pointer' />{' '}
										<span>Add Post</span>
									</button>
									<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
										<AddPost setIsOpen={setIsOpen} />
									</Modal>
								</div>
								<button
									type='button'
									title='Signout'
									onClick={() => firebase.auth().signOut()}
									onKeyDown={(e) => {
										if (e.key === 'Enter') firebase.auth().signOut()
									}}
								>
									<LogoutIcon className='w-6 md:w-8 mr-6 text-black-light cursor-pointer' />
								</button>
								<div className='flex items-center cursor-pointer'>
									<Link to={`/p/${user.displayName}`}>
										<img
											src={`/images/avatars/${user.displayName}.jpg`}
											className='rounded-full h-7 md:h-8 w-7 md:w-8'
											alt={`${user.displayName} profile`}
										/>
									</Link>
								</div>
							</nav>
						) : (
							<>
								<Link to={ROUTES.LOGIN}>
									<button
										type='button'
										className='bg-gradient-to-r from-start to-end font-bold text-sm rounded text-white
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
