import React from 'react';
import { Container } from './service.styles';
import ServiceCard from './ServiceCard';

const serviceData = [
	{
		id: 1,
		imgSrc: './assets/home/service/code.svg',
		titleKey: 'home.services.title1',
		descriptionKey: 'home.services.description1',
	},
	{
		id: 2,
		imgSrc: './assets/home/service/device.svg',
		titleKey: 'home.services.title2',
		descriptionKey: 'home.services.description2',
	},
	{
		id: 3,
		imgSrc: './assets/home/service/thinking.svg',
		titleKey: 'home.services.title3',
		descriptionKey: 'home.services.description3',
	},
];

const Service: React.FC = () => {
	return (
		<Container>
			{serviceData.map((service) => (
				<ServiceCard
					key={service.id}
					imgSrc={service.imgSrc}
					titleKey={service.titleKey}
					descriptionKey={service.descriptionKey}
				/>
			))}
		</Container>
	);
};

export default Service;
