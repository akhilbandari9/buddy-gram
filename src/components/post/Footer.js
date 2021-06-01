import { Link } from 'react-router-dom'

const Footer = ({ caption, username }) => {
	return (
		<div className='mt-1 p-4 py-0 mb-2'>
			<Link to={`/p/${username}`}>
				<span className='mr-1 font-bold text-sm hover:underline'>
					{username}
				</span>
			</Link>
			<span className='text-sm text-black-light'>{caption}</span>
		</div>
	)
}

export default Footer
