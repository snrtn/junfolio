import React from 'react';
import { Container, Wrapper, LeftSection, RightSection, Title, Description, Image } from './jumbotron.styles';
import { useTranslation } from 'react-i18next';

const Jumbotron: React.FC = () => {
	const { t } = useTranslation();
	return (
		<Container>
			<Wrapper>
				<LeftSection>
					<div>
						<Description>{t('home.jumbotron.title') as string}</Description>
						<Title>{t('home.jumbotron.description') as string}</Title>
						<Description>{t('home.jumbotron.description1') as string}</Description>
					</div>
				</LeftSection>
				<RightSection>
					<Image src='./assets/home/about/hello.svg' alt='Profile' />
				</RightSection>
			</Wrapper>
		</Container>
	);
};

export default Jumbotron;
