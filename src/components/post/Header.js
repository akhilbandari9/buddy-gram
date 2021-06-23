import { Link } from 'react-router-dom'
import { DotsHorizontalIcon } from '@heroicons/react/outline'

const Header = ({ username }) => {
	return (
		<div className='flex  h-4 py-6 px-2 md:px-4'>
			<div className='flex items-center w-full'>
				<Link to={`/p/${username}`} className='flex items-center'>
					<img
						src={`/images/avatars/${username}.jpg`}
						onError={(e) => (e.target.src = `/images/avatars/default.png`)}
						className='w-8 rounded-full'
						alt={`${username}`}
					/>
					<p className='hover:underline font-semibold text-sm text-black-light ml-4 w-full'>
						{username}
					</p>
				</Link>
				<DotsHorizontalIcon className='ml-auto w-4 h-4 cursor-pointer text-base font-semibold text-black-light block' />
			</div>
		</div>
	)
}

export default Header
