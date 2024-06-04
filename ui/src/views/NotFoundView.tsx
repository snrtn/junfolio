import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NotFoundView: React.FC = () => {
	const { t } = useTranslation();
	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection='column'
			height='100vh'
			textAlign='center'
			maxHeight={'90vh'}
		>
			<img src='./assets/notFound.svg' alt='Page not found' style={{ maxWidth: '100%', height: 'auto' }} />
			<Typography variant='h4' component='h2' mt={2}>
				{t('notFound.title')}
			</Typography>
		</Box>
	);
};

export default NotFoundView;
