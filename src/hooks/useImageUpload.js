import { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../context/firebase'

const useImageUpload = (file, { caption, uuid, userId }) => {
	const { firebase } = useContext(FirebaseContext)

	const [progress, setProgress] = useState(0)
	const [error, setError] = useState(null)
	const [url, setUrl] = useState(null)
	const [submitFile, setSubmitFile] = useState(false)

	useEffect(() => {
		async function asyncFunction() {
			try {
				if (submitFile) {
					const storageRef = firebase
						.storage()
						.ref()
						.child(`post-photos/${uuid}`)

					storageRef.put(file).on(
						'state_changed',
						(snap) => {
							let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
							setProgress(percentage)
						},

						(err) => {
							setError(err)
						},
						async () => {
							const downloadUrl = await storageRef.getDownloadURL()
							setUrl(downloadUrl)

							await firebase.firestore().collection('photos').add({
								caption,
								comments: [],
								dateCreated: Date.now(),
								imageSrc: downloadUrl,
								likes: [],
								photoId: uuid,
								userId,
							})
						}
					)
				}
			} catch (err) {
				setError(err)
			}
		}

		asyncFunction()
		// eslint-disable-next-line
	}, [file, submitFile])

	return { progress, error, setSubmitFile, url }
}

export default useImageUpload
