import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as ROUTES from './constants/routes'

const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const Dashboard = lazy(() => import('./pages/dashboard'))

function App() {
	return (
		<Router>
			<Suspense fallback={<p>Loading...</p>}>
				<Switch>
					<Route exact path={ROUTES.LOGIN} component={Login} />
					<Route exact path={ROUTES.SIGNUP}>
						<Signup />
					</Route>
					<Route exact path={ROUTES.DASHBOARD}>
						<Dashboard />
					</Route>
				</Switch>
			</Suspense>
		</Router>
	)
}

export default App
