import { lazy, Suspense, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/useAuthListener'
import UserContext from './context/user'
import { ProtectedRoute } from './helpers/routes'

const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const NotFound = lazy(() => import('./pages/not-found'))

function App() {
	const { user } = useAuthListener()

	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<p>Loading...</p>}>
					<Switch>
						<Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
						<Route exact path={ROUTES.LOGIN} component={Login} />
						<Route exact path={ROUTES.SIGNUP} component={Signup} />
						<Route exact component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	)
}

export default App
