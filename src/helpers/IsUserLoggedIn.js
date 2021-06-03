import { Route, Redirect } from 'react-router-dom'
//prevent users who are logged in to go to login or signup page

const IsUserLoggedIn = ({ children, loggedInPath, user, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (!user) return children
				if (user)
					return (
						<Redirect
							to={{ pathname: loggedInPath, state: { from: location } }}
						/>
					)
				return null
			}}
		/>
	)
}

export default IsUserLoggedIn
