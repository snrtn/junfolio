import { styled, Box } from '@mui/material';

export const SnsSection = styled(Box)`
	border-radius: 10px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.13);
	display: flex;
	justify-content: center;
	gap: 1rem;
`;

export const Wrapper = styled(Box)({
	backgroundColor: '#1D1D1F',
	color: '#F9F9F9',
	padding: '2rem 0',
	textAlign: 'center',
	height: '40vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
});
