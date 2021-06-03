const LoadingScreen = () => {
	return (
		<main className='w-screen h-screen flex items-center justify-center bg-gray-background'>
			<div className='w-32 h-32'>
				<img
					className='w-full h-full'
					src='/images/instagram-gray.png'
					alt='Loading Screen Logo'
				/>
			</div>
		</main>
	)
}

export default LoadingScreen
