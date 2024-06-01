import React from 'react';
import Service from '../components/home/Service';
import TechniqueIcon from '../components/home/TechniqueIcon';
import About from '../components/home/About';
import Jumbotron from '../components/home/Jumbotron';

const HomeView = () => {
	return (
		<div>
			<Jumbotron />
			<About />
			<Service />
			<TechniqueIcon />
		</div>
	);
};

export default HomeView;
