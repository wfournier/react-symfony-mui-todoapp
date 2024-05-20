import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
});

function DefaultThemeProvider(props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {props.children}
        </ThemeProvider>
    );
}

export default DefaultThemeProvider;