import { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { doesUserNameExist } from '../services/firebase'

const Signup = () => {
	const history = useHistory()
	const { firebase } = useContext(FirebaseContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [fullName, setFullName] = useState('')
	const [userName, setUserName] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const isInvalid =
		password === '' || email === '' || userName === '' || fullName === ''

	const handleSignup = async (e) => {
		e.preventDefault()
		setLoading(true)
		const userNameExists = await doesUserNameExist(userName)
		if (userNameExists.length === 0) {
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
				createdUserResult.user.updateProfile({
					displayName: userName,
				})

				await firebase.firestore().collection('users').add({
					userId: createdUserResult.user.uid,
					username: userName.toLowerCase(),
					fullname: fullName,
					emailAddress: email.toLowerCase(),
					following: [],
					dateCreated: Date.now(),
				})

				history.push(ROUTES.DASHBOARD)
			} catch (err) {
				setLoading(false)
				setPassword('')
				setError(err)
			}
		} else {
			setError('Username already Taken')
		}
	}

	useEffect(() => {
		document.title = 'Sign Up - Instagram'
	}, [])
	return (
		<div className='container flex mx-auto max-w-screen-md items-center h-screen'>
			<div className='flex flex-col w-4/5 sm:w-3/5 md:w-2/5 mx-auto'>
				<div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
					<h1 className='flex justify-center w-full'>
						<img
							className='mt-2 w-6/12 mb-4'
							src='/images/logo.png'
							alt='Instagram'
						/>
					</h1>
					<h2 className='text-base text-gray-base font-semibold text-opacity-75 text-center mb-4'>
						Sign up to see photos and videos from your friends.
					</h2>
					{error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
					<form method='POST' className='' onSubmit={handleSignup}>
						<input
							type='email'
							aria-label='Enter your email address'
							placeholder='Email Address'
							className='input-field'
							value={email}
							onChange={({ target }) => setEmail(target.value)}
						/>
						<input
							type='text'
							aria-label='Enter your Full Name'
							placeholder='Full Name'
							className='input-field'
							value={fullName}
							onChange={({ target }) => setFullName(target.value)}
						/>
						<input
							type='text'
							aria-label='Enter your Username'
							placeholder='Username'
							className='input-field'
							value={userName}
							onChange={({ target }) => setUserName(target.value)}
						/>

						<input
							type='password'
							aria-label='Enter your password'
							placeholder='Password'
							className='input-field'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<button
							type='submit'
							disabled={isInvalid}
							className={`bg-blue-medium mt-4 text-white w-full rounded h-8 font-bold 
						${isInvalid && ' opacity-50'}`}
						>
							{loading ? 'Loading...' : 'Sign Up'}
						</button>
						<small className='text-center w-4/5 text-xs mx-auto block mt-4 text-gray-base text-opacity-75'>
							By signing up, you agree to our Terms, Data Policy and Cookies
							Policy .
						</small>
					</form>
				</div>
				<div className='flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
					<p className='text-sm'>
						Have an account?{'   '}
						<Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Signup
