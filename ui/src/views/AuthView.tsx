import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthFormContainer, AuthWrapper, AuthTextField, AuthButton, AuthTitle } from './authView.styles';
import { useLogin, useAuthStore } from '../store/storeAuth';
import { User } from '../store/auth/types';

interface IFormInput {
	username: string;
	password: string;
}

const AuthView: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const setToken = useAuthStore((state) => state.setToken);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();
	const {
		mutate: login,
		status: mutationStatus,
		error,
	} = useLogin({
		onSuccess: (data) => {
			console.log('Login response data:', data); // 로그 추가
			setToken(data.token);
			navigate('/dashboard');
		},
	});
	const authError = useAuthStore((state) => state.error);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log('Submitting login form with data:', data);
		login(data as User);
	};

	return (
		<AuthFormContainer maxWidth='xs'>
			<AuthWrapper>
				<AuthTitle variant='h5'>{t('auth.title') as string}</AuthTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AuthTextField
						label={t('auth.usernameLabel') as string}
						variant='outlined'
						type='text'
						{...register('username', {
							required: t('auth.usernameRequired') as string,
							pattern: {
								value: /^[A-Za-z]+$/,
								message: t('auth.usernameInvalid'),
							},
						})}
						error={!!errors.username}
						helperText={errors.username ? errors.username.message : ''}
					/>
					<AuthTextField
						label={t('auth.passwordLabel') as string}
						variant='outlined'
						type='password'
						{...register('password', {
							required: t('auth.passwordRequired') as string,
							pattern: {
								value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
								message: t('auth.passwordInvalid'),
							},
						})}
						error={!!errors.password}
						helperText={errors.password ? errors.password.message : ''}
					/>
					<AuthButton color='primary' type='submit' disabled={mutationStatus === 'pending'}>
						{t('auth.submitButton') as string}
					</AuthButton>
					{(error || authError) && <p style={{ color: 'red' }}>{error?.message || authError}</p>}
				</form>
			</AuthWrapper>
		</AuthFormContainer>
	);
};

export default AuthView;
