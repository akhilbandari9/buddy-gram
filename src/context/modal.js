import { useContext, createContext } from 'react'

const ModalContext = createContext(null)

const useModalContext = () => {
	return useContext(ModalContext)
}

export { useModalContext, ModalContext }
