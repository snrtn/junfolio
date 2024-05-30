/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '100vh',
	position: 'relative',
	width: '100vw',
	overflow: 'hidden',
}));

const Background = styled('div')`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: url('./assets/kim.jpg') no-repeat center center/cover;
	z-index: -1;
	filter: url(#crumple-effect-1);
`;

const StaticText = styled(Typography)(({ theme }) => ({
	marginRight: '10px',
	fontSize: '4vh',
	fontWeight: 600,
	color: 'white',
	position: 'relative',
}));

const Slider = styled('div')`
	width: 300px;
	display: flex;
	font-size: 4vh;

	@media (max-width: 768px) {
		width: 200px;
	}
`;

const SliderValue = styled('div')`
	display: flex;
	color: #1f0d07;
	font-weight: 600;
	opacity: 0;
	transition: opacity 0.5s ease-in-out;

	&.fade-in {
		opacity: 1;
	}

	&.fade-out {
		opacity: 0;
	}
`;

const Kim: React.FC = () => {
	const [sliderCounter, setSliderCounter] = useState(0);
	const sliderContent = ['Hanjun Kim', 'Développeur Java', 'Développeur JavaScript', 'Développeur Full Stack'];

	useEffect(() => {
		const interval = setInterval(() => {
			setSliderCounter((prevCounter) => (prevCounter + 1) % sliderContent.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [sliderContent.length]);

	useEffect(() => {
		const sliderValue = document.querySelector('#sliderValue');
		if (sliderValue) {
			sliderValue.classList.remove('fade-in');
			sliderValue.classList.add('fade-out');

			setTimeout(() => {
				sliderValue.innerHTML = sliderContent[sliderCounter];
				sliderValue.classList.remove('fade-out');
				sliderValue.classList.add('fade-in');
			}, 500);
		}
	}, [sliderCounter, sliderContent]);

	return (
		<>
			<svg width='0' height='0'>
				<defs>
					<filter id='crumple-effect-1'>
						<feTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' result='turbulence'>
							<animate
								attributeName='baseFrequency'
								values='0;0.05;0.1;0.05'
								keyTimes='0;0.5;0.75;1'
								dur='15s'
								repeatCount='indefinite'
							/>
						</feTurbulence>
						<feDisplacementMap in2='turbulence' in='SourceGraphic' scale='100'>
							<animate
								attributeName='scale'
								values='0;30;60;100'
								keyTimes='0;0.5;0.75;1'
								dur='60s'
								repeatCount='indefinite'
							/>
						</feDisplacementMap>
					</filter>
				</defs>
			</svg>
			<Container>
				<Background />
				<StaticText>Je suis</StaticText>
				<Slider id='slider'>
					<SliderValue id='sliderValue'>{sliderContent[sliderCounter]}</SliderValue>
				</Slider>
			</Container>
		</>
	);
};

export default Kim;
