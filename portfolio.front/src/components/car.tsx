import React, { useRef, useEffect, useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
`;

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

const BackgroundImage = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: url('https://images.pexels.com/photos/35619/capri-ford-oldtimer-automotive.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
		no-repeat center/cover;
`;

const ForegroundImage = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: url('https://images.pexels.com/photos/14576603/pexels-photo-14576603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
		no-repeat center/cover;
	clip-path: circle(0% at 0 0);
	transition: clip-path 0.1s ease;
`;

const TextOverlay = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: white;
	font-size: 2rem;
	font-weight: bold;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
	cursor: pointer;
`;

let x = 0;
let y = 0;
let targetX = 0;
let targetY = 0;
const speed = 0.05;

const Car: React.FC = () => {
	const foregroundRef = useRef<HTMLDivElement>(null);
	const requestRef = useRef(0);

	const handleMouseMove: MouseEventHandler = (e) => {
		x = e.pageX;
		y = e.pageY;
	};

	const loop = useCallback(() => {
		targetX += (x - targetX) * speed;
		targetY += (y - targetY) * speed;

		if (foregroundRef.current) {
			const radius = window.innerWidth < 768 ? 70 : 120;
			foregroundRef.current.style.clipPath = `circle(${radius}px at ${targetX}px ${targetY}px)`;
		}

		requestRef.current = requestAnimationFrame(loop);
	}, []);

	useEffect(() => {
		requestRef.current = requestAnimationFrame(loop);

		return () => cancelAnimationFrame(requestRef.current);
	}, [loop]);

	return (
		<PageContainer onMouseMove={handleMouseMove}>
			<ImageContainer>
				<BackgroundImage />
				<ForegroundImage ref={foregroundRef}>
					<TextOverlay>Bonjour</TextOverlay>
				</ForegroundImage>
			</ImageContainer>
		</PageContainer>
	);
};

export default Car;
