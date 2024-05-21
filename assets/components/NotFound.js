import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <Box textAlign='center'>
            <Typography variant='h1'>Page not found 404</Typography>
            <Link to={'/'}>
                <Button color='primary' variant='contained' size='large'>Go back to the homepage</Button>
            </Link>
        </Box>
    );
};

export default NotFound;