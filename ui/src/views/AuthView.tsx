import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import { AuthFormContainer, AuthWrapper, AuthTextField, AuthButton, AuthTitle } from './authView.styles';

interface IFormInput {
	username: string;
	password: string;
}

const AuthView: React.FC = () => {
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<AuthFormContainer maxWidth='xs'>
			<AuthWrapper>
				<AuthTitle variant='h5'>{t('auth.title') as string}</AuthTitle>
				<form>
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
					<AuthButton color='primary' type='submit'>
						(t('auth.submitButton') as string)
					</AuthButton>
				</form>
			</AuthWrapper>
		</AuthFormContainer>
	);
};

export default AuthView;
