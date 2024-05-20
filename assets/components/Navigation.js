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
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";

const Navigation = () => {
    // State
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Functions
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    const drawerItems = [
        {text: 'TodoList', icon: <ListIcon/>},
        {text: 'Tags', icon: <LabelIcon/>}
    ]

    return (
        <AppBar position={'fixed'} color="primary" enableColorOnDark>
            <Toolbar>
                <IconButton edge={'start'} sx={{marginRight: (theme) => theme.spacing(2)}}
                            onClick={toggleDrawer}><MenuIcon/></IconButton>
                <Link href={'/'} variant={'h6'} color={'textPrimary'} underline={'none'}>TodoApp</Link>
                <Box flexGrow={1}/>
                <Button size='large' sx={{color: 'text.primary'}}>Login</Button>
            </Toolbar>
            <Drawer anchor={"left"} variant={"temporary"} onClose={toggleDrawer} open={drawerOpen}>
                <List sx={{width: '200px'}}>
                    {drawerItems.map(prop => (
                        <ListItem button key={prop.text} onClick={toggleDrawer}>
                            <ListItemIcon>{prop.icon}</ListItemIcon>
                            <ListItemText>{prop.text}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navigation;