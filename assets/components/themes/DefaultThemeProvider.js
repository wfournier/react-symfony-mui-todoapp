import React, {Component, createContext} from 'react';
import {blue, grey, red} from "@mui/material/colors";
import {createTheme, CssBaseline, responsiveFontSizes, ThemeProvider} from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: blue,
        secondary: red
    }
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: blue,
        secondary: red,
        background: {
            default: grey['900']
        }
    }
});

const themeMap = {
    'light': lightTheme,
    'dark': darkTheme
};

const getThemeByName = (theme) => {
    return themeMap[theme];
}

const responsiveTheme = responsiveFontSizes(darkTheme);

export const DefaultThemeContext = createContext();

class DefaultThemeProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: responsiveTheme
        }
    }

    setTheme(theme) {
        this.setState({
            theme: responsiveFontSizes(getThemeByName(theme))
        });
    }

    render() {
        return (
            <DefaultThemeContext.Provider value={{
                setTheme: this.setTheme.bind(this)
            }}>
                <ThemeProvider theme={this.state.theme}>
                    <CssBaseline/>
                    {this.props.children}
                </ThemeProvider>
            </DefaultThemeContext.Provider>

        );
    }
}

export default DefaultThemeProvider;