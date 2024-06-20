import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './views/LayoutView';
import NotFound from './views/NotFoundView';
import Home from './views/HomeView';
import BlogView from './views/BlogView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';
import AuthView from './views/AuthView';
import ExperienceView from './views/ExperienceView';
import BlogPageView from './views/BlogPageView';
import DashboardView from './views/DashboardView';
import PrivateRoute from './components/navigation/PrivateRoute';
import { useAuthStore } from './store/auth/useAuthStore';

const App: React.FC = () => {
	const initializeAuth = useAuthStore((state) => state.initializeAuth);

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/auth' element={<AuthView />} />
					<Route path='/about' element={<AboutView />} />
					<Route path='/experience' element={<ExperienceView />} />
					<Route path='/blog' element={<BlogView />} />
					<Route path='/blog/:id' element={<BlogPageView />} />
					<Route path='/contact' element={<ContactView />} />
					<Route
						path='/dashboard'
						element={
							<PrivateRoute>
								<DashboardView />
							</PrivateRoute>
						}
					/>
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
