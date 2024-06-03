import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SnsSection, Wrapper } from './footer.styles';
import { CustomLink, LogoText } from './header.styles';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import CustomIconLink from '../common/CustomIconLink';
import { Link } from 'react-router-dom';

const Footer = () => {
	const { t } = useTranslation();
	return (
		<Wrapper>
			<Container sx={{ marginBottom: '1rem' }}>
				<Link to='/'>
					<LogoText variant='h4'>JunFolio</LogoText>
				</Link>
				<Typography variant='body1' color='orange' mt={1}>
					{t('home.jumbotron.description')}
					<span> {t('home.jumbotron.description1')}</span>
				</Typography>
			</Container>
			<Container sx={{ marginBottom: '3rem' }}>
				<Box display='flex' justifyContent='center' gap='2rem'>
					<CustomLink to='/about'>{t('navigation.about')}</CustomLink>
					<CustomLink to='/blog'>{t('navigation.blog')}</CustomLink>
					<CustomLink to='/contact'>{t('navigation.contact')}</CustomLink>
				</Box>
			</Container>
			<SnsSection>
				<CustomIconLink
					bgColor={'#0077B5'}
					icon={SiLinkedin}
					to={'https://www.linkedin.com/in/hanjun-kim-1b1741171/'}
				/>
				<CustomIconLink bgColor={'#181717'} icon={SiGithub} to={'https://github.com/snrtn?tab=repositories'} />
			</SnsSection>
		</Wrapper>
	);
};

export default Footer;
