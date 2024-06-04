import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Box, Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import media from '../components/common/mediaQueries';

const FormContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '90vh',
	backgroundColor: theme.palette.background.default,
}));

const Wrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.palette.background.default,
	height: '600px',
	width: '450px',
	borderRadius: '8px',
	boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
	padding: '3rem',
	boxSizing: 'border-box',
	...media.mobileLarge({
		padding: '0px 5.5rem',
	}),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	width: '100%',
}));

const StyledButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
	width: '100%',
	padding: theme.spacing(1.5),
	color: 'black',
}));

const Title = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(4),
	fontWeight: 'bold',
}));

interface IFormInput {
	email: string;
	password: string;
}

const AuthView: React.FC = () => {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
		// 여기에 실제 로그인 로직을 추가하세요.
		// 예를 들어, API 요청을 보내어 사용자의 인증을 수행합니다.
	};

	return (
		<FormContainer maxWidth='xs'>
			<Wrapper>
				<Title variant='h5'>{t('auth.title')}</Title>
				<form onSubmit={handleSubmit(onSubmit)}>
					<StyledTextField
						label={t('auth.emailLabel')}
						variant='outlined'
						type='email'
						{...register('email', {
							required: t('auth.emailRequired'),
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: t('auth.emailInvalid'),
							},
						})}
						error={!!errors.email}
						helperText={errors.email ? errors.email.message : ''}
					/>
					<StyledTextField
						label={t('auth.passwordLabel')}
						variant='outlined'
						type='password'
						{...register('password', {
							required: t('auth.passwordRequired'),
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
								message: t('auth.passwordInvalid'),
							},
						})}
						error={!!errors.password}
						helperText={errors.password ? errors.password.message : ''}
					/>
					<StyledButton color='primary' type='submit'>
						{t('auth.submitButton')}
					</StyledButton>
				</form>
			</Wrapper>
		</FormContainer>
	);
};

export default AuthView;
