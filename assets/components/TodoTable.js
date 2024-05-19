import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteDialog from "./DeleteDialog";

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {name: addTodo});
        setAddTodo('');
    }

    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, name: editTodo});
        setEditIsShown(false);
    }

    return (
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell align={"right"}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField type={'text'} value={addTodo} onChange={(event) => {
                                    setAddTodo(event.target.value)
                                }} label={"New Task"} fullWidth={true}/>
                            </form>
                        </TableCell>
                        <TableCell align={"right"}>
                            <IconButton onClick={onCreateSubmit}>
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo' + index}>
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                        <TextField
                                            type={'text'}
                                            fullWidth={true}
                                            autoFocus={true}
                                            value={editTodo}
                                            onChange={(event) => {
                                                setEditTodo(event.target.value);
                                            }}
                                            InputProps={{
                                                endAdornment:
                                                    <Fragment>
                                                        <IconButton onClick={() => {
                                                            setEditIsShown(false);
                                                        }}><CloseIcon/></IconButton>
                                                        <IconButton type={'submit'}><DoneIcon/></IconButton>
                                                    </Fragment>
                                            }}
                                        />
                                    </form>
                                    :
                                    todo.name
                                }
                            </TableCell>
                            <TableCell align={"right"}>
                                <IconButton onClick={() => {
                                    setEditIsShown(todo.id);
                                    setEditTodo(todo.name);
                                }}><EditIcon/></IconButton>
                                <IconButton onClick={() => {
                                    setTodoToBeDeleted(todo);
                                    setDeleteConfirmationIsShown(true);
                                }}><DeleteIcon/> </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {
                deleteConfirmationIsShown && (
                    <DeleteDialog todo={todoToBeDeleted}
                                  open={deleteConfirmationIsShown}
                                  setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}/>
                )
            }
        </Fragment>
    )
        ;
}

export default TodoTable;