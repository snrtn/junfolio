import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, authThunks } from '../store/index';
import { AuthFormContainer, AuthWrapper, AuthTextField, AuthButton, AuthTitle } from './authView.styles';

interface IFormInput {
	username: string;
	password: string;
}

const AuthView: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>(); // Here we specify the AppDispatch type
	const { status, error, user } = useSelector((state: RootState) => state.auth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		dispatch(authThunks.login(data));
	};

	useEffect(() => {
		if (user) {
			navigate('/dashboard');
		}
	}, [user, navigate]);

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
					<AuthButton color='primary' type='submit' disabled={status === 'loading'}>
						{status === 'loading' ? 'Logging in...' : (t('auth.submitButton') as string)}
					</AuthButton>
					{error && <p style={{ color: 'red' }}>{error}</p>}
				</form>
			</AuthWrapper>
		</AuthFormContainer>
	);
};

export default AuthView;
