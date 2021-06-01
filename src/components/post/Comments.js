import { useState } from 'react'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
import AddComment from './AddComment'

const Comments = ({ docId, comments: allComments, posted, commentInput }) => {
	const [comments, setComments] = useState(allComments)
	return (
		<section>
			<div className='p-4 pt-1 pb-4'>
				{comments.length >= 3 && (
					<p className='text-sm text-gray-base mb-1 cursor-pointer'>
						View All {comments.length}
					</p>
				)}
				{comments.slice(0, 3).map((item, index) => (
					<p key={index} className='mb-1 text-sm'>
						<Link to={`/p/${item.displayName}`}>
							<span className='mr-1 font-bold hover:underline'>
								{item.displayName}
							</span>
						</Link>
						<span>{item.comment}</span>
					</p>
				))}
				<p
					className='text-gray-base uppercase mt-2'
					style={{ fontSize: '10px' }}
				>
					{formatDistance(posted, new Date())} ago
				</p>
			</div>
			<div className=''>
				<AddComment
					commentRef={commentInput}
					docId={docId}
					comments={comments}
					setComments={setComments}
				/>
			</div>
		</section>
	)
}

export default Comments
