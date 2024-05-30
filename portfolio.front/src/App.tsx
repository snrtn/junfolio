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

	const handleWheel = debounce((e: WheelEvent) => {
		e.preventDefault();
		if (e.deltaY > 0) {
			setPage((prevPage) => Math.min(prevPage + 1, lastPage));
		} else if (e.deltaY < 0) {
			setPage((prevPage) => Math.max(prevPage - 1, 0));
		}
	}, 200);

	useEffect(() => {
		window.addEventListener('wheel', handleWheel, { passive: false });
		return () => {
			window.removeEventListener('wheel', handleWheel);
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
