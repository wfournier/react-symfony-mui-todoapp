import React, {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import LabelIcon from '@mui/icons-material/Label';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import {styled} from "@mui/system";
import {Link} from "react-router-dom";

const StyledLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary,
}));

const Navigation = () => {
    // State
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Functions
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    const drawerItems = [
        {text: 'TodoList', icon: <ListIcon/>, link: 'todo-list'},
        {text: 'Tags', icon: <LabelIcon/>, link: 'tag-list'}
    ]

    return (
        <AppBar position={'sticky'} color="primary" enableColorOnDark>
            <Toolbar>
                <IconButton edge={'start'} sx={{marginRight: (theme) => theme.spacing(2)}}
                            onClick={toggleDrawer}><MenuIcon/></IconButton>
                <StyledLink to={'/todo-list'} variant={'h6'}>TodoApp</StyledLink>
                <Box flexGrow={1}/>
                <Button size='large' sx={{color: 'text.primary'}}>Login</Button>
            </Toolbar>
            <Drawer anchor={"left"} variant={"temporary"} onClose={toggleDrawer} open={drawerOpen}>
                <List sx={{width: '200px'}}>
                    {drawerItems.map(prop => (
                        <StyledLink to={prop.link} key={prop.text}>
                            <ListItem onClick={toggleDrawer}>
                                <ListItemIcon>{prop.icon}</ListItemIcon>
                                <ListItemText>{prop.text}</ListItemText>
                            </ListItem>
                        </StyledLink>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navigation;