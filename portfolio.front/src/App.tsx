import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Layout from './views/LayoutView';
import NotFound from './views/NotFoundView';
import Home from './views/HomeView';
import BlogView from './views/BlogView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';
import AuthView from './views/AuthView';
import ExperienceView from './views/ExperienceView';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/auth' element={<AuthView />} />
					<Route path='/about' element={<AboutView />} />
					<Route path='/experience' element={<ExperienceView />} />
					<Route path='/blog' element={<BlogView />} />
					<Route path='/contact' element={<ContactView />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
