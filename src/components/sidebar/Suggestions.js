import { useState, useEffect, Suspense, memo } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'
import { Link } from 'react-router-dom'
import SuggestedProfile from './SuggestedProfile'

const Suggestions = ({ loggedInUserDocId, userId, following }) => {
	const [profiles, setProfiles] = useState(null)

	useEffect(() => {
		async function suggestedProfiles() {
			const response = await getSuggestedProfiles(userId, following)
			setProfiles(response)
		}

		userId && suggestedProfiles()
	}, [userId])

	return !profiles ? (
		<Skeleton count={5} height={48} />
	) : profiles.length <= 0 ? (
		<div className='text-gray-base font-bold text-xs'>No Suggestions</div>
	) : (
		<div className='rounded flex flex-col '>
			<div className='text-sm flex items-center justify-between mb-2'>
				<h3 className='font-bold text-gray-light text-sm'>
					Suggestions For You
				</h3>
				<Link to='#' className='text-gray-base font-bold text-xs'>
					See all
				</Link>
			</div>
			<div className='mb-8 flex flex-col'>
				{profiles.map((profile) => (
					<SuggestedProfile
						key={profile.docId}
						username={profile.username}
						profileDocId={profile.docId}
						profileId={profile.userId}
						userId={userId}
						loggedInUserDocId={loggedInUserDocId}
					/>
				))}
			</div>
		</div>
	)
}

Suggestions.propTypes = {
	userId: PropTypes.string,
}

export default memo(Suggestions)
