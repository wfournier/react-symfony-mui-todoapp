import React, {Component} from 'react';
import TodoContextProvider from "./contexts/TodoContext";
import TodoTable from "./components/TodoTable";
import {createRoot} from "react-dom/client";
import {CssBaseline} from "@mui/material";


class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodoTable/>
                </CssBaseline>
            </TodoContextProvider>
        );
    }
}

const root = createRoot(document.getElementById('root'));
root.render(<App/>);