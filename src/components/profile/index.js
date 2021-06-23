import { useReducer, useEffect } from 'react'
import ProfileHeader from './ProfileHeader'
import { getUserPhotosByUserId } from '../../services/firebase'

import Photos from './Photos'

const UserProfile = ({ user }) => {
	const reducer = (state, newState) => ({ ...state, ...newState })
	const initialState = {
		profile: user,
		photosCollection: [],
		followerCount: 0,
		doesActiveUserFollow: false,
	}

	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	)

	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			const photos = await getUserPhotosByUserId(profile.userId)

			dispatch({
				photosCollection: photos,
				followerCount: profile.followers.length,
				profile: user,
			})
		}
		profile && getProfileInfoAndPhotos()
	}, [profile, user])
	return (
		<div>
			<ProfileHeader
				profile={profile}
				profileUserId={profile.userId}
				followerCount={followerCount}
				setFollowerCount={dispatch}
				photosCount={photosCollection && photosCollection.length}
			/>
			<Photos photos={photosCollection} />
		</div>
	)
}
export default UserProfile
