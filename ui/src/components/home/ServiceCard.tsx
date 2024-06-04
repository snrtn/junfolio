import React, { useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ServiceCardContainer, Face, SunIcon, MoonIcon, ToggleButtonContainer } from './service.styles';

interface ServiceCardProps {
	imgSrc: string;
	titleKey: string;
	descriptionKey: string;
	initialDarkMode: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imgSrc, titleKey, descriptionKey, initialDarkMode }) => {
	const { t } = useTranslation();
	const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<ServiceCardContainer className={isDarkMode ? 'dark' : ''}>
			<ToggleButtonContainer>
				<IconButton onClick={toggleDarkMode}>
					{isDarkMode ? <SunIcon className='sun-icon' /> : <MoonIcon className='moon-icon' />}
				</IconButton>
			</ToggleButtonContainer>
			<Face>
				<img src={imgSrc} alt={imgSrc} />
			</Face>
			<Typography variant='h6'>{t(titleKey)}</Typography>
			<Typography variant='body1'>{t(descriptionKey)}</Typography>
		</ServiceCardContainer>
	);
};

export default ServiceCard;
