import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';
import { TextField, Button, Box, Typography } from '@mui/material';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';

const OuterContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90vh;
`;

const FormContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3rem;
	box-sizing: border-box;
	height: 600px;
	width: 450px;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`;

const StyledTextField = styled(TextField)`
	margin-bottom: 1rem !important;
	width: 100%;
`;

const StyledButton = styled(Button)`
	color: #000 !important;
	margin-top: 1rem !important;
`;

const Title = styled(Typography)`
	margin-bottom: 2rem !important;
	text-align: center;
`;

const LoaderContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 90vh;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
	border: 8px solid #f3f3f3;
	border-top: 8px solid #4caf50;
	border-radius: 50%;
	width: 60px;
	height: 60px;
	animation: ${spin} 2s linear infinite;
`;

const PinterestStyledImage = styled.img`
	width: 100%;
	height: 90vh;
`;

interface IFormInput {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const ContactView: React.FC = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		if (
			!process.env.REACT_APP_EMAILJS_SERVICE_ID ||
			!process.env.REACT_APP_EMAILJS_TEMPLATE_ID ||
			!process.env.REACT_APP_EMAILJS_USER_ID ||
			!process.env.REACT_APP_EMAILJS_TO_EMAIL
		) {
			console.error('Missing EmailJS environment variables');
			return;
		}

		setLoading(true);

		emailjs
			.send(
				process.env.REACT_APP_EMAILJS_SERVICE_ID!,
				process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
				{
					from_name: data.name,
					from_email: data.email,
					to_email: process.env.REACT_APP_EMAILJS_TO_EMAIL,
					subject: data.subject,
					message: data.message,
				},
				process.env.REACT_APP_EMAILJS_USER_ID!,
			)
			.then((response) => {
				console.log('SUCCESS!', response.status, response.text);
				setLoading(false);
				setSent(true);
			})
			.catch((error) => {
				console.error('FAILED...', error);
				setLoading(false);
			});
	};

	if (loading) {
		return (
			<LoaderContainer>
				<Spinner />
			</LoaderContainer>
		);
	}

	if (sent) {
		return (
			<OuterContainer>
				<FormContainer>
					<PinterestStyledImage src='./assets/sent.svg' alt='Thank you' />
				</FormContainer>
			</OuterContainer>
		);
	}

	return (
		<OuterContainer>
			<FormContainer>
				<Title variant='h6'>{t('contact.title')}</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<StyledTextField
						label={t('contact.name')}
						{...register('name', { required: true })}
						error={!!errors.name}
						helperText={errors.name ? t('contact.nameError') : ''}
					/>
					<StyledTextField
						label={t('contact.email')}
						{...register('email', { required: true, pattern: /^\S+@\S+$/i })}
						error={!!errors.email}
						helperText={errors.email ? t('contact.emailError') : ''}
					/>
					<StyledTextField
						label={t('contact.subject')}
						{...register('subject', { required: true })}
						error={!!errors.subject}
						helperText={errors.subject ? t('contact.subjectError') : ''}
					/>
					<StyledTextField
						label={t('contact.message')}
						multiline
						rows={4}
						{...register('message', { required: true })}
						error={!!errors.message}
						helperText={errors.message ? t('contact.messageError') : ''}
					/>
					<StyledButton color='primary' type='submit'>
						{t('contact.button')}
					</StyledButton>
				</Form>
			</FormContainer>
		</OuterContainer>
	);
};

export default ContactView;
