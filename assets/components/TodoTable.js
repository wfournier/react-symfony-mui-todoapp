import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DeleteDialog from "./DeleteDialog";
import {styled} from "@mui/system";

const StyledRow = styled(TableRow)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
}));

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodoName, setAddTodoName] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodoName, setEditTodoName] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {task: addTodoName, description: addTodoDescription});
        setAddTodoName('');
        setAddTodoDescription('');
    }

    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, task: editTodoName, description: editTodoDescription});
        setEditIsShown(false);
    }

    return (
        <Fragment>
            <Table size='small'>
                {/*HEAD*/}
                <TableHead>
                    {/*ADD*/}
                    <TableRow>
                        {/*NAME*/}
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField type={'text'}
                                           label={"New Task"}
                                           fullWidth={true}
                                           value={addTodoName}
                                           onChange={(event) => {
                                               setAddTodoName(event.target.value);
                                           }}/>
                            </form>
                        </TableCell>
                        {/*DESCRIPTION*/}
                        <TableCell>
                            <TextField
                                type={'text'}
                                label={'Description'}
                                fullWidth={true}
                                multiline={true}
                                value={addTodoDescription}
                                onChange={(event) => {
                                    setAddTodoDescription(event.target.value);
                                }}/>
                        </TableCell>
                        <TableCell align={"right"}>
                            <IconButton onClick={onCreateSubmit} color="primary">
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <StyledRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align={"right"}>Actions</TableCell>
                    </StyledRow>
                </TableHead>
                {/*BODY*/}
                <TableBody>
                    {/*DATA*/}
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo' + index}>
                            {/*NAME*/}
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                        <TextField
                                            type={'text'}
                                            fullWidth={true}
                                            autoFocus={true}
                                            value={editTodoName}
                                            onChange={(event) => {
                                                setEditTodoName(event.target.value);
                                            }}
                                        />
                                    </form>
                                    :
                                    <Typography>{todo.task}</Typography>
                                }
                            </TableCell>
                            {/*DESCRIPTION*/}
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <TextField
                                        type={'text'}
                                        fullWidth={true}
                                        multiline={true}
                                        value={editTodoDescription}
                                        onChange={(event) => {
                                            setEditTodoDescription(event.target.value);
                                        }}
                                    />
                                    :
                                    <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                }
                            </TableCell>
                            <TableCell align={"right"}>
                                {editIsShown === todo.id ?
                                    <Fragment>
                                        <IconButton color="primary" onClick={onEditSubmit.bind(this, todo.id)}>
                                            <DoneIcon/>
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => {
                                            setEditIsShown(false);
                                        }}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <IconButton color='primary' onClick={() => {
                                            setEditIsShown(todo.id);
                                            setEditTodoName(todo.task);
                                            setEditTodoDescription(todo.description);
                                        }}><EditIcon/></IconButton>
                                        <IconButton color='secondary' onClick={() => {
                                            setTodoToBeDeleted(todo);
                                            setDeleteConfirmationIsShown(true);
                                        }}><DeleteIcon/> </IconButton>
                                    </Fragment>
                                }
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
    );
}

export default TodoTable;