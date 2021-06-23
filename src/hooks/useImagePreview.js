import { useState, useEffect } from 'react'

const useImagePreview = (file) => {
	const [base64EncodedString, setBase64EncodedString] = useState(null)
	const previewImage = (file) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			setBase64EncodedString(reader.result)
		}
	}

	useEffect(() => {
		file !== null && previewImage(file)
	}, [file])

	return { previewUrl: base64EncodedString }
}

export default useImagePreview
