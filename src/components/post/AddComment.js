import React, { useState, useContext } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'

const AddComment = ({ commentRef, docId, comments, setComments }) => {
	const { firebase, FieldValue } = useContext(FirebaseContext)
	const {
		user: { displayName },
	} = useContext(UserContext)

	const [comment, setComment] = useState('')

	const handleSubmitComment = (e) => {
		e.preventDefault()

		setComments([{ displayName, comment }, ...comments])

		firebase
			.firestore()
			.collection('photos')
			.doc(docId)
			.update({
				comments: FieldValue.arrayUnion({ displayName, comment }),
			})
		setComment('')
	}

	return (
		<div className='border-t border-gray-primary '>
			<form
				className='flex justify-between pl-0 pr-5 '
				method='post'
				onSubmit={(e) => comment.length >= 1 && handleSubmitComment(e)}
			>
				<input
					type='text'
					ref={commentRef}
					aria-label='Add a comment'
					className='text-sm text-gray-base w-full mr-3 py-4 px-4 outline-none'
					name='add-comment'
					placeholder='Add a comment...'
					value={comment}
					onChange={({ target }) => setComment(target.value)}
				/>
				<button
					className={`text-sm font-bold text-blue-medium  outline-none focus:outline-none ${
						!comment && ` opacity-50`
					}`}
					disabled={comment.length < 1}
					type='submit'
					aria-label='Post Comment'
				>
					Post
				</button>
			</form>
		</div>
	)
}

export default AddComment
