import React, {Component} from 'react';
import TodoContextProvider from "./contexts/TodoContext";
import TodoTable from "./components/TodoTable";
import {createRoot} from "react-dom/client";


class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <TodoTable/>
            </TodoContextProvider>
        );
    }
}

const root = createRoot(document.getElementById('root'));
root.render(<App/>);