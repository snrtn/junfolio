import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, SelectChangeEvent, IconButton, List, Collapse } from '@mui/material';
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
	DropdownMenu,
	Overlay,
} from './header.styles';

const Header: React.FC = () => {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState('fr');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [activeMenu, setActiveMenu] = useState<string | null>(null);

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

	const handleMouseEnter = (menu: string) => {
		if (activeMenu !== menu) {
			setActiveMenu(menu);
		}
	};

	const handleMouseLeave = () => {
		setActiveMenu(null);
	};

	const handleItemClick = (menu: string) => {
		setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
	};

	const closeDrawer = () => {
		setIsDrawerOpen(false);
		setActiveMenu(null); // Close all menus when drawer closes
	};

	return (
		<HeaderContainer position='fixed'>
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
				<Nav onMouseLeave={handleMouseLeave}>
					<ul>
						<li onMouseEnter={() => handleMouseEnter('home')}>
							<CustomLink to='/'>{t('navigation.home')}</CustomLink>
						</li>
						<li onMouseEnter={() => handleMouseEnter('about')}>
							<CustomLink to='#'>{t('navigation.about')}</CustomLink>
							{activeMenu === 'about' && <Overlay onClick={() => setActiveMenu(null)} />}
							<Collapse in={activeMenu === 'about'} timeout='auto' unmountOnExit>
								<DropdownMenu>
									<li>
										<CustomLink to='/about' onClick={() => setActiveMenu(null)}>
											{t('navigation.experience')}
										</CustomLink>
									</li>
									<li>
										<CustomLink to='/experience' onClick={() => setActiveMenu(null)}>
											{t('navigation.kim')}
										</CustomLink>
									</li>
								</DropdownMenu>
							</Collapse>
						</li>
						<li onMouseEnter={() => handleMouseEnter('blog')}>
							<CustomLink to='/blog'>{t('navigation.blog')}</CustomLink>
						</li>
						<li onMouseEnter={() => handleMouseEnter('contact')}>
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
					<IconButton edge='end' color='inherit' aria-label='Login' component={Link} to='/auth'>
						<PiSignInBold />
					</IconButton>
				</LanguageSwitcher>
			</HeaderToolbar>
			<StyledDrawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
				<Sidebar role='presentation' onKeyDown={toggleDrawer(false)}>
					<LogoWrapper>
						<Link to='/' onClick={closeDrawer}>
							<LogoImage src='./assets/header/logo.png' alt='Logo' />
						</Link>
					</LogoWrapper>
					<List>
						<StyledListItem as={Link} to='/' onClick={closeDrawer}>
							<StyledListItemText primary={t('navigation.home')} />
						</StyledListItem>
						<StyledListItem onClick={() => handleItemClick('about')}>
							<StyledListItemText primary={t('navigation.about')} />
						</StyledListItem>
						<Collapse in={activeMenu === 'about'} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								<StyledListItem as={Link} to='/about' onClick={closeDrawer}>
									<StyledListItemText primary={t('navigation.experience')} />
								</StyledListItem>
								<StyledListItem as={Link} to='/experience' onClick={closeDrawer}>
									<StyledListItemText primary={t('navigation.kim')} />
								</StyledListItem>
							</List>
						</Collapse>
						<StyledListItem as={Link} to='/blog' onClick={closeDrawer}>
							<StyledListItemText primary={t('navigation.blog')} />
						</StyledListItem>
						<StyledListItem as={Link} to='/contact' onClick={closeDrawer}>
							<StyledListItemText primary={t('navigation.contact')} />
						</StyledListItem>
					</List>
				</Sidebar>
			</StyledDrawer>
		</HeaderContainer>
	);
};

export default Header;
