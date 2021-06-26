import { firebase, FieldValue } from '../lib/firebase'

export async function doesUserNameExist(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get()
	return result.docs.map((user) => user.data().length > 0)
}

export async function getUserByUsername(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get()
	return result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
}

export async function getUserByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('userId', '==', userId)
		.get()
	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}))
	return user
}

export async function getSuggestedProfiles(userId, following) {
	const results = await firebase
		.firestore()
		.collection('users')
		.limit(10)
		.where('userId', '!=', userId)
		.get()
	return results.docs
		.map((user) => ({ ...user.data(), docId: user.id }))
		.filter((profile) => !following.includes(profile.userId))
}

export async function updateLoggedInUserFollowing(
	loggedInUserDocId,
	profileId,
	isFollowingProfile
) {
	return firebase
		.firestore()
		.collection('users')
		.doc(loggedInUserDocId)
		.update({
			following: isFollowingProfile
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId),
		})
}

export async function updateFollowedUserFollowers(
	profileDocId,
	loggedInUserId,
	isFollowingProfile
) {
	return firebase
		.firestore()
		.collection('users')
		.doc(profileDocId)
		.update({
			followers: isFollowingProfile
				? FieldValue.arrayRemove(loggedInUserId)
				: FieldValue.arrayUnion(loggedInUserId),
		})
}

export async function getPhotos(userId, following) {
	const results = await firebase
		.firestore()
		.collection('photos')
		.where('userId', 'in', following)
		.get()

	const userFollowedPhotos = results.docs.map((doc) => ({
		...doc.data(),
		docId: doc.id,
	}))

	const photosWithUserDetails = await Promise.all(
		userFollowedPhotos.map(async (photo) => {
			let userLikedPhoto = false
			if (photo.likes.includes(userId)) {
				userLikedPhoto = true
			}

			const user = await getUserByUserId(photo.userId)

			const { username, avatar } = user[0]
			return { username, ...photo, userLikedPhoto, avatar }
		})
	)
	return photosWithUserDetails
}

export async function getUserIdByUserName(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get()
	return result.docs.map((doc) => doc.data().userId)
}

export async function getUserPhotosByUserId(userId) {
	// const [userId] = getUserIdByUserName(username)
	const result = await firebase
		.firestore()
		.collection('photos')
		.where('userId', '==', userId)
		.get()

	const photosList = result.docs.map((doc) => doc.data())
	return photosList.map((photoData) => ({
		imageSrc: photoData.imageSrc,
		likesCount: photoData.likes.length,
		commentsCount: photoData.comments.length,
		photoId: photoData.photoId,
		dateCreated: photoData.dateCreated,
	}))
}
