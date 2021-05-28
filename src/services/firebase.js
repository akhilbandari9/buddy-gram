import { firebase, FieldValue } from '../lib/firebase'

export async function doesUserNameExist(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('usernae', '==', username)
		.get()
	return result.docs.map((user) => user.data().length > 0)
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
	isFollowingProfie
) {
	return firebase
		.firestore()
		.collection('users')
		.doc(loggedInUserDocId)
		.update({
			following: isFollowingProfie
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId),
		})
}

export async function updateFollowedUserFollowers(
	profileDocId,
	loggedInUserDocId,
	isFollowingProfie
) {
	return firebase
		.firestore()
		.collection('users')
		.doc(profileDocId)
		.update({
			followers: isFollowingProfie
				? FieldValue.arrayRemove(loggedInUserDocId)
				: FieldValue.arrayUnion(loggedInUserDocId),
		})
}
