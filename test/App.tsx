/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Section from './components/Section';
import { debounce } from 'lodash';
import Kim from './components/kim';
import Car from './components/car';
import Tree from './components/tree';
import Pen from './components/pen';

const AppContainer = styled.div`
	font-family: Arial, sans-serif;
	overflow: hidden;
	height: 100vh;
	width: 100vw;
	position: relative;
`;

const Wrap = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	overflow: hidden;
`;

const Container = styled.div<{ page: number }>`
	position: relative;
	width: 100%;
	height: 100%;
	transition: transform 0.5s ease-in-out;
	transform: translateY(${(props) => -props.page * 100}vh);
`;

const App: React.FC = () => {
	const [page, setPage] = useState(0);
	const lastPage = 3;
	let startY = 0;
	let endY = 0;

	const handleWheel = debounce((e: WheelEvent) => {
		e.preventDefault();
		if (e.deltaY > 0) {
			setPage((prevPage) => Math.min(prevPage + 1, lastPage));
		} else if (e.deltaY < 0) {
			setPage((prevPage) => Math.max(prevPage - 1, 0));
		}
	}, 200);

	const handleTouchStart = (e: TouchEvent) => {
		startY = e.touches[0].clientY;
	};

	const handleTouchMove = (e: TouchEvent) => {
		endY = e.touches[0].clientY;
	};

	const handleTouchEnd = () => {
		if (startY > endY) {
			setPage((prevPage) => Math.min(prevPage + 1, lastPage));
		} else if (startY < endY) {
			setPage((prevPage) => Math.max(prevPage - 1, 0));
		}
	};

	useEffect(() => {
		window.addEventListener('wheel', handleWheel, { passive: false });
		window.addEventListener('touchstart', handleTouchStart);
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleTouchEnd);
		return () => {
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	}, []);

	return (
		<AppContainer>
			<Wrap>
				<Container page={page}>
					<Section>
						<Kim />
					</Section>
					<Section>
						<Car />
					</Section>
					<Section>
						<Tree />
					</Section>
					<Section>
						<Pen />
					</Section>
				</Container>
			</Wrap>
		</AppContainer>
	);
};

export default App;
