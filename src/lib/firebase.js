import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
	apiKey: 'AIzaSyDGdrqzykTE2y4zppq5c1Zh4nYNeKNuww0',
	authDomain: 'instagram-clone-2fdc0.firebaseapp.com',
	projectId: 'instagram-clone-2fdc0',
	storageBucket: 'instagram-clone-2fdc0.appspot.com',
	messagingSenderId: '1012089431711',
	appId: '1:1012089431711:web:3cf467eff6615c863624aa',
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

export { firebase, FieldValue }
