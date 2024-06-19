import React, { useState, useEffect } from 'react';
import {
	SiJunit5,
	SiTypescript,
	SiJest,
	SiReact,
	SiRedux,
	SiReactquery,
	SiMysql,
	SiMongodb,
	SiSass,
	SiStyledcomponents,
	SiMui,
	SiVisualstudiocode,
	SiIntellijidea,
	SiGit,
	SiNotion,
	SiFigma,
	SiAzuredevops,
	SiJavascript,
	SiNodedotjs,
	SiExpress,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
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
	{ icon: FaJava, bgColor: '#f89820' },
	{ icon: SiJunit5, bgColor: '#25a162' },
	{ icon: SiJavascript, bgColor: '#f7df1e' },
	{ icon: SiJest, bgColor: '#c21325' },
	{ icon: SiTypescript, bgColor: '#007acc' },
	{ icon: SiReact, bgColor: '#61dafb' },
	{ icon: SiRedux, bgColor: '#764abc' },
	{ icon: SiReactquery, bgColor: '#ff4154' },
	{ icon: SiSass, bgColor: '#cc6699' },
	{ icon: SiStyledcomponents, bgColor: '#db7093' },
	{ icon: SiMui, bgColor: '#0081cb' },
	{ icon: SiNodedotjs, bgColor: '#339933' },
	{ icon: SiExpress, bgColor: '#000000' },
	{ icon: SiMysql, bgColor: '#00758f' },
	{ icon: SiMongodb, bgColor: '#47a248' },
	{ icon: SiIntellijidea, bgColor: '#000000' },
	{ icon: SiVisualstudiocode, bgColor: '#0078d7' },
	{ icon: SiGit, bgColor: '#f05032' },
	{ icon: SiAzuredevops, bgColor: '#0078d4' },
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
