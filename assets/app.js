import React, {Component} from 'react';
import {createRoot} from "react-dom/client";
import DefaultThemeProvider from "./components/themes/DefaultThemeProvider";
import Router from "./components/Router";


class App extends Component {
    render() {
        return (
            <Router/>
        );
    }
}

const root = createRoot(document.getElementById('root'));
root.render(
    <DefaultThemeProvider>
        <App/>
    </DefaultThemeProvider>
);