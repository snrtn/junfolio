import React, { useState, useEffect } from 'react';
import {
	SiTypescript,
	SiReact,
	SiRedux,
	SiReactquery,
	SiMongodb,
	SiStyledcomponents,
	SiMui,
	SiVisualstudiocode,
	SiGit,
	SiNotion,
	SiFigma,
	SiAzuredevops,
	SiJavascript,
	SiNodedotjs,
	SiExpress,
	SiPostman,
	SiSlack,
} from 'react-icons/si';
import { IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';
import {
	TechniqueSectionContainer,
	TechniqueInnerContainer,
	TechniqueLeftContainer,
	TechniqueSlide,
	TechniqueRightContainer,
	TechniqueTitle,
	TechniqueIconsContainer,
} from './techniqueIcon.styles';
import CustomIconLink from '../common/CustomIconLink';

const photos = [
	'./assets/home/techniqueIcon/js.svg',
	'./assets/home/techniqueIcon/react.svg',
	'./assets/home/techniqueIcon/api.svg',
	'./assets/home/techniqueIcon/bug.svg',
	'./assets/home/techniqueIcon/map.svg',
	'./assets/home/techniqueIcon/open.svg',
	'./assets/home/techniqueIcon/programming.svg',
	'./assets/home/techniqueIcon/server.svg',
	'./assets/home/techniqueIcon/code.svg',
];

interface IconData {
	icon: IconType;
	bgColor: string;
	to?: string;
}

const iconData: IconData[] = [
	{ icon: SiJavascript, bgColor: '#f7df1e' },
	{ icon: SiTypescript, bgColor: '#007acc' },
	{ icon: SiReact, bgColor: '#61dafb' },
	{ icon: SiRedux, bgColor: '#764abc' },
	{ icon: SiReactquery, bgColor: '#ff4154' },
	{ icon: SiStyledcomponents, bgColor: '#db7093' },
	{ icon: SiMui, bgColor: '#0081cb' },
	{ icon: SiNodedotjs, bgColor: '#339933' },
	{ icon: SiExpress, bgColor: '#000000' },
	{ icon: SiMongodb, bgColor: '#47a248' },
	{ icon: SiVisualstudiocode, bgColor: '#0078d7' },
	{ icon: SiGit, bgColor: '#f05032' },
	{ icon: SiPostman, bgColor: '#f89820' },
	{ icon: SiAzuredevops, bgColor: '#0078d4' },
	{ icon: SiSlack, bgColor: '#f89820' },
	{ icon: SiNotion, bgColor: '#000000' },
	{ icon: SiFigma, bgColor: '#f24e1e' },
];

const TechniqueIcon: React.FC = () => {
	const { t } = useTranslation();
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % photos.length);
		}, 5500);
		return () => clearInterval(interval);
	}, []);

	return (
		<TechniqueSectionContainer>
			<TechniqueInnerContainer>
				<TechniqueLeftContainer>
					{photos.map((slide, index) => (
						<TechniqueSlide key={index} className={currentSlide === index ? 'active' : ''}>
							<img src={slide} alt={`Slide ${index + 1}`} style={{ display: 'block' }} />
						</TechniqueSlide>
					))}
				</TechniqueLeftContainer>
				<TechniqueRightContainer>
					<TechniqueTitle variant='h1'>{t('home.techniqueIcon.title') as string}</TechniqueTitle>
					<TechniqueIconsContainer>
						{iconData.map((item, index) => (
							<CustomIconLink key={index} bgColor={item.bgColor} icon={item.icon} to={item.to} />
						))}
					</TechniqueIconsContainer>
				</TechniqueRightContainer>
			</TechniqueInnerContainer>
		</TechniqueSectionContainer>
	);
};

export default TechniqueIcon;
