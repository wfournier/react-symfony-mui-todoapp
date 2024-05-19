import React, {useContext} from 'react';
import {Button, Snackbar, SnackbarContent} from "@mui/material";
import {TodoContext} from "../contexts/TodoContext";

function getLevelColor(level) {
    switch (level) {
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        default:
            return 'white';
    }
}

function AppSnackbar() {
    const context = useContext(TodoContext);
    const hide = () => {
        context.setMessage({});
    }

    return (
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                  onClose={hide} autoHideDuration={6000}
                  open={context.message.text !== undefined}>
            {context.message.text && (
                <SnackbarContent style={{backgroundColor: getLevelColor(context.message.level)}}
                                 message={context.message.text}
                                 action={[
                                     <Button onClick={hide} key={'dismiss'} color='inherit'>Dismiss</Button>
                                 ]}/>
            )}
        </Snackbar>
    );
}

export default AppSnackbar;