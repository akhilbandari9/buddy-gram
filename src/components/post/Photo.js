const Photo = ({ src, caption }) => {
	return (
		<picture className='w-full h-full'>
			<img loading='lazy' src={src} alt={caption} />
		</picture>
	)
}

export default Photo
