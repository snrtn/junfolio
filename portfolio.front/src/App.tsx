import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Layout from './views/LayoutView';
import Home from './views/HomeView';
import BlogView from './views/BlogView';
import NotFound from './views/NotFoundView';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='blog' element={<BlogView />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
