import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/useAuthListener'
import UserContext from './context/user'
import ProtectedRoute from './helpers/ProtectedRoute'
import IsUserLoggedIn from './helpers/IsUserLoggedIn'
import LoadingScreen from './components/LoadingScreen'

const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const NotFound = lazy(() => import('./pages/not-found'))
const Profile = lazy(() => import('./pages/profile'))

function App() {
	const { user } = useAuthListener()
	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<LoadingScreen />}>
					<Switch>
						<IsUserLoggedIn
							loggedInPath={ROUTES.DASHBOARD}
							path={ROUTES.LOGIN}
							user={user}
							exact
						>
							<Login />
						</IsUserLoggedIn>
						<IsUserLoggedIn
							loggedInPath={ROUTES.DASHBOARD}
							path={ROUTES.SIGNUP}
							user={user}
							exact
						>
							<Signup />
						</IsUserLoggedIn>
						<ProtectedRoute exact path={ROUTES.DASHBOARD} user={user}>
							<Dashboard />
						</ProtectedRoute>
						<Route path={ROUTES.PROFILE} component={Profile} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	)
}

export default App
