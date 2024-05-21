import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const NotFound = () => {
    return (
        <Box textAlign='center'>
            <Typography variant='h1'>Page not found 404</Typography>
            <NavLink to={'/'}>
                <Button color='primary' variant='contained' size='large'>Go back to the homepage</Button>
            </NavLink>
        </Box>
    );
};

export default NotFound;