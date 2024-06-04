import React from 'react';
import { Container, Wrapper, LeftSection, RightSection, Title, Description, Image } from './jumbotron.styles';
import { useTranslation } from 'react-i18next';

const Jumbotron: React.FC = () => {
	const { t } = useTranslation();
	return (
		<Container>
			<Wrapper>
				<LeftSection>
					<Description>{t('home.jumbotron.title')}</Description>
					<Title>{t('home.jumbotron.description')}</Title>
					<Description>{t('home.jumbotron.description1')}</Description>
				</LeftSection>
				<RightSection>
					<Image src='./assets/home/about/jun.png' alt='Profile' />
				</RightSection>
			</Wrapper>
		</Container>
	);
};

export default Jumbotron;
