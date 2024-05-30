import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for rotation animation
const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Styled component for rotating gradient background
const Gradient = styled.div`
	width: 200%; // Double the size to cover all quadrants
	height: 200%;
	overflow: hidden;
	position: absolute;
	z-index: 0; // Ensure it is above the quadrant background but below the text
	top: -50%; // Center the gradient by positioning it negatively half its size
	left: -50%; // Center the gradient by positioning it negatively half its size
	background: conic-gradient(#ffafcc 0% 25%, #a2d2ff 25% 50%, #bde0fe 50% 75%, #cdb4db 75% 100%);
	animation: ${rotate} 10s linear infinite;
`;

// Styled component for static quadrant background
const QuadrantBackground = styled.div`
	width: 100vw;
	height: 100%;
	overflow: hidden;
	position: absolute;
	z-index: -1; // Ensure it is below everything

	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
`;

const Quadrant = styled.div`
	width: 100%;
	height: 100%;
	background-color: transparent; // Make quadrants transparent to show rotating gradient
`;

// Styled component for the main container
const PageContainer = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh; // Ensure the container takes full viewport height
	cursor: crosshair;
	position: relative;
	text-align: center; // Center text for better mobile view
	overflow: hidden;
`;

// Styled component for the title
const Title = styled.h1`
	font-family: 'Barlow Condensed', sans-serif;
	font-weight: 800;
	font-style: normal;
	font-size: 5vw;
	mix-blend-mode: overlay;
	line-height: 1;
	background: linear-gradient(white 0%, black, black, white 95%);
	background-clip: text;
	-webkit-text-fill-color: transparent;
	text-align: center; // Center the text for better mobile view

	@media (max-width: 768px) {
		font-size: 15vw; // Adjust font size for mobile view
	}
`;

const Pen: React.FC = () => {
	return (
		<PageContainer>
			<QuadrantBackground>
				<Quadrant />
				<Quadrant />
				<Quadrant />
				<Quadrant />
			</QuadrantBackground>
			<Gradient />
			<Title>Creation</Title>
		</PageContainer>
	);
};

export default Pen;
