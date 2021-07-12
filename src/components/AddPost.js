import { PlusCircleIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import useActiveUser from '../hooks/useActiveUser'
import useImageUpload from '../hooks/useImageUpload'
import useImagePreview from '../hooks/useImagePreview'
import { v4 as uuidv4 } from 'uuid'

const AddPost = ({ setIsOpen }) => {
	const { user } = useActiveUser()
	const [caption, setCaption] = useState('')

	const [inputImage, setInputImage] = useState(null)

	const { previewUrl } = useImagePreview(inputImage)
	const { progress, setSubmitFile } = useImageUpload(inputImage, {
		caption,
		userId: user.userId,
		uuid: uuidv4().slice(0, 8),
	})

	useEffect(() => {
		if (progress === 100) setIsOpen(false)
		// eslint-disable-next-line
	}, [progress])

	const handleSubmitPost = async (e) => {
		e.preventDefault()
		setSubmitFile(true)
	}

	const handlePhotoInput = (e) => {
		const file = e.target.files[0]
		setInputImage(file)
	}

	return (
		<div className='w-full border border-gray-primary rounded'>
			<form
				method='post'
				onSubmit={handleSubmitPost}
				className='flex flex-col m-4 gap-4'
			>
				{!previewUrl ? (
					<div className='p-8'>
						<label
							htmlFor='photo-input'
							className='flex flex-col gap-2 items-center justify-center py-5 border-4 border-gray-primary rounded-xl border-dashed'
						>
							<div className='text-gray-primary font-semibold'>
								Upload Photo
							</div>
							<div className=''>
								<PlusCircleIcon className='w-20 text-gray-primary mx-auto' />
							</div>
						</label>
						<input
							className='hidden'
							type='file'
							id='photo-input'
							onChange={handlePhotoInput}
						/>
					</div>
				) : (
					<div className='max-w-screen-sm mx-auto'>
						<img className='h-72 md:h-96' src={previewUrl} alt='upload' />
						<div className='w-full'>
							<progress className='w-full' value={progress} max='100'>
								{Math.round(progress)}
							</progress>
						</div>
					</div>
				)}
				<div className='flex gap-4 items-center justify-center'>
					<label htmlFor='caption-input'>Caption</label>
					<input
						className='text-base text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary rounded mb-1 outline-none focus:ring-1 ring-gray-base'
						type='text'
						id='caption-input'
						required
						onChange={({ target }) => setCaption(target.value)}
					/>
				</div>
				<div className='ml-auto'>
					<button
						className='bg-gradient-to-r from-start to-end mt-4 text-white px-4 rounded h-8 font-bold'
						type='submit'
					>
						Post
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddPost
