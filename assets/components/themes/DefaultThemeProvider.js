import React from 'react';
import {blue, grey, red} from "@mui/material/colors";
import {createTheme, CssBaseline, responsiveFontSizes, ThemeProvider} from "@mui/material";

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