import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
	useEffect(() => {
		document.title = 'Not Found - Fuse'
	}, [])
	return (
		<div className='container mx-auto max-w-screen-md'>
			<h1 className='text-3xl mt-14'> Page Not Found</h1>
			<p className='mt-4'>
				Go to Fuse {'  '}
				<Link className='font-semibold text-blue-medium underline' to='/'>
					Home
				</Link>
			</p>
		</div>
	)
}

export default NotFound
