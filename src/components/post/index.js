import { useRef } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Photo from './Photo'
import Actions from './Actions'
import Footer from './Footer'
import Comments from './Comments'

const Post = ({ photoObj }) => {
	const commentInput = useRef(null)
	const handleFocus = () => commentInput.current.focus()

	return (
		<div className='bg-white mb-6 md:mb-12 max-w-screen-sm w-full border border-gray-primary rounded'>
			<Header imageSrc={photoObj.imageSrc} username={photoObj.username} />
			<Photo src={photoObj.imageSrc} />
			<Actions
				docId={photoObj.docId}
				totalLikes={photoObj.likes.length}
				likedPhoto={photoObj.userLikedPhoto}
				handleFocus={handleFocus}
			/>
			<Footer username={photoObj.username} caption={photoObj.caption} />
			<Comments
				comments={photoObj.comments}
				docId={photoObj.docId}
				posted={photoObj.dateCreated}
				commentInput={commentInput}
			/>
		</div>
	)
}

export default Post

Post.propTypes = {
	photoObj: PropTypes.shape({
		username: PropTypes.string.isRequired,
		imageSrc: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
		comments: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired,
		docId: PropTypes.string.isRequired,
		userLikedPhoto: PropTypes.bool.isRequired,
		likes: PropTypes.array.isRequired,
	}),
}
