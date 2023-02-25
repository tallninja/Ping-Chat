import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home, Login, Signup } from './pages';
import { PersistLogin, ProtectedRoute } from './components';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route element={<PersistLogin />}>
					<Route path='/' element={<ProtectedRoute />}>
						<Route index element={<Home />} />
					</Route>
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</Router>
	);
};

export default App;
