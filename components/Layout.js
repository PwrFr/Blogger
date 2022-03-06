import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, createTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ArticleIcon from '@mui/icons-material/Article';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from '@material-ui/core/Container';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,

    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        textAlign: "center",
        background: '#ee801e',
        color: 'black',


    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft({ children }) {
    const classes = useStyles();
    const theme = createTheme({

    });
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const activeRoute = (routeName, currentRoute) => {

        return routeName === currentRoute ? true : false;
    }

    const routes = [
        {
            id: 1,
            label: 'Home',
            path: '/',
            icon: HomeIcon
        },
        {
            id: 2,
            label: 'Posts & Categories',
            path: '/Post',
            icon: ArticleIcon
        },
        {
            id: 3,
            label: 'Author',
            path: '/author',
            id: '/[id]',
            icon: AssignmentIndIcon
        }
    ];

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar

                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ fontFamily: 'Lobster' }} variant="h4" className={classes.title}>Blogger</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}

            >
                <div className={classes.drawerHeader}
                >

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List
                >
                    {routes.map((item, index) => (
                        <Link href={item.path} style={{ textDecoration: 'none', color: 'black' }} key={index}>
                            <MenuItem selected={activeRoute(item.path + item.id, router.pathname)} onClick={handleDrawerClose}>
                                <ListItem button key={index}   >
                                    <ListItemIcon> <item.icon /> </ListItemIcon>
                                    <ListItemText primary={<Typography style={{ fontFamily: 'lobster', fontSize: '1.1rem' }}>{item.label}</Typography>} />
                                </ListItem>
                            </MenuItem>
                        </Link>
                    ))}


                </List>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Container maxWidth="xl" >
                    {children}
                </Container>

            </main>
            <style jsx global>{`
                img {
          width:100%
        }
        a {
            font-family:'lobster';
        }
        
      `}</style>
        </div >
    );
}