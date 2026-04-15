import { createTheme, colors, adaptV4Theme } from '@mui/material';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme(adaptV4Theme({
    palette: {
        /* background: {
          default: '#F4F6F8',
          paper: colors.common.white
        },
        primary: {
          contrastText: '#ffffff',
          main: '#5664d2'
        },
        text: {
          primary: '#172b4d',
          secondary: '#6b778c'
        } */
        background: {
            default: '#F4F6F8',
            paper: colors.common.white,
            danger: colors.red[500]
        },
        primary: {
            contrastText: '#ffffff',
            main: '#56b550',
            light: '#757ce8',
            dark: 'rgb(60, 126, 56)',
        },
        secondary: {
            light: '#ff7961',
            main: '#42A5F5',
            dark: '#2f82c5',
            contrastText: '#fff',
        },
        error: {
            light: '#ff7961',
            main: '#ff7961',
            dark: '#f44336',
            contrastText: '#fff',
        },
        navbar: {
            main: '#c9c9c9'
        },
        text: {
            primary: '#172b4d',
            secondary: '#6b778c'
        },
        grey: {
            200: "#ddd",
            800: "#888"
        }
    },
    shadows,
    typography
}));

export default theme;
