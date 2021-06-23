import useActiveUser from '../../hooks/useActiveUser'
import User from './User'
import Suggestions from './Suggestions'

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
		</section>
	)
}

export default Sidebar
