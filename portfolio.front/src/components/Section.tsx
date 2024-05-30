import React from 'react';
import styled from 'styled-components';

interface SectionProps {
	children: React.ReactNode;
}

const SectionContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Section: React.FC<SectionProps> = ({ children }) => {
	return <SectionContainer>{children}</SectionContainer>;
};

export default Section;
