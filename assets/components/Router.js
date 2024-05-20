import React from 'react';
import TodoTable from "./TodoTable";
import AppSnackbar from "./AppSnackbar";
import TodoContextProvider from "../contexts/TodoContext";
import Navigation from "./Navigation";
import {styled} from "@mui/system";

const Divider = styled('div')(({theme}) => ({
    divider: theme.mixins.toolbar
}));

const Router = () => {
    return (
        <div>
            <Navigation/>
            <Divider/>
            <TodoContextProvider>
                <TodoTable/>
                <AppSnackbar/>
            </TodoContextProvider>
        </div>
    );
};

export default Router;