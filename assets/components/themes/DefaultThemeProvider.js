import React from 'react';
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {blue, grey, red} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: blue,
        secondary: red,
        background: {
            default: grey['900']
        }
    }
});

const responsiveTheme = responsiveFontSizes(theme);

function DefaultThemeProvider(props) {
    return (
        <ThemeProvider theme={responsiveTheme}>
            <CssBaseline/>
            {props.children}
        </ThemeProvider>
    );
}

export default DefaultThemeProvider;