import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, SelectChangeEvent, IconButton, List } from '@mui/material';
import { PiSignInBold } from 'react-icons/pi';
import { RiMenuFill } from 'react-icons/ri';
import {
	HeaderContainer,
	HeaderToolbar,
	LogoWrapper,
	LogoText,
	LogoImage,
	Nav,
	LanguageSwitcher,
	HamburgerMenu,
	Sidebar,
	StyledReactCountryFlag,
	StyledDrawer,
	StyledListItem,
	StyledListItemText,
	CustomLink,
} from './header.styles';

const Header: React.FC = () => {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState('fr');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	useEffect(() => {
		const currentLanguage = i18n.language || 'fr';
		setLanguage(currentLanguage);
	}, [i18n.language]);

	const changeLanguage = (event: SelectChangeEvent<string>) => {
		const lng = event.target.value;
		i18n.changeLanguage(lng);
		setLanguage(lng);
	};

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setIsDrawerOpen(open);
	};

	return (
		<HeaderContainer position='static'>
			<HeaderToolbar>
				<HamburgerMenu>
					<IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
						<RiMenuFill />
					</IconButton>
				</HamburgerMenu>
				<LogoWrapper>
					<Link to='/'>
						<LogoText variant='h5'>JunFolio</LogoText>
					</Link>
				</LogoWrapper>
				<Nav>
					<ul>
						<li>
							<CustomLink to='/'>{t('navigation.home')}</CustomLink>
						</li>
						<li>
							<CustomLink to='/about'>{t('navigation.about')}</CustomLink>
						</li>
						<li>
							<CustomLink to='/contact'>{t('navigation.contact')}</CustomLink>
						</li>
					</ul>
				</Nav>
				<LanguageSwitcher>
					<Select
						value={language}
						onChange={changeLanguage}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
					>
						<MenuItem value='en'>
							<StyledReactCountryFlag countryCode='US' svg />
						</MenuItem>
						<MenuItem value='fr'>
							<StyledReactCountryFlag countryCode='FR' svg />
						</MenuItem>
						<MenuItem value='ko'>
							<StyledReactCountryFlag countryCode='KR' svg />
						</MenuItem>
					</Select>
					<IconButton edge='end' color='inherit' aria-label='Login' component={Link} to='/login'>
						<PiSignInBold />
					</IconButton>
				</LanguageSwitcher>
			</HeaderToolbar>
			<StyledDrawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
				<Sidebar role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
					<LogoWrapper>
						<LogoImage src='./assets/header/logo.png' alt='Logo' />
					</LogoWrapper>
					<List>
						<StyledListItem as={Link} to='/'>
							<StyledListItemText primary={t('navigation.home')} />
						</StyledListItem>
						<StyledListItem as={Link} to='/about'>
							<StyledListItemText primary={t('navigation.about')} />
						</StyledListItem>
						<StyledListItem as={Link} to='/contact'>
							<StyledListItemText primary={t('navigation.contact')} />
						</StyledListItem>
					</List>
				</Sidebar>
			</StyledDrawer>
		</HeaderContainer>
	);
};

export default Header;
