import React, {Component} from 'react';
import TodoContextProvider from "./contexts/TodoContext";
import TodoTable from "./components/TodoTable";
import {createRoot} from "react-dom/client";
import AppSnackbar from "./components/AppSnackbar";
import DefaultThemeProvider from "./components/themes/DefaultThemeProvider";


class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <TodoTable/>
                <AppSnackbar/>
            </TodoContextProvider>
        );
    }
}

const root = createRoot(document.getElementById('root'));
root.render(
    <DefaultThemeProvider>
        <App/>
    </DefaultThemeProvider>
);