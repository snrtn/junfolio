import React from 'react';
import {
	AboutContainer,
	ContentContainer,
	LeftContainer,
	RightContainer,
	Title,
	Description,
	ProfileImage,
} from './about.styles';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
	const { t } = useTranslation();
	return (
		<AboutContainer>
			<ContentContainer>
				<LeftContainer>
					<Title>{t('home.about.title')}</Title>
					<Description>{t('home.about.description')}</Description>
				</LeftContainer>
				<RightContainer>
					<ProfileImage src='./assets/home/about/scrum.svg' alt='scrum Image' />
				</RightContainer>
			</ContentContainer>
		</AboutContainer>
	);
};

export default About;
