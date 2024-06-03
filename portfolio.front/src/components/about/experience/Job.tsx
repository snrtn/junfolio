import React, { useState } from 'react';
import { Box, styled, Typography, Button } from '@mui/material';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import media from '../../common/mediaQueries';
import { useTranslation } from 'react-i18next';

const sectionsData = [
	{
		titleKey: 'about.job.title1',
		descriptionKey: 'about.job.content1',
		descriptionKey1: 'about.job.detail1',
		descriptionKey2: 'about.job.detail2',
		background: './assets/about/spring.png',
	},
	{
		titleKey: 'about.job.title2',
		descriptionKey: 'about.job.content2',
		descriptionKey1: 'about.job.detail3',
		descriptionKey2: 'about.job.detail4',
		background: './assets/about/salesforce.png',
	},
	{
		titleKey: 'about.job.title3',
		descriptionKey: 'about.job.content3',
		descriptionKey1: 'about.job.detail5',
		descriptionKey2: 'about.job.detail6',
		background: './assets/about/react.jpg',
	},
	{
		titleKey: 'about.job.title4',
		descriptionKey: 'about.job.content4',
		descriptionKey1: 'about.job.content5',
		descriptionKey2: 'about.job.detail7',
		background: './assets/about/openclassrooms.jpg',
	},
];

const Section = styled(Box)(({ background }: { background: string }) => ({
	width: '100%',
	height: '90vh',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
	backgroundImage: `url(${background})`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	color: 'white',
	textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
	transition: 'transform 0.5s ease-in-out',
	zIndex: 0,

	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'rgba(0, 0, 0, 0.3)',
		backdropFilter: 'blur(10px)',
		zIndex: -1,
	},
	'& div': {
		width: '50%',
		textAlign: 'center',
		boxSizing: 'border-box',
		...media.mobileSmall({
			width: '100%',
			textAlign: 'left',
			paddingRight: '50px',
			paddingLeft: '15px',
		}),
	},
}));

const Controller = styled(Box)({
	position: 'fixed',
	right: '20px',
	top: '50%',
	transform: 'translateY(-50%)',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '10px',
	color: 'white',
});

const IconButton = styled(Button)({
	minWidth: '40px',
	minHeight: '40px',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 0,
	color: 'white',
	fontSize: '40px',
});

const Job: React.FC = () => {
	const { t } = useTranslation();
	const [index, setIndex] = useState(0);
	const maxIndex = sectionsData.length - 1;

	const handleNext = () => {
		if (index < maxIndex) setIndex((prev) => prev + 1);
	};

	const handlePrev = () => {
		if (index > 0) setIndex((prev) => prev - 1);
	};

	return (
		<Box position='relative' height='90vh' overflow='hidden'>
			<Box
				display='flex'
				flexDirection='column'
				width='100%'
				sx={{
					height: `${sectionsData.length * 90}vh`,
					transform: `translateY(-${index * 90}vh)`,
					transition: 'transform 0.5s ease-in-out',
				}}
			>
				{sectionsData.map((section, i) => (
					<Section key={i} background={section.background}>
						<div>
							<Typography variant='h5' sx={{ zIndex: 1 }}>
								{t(section.titleKey)}
							</Typography>
							<Typography variant='body1' sx={{ mt: 2, zIndex: 1 }}>
								{t(section.descriptionKey)}
							</Typography>
							<Typography variant='body1' sx={{ mt: 0, zIndex: 1 }}>
								{t(section.descriptionKey1)}
							</Typography>
							<Typography variant='body1' sx={{ mt: 1, zIndex: 1 }}>
								{t(section.descriptionKey2)}
							</Typography>
						</div>
					</Section>
				))}
			</Box>
			<Controller>
				<IconButton onClick={handlePrev} disabled={index === 0}>
					<MdKeyboardArrowUp />
				</IconButton>
				<Typography variant='h6' sx={{ color: 'white', textAlign: 'center' }}>
					{index + 1}/{sectionsData.length}
				</Typography>
				<IconButton onClick={handleNext} disabled={index === maxIndex}>
					<MdKeyboardArrowDown />
				</IconButton>
			</Controller>
		</Box>
	);
};

export default Job;
