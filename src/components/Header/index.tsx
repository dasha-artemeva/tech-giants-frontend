import {
    AppBar,
    Box, ButtonProps,
    Container, Divider,
    Drawer,
    IconButton,
    List,
    ListItem, ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import Logo from "../Logo";
import HeaderButton from "../HeaderButton";
import MenuIcon from '@mui/icons-material/Menu';
import {MouseEventHandler, useEffect, useState} from "react";
import LoginIcon from '@mui/icons-material/Login';
import AuthForm from "../AuthForm";
import CenterModal from "../CenterModal";
import {useUserStore} from "../../stores/user.store.ts";
import {useGlobalStore} from "../../stores/global.store.ts";
import {Navigate, useNavigate, useLocation} from "react-router-dom";
import authService from "../../services/AuthService";




interface ButtonConfig{
    text: string;
    buttonProps?: ButtonProps;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    show: boolean;
}


export function Header() {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const userStore = useUserStore();
    const navigate = useNavigate();
    const globalStore = useGlobalStore();
    const location = useLocation();
    useEffect(() => {
        userStore.refresh();
    }, [])
    const buttons: ButtonConfig[] = [
        {text: 'Архив', 
            show: location.pathname !== '/Archive', 
            onClick: () => navigate('/Archive')},
        {
            text: 'Войти',
            buttonProps: {endIcon: <LoginIcon/>},
            onClick: () => {
                globalStore.setAuthModalOpened(true);
                setDrawerOpened(false)
            },
            show: userStore.user === undefined,
        },
        {
            text: 'Личный кабинет',
            show: userStore.user !== undefined,
            onClick: () => navigate('/dashboard/profile'),
        },
        {
            'text': 'Выйти',
            'show': userStore.user !== undefined,
            'onClick': async () => {
                await authService.logout();
                await userStore.refresh();
                navigate('/');
            }
        }
    ]

    return <>
        <Box sx={{flexGrow: 1}}>
            <AppBar elevation={0}>
                <Toolbar disableGutters component={Container}>
                    <Box
                        flexGrow={1}
                        flexDirection="row"
                        display="flex"
                        alignItems="center"
                        onClick={() => navigate('/')}
                        sx={{cursor: "pointer"}}
                    >
                        <Logo color="secondary" fontSize="large" sx={{mr: 1}}/>
                        <Typography>
                            Конференция
                        </Typography>
                    </Box>
                    <Box gap={1} sx={{display: {xs: 'none', sm: 'flex'}}}>
                        {buttons.filter(b => b.show).map(b => (
                            <HeaderButton key={b.text} {...b.buttonProps} onClick={b.onClick}>
                                {b.text}
                            </HeaderButton>
                        ))}
                    </Box>
                    <Box sx={{display: {xs: 'flex', sm: 'none'}}}>
                        <IconButton size="large" onClick={() => setDrawerOpened(true)}>
                            <MenuIcon/>
                        </IconButton>
                    </Box>
                    <Drawer open={drawerOpened} onClose={() => setDrawerOpened(false)} elevation={0}>
                        <Box width={250}>
                            <Box px={2}>
                                <Logo color="secondary" fontSize="large" sx={{mr: 1}}/>
                            </Box>
                            <Divider/>
                            <List>
                                {buttons.filter(b => b.show).map(b => (
                                    <ListItem key={b.text} disablePadding>
                                        <ListItemButton onClick={b.onClick}>
                                            <ListItemText primary={b.text}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
        {globalStore.authModalOpened && userStore.user !== undefined && (globalStore.setAuthModalOpened(false) || true) && (
            <Navigate to="/dashboard/profile" replace/>
        )}
        <CenterModal open={globalStore.authModalOpened && userStore.user === undefined}>
            <AuthForm onClose={() => globalStore.setAuthModalOpened(false)}/>
        </CenterModal>
    </>;
}

export default Header;