import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes, { authRoutes } from 'src/routes';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { useAuth } from 'src/context/AuthContext';
import './App.css'
import LogoutPrompt from 'src/pages/auth/LogoutPrompt';

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_HOST + '/graphql',
    cache: new InMemoryCache()
});

const App = () => {
    const routing = useRoutes(routes);
    const authRouting = useRoutes(authRoutes)
    const {
        loginStatus,
        logoutPrompt,
        closePrompt,
        onPromptSuccess
    } = useAuth()

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <ApolloProvider client={client}>
                    {loginStatus ? routing : authRouting}
                    <LogoutPrompt show={logoutPrompt} onClose={closePrompt} onSuccess={onPromptSuccess} />
                </ApolloProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
