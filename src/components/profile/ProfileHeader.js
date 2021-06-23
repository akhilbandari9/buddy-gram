import { useEffect, useState } from 'react'
import useActiveUser from '../../hooks/useActiveUser'
import {
	updateLoggedInUserFollowing,
	updateFollowedUserFollowers,
} from '../../services/firebase'

const ProfileHeader = ({
	profile,
	photosCount,
	followerCount,
	setFollowerCount,
}) => {
	const {
		docId: profileDocId,
		userId: profileUserId,
		fullName,
		username: profileUsername,
		following = [],
	} = profile
	const [isFollowingProfile, setIsFollowingProfile] = useState(false)
	const { user: activeUser } = useActiveUser()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (activeUser.userId)
			setIsFollowingProfile(activeUser.following.includes(profileUserId))
	}, [profileUserId, activeUser.following, activeUser.userId])

	const handleToggleFollow = async () => {
		setLoading(true)
		await updateFollowedUserFollowers(
			profileDocId,
			activeUser.userId,
			isFollowingProfile
		)
		setFollowerCount({
			followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
		})
		setIsFollowingProfile((prev) => !prev)
		setLoading(false)
		await updateLoggedInUserFollowing(
			activeUser.docId,
			profileUserId,
			isFollowingProfile
		)
	}

	return (
		<header className='flex flex-row container mx-auto w-full text-black-light '>
			<div className='flex-grow flex justify-center ml-3'>
				{profileUsername && (
					<img
						className='rounded-full h-20 sm:h-30 w-20 sm:w-30 md:h-40 md:w-40 flex'
						src={`/images/avatars/${profileUsername}.jpg`}
						alt={profileUsername}
					/>
				)}
			</div>
			{profileUsername && (
				<section className='justify-center flex flex-col flex-grow-2'>
					<div className='flex  flex-col'>
						<div className='flex items-center  mx-3'>
							<p className='text-xl md:text-3xl font-light'>
								{profileUsername}
							</p>
							<div className='md:ml-auto ml-4'>
								{activeUser.username !== profileUsername && (
									<button
										className={`w-32 rounded  px-5 md:px-6 py-1 md:py-2 font-bold focus:outline-none${
											isFollowingProfile
												? ` bg-gray-background text-gray-base border border-gray-primary`
												: ` bg-gradient-to-r from-start to-end text-white border border-opacity-0`
										}`}
										onClick={handleToggleFollow}
									>
										{loading
											? '...'
											: isFollowingProfile
											? 'Unfollow'
											: 'Follow'}
									</button>
								)}
							</div>
						</div>
						<ul className='flex list-none gap-3 md:gap-10 mt-3  md:mt-5 font-light text-md mx-3'>
							<li>
								<span className='font-semibold'>{photosCount}</span>
								<span>{photosCount === 1 ? ' post' : ' posts'}</span>
							</li>
							<li>
								<span className='font-semibold '>{followerCount}</span>
								<span>
									<span>{followerCount === 1 ? ' follower' : ' follwers'}</span>
								</span>
							</li>
							<li>
								<span className='font-semibold '>{following.length}</span>
								<span>{` following`}</span>
							</li>
						</ul>
						<div className='mt-3 md:mt-5 mx-3'>
							<p className='font-semibold text-base'>{fullName}</p>
						</div>
					</div>
				</section>
			)}
		</header>
	)
}

export default ProfileHeader
