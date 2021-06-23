import Skeleton from 'react-loading-skeleton'
import { HeartIcon, ChatIcon } from '@heroicons/react/solid'
const Photos = ({ photos }) => {
	return (
		<section className='container mx-auto mt-12 p-1'>
			<div className='grid grid-cols-3 gap-1 md:gap-8 '>
				{!photos ? (
					<Skeleton count={12} width={320} height={320} />
				) : photos.length > 0 ? (
					photos.map((photo) => (
						<div key={photo.photoId} className='relative group'>
							<img src={photo.imageSrc} alt={photo.caption} />
							<div className='absolute top-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden transition duration-1000'>
								<p className='flex items-center text-white font-bold   opacity-80'>
									<HeartIcon className=' w-4 md:w-8 mr-2 md:mr-4' />
									<span>{photo.likesCount}</span>
								</p>
								<p className='flex items-center text-white font-bold opacity-80'>
									<ChatIcon className=' w-4 md:w-8 mr-2 md:mr-4' />
									<span>{photo.commentsCount}</span>
								</p>
							</div>
						</div>
					))
				) : null}
			</div>
			{photos.length === 0 && (
				<p className='text-center text-3xl font-light'>No Posts Yet</p>
			)}
		</section>
	)
}

export default Photos
