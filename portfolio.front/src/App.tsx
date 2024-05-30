/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Section from './components/Section';
import { debounce } from 'lodash';
import Kim from './components/kim';

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
	const lastPage = 2;

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
						<h1>Section 2</h1>
						<p>Content of section 2</p>
					</Section>
					<Section>
						<h1>Section 3</h1>
						<p>Content of section 3</p>
					</Section>
				</Container>
			</Wrap>
		</AppContainer>
	);
};

export default App;
