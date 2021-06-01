import { useState, useEffect, useContext } from 'react'

import { getUserByUserId, getPhotos } from '../services/firebase'
import UserContext from '../context/user'

const useGetPhotos = () => {
	const [photos, setPhotos] = useState(null)
	const { user } = useContext(UserContext)

	useEffect(() => {
		async function getTimelinePhotos() {
			const [{ following }] = await getUserByUserId(user.uid)
			let followedUserPhotos = []
			if (following.length > 0) {
				followedUserPhotos = await getPhotos(user.uid, following)
			}
			followedUserPhotos.sort((a, b) => a.dateCreated - b.dateCreated)
			setPhotos(followedUserPhotos)
		}
		if (user) {
			getTimelinePhotos()
		}
	}, [user])
	return { photos }
}

export default useGetPhotos
