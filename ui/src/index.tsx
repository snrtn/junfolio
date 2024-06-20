import ReactDOM from 'react-dom/client';
import './translate/i18n';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

const theme = createTheme();
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<QueryClientProvider client={queryClient}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</QueryClientProvider>,
);
