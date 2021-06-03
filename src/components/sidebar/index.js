import useActiveUser from '../../hooks/useActiveUser'
import User from './User'
import Suggestions from './Suggestions'
import Footer from './Footer'

const Sidebar = () => {
	const {
		user: { docId, fullname, username, userId, following },
	} = useActiveUser()

	return (
		<section className='hidden md:block p-4'>
			<User username={username} fullName={fullname} />
			<Suggestions
				userId={userId}
				following={following}
				loggedInUserDocId={docId}
			/>
			<Footer />
		</section>
	)
}

export default Sidebar
