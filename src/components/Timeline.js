import { memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import useGetPhotos from '../hooks/useGetPhotos'
import Post from './post'

const Timeline = () => {
	const { photos } = useGetPhotos()

	return (
		<section className='col-span-3  md:col-span-2  container max-w-screen-sm mx-auto'>
			{!photos ? (
				[...new Array(4)].map((_, index) => (
					<Skeleton key={index} count={1} width={614} height={700} />
				))
			) : photos?.length > 0 ? (
				photos.map((content) => <Post key={content.docId} photoObj={content} />)
			) : (
				<p className='text-center text-2xl'>Follow people to see photos!</p>
			)}
		</section>
	)
}

export default memo(Timeline)
