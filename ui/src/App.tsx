import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
	ExperienceView,
	NotFoundView,
	LayoutView,
	BlogView,
	HomeView,
	ContactView,
	AboutView,
	BlogPageView,
	AuthView,
} from './views';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<LayoutView />}>
				<Route index element={<HomeView />} />
				<Route path='/auth' element={<AuthView />} />
				<Route path='/about' element={<AboutView />} />
				<Route path='/experience' element={<ExperienceView />} />
				<Route path='/blog' element={<BlogView />} />
				<Route path='/blog/:id' element={<BlogPageView />} />
				<Route path='/contact' element={<ContactView />} />
				<Route path='*' element={<NotFoundView />} />
			</Route>
		</Routes>
	);
};

export default App;
