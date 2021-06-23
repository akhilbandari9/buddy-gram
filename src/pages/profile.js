import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { getUserByUsername } from '../services/firebase'

import Header from '../components/Header'
import UserProfile from '../components/profile'

const Profile = () => {
	const [user, setUser] = useState(null)
	const { username } = useParams()
	const history = useHistory()
	//get Profile User
	useEffect(() => {
		async function checkUserExists() {
			const user = await getUserByUsername(username)
			if (user.length > 0) {
				setUser(user[0])
			} else {
				history.push(ROUTES.NOT_FOUND)
			}
		}
		checkUserExists()
	}, [username, history])

	return (
		user && (
			<div className='bg-gray-background mx-auto'>
				<Header />
				<div className='mx-auto max-w-screen-lg'>
					<UserProfile user={user} />
				</div>
			</div>
		)
	)
}

export default Profile
