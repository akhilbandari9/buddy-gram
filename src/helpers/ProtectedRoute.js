import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

const ProtectedRoute = ({ children, user, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (!user)
					return (
						<Redirect
							to={{ pathname: ROUTES.LOGIN, state: { from: location } }}
						/>
					)
				if (user) return children

				return null
			}}
		/>
	)
}

export default ProtectedRoute
