import React from 'react';
import ReactDOM from 'react-dom/client';
import './translate/i18n';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import App from './App';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<MuiThemeProvider theme={theme}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</MuiThemeProvider>,
);
