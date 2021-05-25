import { firebase, FieldValue } from '../lib/firebase'

export async function doesUserNameExist(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('usernae', '==', username)
		.get()
	return result.docs.map((user) => user.data().length > 0)
}
