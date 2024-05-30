import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const PageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

const Canvas = styled.canvas`
	position: absolute;
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
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const wave = keyframes`
	0% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
	100% {
		transform: translateY(0);
	}
`;

const Link = styled.a<{ isMobile: boolean }>`
	color: white;
	text-decoration: none;
	margin: 20px 0;
	display: inline-block;

	& span {
		display: inline-block;
		animation: ${wave} 0.5s ease-in-out infinite;
		animation-delay: calc(0.1s * var(--i));
		animation-play-state: ${({ isMobile }) => (isMobile ? 'running' : 'paused')};
	}

	&:hover span {
		animation-play-state: running;
	}
`;

const Tree: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imageSrc = './assets/traa.jpg';
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');
			if (ctx) {
				const img = new Image();
				img.src = imageSrc;
				img.crossOrigin = 'anonymous';
				img.onload = () => {
					const width = window.innerWidth;
					const height = window.innerHeight;
					const pixelSize = 5; // 고정된 픽셀 크기

					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0, width, height);

					const imgData = ctx.getImageData(0, 0, width, height).data;
					ctx.clearRect(0, 0, width, height);

					for (let y = 0; y < height; y += pixelSize) {
						for (let x = 0; x < width; x += pixelSize) {
							const pixelIndex = (y * width + x) * 4;
							const r = imgData[pixelIndex];
							const g = imgData[pixelIndex + 1];
							const b = imgData[pixelIndex + 2];
							const color = `rgb(${r},${g},${b})`;

							// 일정한 크기의 사각형 픽셀을 그리기
							ctx.fillStyle = color;
							ctx.fillRect(x, y, pixelSize, pixelSize);
						}
					}
				};
			}
		}
	}, []);

	return (
		<PageContainer>
			<Canvas ref={canvasRef} />
			<TextOverlay>
				<Link href='https://www.linkedin.com/in/hanjun-kim-1b1741171/' target='_blank' isMobile={isMobile}>
					{Array.from('LinkedIn').map((char, i) => (
						<span key={i} style={{ '--i': i } as React.CSSProperties}>
							{char}
						</span>
					))}
				</Link>
				<Link href='https://github.com/snrtn' target='_blank' isMobile={isMobile}>
					{Array.from('GitHub').map((char, i) => (
						<span key={i} style={{ '--i': i } as React.CSSProperties}>
							{char}
						</span>
					))}
				</Link>
			</TextOverlay>
		</PageContainer>
	);
};

export default Tree;
