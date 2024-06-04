import Jumbotron from '../components/home/Jumbotron';
import About from '../components/home/About';
import Service from '../components/home/Service';
import TechniqueIcon from '../components/home/TechniqueIcon';
import Blog from '../components/home/Blog';
import Contact from '../components/home/Contact';

const HomeView = () => {
	return (
		<div>
			<Jumbotron />
			<About />
			<Service />
			<TechniqueIcon />
			<Blog />
			<Contact />
		</div>
	);
};

export default HomeView;
