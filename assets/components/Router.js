import React from 'react';
import TodoTable from "./TodoTable";
import AppSnackbar from "./AppSnackbar";
import TodoContextProvider from "../contexts/TodoContext";
import Navigation from "./Navigation";
import {styled} from "@mui/system";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./NotFound";

const TodoList = () => (
    <TodoContextProvider>
        <TodoTable/>
        <AppSnackbar/>
    </TodoContextProvider>
)

const Router = () => {
    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route exact path={'/'} element={<Navigate to={'/todo-list'} replace/>}/>
                <Route exact path={'/todo-list'} element={<TodoList/>}/>
                <Route exact path={'/tag-list'} element={null}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;