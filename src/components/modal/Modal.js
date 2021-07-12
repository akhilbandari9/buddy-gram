import { XIcon } from '@heroicons/react/outline'
import ReactDOM from 'react-dom'

const Modal = ({ children, isOpen, setIsOpen }) => {
	const handleClose = (e) => {
		e.stopPropagation()
		setIsOpen(false)
	}

	if (!isOpen) return null

	return ReactDOM.createPortal(
		<div className='fixed top-0 left-0  h-screen w-screen z-10 flex justify-center'>
			<div
				className='bg-black-light opacity-40 w-screen h-screen fixed top-0 left-0'
				onClick={handleClose}
			></div>

			<div className='opacity-100 z-50 w-screen h-full md:h-auto md:max-w-screen-md  bg-gray-background rounded-lg pt-0 p-3'>
				<div className='h-full'>
					<div className='flex justify-end items-center h-8  md:h-10 mb-0 mt-4  md:mb-4 m-4 md:m-8'>
						<button onClick={handleClose}>
							<XIcon className='w-10 md:w-6 text-black-light' />
						</button>
					</div>
					<div className='mx-auto p-6 md:p-8 flex   justify-center'>
						{children}
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('modal-root')
	)
}

export default Modal
