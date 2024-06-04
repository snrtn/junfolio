import React from 'react';
import { Container, Wrapper } from './service.styles';
import ServiceCard from './ServiceCard';

const serviceData = [
	{
		id: 1,
		imgSrc: './assets/home/service/code.svg',
		titleKey: 'home.services.title1',
		descriptionKey: 'home.services.description1',
		initialDarkMode: true,
	},
	{
		id: 2,
		imgSrc: './assets/home/service/device.svg',
		titleKey: 'home.services.title2',
		descriptionKey: 'home.services.description2',
		initialDarkMode: false,
	},
	{
		id: 3,
		imgSrc: './assets/home/service/thinking.svg',
		titleKey: 'home.services.title3',
		descriptionKey: 'home.services.description3',
		initialDarkMode: true,
	},
];

const Service: React.FC = () => {
	return (
		<Container>
			<Wrapper>
				{serviceData.map((service) => (
					<ServiceCard
						key={service.id}
						imgSrc={service.imgSrc}
						titleKey={service.titleKey}
						descriptionKey={service.descriptionKey}
						initialDarkMode={service.initialDarkMode}
					/>
				))}
			</Wrapper>
		</Container>
	);
};

export default Service;
