import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthFormContainer, AuthWrapper, AuthTextField, AuthButton, AuthTitle } from './AuthView.styles';

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
	};

	return (
		<AuthFormContainer maxWidth='xs'>
			<AuthWrapper>
				<AuthTitle variant='h5'>{t('auth.title') as string}</AuthTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AuthTextField
						label={t('auth.emailLabel') as string}
						variant='outlined'
						type='email'
						{...register('email', {
							required: t('auth.emailRequired') as string,
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: t('auth.emailInvalid'),
							},
						})}
						error={!!errors.email}
						helperText={errors.email ? errors.email.message : ''}
					/>
					<AuthTextField
						label={t('auth.passwordLabel') as string}
						variant='outlined'
						type='password'
						{...register('password', {
							required: t('auth.passwordRequired') as string,
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
								message: t('auth.passwordInvalid'),
							},
						})}
						error={!!errors.password}
						helperText={errors.password ? errors.password.message : ''}
					/>
					<AuthButton color='primary' type='submit'>
						{t('auth.submitButton') as string}
					</AuthButton>
				</form>
			</AuthWrapper>
		</AuthFormContainer>
	);
};

export default AuthView;
