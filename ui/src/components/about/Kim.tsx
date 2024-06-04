import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, styled } from '@mui/material';
import media from '../common/mediaQueries';
import { useTranslation } from 'react-i18next';

const sectionsData = [
	{
		titleKey: 'about.kim.title1',
		descriptionKey: 'about.kim.description1',
		descriptionKey1: 'about.kim.description2',
		backgroundColor: '#e15f41',
		svgSrc: './assets/about/back.svg',
	},
	{
		titleKey: 'about.kim.title2',
		descriptionKey: 'about.kim.description3',
		descriptionKey1: 'about.kim.description4',
		descriptionKey2: 'about.kim.description5',
		backgroundColor: '#006266',
		svgSrc: './assets/about/front.svg',
	},
	{
		titleKey: 'about.kim.title3',
		descriptionKey: 'about.kim.description6',
		descriptionKey1: 'about.kim.description7',
		backgroundColor: '#2980b9',
		svgSrc: './assets/about/team.svg',
	},
	{
		titleKey: 'about.kim.title4',
		descriptionKey: 'about.kim.description8',
		descriptionKey1: 'about.kim.description9',
		backgroundColor: '#8854d0',
		svgSrc: './assets/about/up.svg',
	},
];

const ScrollContainer = styled(Box)<{ scrollEnabled: boolean }>(({ scrollEnabled }) => ({
	width: '100%',
	height: scrollEnabled ? '100vh' : '100%',
	overflowY: scrollEnabled ? 'scroll' : 'hidden',
	position: 'relative',
	overflowStyle: 'none' /* IE and Edge */,
	scrollbarWidth: 'none' /* Firefox */,
}));

const Section = styled(Box)<{ backgroundColor: string; index: number; language: string }>(
	({ backgroundColor, index, language }) => ({
		width: '100%',
		height: '95vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'start',
		paddingTop: '200px',
		boxSizing: 'border-box',
		backgroundColor,
		position: 'relative',
		overflow: 'hidden',
		color: 'white',
		...media.desktopMedium({
			paddingTop: '120px',
			height: '100vh',
		}),
		...media.laptopLarge({
			paddingTop: '200px',
			height: '90vh',
		}),
		...(index === 1 &&
			media.mobileLarge({
				paddingTop: '200px',
				height: language === 'fr' || language === 'en' ? '170vh' : '150vh',
			})),
		...(index !== 1 &&
			media.mobileLarge({
				paddingTop: '200px',
				height: language === 'fr' || language === 'en' ? '150vh' : '130vh',
			})),
		...(index !== 1 &&
			media.mobileSmall({
				paddingTop: '120px',
				height: language === 'fr' || language === 'en' ? '170vh' : '150vh',
			})),
	}),
);

const SectionContent = styled('div')<{ visible: boolean }>(({ visible }) => ({
	opacity: visible ? 1 : 0,
	transition: 'opacity 0.5s ease-in-out',
	zIndex: 1,
	textAlign: 'center',
	padding: '0 20rem',
	...media.laptopLarge({
		padding: '0 5rem',
	}),
	...media.mobileLarge({
		padding: '0 1rem',
	}),
}));

const SectionSVG = styled('img')<{ visible: boolean }>(({ visible }) => ({
	width: '350px',
	height: '350px',
	position: 'absolute',
	right: visible ? '50%' : '-150px',
	transform: 'translateX(50%)',
	transition: 'right 0.5s ease-in-out',
}));

interface KimProps {
	scrollEnabled: boolean;
	onScrollToEnd: () => void;
}

const Kim: React.FC<KimProps> = ({ scrollEnabled, onScrollToEnd }) => {
	const { t, i18n } = useTranslation();
	const language = i18n.language;
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [visibleSections, setVisibleSections] = useState<boolean[]>(new Array(sectionsData.length).fill(false));
	const [firstTimeVisibleSections, setFirstTimeVisibleSections] = useState<boolean[]>(
		new Array(sectionsData.length).fill(false),
	);

	const handleScroll = useCallback(() => {
		const container = document.getElementById('scroll-container');
		if (container) {
			const isAtBottom = container.scrollTop + container.clientHeight + container.scrollHeight;
			if (isAtBottom) {
				onScrollToEnd();
			}
		}
	}, [onScrollToEnd]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
					if (index !== -1) {
						setVisibleSections((prev) => {
							const newVisibility = [...prev];
							newVisibility[index] = entry.isIntersecting;
							return newVisibility;
						});
						if (entry.isIntersecting) {
							setFirstTimeVisibleSections((prev) => {
								const newVisibility = [...prev];
								newVisibility[index] = true;
								return newVisibility;
							});
						}
					}
				});
			},
			{ threshold: 0.5 },
		);

		const sections = sectionRefs.current;
		sections.forEach((section) => {
			if (section) observer.observe(section);
		});

		return () => {
			sections.forEach((section) => {
				if (section) observer.unobserve(section);
			});
		};
	}, []);

	useEffect(() => {
		const container = document.getElementById('scroll-container');
		if (container && scrollEnabled) {
			container.addEventListener('scroll', handleScroll);
			return () => {
				container.removeEventListener('scroll', handleScroll);
			};
		}
	}, [scrollEnabled, handleScroll]);

	return (
		<ScrollContainer id='scroll-container' scrollEnabled={scrollEnabled}>
			{sectionsData.map((section, index) => (
				<Section
					key={index}
					ref={(el) => {
						sectionRefs.current[index] = el as HTMLDivElement;
					}}
					backgroundColor={section.backgroundColor}
					index={index}
					language={language}
				>
					<SectionContent visible={firstTimeVisibleSections[index] || visibleSections[index]}>
						<h1>{t(section.titleKey)}</h1>
						<div style={{ marginTop: '1rem' }}>
							<p style={{ marginTop: '0.5rem' }}>{t(section.descriptionKey)}</p>
							<p style={{ marginTop: '0.5rem' }}>{t(section.descriptionKey1)}</p>
							{section.descriptionKey2 && <p style={{ marginTop: '0.5rem' }}>{t(section.descriptionKey2)}</p>}
						</div>
						<SectionSVG
							src={section.svgSrc}
							alt={`Section ${index + 1} Icon`}
							visible={firstTimeVisibleSections[index] || visibleSections[index]}
						/>
					</SectionContent>
				</Section>
			))}
		</ScrollContainer>
	);
};

export default Kim;
